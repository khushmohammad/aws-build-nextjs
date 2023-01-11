import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { setCookie } from "cookies-next";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires:
        Date.now() + refreshedTokens.expires_in * 24 * 60 * 60 * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: "1054766325191423",
      clientSecret: "c36697ad5356b64c63c3831c9a06e5ff",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: GOOGLE_AUTHORIZATION_URL,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const parseData = JSON.parse(credentials.userdata);
        const userDataPayload = {
          userName: parseData.userName,
          password: parseData.password,
          isSocialMediaLogin: false,
          // role: "admin",
        };
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_PATH}/users/account/login`,
            userDataPayload
          );
          setCookie("jwtToken", res.data.body.token);
          return res.data.body.token;
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires:
            Date.now() + account.expires_in * 24 * 60 * 60 * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return await refreshAccessToken(token);
    },
    session: async ({ session, token, user }) => {
      // // session.user.role = user.role; // Add role value to user object so it is passed along with session
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});

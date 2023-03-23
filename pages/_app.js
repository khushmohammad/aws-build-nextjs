import { persistor, store, wrapper } from "../store";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "react-bootstrap";
import { PersistGate } from "redux-persist/integration/react";
import PageToPage from "../components/Loader/PageToPage";
// css
import "../styles/globals.css";
import "../public/assets/scss/socialv.scss";
import "../public/assets/scss/customizer.scss";
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Integrating with love</title>
      </Head>

      <SSRProvider>
        <SessionProvider session={session}>
          {/* <Provider store={store}> */}
          <PersistGate loading={null} persistor={persistor}>
            <PageToPage />
            <Component {...pageProps} />
          </PersistGate>
          {/* </Provider> */}
        </SessionProvider>
      </SSRProvider>
    </>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);

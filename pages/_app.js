import "../styles/globals.css";
import { persistor, store, wrapper } from "../store";
import { Provider, useSelector } from "react-redux";
import "../public/assets/scss/socialv.scss";
import "../public/assets/scss/customizer.scss";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "react-bootstrap";
import { PersistGate } from "redux-persist/integration/react";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "react-bootstrap/Spinner";

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

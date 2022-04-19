import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Router from "next/router";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("end");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Layout>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Component {...pageProps} />
      )}
    </Layout>
  );
}

export default MyApp;

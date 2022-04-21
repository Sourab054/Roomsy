import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { ThemeProvider } from "next-themes";
import { DataProvider } from "./DataContext";
import Head from "next/head";

const progress = new ProgressBar({
  size: 5,
  delay: 100,
  color: "#FF002E",
  className: "z-50",
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </DataProvider>
  );
}

export default MyApp;

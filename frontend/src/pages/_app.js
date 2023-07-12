import "@/styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

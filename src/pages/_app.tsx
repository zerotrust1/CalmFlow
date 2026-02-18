import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "../styles/navbar.css";
import "../styles/breathing.css";
import "../styles/breathing-soft-calming.css";
import "../styles/button.css";
import "../styles/home.css";
import "../styles/pomodoro.css";
import Head from "next/head";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Lora:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WasmGen",
  description:
    "Generated WebAssmebly code from C++ code and make web applications run faster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dracula">
      <Head>
        <Script
          strategy="beforeInteractive"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q7HMTR5N95"
        ></Script>
        <Script strategy="beforeInteractive">
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Q7HMTR5N95');`}
        </Script>
      </Head>
      <body className={inter.className}>
        <div className="flex flex-col items-center px-12 pt-12">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

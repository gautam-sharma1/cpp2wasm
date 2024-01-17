import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
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
      <meta
        name="google-site-verification"
        content="7rNejNSFqrwjCVSOwCx7Gm3_qda3exX8pvAOnSicTEk"
      />
      <body className={inter.className}>
        <GoogleAnalytics />
        <div className="flex flex-col items-center px-12 pt-12">
          <Header />
          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}

import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Air-Measurer",
  description: "Project for Lv's school.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} bg-lime-200 text-black sm:py-16 antialiased md:pb-0 md:pt-0 overflow-x-hidden`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

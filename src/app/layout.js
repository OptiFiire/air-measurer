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
  title: "AirEval",
  description: "AirEval is a simple Next.js-based web application that evaluates air quality parameters (PM2.5, temperature, humidity, TVOC, CO, CO2) and provides detailed AI-based recommendations and health impact assessments in markdown format. The application fetches air quality data and generates an AI response, then renders it beautifully.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} bg-lime-200 font-medium text-black antialiased md:pb-0 md:pt-0 overflow-x-hidden`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

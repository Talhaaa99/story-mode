import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Orbitron, Chakra_Petch } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-chakra-petch",
});

export const metadata: Metadata = {
  title: "Interactive Portfolio Timeline | Your Name",
  description:
    "An interactive journey through my life story - from birth in 1999 to present day, featuring quirky humor, animations, and easter eggs.",
  keywords:
    "portfolio, timeline, interactive, developer, frontend, web3, react, next.js",
  authors: [{ name: "Your Name" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Meta tags for better SEO */}
        <meta name="theme-color" content="#ff00ff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Interactive Portfolio Timeline" />
        <meta
          property="og:description"
          content="An interactive journey through my life story with quirky humor and animations"
        />
        <meta property="og:site_name" content="Your Portfolio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interactive Portfolio Timeline" />
        <meta
          name="twitter:description"
          content="An interactive journey through my life story with quirky humor and animations"
        />
      </head>
      <body
        className={`${inter.className} ${orbitron.variable} ${chakraPetch.variable} bg-[#0a0a0a] text-white`}
      >
        <noscript>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#0a0a0a",
              color: "#ff00ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              textAlign: "center",
              padding: "2rem",
            }}
          >
            <div>
              <h1>JavaScript Required</h1>
              <p>
                This interactive portfolio requires JavaScript to display
                properly. Please enable JavaScript in your browser settings and
                refresh the page.
              </p>
            </div>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}

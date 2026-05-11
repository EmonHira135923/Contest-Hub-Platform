import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/Componets/Provider/ThemeProvider";
import { ToastContainer } from "react-toastify";
import Header from "@/Componets/Shared/Header";
import Footer from "@/Componets/Shared/Footer";
import ReactQueryProvider from "@/Componets/Provider/ReactQueryProvider";

const inter = Inter({
  weight: ["100", "200", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "ContestHub | Creative Contest Platform",
    template: "%s | ContestHub | Creative Contest Platform",
  },
  description:
    "ContestHub is a modern contest management platform where users can discover, join, and manage creative contests including design, writing, gaming reviews, business ideas, and more.",

  keywords: [
    "ContestHub",
    "contest platform",
    "creative contests",
    "design contest",
    "article writing contest",
    "business idea contest",
    "online competitions",
  ],

  authors: [{ name: "Your Name" }],
  creator: "Your Name",

  openGraph: {
    title: "ContestHub | Creative Contest Platform",
    description:
      "Join creative contests, submit tasks, win prizes, and manage contests easily with ContestHub.",
    url: "https://your-domain.com",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ContestHub | Creative Contest Platform",
    description:
      "Discover and participate in creative contests with ContestHub.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider>
            <ToastContainer />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

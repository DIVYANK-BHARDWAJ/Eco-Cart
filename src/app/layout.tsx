import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollNavigator from "@/components/ScrollNavigator";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eco Cart - Organic & Sustainable",
  description: "A sustainable organic cart visual identity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full select-none`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col selection:bg-neon-g selection:text-ink overflow-x-hidden bg-black" suppressHydrationWarning>
        
        {/* Background Video Layer */}
        <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src="/website-animation.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/60 backdrop-brightness-[0.7]" />
        </div>

        <CartProvider>
          <CustomCursor />
          <ScrollNavigator />
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
            {children}
          </main>
        </CartProvider>
        <Script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js" strategy="afterInteractive" />
        <Script src="https://files.bpcontent.cloud/2026/04/05/19/20260405192306-5JID2SZ5.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

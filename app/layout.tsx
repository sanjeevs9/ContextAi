import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import logo from "@/utils/4-1 ContextAi logo_icon_color1.png";

export const metadata: Metadata = {
  title: "Context AI",
  description: "Context AI is a platform for fact checking and fact checking",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

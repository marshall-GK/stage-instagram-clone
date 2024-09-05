'use client'
import "./globals.css";
import { InstagramLogo } from "@/svg/instagramSVG";
import {
  UserStoryContextProvider,
} from "@/Contexts/UserStoryContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body>
        <header className="appLogoBlock">
          <InstagramLogo />
        </header>
        <UserStoryContextProvider>
          {children}
        </UserStoryContextProvider>
      </body>
    </html>
  );
}

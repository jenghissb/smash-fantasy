import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Smash Fantasy",
  description: "Fantasy teams for Start.gg tournaments",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b border-zinc-800 px-6 py-4">
          <div className="mx-auto flex max-w-6xl gap-6">
            <Link href="/">
              Smash Fantasy
            </Link>

            <Link href="/build">
              Build Team
            </Link>

            <Link href="/leaderboard">
              Leaderboard
            </Link>

            <Link href="/rules">
              Rules
            </Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}

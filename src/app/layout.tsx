import type { Metadata } from "next";
import "@/styles/globals.css";
import "mafs/core.css";
import { Sidebar } from "@/components/ui/Sidebar";

export const metadata: Metadata = {
  title: "Linear Algebra Done Right — Interactive Course",
  description:
    "An interactive learning experience for Linear Algebra Done Right by Sheldon Axler. Chapters 1-3: Vector Spaces, Finite-Dimensional Vector Spaces, Linear Maps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0 ml-72">{children}</main>
      </body>
    </html>
  );
}

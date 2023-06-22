import Link from "next/link";
import { ReactNode } from "react";
import Navigation from "./navigation";
import { Footer } from "./footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="selection:bg-accent selection:text-accent">
        {children}
      </main>
      <Footer></Footer>
    </>
  );
}

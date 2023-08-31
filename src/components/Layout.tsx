import { type ReactNode } from "react";
import Navigation from "./Navigation";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="h-screen selection:bg-accent selection:text-accent">
        <Navigation />
        {children}
        <Footer></Footer>
      </main>
    </>
  );
}

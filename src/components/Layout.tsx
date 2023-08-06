import { type ReactNode } from "react";
import Navigation from "./Navigation";
import { Footer } from "./Footer";

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

import Link from "next/link";
import { ReactNode } from "react";
import Navigation from "./navigation";
import { Footer } from "./footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}

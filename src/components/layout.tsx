import Link from "next/link";
import { ReactNode } from "react";
import Navigation from "./navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}

import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav>
        <ul className="flex gap-2">
          <li>
            <Link href="/strain">Strains</Link>
          </li>
          <li>
            <Link href="/producer">Producers</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
}

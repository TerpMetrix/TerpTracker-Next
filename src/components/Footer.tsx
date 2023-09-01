import { Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-100 footer flex flex-row items-center justify-between p-4 text-neutral-content">
      <div className="items-center">
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className="flex flex-row gap-4">
        <Link href="https://twitter.com/terpmetrix/">
          <Twitter className="text-2xl" />
        </Link>
        <Link href="https://instagram.com/terpmetr.x">
          <Instagram className="text-2xl" />
        </Link>
      </div>
    </footer>
  );
}

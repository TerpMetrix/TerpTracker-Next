import { Twitter, Instagram } from 'lucide-react'
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer flex flex-row justify-between items-center bg-100 p-4 text-neutral-content">
      <div className="items-center">
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className="gap-4 flex flex-row">
        <Link href="https://twitter.com/terpmetrix/">
          <Twitter className='text-2xl'/> 
        </Link>
        <Link href="https://instagram.com/terpmetr.x">
          <Instagram className='text-2xl'/>
        </Link>
      </div>
    </footer>
  );
}
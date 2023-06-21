import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/strain">Strains</Link>
            </li>
            <li>
              <Link href="/producer">Produces</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn-ghost btn gap-0 text-xl normal-case">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Terp
          </span>
          Metrix
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li tabIndex={0}>
            <Link href="/strain">Strains</Link>
          </li>
          <li>
            <Link href="/producer">Producers</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">{sessionData ? logOut() : logIn()}</div>
    </div>
  );
}

function logIn() {
  return (
    <button className="btn" onClick={() => signIn()}>
      Login <LogIn></LogIn>
    </button>
  );
}

function logOut() {
  return (
    <button className="btn" onClick={() => signOut()}>
      Logout <LogOut></LogOut>
    </button>
  );
}

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-base-100 justify-center">
      <div className="navbar-start">
        <Link href="/" className="btn-ghost btn h-24 w-24 normal-case p-4">
          <Image src={"/terptracker-logo.png"} alt="TerpTracker Logo" width={70} height={70} />
        </Link>
        {/* HIDDING THIS DROPDOWN FOR NOW - MIGHT BE USEFUL LATER */}
        {/* <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <Menu className="inline mt-2" size={40} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-lg z-[1] mt-3 w-52 bg-base-100 p-2 shadow text-xl"
          >
            <li>
              <Link href="/strain">Popular Strains</Link>
            </li>
            <li>
              <Link href="/producer">Popular Producers</Link>
            </li>
          </ul>
        </div> */}
      </div>
      <div className="navbar-center lg:hidden">

      </div>
      <div className="navbar-end p-4">{sessionData ? logOut() : logIn()}</div>
    </div>
  );
}

function logIn() {
  return (
    <button className="btn btn-outline btn-primary" onClick={() => void signIn()}>
      <span className="sm:inline hidden">Login</span> <LogIn></LogIn>
    </button>
  );
}

function logOut() {
  return (
    <button className="btn btn-outline btn-error" onClick={() => void signOut()}>
      <span className="sm:inline hidden"> Logout </span> <LogOut></LogOut>
    </button>
  );
}

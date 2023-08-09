import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

export default function Navigation() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const isIndex = router.pathname === "/";

  return (
    <div className="navbar bg-base-100 justify-center">
      <div className="navbar-start">
        <Link href="/" className="btn-ghost btn h-24 w-24 normal-case p-4">
          <Image src={"/terptracker-logo.png"} alt="TerpTracker Logo" width={70} height={70} />
        </Link>

        {/* if index page, do not show search bar */}
        {!isIndex ?
          <div className="navbar-center flex w-full">
            <SearchBar />
          </div>
          : null}

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

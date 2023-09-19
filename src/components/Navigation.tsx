import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

export default function Navigation() {
  //get user session data
  const { data: session } = useSession();
  const router = useRouter();
  const isIndex = router.pathname === "/";
  const isHome = router.pathname === "/home";
  //await profileId response from useSession

  return (
    <div className="navbar justify-center bg-base-100">
      <div className="navbar-start w-1/2 md:w-full">
        {/* if index, display logo */}
        {isIndex ? (
          <Link href="/" className="btn-ghost btn h-24 w-24 p-4 normal-case">
            <Image
              src={"/terptracker-logo.png"}
              alt="TerpTracker Logo"
              width={70}
              height={70}
            />
          </Link>
        ) : (
          <Link href="/home" className="btn-ghost btn h-24 w-24 p-4 normal-case">
            <Image
              src={"/terptracker-logo.png"}
              alt="TerpTracker Logo"
              width={70}
              height={70}
            />
          </Link>
        )}
      </div>
      {/* if not index, do not display log in button */}
      <div className="navbar-end">
        {isHome || isIndex ? (
          <>
            <div>
              {session?.user.name && (
                <div className="p-4">
                  <Link href={`/profile/${session.user.name}`}>
                    <button className="btn-primary btn-outline btn">
                      <UserCircle /> <p>{session.user.name}</p>
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div className="p-4">{session ? logOut() : logIn()}</div>
          </>
        ) : (
          <>
            <div className="navbar-center w-full md:pl-12">
              <SearchBar />
            </div>
            {/* if user is logged in, show profile button */}
            {session?.user.name && (
              <div className="p-2">
                <Link href={`/profile/${session.user.name}`}>
                  <button className="btn-primary btn-outline btn">
                    <UserCircle />
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function logIn() {
  return (
    <button
      className="btn-primary btn-outline btn"
      onClick={() => void signIn()}
    >
      <span className="hidden sm:inline">Login/Create Account</span>{" "}
      <LogIn></LogIn>
    </button>
  );
}

function logOut() {
  return (
    <button
      className="btn-outline btn-error btn"
      onClick={() => void signOut()}
    >
      <span className="hidden sm:inline"></span> <LogOut></LogOut>
    </button>
  );
}

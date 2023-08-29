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
  //await profileId response from useSession

  return (
    
    <div className="navbar bg-base-100 justify-center">
      <div className="navbar-start">
        <Link href="/" className="btn-ghost btn h-24 w-24 normal-case p-4">
          <Image src={"/terptracker-logo.png"} alt="TerpTracker Logo" width={70} height={70} />
        </Link>
      </div>
      {/* if not index, do not display log in button */}
      <div className="navbar-end">
      {isIndex ?
        <>
        <div>
              {session?.user.name && (
                <div className="p-4">
                  <Link href={`/profile/${session.user.name}`}>
                    <button className="btn btn-outline btn-primary">
                      <UserCircle /> <p>{session.user.name}</p>
                    </button>
                  </Link>
                </div>
              )}
        </div>
        <div className="p-4">{session ? logOut() : logIn()}</div>
        </>
        : 
        <>
        <div className="w-3/4 pr-4 md:pl-12">
          <SearchBar />
        </div>
              {session?.user.name && (
                <div className="p-4">
                  <Link href={`/profile/${session.user.name}`}>
                    <button className="btn btn-outline btn-primary">
                      <UserCircle />
                    </button>
                  </Link>
                </div>
              )}
        </>
      }
      </div>
      {/* if user is logged in, show profile button */}

    </div>
  );
}

function logIn() {
  return (
    <button className="btn btn-outline btn-primary" onClick={() => void signIn()}>
      <span className="sm:inline hidden">Login/Create Account</span> <LogIn></LogIn>
    </button>
  );
}

function logOut() {
  return (
    <button className="btn btn-outline btn-error" onClick={() => void signOut()}>
      <span className="sm:inline hidden"></span> <LogOut></LogOut>
    </button>
  );
}

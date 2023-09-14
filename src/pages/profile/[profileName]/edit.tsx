import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { LoaderIcon, XCircle } from "lucide-react";
import { useCallback } from "react";

export default function EditProfile() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const editMutation = api.profiles.editProfile.useMutation();
  const profileName = useRouter().query.profileName as string;
  const router = useRouter();

  const handleRefresh = (updatedName: string) => {
    // go to new profile page
    console.log("updated name:", updatedName);
    void router.push(`/profile/${updatedName}`);
    return null;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (session && session.user.name === profileName) {
    return (
      <>
        <Head>
          <title> Edit Profile of {profileName} | TerpTracker</title>
        </Head>
        <div className="flex h-[75vh] flex-col">
          <h1 className="my-4 text-center text-2xl md:ml-8 md:text-left md:text-3xl">
            Edit Profile
          </h1>
          <form
            className="mx-auto flex w-11/12 flex-col gap-4 rounded-xl bg-slate-100 p-4 md:w-1/2"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const data = new FormData(e.target as HTMLFormElement);
              const res = editMutation.mutate({
                originalName: profileName || "",
                updatedName: data.get("updatedName") as string,
              });
              console.log(res);
            }}
          >
            <label
              htmlFor="updatedName"
              className="text-xl font-bold text-slate-900"
            >
              Profile Name
            </label>
            <input
              className="input-base-content input w-full border-white bg-slate-200 text-slate-800 shadow-xl shadow-green-700/10"
              type="text"
              name="updatedName"
              id="updatedName"
              defaultValue={profileName || ""}
            />
            <button type="submit" className="btn-primary btn mx-auto w-1/2">
              Submit
            </button>
          </form>
          {editMutation.error && <p>{editMutation.error.message}</p>}
          {editMutation.isLoading && (
            <div className="alert alert-info mx-auto my-4 w-auto">
              Updating... <LoaderIcon />
            </div>
          )}
          {editMutation.isSuccess &&
            handleRefresh(
              (
                document.getElementById("updatedName") as HTMLInputElement
              ).value.toString()
            )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title> Access Denied | TerpTracker</title>
        </Head>
        <div className="flex h-[75vh] w-auto flex-col items-center justify-center text-center text-2xl font-bold uppercase text-red-500">
          <div className="alert alert-error mx-auto flex w-auto">
            <p> Not logged in to correct account </p>
            <XCircle />
          </div>
        </div>
      </>
    );
  }
}

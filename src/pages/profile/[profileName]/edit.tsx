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

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleRefresh = (updatedName : string) => {
        // go to new profile page
        console.log("updated name:", updatedName);
        void router.push(`/profile/${updatedName}`);
        return null;
    };

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const res = editMutation.mutate({
            originalName: profileName ? profileName : "",
            updatedName: data.get("updatedName") as string,
        });
        console.log(res);
    }, [editMutation, profileName]);

    if (session && session.user.name === profileName) {
        return (
            <>
                <Head>
                    <title> Edit Profile of {profileName} | TerpTracker</title>
                </Head>
                <div className="flex flex-col h-[75vh]">
                    <h1 className="text-2xl md:text-3xl text-center md:text-left my-4 md:ml-8">Edit Profile</h1>
                    <form
                        className="flex flex-col gap-4 w-11/12 md:w-1/2 mx-auto bg-slate-100 rounded-xl p-4"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="updatedName" className="text-xl font-bold text-slate-900">Profile Name</label>
                        <input
                            className="input-base-content input w-full border-white bg-slate-200 shadow-xl shadow-green-700/10 text-slate-800"
                            type="text"
                            name="updatedName"
                            id="updatedName"
                            defaultValue={profileName || ""}
                        />
                        <button type="submit" className="w-1/2 mx-auto btn-primary btn">Submit</button>
                    </form>
                    {editMutation.error && <p>{editMutation.error.message}</p>}
                    {editMutation.isLoading && <div className="alert alert-info w-auto mx-auto my-4">Updating... <LoaderIcon/></div>}
                    {editMutation.isSuccess && handleRefresh((document.getElementById("updatedName") as HTMLInputElement).value.toString())}
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <Head>
                    <title> Access Denied | TerpTracker</title>
                </Head>
                <div className="text-red-500 text-2xl font-bold uppercase w-auto h-[75vh] text-center flex flex-col justify-center items-center"
                >
                    <div className="alert alert-error w-auto mx-auto flex">
                        <p> Not logged in to correct account </p>
                        <XCircle />
                    </div>
                </div>
            </>
        );
    }
}
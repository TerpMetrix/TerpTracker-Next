import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function EditProfile() {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const editMutation = api.profiles.editProfile.useMutation();
    const profileName = useRouter().query.profileName as string;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (session) {
        return (
            <div>
                <h1>Edit Profile</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target as HTMLFormElement);
                        const res = editMutation.mutate({
                            originalName: profileName ? profileName : "",
                            updatedName: data.get("updatedName") as string,
                        });
                        console.log(res);
                    }}
                >
                    <label htmlFor="updatedName">Profile Name</label>
                    <input

                        type="text"
                        name="updatedName"
                        id="updatedName"
                        defaultValue={profileName ? profileName : ""}
                    />
                    <button type="submit">Submit</button>
                </form>
                {editMutation.error && <p>{editMutation.error.message}</p>}
                {editMutation.isLoading && <p>Updating...</p>}
                {editMutation.isSuccess && <p>Updated!</p>}
                <p>Signed in as {session.user.email}</p>
            </div>
        );
    }
}
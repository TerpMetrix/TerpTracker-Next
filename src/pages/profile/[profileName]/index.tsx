import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {
  ProfileWithRelations,
  getProfileByName,
}
  from '@/server/database/profiles';
import { convertStringsToDates, convertDatesToStrings } from '@/utils/dateSerialization';
import Carousel from '@/components/Carousel';
import StrainCard from '@/components/StrainCard';

export default function Profile({ profile }: ProfileProps) {

  const { data: session, status } = useSession()
  const loading = status === 'loading'
  // get route id
  const { profileName } = useRouter().query

  if (loading) {
    return <p>Loading...</p>
  }


  if (profile) {
    return (
      <div>
        <h1>Profile of {profile.profileName}</h1>
        {session && (
          <>
            {/* if user is logged in, and the username matches the route id, show an edit profile button */}
            {session.user.id === profile.user.id && (
              <Link href="/profile/[profileName]/edit" as={`/profile/${profileName}/edit`}>
                <button className='btn btn-primary'>Edit Profile</button>
              </Link>
            )}

            <p>Signed in as {session.user.email}</p>
            <p>Profile of {profileName}</p>

            {/* display strains */}

            <Carousel
                title="Liked Strains"
                data={profile.upvotedStrains}
                renderItem={(strain) => <StrainCard strain={strain} />}
                getKey={(strain) => strain.name}
            />
            
            {/* <button onClick={() => signOut()}>Sign out</button> */}
          </>
        )
        }
      </div >
    )
  }
}

type ProfileProps = {
  profile: ProfileWithRelations;
  notFound?: boolean;
};

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.profileName;
  if (!id) {
    return { notFound: true };
  }

  const profileName = String(id);
  if (profileName === "") {
    return { notFound: true };
  }

  let profile = await getProfileByName(profileName);

  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  profile = convertDatesToStrings(profile);

  if (!profile) {
    return { notFound: true };
  }

  return {
    props: {
      profile: profile,
    },
  };
};


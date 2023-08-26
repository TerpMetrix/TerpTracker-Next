import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Carousel from '@/components/Carousel';
import StrainCard from '@/components/StrainCard';
import { 
  type ProfileWithRelations,
  getProfileByName
} from '@/server/database/profiles';
import { 
  type GetServerSideProps, 
  type GetServerSidePropsContext 
} from 'next';
import { convertDatesToStrings } from '@/utils/dateSerialization';

type ProfileProps = {
  profile: ProfileWithRelations;
  notFound?: boolean;
}

export default function Profile({ profile, notFound }: ProfileProps) {

  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (loading) {
    return <p>Loading...</p>
  }

  if (notFound) {
    return <p>Profile not found</p>
  }


  if (profile) {
    return (
      <div>
        <h1>Profile of {profile.profileName}</h1>
        {session && (
          <>
            {/* if user is logged in, and the username matches the route id, show an edit profile button */}
            {session.user.id === profile.userId && (
              <Link href="/profile/[profileName]/edit" as={`/profile/${profile.profileName ? profile.profileName : ""}/edit`}>
                <button className='btn btn-primary'>Edit Profile</button>
              </Link>
            )}

            <p>You are signed in as {session.user.email}</p>

            <p>Profile of {profile.profileName}</p>

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

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context: GetServerSidePropsContext
) => {
  const profileName = context.params?.profileName as string;
  let profile = await getProfileByName(profileName ? profileName : "");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  profile = convertDatesToStrings(profile);

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile: profile,
    },
  };
}

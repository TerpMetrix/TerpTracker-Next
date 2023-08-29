import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Carousel from '@/components/Carousel';
import VCarousel from '@/components/VCarousel';
import StrainCard from '@/components/StrainCard';
import CommentCard from '@/components/CommentCard';
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
        {session && (
          <>
            <div className="flex flex-row justify-center">
              <div className='flex flex-col items-center w-3/4'>
                <div className='flex flex-row justify-center space-x-6 w-1/2 items-center'>
                  <Image className='w-1/4 rounded-full' src={profile.user.image ?? ""} alt="Profile Image" width={200} height={200} />
                  <div className='mb-12 flex flex-row justify-center space-x-4'>
                    <h1 className='text-3xl text-center'>{profile.profileName}</h1>
                    {/* if user is logged in, and the username matches the route id, show an edit profile button */}
                    {session.user.id === profile.userId && (
                      <Link href="/profile/[profileName]/edit" as={`/profile/${profile.profileName ? profile.profileName : ""}/edit`}>
                        <button className='btn btn-primary'>Edit Profile</button>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="flex flex-row justify-center w-full space-x-4 ml-16 mb-8">
                  <div className="flex flex-col items-center">
                    <p>{profile.upvotedStrains.length}</p>
                    <p>Liked Strains</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>{profile.reviews.length}</p>
                    <p>Comments</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Rank</p>
                    <p>Rank</p>
                  </div>
                </div>
                {/* horizontal element that has 3 numbers, one for number of liked strains, one for number of comments, and one that displays the rank of the account */}
              </div>

            </div>


            {/* display strains */}
            <div className="flex flex-row justify-center w-full mt-4 max-h-[550px]">
              <Carousel
                title="Liked Strains"
                data={profile.upvotedStrains}
                renderItem={(strain) => <StrainCard strain={strain} />}
                getKey={(strain) => strain.name}
              />
              <VCarousel
                title="Comments"
                data={profile.reviews}
                renderItem={(review) => <CommentCard review={review} />}
                getKey={(review) => review.strain.name}
              />
            </div>

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

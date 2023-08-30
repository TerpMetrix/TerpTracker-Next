import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Carousel from '@/components/Carousel';
import VCarousel from '@/components/VCarousel';
import StrainCard from '@/components/StrainCard';
import CommentCard from '@/components/CommentCard';
import {
  type ProfileWithRelations,
  getProfileByName,
  getProfileFavTerps
} from '@/server/database/profiles';
import {
  type TagWithNoRelations,
} from '@/server/database/tags';
import {
  type GetServerSideProps,
  type GetServerSidePropsContext
} from 'next';
import { convertDatesToStrings } from '@/utils/dateSerialization';
import Head from 'next/head';

type ProfileProps = {
  profile: ProfileWithRelations;
  favTerps: TagWithNoRelations[] | null;
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

  // interface Terp {
  //   name: string;
  // }

  // if (favTerps && favTerps.length > 0) {

  //   //remove duplicates
  //   favTerps = favTerps.filter((tag, index, self) =>
  //     index === self.findIndex((t) => (
  //       t.name === tag.name
  //     ))
  //   )

  //   favTerps = favTerps.slice(0, 3);
  // }



  if (profile) {
    return (
      <>
        <Head>
          <title>{profile.profileName} | TerpTracker</title>
        </Head>
        <div>
          {session && (
            <>
              <div className='flex flex-row relative justify-center items-center md:space-x-6 w-4/5 lg:w-2/5 mx-auto h-fit lg:ml-16 h-fit my-2 p-4 rounded-xl bg-slate-100 text-slate-800'>
                <Image
                  className='rounded-full w-1/4 h-1/4 mr-4'
                  src={profile.user.image ?? ""}
                  alt="Profile Image"
                  width={200}
                  height={200}
                />
                <div className='flex flex-col'>
                  <div className='flex flex-row justify-center items-center space-x-4'>
                    <h1 className='text-xl md:text-3xl text-center'>{profile.profileName}</h1>
                    {/* if user is logged in, and the username matches the route id, show an edit profile button */}
                    {session.user.id === profile.userId ? (
                      <Link href="/profile/[profileName]/edit" as={`/profile/${profile.profileName ? profile.profileName : ""}/edit`}>
                        <button className='btn btn-primary h-auto'>Edit</button>
                      </Link>
                    )
                      : <div className='w-24 h-6 mt-6'></div>}
                  </div>
                  <div className="absolute top-3 left-3 place-content-end">
                    <p className='badge badge-warning mb-0.5'>Level 1</p>
                  </div>
                  <div className="flex flex-row w-full mx-auto md:pt-5 md:pr-6 justify-evenly content-end md:gap-10">
                    <div className="flex flex-col items-center place-content-end">
                      <p className='font-bold'>{profile.upvotedStrains.length}</p>
                      <p className='italic'>Liked Strains</p>
                    </div>
                    <div className="flex flex-col items-center place-content-end">
                      <p className='font-bold'>{profile.reviews.length}</p>
                      <p className='italic'>Comments</p>
                    </div>
                  </div>
                  {/* map terptags to tags component */}
                  {/* <div className='flex flex-row justify-center items-center space-x-2'>
                    {favTerps?.map((tag) => {
                      return <Tag tag={tag} key={tag.id} />;
                    })}
                  </div> */}

                </div>
                {/* horizontal element that has 3 numbers, one for number of liked strains, one for number of comments, and one that displays the rank of the account */}
              </div>


              {/* display strains */}
              <div className="flex md:flex-row flex-col justify-center w-full mt-4 md:max-h-[55vh]">
                <Carousel
                  title="Liked Strains"
                  data={profile.upvotedStrains}
                  renderItem={(strain) => <StrainCard strain={strain} />}
                  getKey={(strain) => strain.name}
                />
                <VCarousel
                  className="h-[400px] md:h-auto w-full"
                  title="Comments"
                  data={profile.reviews}
                  renderItem={(review) => <CommentCard review={review} forProfile={true} className='max-w-[80vw] md:max-w-md' />}
                  getKey={(review) => review.strain.name}
                />
              </div>
              {/* <button onClick={() => signOut()}>Sign out</button> */}
            </>
          )
          }
        </div >
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context: GetServerSidePropsContext
) => {
  const profileName = context.params?.profileName as string;
  let profile = await getProfileByName(profileName ? profileName : "");
  let favTerps = await getProfileFavTerps(profileName ? profileName : "");


  // console.log(favTerps);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  profile = convertDatesToStrings(profile);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  favTerps = convertDatesToStrings(favTerps);

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile: profile,
      favTerps: favTerps,
    },
  };
}

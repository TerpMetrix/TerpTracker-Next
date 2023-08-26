import { useSession } from 'next-auth/react'


export default function UserProfile() {

    const { data: session, status } = useSession()
    const loading = status === 'loading'

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>User Profile</h1>
      {session && (
        <>
          <p>Signed in as {session.user.email}</p>
        </>
      )}
    </div>
  )
}

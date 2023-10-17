import Grid from '@/components/Grid';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <>
        <h2 className='text-2xl'>Admin page - welcome back {session?.user.username}</h2>
        <Grid />
      </>
    )
  }

  return <h2 className='text-2xl'>Admin page - please sign in</h2>
}

export default page

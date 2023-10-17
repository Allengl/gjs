import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Home = async() => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className='text-xxl'>Home</h1>
      <Link className={buttonVariants()}  href='/sign-in'>Open My Admin</Link>
    
      <h2>Client Sesion</h2>
      <User /> 
      <h2>Server Sesion</h2>
      {JSON.stringify(session)}
    </div>
  )
}
export default Home;

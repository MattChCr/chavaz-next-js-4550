import Link from "next/link";
export default function Signin() {
 return (
   <div>
     <h3>Sign in</h3>
     <input defaultValue="StudiousHusky" placeholder="username" /> <br />
     <input defaultValue="********" placeholder="password" type="password" />
     <br />
     <Link href="/Dashboard"> Sign in </Link> <br />
     <Link href="Signup"> Sign up </Link>
   </div>
);}

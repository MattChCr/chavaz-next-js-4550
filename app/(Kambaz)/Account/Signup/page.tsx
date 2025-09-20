import React from "react";
import Link from "next/link";
export default function Signup() {
  return (
    <div>
      <h3>Sign up</h3>
      <input defaultValue="NewHusky" placeholder="username" /><br/>
      <input defaultValue="NewPassword" placeholder="password" type="password" /><br/>
      <input defaultValue="NewPassword" placeholder="verify password" type="password" /><br/>
      <Link href="Profile" > Sign up </Link><br />
      <Link href="Signin" >Sign in</Link>
    </div>
);}

'use client';
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-5">
      <h1>Sign Up</h1>
      <FormControl id="wd-username"
             placeholder="username"
             className="mb-2"/>
      <FormControl id="wd-password"
             placeholder="password" 
             type="password"
             className="mb-2"/>
      <Link id="wd-sign-btn"
            href="/Account/Profile"
            className="btn btn-primary w-100 mb-2">
            Sign Up </Link>
      <Link id="wd-signin-link" href="/Account/Signin">Sign in</Link>
    </div> );}
'use client';
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState, ChangeEvent } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

type Credentials = {
  username: string;
  password: string;
};

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({ username: "", password: "" });
  const dispatch = useDispatch();

  const signin = () => {
    const user = db.users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  const handleChange = (field: keyof Credentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="wd-signin-screen" className="p-5">
      <h1>Sign in</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("username", e.target.value)
        }
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={credentials.password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("password", e.target.value)
        }
      />
      <Button id="wd-signin-btn" className="w-100" onClick={signin}>
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/Account/Profile">
        Sign up
      </Link>
    </div>
  );
}
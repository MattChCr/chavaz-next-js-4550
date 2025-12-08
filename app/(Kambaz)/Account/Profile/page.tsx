'use client';
export const dynamic = 'force-dynamic';

import * as client from "../client";
import type { User } from "../client";

import { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import { useRouter } from "next/navigation";

type UserProfile = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
};

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const updateProfile = async () => {
    if (!profile || !currentUser) return;
    const userToUpdate = { ...currentUser, ...profile };
    const updatedProfile = await client.updateUser(currentUser._id!, userToUpdate);
    dispatch(setCurrentUser(updatedProfile));
    setProfile({
      ...updatedProfile as UserProfile,
      dob: formatDateForInput((updatedProfile as UserProfile).dob || ""),
    });
    router.refresh();
  };

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile({
      ...currentUser as UserProfile,
      dob: formatDateForInput((currentUser as UserProfile).dob || ""),
    });
  }, [currentUser]);

  const signout = async () => {
    await client.signout();

    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  if (!profile) return null;

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl
        value={profile.username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("username", e.target.value)
        }
        placeholder="Username"
        className="mb-2"
      />
      <FormControl
        value={profile.password}
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("password", e.target.value)
        }
        placeholder="Password"
        className="mb-2"
      />
      <FormControl
        value={profile.firstName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("firstName", e.target.value)
        }
        placeholder="First Name"
        className="mb-2"
      />
      <FormControl
        value={profile.lastName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("lastName", e.target.value)
        }
        placeholder="Last Name"
        className="mb-2"
      />
      <FormControl
        type="date"
        value={profile.dob}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("dob", e.target.value)
        }
        placeholder="Date of Birth"
        className="mb-2"
      />
      <FormControl
        value={profile.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("email", e.target.value)
        }
        placeholder="Email"
        className="mb-2"
      />
      <select
        value={profile.role}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleChange("role", e.target.value)
        }
        className="form-control mb-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>

      <Button onClick={signout} className="w-100 mb-2">
        Sign out
      </Button>
    </div>
  );
}
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
    if (!profile || !currentUser) {
      console.log("No profile or currentUser");
      return;
    }
    const currentUserTyped = currentUser as User;
    const userId = currentUserTyped._id || currentUserTyped.id;
    if (!userId) {
      console.log("No user ID found", currentUserTyped);
      alert("Error: No user ID found");
      return;
    }
    const userToUpdate: User & { _id: string } = {
      ...currentUserTyped,
      ...profile,
      _id: userId,
    };
    try {
      const updatedProfile = await client.updateUser(userToUpdate);
      dispatch(setCurrentUser(updatedProfile));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin"); // client-side redirect
      return;
    }
    setProfile(currentUser as UserProfile);
  }, [currentUser]);

  const signout = async () => {
    await client.signout();

    dispatch(setCurrentUser(null));
    router.push("/Account/Signin"); // client-side redirect
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
        className="mb-2"
      />
      <FormControl
        value={profile.password}
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("password", e.target.value)
        }
        className="mb-2"
      />
      <FormControl
        value={profile.firstName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("firstName", e.target.value)
        }
        className="mb-2"
      />
      <FormControl
        value={profile.lastName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("lastName", e.target.value)
        }
        className="mb-2"
      />
      <FormControl
        type="date"
        value={profile.dob}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("dob", e.target.value)
        }
        className="mb-2"
      />
      <FormControl
        value={profile.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("email", e.target.value)
        }
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
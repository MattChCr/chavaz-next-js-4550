"use client";

import { redirect } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";

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
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser as UserProfile);
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (field: keyof UserProfile, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  if (!profile) return null;

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl
        id="wd-username"
        className="mb-2"
        value={profile.username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("username", e.target.value)
        }
      />
      <FormControl
        id="wd-password"
        className="mb-2"
        value={profile.password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("password", e.target.value)
        }
      />
      <FormControl
        id="wd-firstname"
        className="mb-2"
        value={profile.firstName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("firstName", e.target.value)
        }
      />
      <FormControl
        id="wd-lastname"
        className="mb-2"
        value={profile.lastName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("lastName", e.target.value)
        }
      />
      <FormControl
        id="wd-dob"
        type="date"
        className="mb-2"
        value={profile.dob}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("dob", e.target.value)
        }
      />
      <FormControl
        id="wd-email"
        className="mb-2"
        value={profile.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("email", e.target.value)
        }
      />
      <select
        id="wd-role"
        className="form-control mb-2"
        value={profile.role}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleChange("role", e.target.value)
        }
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Button id="wd-signout-btn" className="w-100 mb-2" onClick={signout}>
        Sign out
      </Button>
    </div>
  );
}
'use client';
export const dynamic = 'force-dynamic';


import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const links = currentUser
    ? [{ name: "Profile", href: "/Account/Profile" }]
    : [
        { name: "Signin", href: "/Account/Signin" },
        { name: "Signup", href: "/Account/Signup" },
      ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="list-group-item text-dark border-0"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

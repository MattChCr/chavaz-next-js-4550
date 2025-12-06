'use client';
export const dynamic = 'force-dynamic';


import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
 const { currentUser } = useSelector((state: RootState) => state.accountReducer);
 const pathname = usePathname();
 
  const links = currentUser
    ? [{ name: "Profile", href: "/Account/Profile" }]
    : [
        { name: "Signin", href: "/Account/Signin" },
        { name: "Signup", href: "/Account/Signup" },
      ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
       {currentUser && currentUser.role === "ADMIN" && (
       <NavLink as={Link} href={`/Account/Users`}  active={pathname.endsWith('Users')}> Users </NavLink> )}

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

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
 return (
   <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
    <Link href="Signin" id="wd-account-navigation-link"
        className="list-group-item active text-dark border-0"> Signin </Link>
        <Link href="Signup" id="wd-account-navigation-link"
        className="list-group-item text-danger border-0"> Signup </Link>
        <Link href="Profile" id="wd-account-navigation-link"
        className="list-group-item text-danger border-0"> Profile </Link>
   </div>
);}

import Link from "next/link";
export default function Profile() {
  return (
    <div>
      <h3>Profile</h3>
      <input defaultValue="StudiousHusky" placeholder="username"/><br/>
      <input defaultValue="northeastern"   placeholder="password" type="password" /><br/>
      <input defaultValue="Matt" placeholder="First Name" /><br/>
      <input defaultValue="Chavez" placeholder="Last Name" /><br/>
      <input defaultValue="2000-01-01" type="date" /><br/>
      <input defaultValue="husky@northeastern" type="email" /><br/>
      <select defaultValue="STUDENT" >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select><br/>
      <Link href="Signin" > Sign out </Link>
    </div>
);}

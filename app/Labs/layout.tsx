import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({ children }:
  Readonly<{ children: ReactNode }>) {
 return (
  <div>
    <h1> Matthew Chavez Cruz - Section 1: Welcome to Web Dev </h1>
    <a href="https://github.com/MattChCr/chavaz-next-js-4550"> Link to Github!</a>

    <h1> Labs</h1>
   <table>
     <tbody>
       <tr>
         <td valign="top" width="100px">
           <TOC />
         </td>
         <td valign="top">{children}</td>
       </tr>
     </tbody>
   </table>
   </div>
);}

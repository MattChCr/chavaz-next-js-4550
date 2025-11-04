'use client';
export const dynamic = 'force-dynamic';

import React from "react";
import { usePathname } from "next/navigation";


export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();
 return (
   <span>
    &gt; {pathname.split("/").pop()}
   </span>
 );
}

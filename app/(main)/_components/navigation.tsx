'use client';

import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { CalenderIcon } from "../../../components/icons/calender-icon";
import { BoardIcon } from "../../../components/icons/board-icon";
import { useAuth0 } from "@auth0/auth0-react";

const NavigationItems = [
    { name: 'Kalender', href: '/calender', icon: CalenderIcon },
    { name: 'Board', href: '/board', icon: BoardIcon },
    { name: 'Deployments', href: '/deployments', icon: BoardIcon },
    { name: 'Logs', href: '/logs', icon: BoardIcon },
    { name: 'Tidshantering', href: '/clock', icon: BoardIcon },

]

export const Navigation = () => {
    const pathname = usePathname();
    const params = useParams();

    const { user } = useAuth0();
    
    return (
        <div className="flex justify-between h-24 border-b w-full">
            <div className="flex gap-x-4 px-4 justify-between items-center">
                <div className="flex h-full">
                    {NavigationItems.map((item, index) => {
                        const pathnames = pathname.split('/')
                        const isActive = '/' + pathnames[pathnames.length - 1] === item.href;

                        return (
                            <Link key={item.name} href={`/projects/${params.projectId}/${item.href}`} className={cn(
                                "flex items-center px-4 gap-2 cursor-pointer transition-all",
                                isActive && 'border-b-2 border-[#306BFF]'
                            )}>
                                <item.icon fill={isActive ? '#306BFF' : undefined}/>
                                <h1 className={cn(
                                    'text-gray-400',
                                    isActive && 'text-[#306BFF] font-semibold'
                                )}>
                                    {item.name}
                                </h1>
                            </Link>
                        )
                    })}
                </div>
                <div className="h-12 w-12 rounded-full" style={{ backgroundImage: user?.picture || 'hej' }}>H</div>
            </div>
            <div>

            </div>
        </div>
    )
}
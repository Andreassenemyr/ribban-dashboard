'use client';

import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalenderIcon } from "./icons/calender-icon";
import { BoardIcon } from "./icons/board-icon";

const NavigationItems = [
    { name: 'Kalender', href: '/calender', icon: CalenderIcon },
    { name: 'Board', href: '/', icon: BoardIcon },
    { name: 'Deployments', href: '/deployments', icon: BoardIcon },
    { name: 'Logs', href: '/logs', icon: BoardIcon },
    { name: 'Tidshantering', href: '/clock', icon: BoardIcon },

]

export const Navigation = () => {
    const pathname = usePathname();

    return (
        <div className="flex justify-between h-24 border-b w-full">
            <div className="flex gap-x-4 px-4">
                {NavigationItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link key={item.name} href={item.href} className={cn(
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
            <div>

            </div>
        </div>
    )
}
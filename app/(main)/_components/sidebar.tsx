import { ProjectList } from "@/app/(main)/_components/project-list";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavigationLinks = [
    { name: 'Hem', href: '/home', icon: '/home-2.svg' },
    { name: 'Mina Projekt', href: '/projects', icon: '/tick-square.svg' },
    { name: 'Mål', href: '/goals', icon: '/cup.svg' },
    { name: 'Användare', href: '/users', icon: '/profile-2user.svg' },
];

export const Sidebar = () => {
    const router = useRouter();
    const create = useMutation(api.projects.create);

    const onCreate = () => {
        const promise = create({ title: "Untitled" })
          .then((documentId) => router.push(`/projects/${documentId}`))
    };
    

    return (
        <div className="bg-white w-[350px] border-r flex flex-col">
            <div className="flex border-b items-center h-24 px-6 gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13ZM3.80036 13C3.80036 18.0808 7.91918 22.1996 13 22.1996C18.0808 22.1996 22.1996 18.0808 22.1996 13C22.1996 7.91918 18.0808 3.80036 13 3.80036C7.91918 3.80036 3.80036 7.91918 3.80036 13Z" fill="#306BFF"/>
                    <path d="M19.3064 12.4053C19.8442 12.3546 20.3282 12.7508 20.3067 13.2906C20.2793 13.9795 20.1546 14.6627 19.9348 15.3196C19.6114 16.2866 19.0893 17.1753 18.4021 17.9285C17.7148 18.6818 16.8777 19.283 15.9443 19.6935C15.011 20.1041 14.0021 20.3149 12.9825 20.3125C11.9628 20.31 10.9549 20.0944 10.0236 19.6793C9.09221 19.2643 8.25794 18.6591 7.57433 17.9025C6.89073 17.146 6.3729 16.2548 6.0541 15.2863C5.83752 14.6283 5.71605 13.9445 5.69196 13.2555C5.67309 12.7156 6.15896 12.3218 6.69654 12.3751C7.23411 12.4284 7.61735 12.91 7.66257 13.4483C7.69751 13.8644 7.78107 14.276 7.9123 14.6747C8.14581 15.3841 8.52511 16.0368 9.02583 16.591C9.52656 17.1451 10.1376 17.5885 10.8198 17.8925C11.502 18.1965 12.2403 18.3544 12.9871 18.3562C13.734 18.358 14.473 18.2036 15.1567 17.9029C15.8403 17.6021 16.4535 17.1618 16.9569 16.61C17.4603 16.0583 17.8427 15.4073 18.0796 14.699C18.2127 14.301 18.2983 13.8898 18.3352 13.4739C18.383 12.9359 18.7686 12.4561 19.3064 12.4053Z" fill="#BB80FF"/>
                </svg>
                <h1 className="text-slate-800 font-bold text-2xl translate-y-[1px]">Ribban</h1>
            </div>
            <div className="flex flex-col gap-y-6 px-6 py-8 border-b">
                {NavigationLinks.map((link, index) => {
                    

                    return (
                        <Link key={index} href={link.href} className="flex items-center text-gray-400 gap-x-3 font-normal cursor-pointer">
                            <Image
                                alt={link.name}
                                src={link.icon}
                                width={20}
                                height={20}
                            />
                            <h1 className='text-lg'>{link.name}</h1>
                        </Link>
                    )
                })}
            </div>
            <div className="flex flex-col flex-grow justify-between px-6 py-8">
                <div>
                    <div className="flex justify-between">
                        <h1 className="text-sm tracking-wider uppercase font-semibold text-gray-400">Workspace</h1>
                        <Image
                            alt='Skapa Projekt'
                            src='/plus.svg'
                            className='cursor-pointer'
                            width={20}
                            height={20}
                            onClick={() => onCreate()}
                        />
                    </div>
                    <ProjectList/>
                </div>
                <h1 className="text-slate-700">Test</h1>
            </div>
        </div>
    );
};

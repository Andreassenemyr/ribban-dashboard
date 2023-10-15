import Link from "next/link";

interface BreadcrumbProps {
    positions: { name: string, href: string}[];
};

export const Breadcrumb = ({
    positions
}: BreadcrumbProps) => {
    return (
        <div className='flex'>
            {positions.map((item, index) => (
                <Link key={index} href={item.href} className="text-gray-400 text-sm cursor-pointer">
                    {item.name}<span className="px-3">{index != positions.length -1 ? '/' : ''}</span>
                </Link>
            ))}
        </div>
    )
}
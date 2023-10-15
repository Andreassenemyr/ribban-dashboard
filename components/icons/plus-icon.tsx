type PlusIconProps = {
    fill?: string;
    classname?: string;
}

export const PlusIcon = ({
    fill = '#94A3B8',
    classname
}: PlusIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8.00002 5.55155V10.4358" stroke={fill} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <path d="M10.4445 7.99365H5.55557" stroke={fill} strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clipRule="evenodd" d="M11.1238 1.33334H4.8762C2.69842 1.33334 1.33334 2.87473 1.33334 5.05677V10.9432C1.33334 13.1253 2.69207 14.6667 4.8762 14.6667H11.1238C13.3079 14.6667 14.6667 13.1253 14.6667 10.9432V5.05677C14.6667 2.87473 13.3079 1.33334 11.1238 1.33334Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
        </svg>
    )
}
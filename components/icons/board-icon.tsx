type BoardIconProps = {
    fill?: string;
    classname?: string;
}

export const BoardIcon = ({
    fill = '#94A3B8',
    classname
}: BoardIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7.875 14.925V3.075C7.875 1.95 7.395 1.5 6.2025 1.5H3.1725C1.98 1.5 1.5 1.95 1.5 3.075V14.925C1.5 16.05 1.98 16.5 3.1725 16.5H6.2025C7.395 16.5 7.875 16.05 7.875 14.925Z" fill={fill}/>
            <path d="M16.5 9.675V3.075C16.5 1.95 16.02 1.5 14.8275 1.5H11.7975C10.605 1.5 10.125 1.95 10.125 3.075V9.675C10.125 10.8 10.605 11.25 11.7975 11.25H14.8275C16.02 11.25 16.5 10.8 16.5 9.675Z" fill={fill}/>
        </svg>
    )
}
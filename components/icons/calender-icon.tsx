type CalenderIconProps = {
    fill?: string;
    classname?: string;
}

export const CalenderIcon = ({
    fill = '#94A3B8',
    classname
}: CalenderIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6.66667 1.66666V4.16666" stroke={fill} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3333 1.66666V4.16666" stroke={fill} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.91667 7.57501H17.0833" stroke={fill} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 7.08332V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V7.08332C2.5 4.58332 3.75 2.91666 6.66667 2.91666H13.3333C16.25 2.91666 17.5 4.58332 17.5 7.08332Z" stroke={fill} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.0789 11.4167H13.0864" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.0789 13.9167H13.0864" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.99624 11.4167H10.0037" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.99624 13.9167H10.0037" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.91192 11.4167H6.91941" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.91192 13.9167H6.91941" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
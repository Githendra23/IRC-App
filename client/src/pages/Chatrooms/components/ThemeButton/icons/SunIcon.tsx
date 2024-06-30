import React from "react";

interface IconProps {
    className?: string;
    color?: string;
}

const SunIcon: React.FC<IconProps> = ({className, color="#FFFFFF"}) => {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5"></circle>
                <path d="M12 2V3" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path>
                <path d="M12 21V22" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path>
                <path d="M22 12L21 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path>
                <path d="M3 12L2 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path>
                <path d="M19.0708 4.92969L18.678 5.32252" stroke={color} strokeWidth="1.5"
                      strokeLinecap="round"></path>
                <path d="M5.32178 18.6777L4.92894 19.0706" stroke={color} strokeWidth="1.5"
                      strokeLinecap="round"></path>
                <path d="M19.0708 19.0703L18.678 18.6775" stroke={color} strokeWidth="1.5"
                      strokeLinecap="round"></path>
                <path d="M5.32178 5.32227L4.92894 4.92943" stroke={color} strokeWidth="1.5"
                      strokeLinecap="round"></path>
            </g>
        </svg>
    );
}

export default SunIcon;
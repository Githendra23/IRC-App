import React from "react";

interface IconProps {
    className?: string;
    color?: string;
}

const FriendIcons: React.FC<IconProps> = ({className, color="#FFFFFF"}) => {
    return (
        <svg fill="#000000" className={className} viewBox="0 0 24 24" id="user-4" data-name="Line Color" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path id="secondary" d="M9,13h6a5,5,0,0,1,5,5v0a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3v0a5,5,0,0,1,5-5Z"
                      fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <circle id="primary" cx="12" cy="8" r="5"
                        fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
            </g>
        </svg>
    );
}

export default FriendIcons;
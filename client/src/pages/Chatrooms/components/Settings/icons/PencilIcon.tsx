import React from "react";

interface Props {
    className?: string;
}

const PencilIcons: React.FC<Props> = ({className}) => {
    return (
        <svg className={`${className} fill-[#495057] dark:fill-[#e1e9f1]`} viewBox="0 0 24 24" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"><title>Edit</title>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Edit">
                        <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24"
                              height="24"></rect>
                        <line className="stroke-[#495057] dark:stroke-[#e1e9f1]" x1="20" y1="20" x2="4" y2="20"
                              id="Path"
                              strokeWidth="2" strokeLinecap="round"></line>
                        <path className="stroke-[#495057] dark:stroke-[#e1e9f1]"
                              d="M14.5858,4.41421 C15.3668,3.63316 16.6332,3.63316 17.4142,4.41421 L17.4142,4.41421 C18.1953,5.19526 18.1953,6.46159 17.4142,7.24264 L9.13096,15.5259 L6.10051,15.7279 L6.30254,12.6975 L14.5858,4.41421 Z"
                              id="Path" strokeWidth="2"
                              strokeLinecap="round"></path>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default PencilIcons;
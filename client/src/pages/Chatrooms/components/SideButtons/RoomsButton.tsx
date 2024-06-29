import React from "react";
import ChatIcon from "../../icons/ChatIcon.tsx";

interface Props {
    className?: string;
    color?: string;
}

const RoomsButton: React.FC<Props> = ({className, color}) => {
    return (
        <button className={className}>
            <ChatIcon className="h-auto w-6" color={color}/>
        </button>
    );
}

export default RoomsButton;
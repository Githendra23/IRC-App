import React from "react";
import GroupChatIcon from "../../icons/GroupChatIcon.tsx";

interface Props {
    className?: string;
    color?: string;
}

const GroupChatButton: React.FC<Props> = ({className, color}) => {
    return (
        <button className={className}>
            <GroupChatIcon className="h-auto w-6" color={color}/>
        </button>
    );
}

export default GroupChatButton;
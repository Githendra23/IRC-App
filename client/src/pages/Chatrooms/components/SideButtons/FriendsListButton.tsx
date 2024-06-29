import React from "react";
import FriendIcon from "../../icons/FriendIcon.tsx";

interface Props {
    className?: string;
    color?: string;
}

const FriendsListButton: React.FC<Props> = ({className, color}) => {
    return (
        <button className={className}>
            <FriendIcon className="h-auto w-6" color={color}/>
        </button>
    );
}

export default FriendsListButton;
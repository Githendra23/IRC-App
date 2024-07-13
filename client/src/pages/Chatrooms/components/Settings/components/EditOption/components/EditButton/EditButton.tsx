import {PencilIcon} from "./icons";
import React from "react";

interface Props {
    setIsActive: (isActive: boolean) => void;
}

const EditButton: React.FC<Props> = ({setIsActive}) => {
    return (
        <button onClick={() => setIsActive(true)}
                className="flex p-2 h-9 text-sm bg-[#f5f7fb] dark:bg-[#36404a] rounded">
            <PencilIcon className="h-5 mr-1"/>
            Edit
        </button>
    );
}

export default EditButton;
import {PencilIcon} from "./icons";
import React from "react";

interface Props {
    setIsActive: (isActive: boolean) => void;
}

const EditButton: React.FC<Props> = ({setIsActive}) => {
    return (
        <button onClick={() => setIsActive(true)}
                className="absolute w-auto flex right-0 top-0 p-2 text-sm bg-[#f5f7fb] dark:bg-[#36404a] rounded">
            <PencilIcon className="h-5 mr-1"/>
            Edit
        </button>
    );
}

export default EditButton;
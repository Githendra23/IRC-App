import {PencilIcon} from "./icons";
import React, {ReactNode, useState} from "react";

interface Props {
    children: ReactNode;
}

const EditButton: React.FC<Props> = ({children}) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setIsActive(true)}
                className={`${isActive ? "hidden" : "block"} absolute w-auto flex right-0 top-0 p-2 text-sm bg-[#f5f7fb] dark:bg-[#36404a] rounded`}>
                <PencilIcon className="h-5 mr-1"/>
                Edit
            </button>

            {isActive && children}
        </>
    );
}

export default EditButton;
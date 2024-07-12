import React, {useState} from "react";
import EditButton from "./components/EditButton";

interface Props {
    title: string;
    content: string | null;
    className?: string;
}

const EditOption: React.FC<Props> = ({className, title, content}) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <>
            <div className={`${className} ${isActive ? "hidden" : "block"}`}>
                <h4 className="dark:text-[#9aa1b9] text-sm">{title}</h4>
                <p className="text-sm font-semibold text-[#495057] dark:text-[#e1e9f1]">{content}</p>

                <EditButton setIsActive={setIsActive}/>
            </div>

            <div className={`${className} ${isActive ? "block" : "hidden"}`}>

            </div>
        </>
    );
}

export default EditOption;
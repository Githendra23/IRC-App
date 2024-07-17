import React, {useState} from "react";
import EditButton from "./components/EditButton";

interface Props {
    title: string;
    content: string | null;
    className?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditOption: React.FC<Props> = ({className, title, content, onSubmit, value, onChange}) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <>
            {!isActive && <div className={`flex justify-between ${className}`}>
                <div>
                    <h4 className="dark:text-[#9aa1b9] text-sm">{title}</h4>
                    <p className="text-sm font-semibold text-[#495057] dark:text-[#e1e9f1]">{content}</p>
                </div>

                <EditButton setIsActive={setIsActive}/>
            </div>}

            {isActive && <div className={className}>
                <form className="text-sm" onSubmit={onSubmit}>
                    <label className="dark:text-[#9aa1b9]" form="fusername">{title}</label>
                    <div className="flex items-center justify-between">
                        <input
                            className="flex-grow p-2 mr-0.5 rounded duration-200 outline-none border border-[#e6ebf5] bg-[#f9fafc] text-black dark:border-[#303841] dark:bg-[#5e656e] dark:text-[#81a0cf]"
                            type="text"
                            id={`f${title.toLowerCase()}`}
                            name={`f${title.toLowerCase()}`}
                            value={value}
                            onChange={onChange}
                        />
                        <button onClick={() => setIsActive(false)}
                                className="p-2 rounded text-white bg-[#7269ef] hover:bg-[#6159cb] duration-200">
                            Save
                        </button>
                    </div>
                </form>
            </div>}
        </>
    );
}

export default EditOption;
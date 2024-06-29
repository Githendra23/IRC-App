import SettingsIcon from "../../icons/SettingsIcon.tsx";
import React from "react";

interface Props {
    className?: string;
    color?: string;
}

const SettingsButtons: React.FC<Props> = ({className, color}) => {
    return (
        <button className={className}>
            <SettingsIcon className="h-auto w-6" color={color}/>

        </button>
    );
}

export default SettingsButtons;
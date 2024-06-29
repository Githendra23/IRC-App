import React, {ReactNode} from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

const SideBar: React.FC<Props> = ({className, children}) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default SideBar;
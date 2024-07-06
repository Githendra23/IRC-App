import React, {useState} from "react";

interface Props {
    children?: React.ReactNode;
}

const ProfileButton: React.FC<Props> = ({children}) => {
    const username = localStorage.getItem("username");
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <button onClick={() => setIsActive(!isActive)}
                className="relative flex items-center justify-center rounded-full h-8 w-8 bg-red-400">
            {username !== null && username[0].toUpperCase()}

            {<div className={`absolute bottom-0 left-[3.75rem] bg-black py-2 px-3 rounded-md text-white
                transition duration-100 ${isActive ? "scale-100 visible" : "scale-0 invisible"}`}>
                {children}

                <svg className="absolute bottom-3 -left-[0.4rem] -rotate-90 w-3"
                     viewBox="0 0 512 512"
                     xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <title>triangle-filled</title>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="drop" fill="#000000" transform="translate(32.000000, 42.666667)">
                                <path
                                    d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z"
                                    id="Combined-Shape"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>}
        </button>
    );
}

export default ProfileButton;
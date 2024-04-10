import React, { useEffect, useRef, useState } from "react";

type PopupWindowProps = {
  className?: string;
  buttonText: string;
  children: React.ReactNode;
};

const PopupWindow = ({ className, buttonText, children }: PopupWindowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={className} onClick={togglePopup}>
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">{children}</div>
        </div>
      )}
    </>
  );
};

export default PopupWindow;

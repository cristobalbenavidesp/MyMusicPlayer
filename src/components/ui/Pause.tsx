import React from "react";

const Pause = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
    </svg>
  );
};

export default Pause;

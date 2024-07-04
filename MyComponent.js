import React from "react";
import { toast } from "react-toastify";

const MyComponent = () => {
  const showWarning = () => {
    toast.warning("Please enter a valid email");
  };

  return (
    <div>
      <button onClick={showWarning}>Show Warning</button>
    </div>
  );
};

export default MyComponent;

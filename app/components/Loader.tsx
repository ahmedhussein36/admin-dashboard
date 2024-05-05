"use client";

import { PuffLoader, PropagateLoader, BarLoader } from "react-spinners";

const Loader = () => {
    return (
        <div
            className="
      flex 
      flex-col 
      justify-center 
      items-center 
      p-8
      m-8
    "
        >
            <div className="rounded-md flex flex-col justify-center items-center gap-2">
                <span className=" text-blacck text-lg font-medium">loading...</span>
                <div className= "bg-gray-200"> <BarLoader color="rgba(239, 5, 81, 1)" /></div>
            </div>
        </div>
    );
};

export default Loader;

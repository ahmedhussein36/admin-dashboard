"use client";

import { CldUploadWidget } from "next-cloudinary";

declare global {
    var cloudinary: any;
}

const uploadPreset = "remaxroyal";

const UploadBtn = () => {
    return (
        <CldUploadWidget
            uploadPreset={uploadPreset}
            options={{
                maxFiles: 100,
            }}
        >
            {({ open }) => {
                return (
                    <button
                        onClick={() => open?.()}
                        className="bg-rose-500 text-white px-4 py-3 font-medium min-w-[100px] rounded-md hover:bg-rose-600"
                    >
                        Upload Image
                    </button>
                );
            }}
        </CldUploadWidget>
    );
};

export default UploadBtn;

import Image from "next/image";
import React from "react";
import EmptyState from "./EmptyState";

const Maitenance = () => {
    return (
        <div className="max-w-md flex flex-col justify-center items-center m-auto mt-20">
            <Image
                src="/images/ddgg.jpg"
                alt="maintenance"
                width={150}
                height={100}
            />
            <div className="-mt-20">
                <EmptyState
                    title="This page is under maintenance !"
                    subtitle="it Will be ready as soon posible."
                />
            </div>
        </div>
    );
};

export default Maitenance;

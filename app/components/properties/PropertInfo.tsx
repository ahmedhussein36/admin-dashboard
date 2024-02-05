import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { SlLocationPin } from "react-icons/sl";
import { FiShare2 } from "react-icons/fi";
import HeartButton from "./SingleHeartButton ";
import { SafeProperty, SafeUser } from "@/app/types";

interface PropertInfoProps {
    data: SafeProperty;
    currentUser?: SafeUser | null;
    listingId: string;
}

const PropertInfo: React.FC<PropertInfoProps> = ({
    data,
    listingId,
    currentUser,
}) => {
    return (
        <div className=" flex justify-between items-start border-b-2 p-6 w-full">
            <div className="flex flex-col gap-3 justify-between  items-start w-3/4 ">
                <div className="title flex flex-col gap-2 items-start">
                    <h1 className=" text-xl font-bold text-slate-700">
                        {`${data.propertyGroup} ${data.category}  في ${data.ariaValue} ب${data.cityValue}`}
                    </h1>
                    <div className="flex items-center gap-2">
                        <SlLocationPin />

                        <p>
                            {data.ariaValue} / {data.cityValue}
                        </p>
                    </div>
                </div>

                <div className="proFeature bg-slate-0 px-4  py-2 w-[50%] flex justify-between items-center gap-2 rounded-md text-slate-600">
                    <div className="flex justify-start items-center gap-1">
                        <LuBedDouble />
                        <span className=" text-base">
                            {data.roomCount} غرفة
                        </span>
                    </div>
                    <div className="flex justify-start items-center gap-1">
                        <LuBath />
                        <span className=" text-base">
                            {data.bathroomCount} حمام
                        </span>
                    </div>

                    <div className="flex justify-start items-center gap-1">
                        <LiaRulerCombinedSolid />
                        <span className=" text-base">{data.size} متر مربع</span>
                    </div>
                </div>

                <div className="proPrice h-full flex flex-col justify-between gap-1 items-start ">
                    <div className="flex gap-2 items-end">
                        <span className="text-2xl text-slate-600 font-bold">
                            {data.price}
                        </span>
                        <span>{"ج.م"}</span>
                    </div>
                </div>
            </div>
            <div className=" flex justify-end items-center w-1/4">
                <div className="flex justify-between items-center gap-6">
                    <HeartButton
                        listingId={listingId}
                        currentUser={currentUser}
                    />
                    <FiShare2 size={28} color={""} />
                </div>
            </div>
        </div>
    );
};

export default PropertInfo;

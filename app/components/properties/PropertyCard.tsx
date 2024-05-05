import Image from "next/image";
import { SafeProperty, SafeUser } from "@/app/types";
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { SlLocationPin } from "react-icons/sl";
import HeartButton from "../HeartButton";
import PropretyContacts from "./PropretyContacts";
import Link from "next/link";

interface PropertyCardProps {
    data: any;
    currentUser?: SafeUser | null;
    parent?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    data,
    currentUser,
    parent,
}) => {
    const formatNumber = (number: number): string => {
        if (number >= 1000) {
            return number.toLocaleString();
        } else {
            return number.toString();
        }
    };

    const formattedMinPrice = formatNumber(data.price);

    const location = `${data.compound} / ${data.area}`;
    return (
        <Link href={`/${parent}/${data.id}`}>
            <div className="col-span-1 group relative mb-4 flex justify-center item-center overflow-hidden cursor-pointer">
                <div
                    className="
                    cardContent relative 
                    flex flex-col justify-between items-center 
                    max-w-[400px]  bg-white 
                    rounded-lg border overflow-hidden
                "
                >
                    <div
                        className="
                        absolute
                        top-3
                        right-3
                        z-[1]
                    "
                    >
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                    <div className="relative proImage w-[400px] h-[220px] overflow-hidden flex justify-center items-center">
                        <Image
                            className="group-hover:scale-105 duration-300 transition-all "
                            src={data.imageSrc}
                            alt="listing thumbnail image"
                            fill
                            sizes={"100%"}
                            loading="lazy"
                        ></Image>
                    </div>
                    <div className="propInfo w-full p-4 flex flex-col justify-between items-start gap-2">
                        <div className="proTitle w-full flex flex-col justify-between items-start gap-2">
                            <div className="w-full flex justify-between items-center">
                                <div className="flex justify-center items-center text-slate-600 text-md font-bold">
                                    <h3>{data.title}</h3>
                                </div>
                            </div>

                            <div className="propLocation flex justify-center gap-2 items-center text-xs text-slate-500">
                                <SlLocationPin size={18} color="#718096" />
                                <p>{location}</p>
                            </div>
                        </div>
                        <div className="proFeature w-full flex justify-start items-center gap-2 text-xs text-slate-500">
                            <div className="flex justify-start items-center gap-1">
                                <LuBedDouble size={18} color="#718096" />
                                <span>{data.roomCount} غرفة</span>
                            </div>
                            <div className="flex justify-start items-center gap-1">
                                <LuBath size={18} color="#718096" />
                                <span>{data.bathroomCount} حمام</span>
                            </div>

                            <div className="flex justify-start items-center gap-1">
                                <LiaRulerCombinedSolid
                                    size={18}
                                    color="#718096"
                                />
                                <span>
                                    {data.size} {data.sizeUnit}
                                </span>
                            </div>
                        </div>
                        <div className="proPrice h-full flex justify-between gap-4 items-end">
                            <div className="flex gap-2 items-center justify-start">
                                <span className=" text-xl text-slate-600 font-bold">
                                    {formattedMinPrice}
                                </span>
                                <span className="text-xs">{"ج.م"}</span>
                            </div>
                            {data.installmentValue !== 0 && (
                                <div className=" flex gap-2 text-sm text-slate-500">
                                    <span> {data.installmentValue}</span>
                                    <span>/ شهريا</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="Contact w-full px-4  pb-4 flex justify-start items-center">
                        <PropretyContacts
                            phone={data.phone}
                            whatsApp={data.whatsapp}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;

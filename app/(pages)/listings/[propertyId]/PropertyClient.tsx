"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CategoryInput from "@/app/components/customInputs/CategoryInput";

import {
    categories,
    paymentPlans,
    groups,
    saleTypes,
    amenitiesItems,
    rentTypes,
    allTypes,
} from "@/app/components/data/data";
import RTE from "@/app/components/postForm/RTE";
import {
    SafeProperty,
    SafeUser,
    lightArea,
    lightCompond,
    lightDeveloper,
} from "@/app/types";
import Select from "react-select";

import { FC, useState } from "react";
import { Label, Radio, Spinner } from "flowbite-react";
import Container from "@/app/components/Container";
import Input from "@/app/components/customInputs/Input";
import ImageUpload from "@/app/components/customInputs/ImageUpload";
import CitySelect from "@/app/components/customInputs/CitySelect";
import Counter from "@/app/components/customInputs/Counter";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import useRandomNumber from "@/app/hooks/useRandomNumber";

interface PropertyClientProps {
    listing: SafeProperty & {
        compound: lightCompond;
        area: lightArea;
        developer: lightDeveloper;
    };
    currentUser?: SafeUser | null;
    compounds: lightCompond[];
    areas: lightArea[];
    developers: lightDeveloper[];
}
const PropertyClient: FC<PropertyClientProps> = ({
    listing,
    compounds,
    areas,
    developers,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isInstallment, setIsInstallment] = useState(false);
    const [isDeveloper, setIsDeveloper] = useState(true);
    const [allPropertyImages, setAllPropertyImages] = useState<string[]>(
        listing.images
    );
    const [allAmenities, setAmenities] = useState<string[]>([]);

    const randomNumber = useRandomNumber();

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            title: listing?.title,
            slug: listing.slug,
            description: listing?.description,
            content: listing?.content,
            images: listing?.images || [],
            mainImage: listing?.mainImage,
            category: listing?.category,
            roomCount: listing?.roomCount,
            bathroomCount: listing?.bathroomCount,
            propertyType: listing?.propertyType,
            group: listing?.group,
            saleType: listing?.saleType,
            amenities: [],
            status: listing.status,
            isFeatured: listing.isFeatured,
            isAddHome: listing.isAddHome,
            isRecommended: listing.isRecommended,
            isFooterMenu: listing.isFooterMenu,
            finishing: listing.finishing,
            deliveryStatus: listing.deliveryStatus,
            furniture: listing.furniture,
            paymentPlan: listing.paymentPlan,
            rentalPlan: listing.rentalPlan,
            rentValue: listing.rentValue,
            RentalPeriod: listing.RentalPeriod,
            rentAvailableDate: listing.rentAvailableDate,
            downPayment: listing.downPayment,
            installmentValue: listing.installmentValue,
            installmentPeriod: listing.installmentPeriod,
            developerName: listing.developerName,
            commissionValue: listing.commissionValue,
            deliveryDate: listing.deliveryDate,
            country: "مصر",
            city: listing?.city,
            phone: listing.phone,
            whatsapp: listing.whatsapp,
            price: listing.price,
            currency: listing.currency,
            size: listing.size,
            sizeUnit: listing.sizeUnit,
            compound: listing.compound,
            developer: listing.developer || null,
            area: listing.area,
            metaTitle: listing?.seoDetails?.metaTitle,
            metaDescription: listing?.seoDetails?.metaDescription,
        },
    });

    const city = watch("city");
    const area = watch("area");
    const compound = watch("compound");
    const developer = watch("developer");
    const category = watch("category");
    const paymentPlan = watch("paymentPlan");
    const rentalPlan = watch("rentalPlan");
    const saleType = watch("saleType");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const mainImage = watch("mainImage");
    const images = watch("images");
    const price = watch("price");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        const item = amenitiesItems.find((item) => item.id === id);

        if (item) {
            if (checked) {
                setAmenities((prev) => [...prev, item.name]);
            } else {
                setAmenities((prev) =>
                    prev.filter((name) => name !== item.name)
                );
            }
            setCustomValue("amenities", allAmenities);
        }
    };

    // const slugGeneration = (title: string) => {
    //     const formatedSlug = title
    //         .toLowerCase()
    //         .replace(/\|+/g, "")
    //         .replace(/\%+/g, "")
    //         .replace(/\s+/g, "-")
    //         .toString();

    //     const slug = `${randomNumber}-${formatedSlug}`;

    //     return slug;
    // };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        // const generatedSlug = slugGeneration(data.title);
        // data.slug = generatedSlug;

        axios
            .put(`/api/properties/${listing.id}`, data)
            .then(() => {
                router.refresh();

                toast.success("Done : Item updated successfuly!", {
                    position: "bottom-right",
                });
            })
            .catch(() => {
                toast.error("Error :can't update Item ", {
                    position: "bottom-right",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    {
        /*inner components */
    }

    const Category = () => {
        return (
            <div
                className=" bg-white m-6 rounded-lg border w-full flex flex-col 
            justify-start items-start gap-2 p-6"
            >
                <h3 className=" font-semibold text-lg">Category: </h3>
                {categories.map((item) => (
                    <div
                        key={item.id}
                        className=" flex justify-start items-center text-slate-500 gap-2 text-lg font-medium"
                    >
                        <input
                            value={item.name}
                            className=" rounded-md focus:ring-0 transition-all"
                            type="radio"
                            id={item.name}
                            {...register("category")}
                        />
                        <label htmlFor={item.name}>{item.name}</label>
                    </div>
                ))}
            </div>
        );
    };

    const Groups = () => {
        return (
            <div
                className=" bg-white m-6 rounded-lg border w-full flex flex-col justify-start 
            items-start gap-2 p-6"
            >
                <h3 className=" font-semibold text-lg">Group: </h3>
                {groups.map((item) => (
                    <div
                        key={item.id}
                        className=" flex justify-start items-center gap-2 text-slate-500 text-lg font-medium"
                    >
                        <input
                            className=" rounded-md focus:ring-0 transition-all"
                            type="radio"
                            value={item.value}
                            id={item.value}
                            {...register("group")}
                        />
                        <label htmlFor={item.value}>{item.value}</label>
                    </div>
                ))}
            </div>
        );
    };

    const Types = () => {
        return (
            <div className=" bg-white m-6 p-6 rounded-lg border w-full">
                <h3 className="font-semibold my-3 text-lg">Property type:</h3>
                <div
                    className="w-full flex flex-wrap justify-start 
            items-start gap-2 "
                >
                    {allTypes.map((item) => (
                        <div
                            key={item.name}
                            className="w-[48%] flex justify-start items-center gap-2 text-slate-500 text-lg font-medium"
                        >
                            <input
                                value={item.name}
                                className=" rounded-md focus:ring-0 transition-all"
                                type="radio"
                                id={item.id}
                                {...register("propertyType")}
                            />
                            <label htmlFor={item.id}>{item.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const ImageSection = () => {
        return (
            <div className=" w-full mt-4 mx-4 flex justify-start flex-col items-center gap-3">
                <div className=" w-full">
                    <h3 className="my-2">Cover:</h3>
                    <ImageUpload
                        label="Upload thumbnail Image"
                        thumbnail={true}
                        onAction={() => {
                            setCustomValue("mainImage", "");
                        }}
                        onChange={(value) => {
                            setCustomValue("mainImage", value);
                        }}
                        value={mainImage}
                        image={mainImage}
                    />
                </div>
                <div className=" w-full">
                    <h3 className="my-2">Other Images:</h3>
                    <ImageUpload
                        label="Upload compound Images"
                        thumbnail={false}
                        onAction={(value) => {
                            setCustomValue("images", value);
                            setAllPropertyImages(
                                allPropertyImages.filter(
                                    (image) => image !== value
                                )
                            );
                        }}
                        onChange={(value) => {
                            setCustomValue("images", value);
                            setAllPropertyImages([...allPropertyImages, value]);
                        }}
                        value={images}
                        allImages={allPropertyImages}
                    />
                </div>
            </div>
        );
    };

    const SalePayment = () => {
        return (
            <div className=" flex flex-col gap-4 justify-center">
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  max-h-full ">
                    {paymentPlans.map((item) => (
                        <div key={item.name} className="col-span-1">
                            <CategoryInput
                                onClick={(paymentPlan) => {
                                    setCustomValue("paymentPlan", paymentPlan);
                                    if (item.id === "2") setIsInstallment(true);
                                    else if (item.id === "1") {
                                        setIsInstallment(false);
                                    }
                                }}
                                selected={paymentPlan === item.name}
                                label={item.name}
                            />
                        </div>
                    ))}
                </div>

                {isInstallment ? (
                    <div className="flex flex-col gap-2">
                        <div>
                            <Input
                                id="downPayment"
                                label="قيمة المقدم"
                                customFormat
                                unit="%"
                                disabled={isLoading}
                                register={register}
                                required={isInstallment}
                                type="number"
                                min={0}
                                max={price}
                                message={
                                    " لايكمن ان تكون قيمة المقدم اكبر من السعر الكلي او قيمة تساوي صفر"
                                }
                                errors={errors}
                            />
                        </div>
                        <div className="flex gap-2 w-full">
                            <Input
                                id="installmentValue"
                                label="قيمة القسط (جنيه)"
                                min={0}
                                max={price}
                                customFormat
                                unit="ج.م"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required={isInstallment}
                                type="number"
                                message={
                                    " لايكمن ان تكون قيمة القسط اكبر من السعر الكلي او قيمة تساوي صفر"
                                }
                            />
                            <Input
                                id="installmentPeriod"
                                label=" المدة (سنوات) "
                                min={1}
                                disabled={isLoading}
                                customFormat
                                unit="سنة"
                                register={register}
                                errors={errors}
                                required={isInstallment}
                                type="number"
                                message={" لايكمن ان تكون مدة القسط تساوي صفر"}
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div
                    className="
                            grid 
                            grid-cols-1 
                            md:grid-cols-2 
                            gap-4
                            max-h-full
            "
                >
                    {saleTypes.map((item) => (
                        <div key={item.name} className="col-span-1">
                            <CategoryInput
                                onClick={(saleType) => {
                                    setCustomValue("saleType", saleType);
                                    if (item.id === "1") setIsDeveloper(true);
                                    else if (item.id !== "1") {
                                        setIsDeveloper(false);
                                    }
                                }}
                                selected={saleType === item.name}
                                label={item.name}
                            />
                        </div>
                    ))}
                </div>

                {isDeveloper ? (
                    <Input
                        id="developerName"
                        label="اسم المطور"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required={isDeveloper}
                        message="مطلوب"
                    />
                ) : (
                    <Input
                        id="commissionValue"
                        label="عمولة الشركة (اختياري*)"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        type="number"
                        customFormat
                        unit="%"
                    />
                )}
            </div>
        );
    };

    const RentPayment = () => {
        return (
            <div className=" flex flex-col gap-4 justify-center">
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  max-h-full ">
                    {rentTypes.map((item) => (
                        <div key={item.id} className="col-span-1">
                            <CategoryInput
                                onClick={(rentalPlan) => {
                                    setCustomValue("rentalPlan", rentalPlan);
                                }}
                                selected={rentalPlan === item.name}
                                label={item.name}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <div>
                        <Input
                            id="rentAvailableDate"
                            label="العقار متاح للإيجار من :"
                            disabled={isLoading}
                            register={register}
                            type="date"
                            errors={errors}
                        />
                    </div>
                    <div className="flex gap-2 w-full">
                        <Input
                            id="rentValue"
                            label="قيمة الإيجار / شهر"
                            min={0}
                            max={price}
                            customFormat
                            unit="ج.م"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            type="number"
                            message={
                                " لايكمن ان تكون قيمة القسط اكبر من السعر الكلي او قيمة تساوي صفر"
                            }
                        />
                        <Input
                            id="RentalPeriod"
                            label=" مدة الإيجار"
                            min={1}
                            disabled={isLoading}
                            customFormat
                            unit="شهر"
                            register={register}
                            errors={errors}
                            type="number"
                            message={" لايكمن ان تكون مدة القسط تساوي صفر"}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const BodyContent = () => {
        return (
            <>
                <div className="flex flex-col gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <Input
                            id="title"
                            label="Title"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="slug"
                            label="Slug"
                            register={register}
                            errors={errors}
                            disabled
                        />

                        <div className="flex gap-2 w-full z-10 my-6">
                            <div className=" w-1/2">
                                <Select
                                    value={area}
                                    onChange={(value: any) => {
                                        setCustomValue("area", value);
                                    }}
                                    isClearable
                                    isSearchable={false}
                                    options={areas}
                                    name={area}
                                    placeholder="Select area"
                                    formatOptionLabel={(area) => (
                                        <div>{area.title}</div>
                                    )}
                                />
                            </div>
                            <div className=" w-1/2">
                                <Select
                                    value={compound}
                                    onChange={(value: any) => {
                                        setCustomValue("compound", value);
                                    }}
                                    isClearable
                                    isSearchable={false}
                                    options={compounds}
                                    placeholder="Select compound"
                                    formatOptionLabel={(compound) => (
                                        <div>{compound.title}</div>
                                    )}
                                />
                            </div>
                            <div className=" w-1/2">
                                <Select
                                    value={developer}
                                    onChange={(value: any) => {
                                        setCustomValue("developer", value);
                                    }}
                                    isClearable
                                    isSearchable={false}
                                    options={developers}
                                    placeholder="Select developer"
                                    formatOptionLabel={(developer) => (
                                        <div>{developer.title}</div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <Counter
                        onChange={(value) => setCustomValue("roomCount", value)}
                        value={roomCount}
                        title="عدد الغرف"
                        subtitle=""
                    />
                    <Counter
                        onChange={(value) =>
                            setCustomValue("bathroomCount", value)
                        }
                        value={bathroomCount}
                        title="عدد الحمامات"
                        subtitle=""
                    />

                    <Input
                        id="size"
                        label="المساحة"
                        customFormat
                        unit="sqm"
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        message="من فضلك أدخل قيمة صالحة"
                        min={1}
                    />
                    <Input
                        id="deliveryDate"
                        label="تاريخ التسليم :"
                        disabled={isLoading}
                        register={register}
                        type="date"
                        errors={errors}
                    />

                    <Input
                        id="price"
                        label="السعر الكلي"
                        customFormat
                        unit="ج.م"
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        message="من فضلك أدخل قيمة صالحة"
                        min={1}
                    />

                    {category === "للبيع" && <SalePayment />}

                    {category === "للإيجار" && <RentPayment />}

                    <Input
                        id="phone"
                        label="رقم الهاتف"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        type="tel"
                        message="مطلوب"
                        customFormat
                        unit="+20"
                    />

                    <Input
                        id="whatsapp"
                        label="رقم الواتساب"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        type="tel"
                        message="مطلوب"
                        customFormat
                        unit="+20"
                    />

                    <div className=" flex justify-between items-end gap-4">
                        <div className="w-1/2">
                            <Input
                                id="country"
                                label="الدولة"
                                placeholder="مصر"
                                disabled={true}
                                register={register}
                                errors={errors}
                            />
                        </div>

                        <div className="w-1/2">
                            <CitySelect
                                label="اختر المدينة"
                                value={city}
                                onChange={(value) =>
                                    setCustomValue("city", value)
                                }
                            />
                        </div>
                    </div>

                    <div className=" px-6 bg-white p-3 ml-2 flex gap-6 justify-between items-start rounded-md border">
                        <div className="w-full flex flex-col gap-4 justify-between items-start">
                            <strong>Options: </strong>
                            <div className=" flex gap-2 justify-start items-center">
                                <input
                                    id="home"
                                    {...register("isAddHome")}
                                    type="checkbox"
                                    className=" focus:ring-0 transition-all rounded"
                                />
                                <label htmlFor="home">Add to home</label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <input
                                    id="featured"
                                    {...register("isFeatured")}
                                    type="checkbox"
                                    className=" focus:ring-0 transition-all rounded"
                                />
                                <label htmlFor="featured">Featured</label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <input
                                    id="recommended"
                                    {...register("isRecommended")}
                                    type="checkbox"
                                    className=" focus:ring-0 transition-all rounded"
                                />
                                <label htmlFor="recommended">Recommended</label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <input
                                    id="footer"
                                    type="checkbox"
                                    {...register("isFooterMenu")}
                                    className=" focus:ring-0 transition-all rounded"
                                />
                                <label htmlFor="footer">Footer menu</label>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-4  justify-start items-start">
                            <strong>Status: </strong>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("status")}
                                    id="active"
                                    value="active"
                                    className=" focus:ring-0 transition-all border-green-400 text-green-400"
                                />
                                <Label htmlFor="active">Active</Label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("status")}
                                    value={"pending"}
                                    id="pending"
                                    className=" focus:ring-0 transition-all  border-orange-200 text-orange-300"
                                />
                                <Label htmlFor="pending">Pending</Label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("status")}
                                    value={"inactive"}
                                    id="inactive"
                                    className=" focus:ring-0 transition-all  border-red-400 text-red-600"
                                />
                                <Label htmlFor="inactive">Inactive</Label>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-4  justify-start items-start">
                            <strong>Launch: </strong>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("isLaunch")}
                                    id="launched"
                                    value="Launched"
                                    className=" focus:ring-0 transition-all"
                                />
                                <Label htmlFor="active">Launched</Label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("isLaunch")}
                                    value={"Not Launched"}
                                    id="notLaunched"
                                    className=" focus:ring-0 transition-all "
                                />
                                <Label htmlFor="pending">Not Launched</Label>
                            </div>
                        </div>
                    </div>

                    <div className=" px-6 bg-white p-3 ml-2 flex gap-6 justify-between items-start rounded-md border">
                        <div className="w-full flex flex-col gap-4  justify-start items-start">
                            <strong>Finishing: </strong>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("finishing")}
                                    id="full"
                                    value="تشطيب كامل"
                                    className=" focus:ring-0 transition-all"
                                />
                                <Label htmlFor="full">تشطيب كامل</Label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("finishing")}
                                    value={"نصف تشطيب"}
                                    id="half"
                                    className=" focus:ring-0 transition-all "
                                />
                                <Label htmlFor="half">نصف تشطيب</Label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("finishing")}
                                    value={"بدون تشطيب"}
                                    id="none"
                                    className=" focus:ring-0 transition-all "
                                />
                                <Label htmlFor="none">بدون تشطيب</Label>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-4  justify-start items-start">
                            <strong>Delivery Status: </strong>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("deliveryStatus")}
                                    id="ready"
                                    value="جاهز للتسليم"
                                    className=" focus:ring-0 transition-all"
                                />
                                <Label htmlFor="ready">جاهز للتسليم</Label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("deliveryStatus")}
                                    value={"تحت الإنشاء"}
                                    id="under"
                                    className=" focus:ring-0 transition-all "
                                />
                                <Label htmlFor="under">تحت الإنشاء</Label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("deliveryStatus")}
                                    value={"ليس بعد"}
                                    id="not"
                                    className=" focus:ring-0 transition-all "
                                />
                                <Label htmlFor="not">ليس بعد</Label>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-4  justify-start items-start">
                            <strong>furniture: </strong>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("furniture")}
                                    id="furnitured"
                                    value="مفروش"
                                    className=" focus:ring-0 transition-all"
                                />
                                <Label htmlFor="furnitured">مفروش</Label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("furniture")}
                                    id="half-furnitured"
                                    value="مفروش جزئي"
                                    className=" focus:ring-0 transition-all"
                                />
                                <Label htmlFor="half-furnitured">
                                    مفروش جزئي
                                </Label>
                            </div>
                            <div className=" flex gap-2 justify-start items-center">
                                <Radio
                                    {...register("furniture")}
                                    value={"غير مفروش"}
                                    id="notfurnitured"
                                    className=" focus:ring-0 transition-all "
                                />
                                <Label htmlFor="notfurnitured">غير مفروش</Label>
                            </div>
                        </div>
                    </div>

                    <strong>Amenities: </strong>
                    <div className="w-full flex gap-5 justify-between items-start flex-wrap bg-white py-8 p-4 rounded-lg">
                        {amenitiesItems.map((item) => (
                            <div
                                key={item.id}
                                className="w-[30%] flex gap-2 justify-start items-center"
                            >
                                <input
                                    value={item.name}
                                    id={item.id}
                                    // {...register("amenities")}
                                    type="checkbox"
                                    className=" focus:ring-0 transition-all rounded"
                                    onChange={handleCheck}
                                />
                                <label htmlFor={item.id}>{item.name}</label>
                            </div>
                        ))}
                    </div>

                    <div className="z-0">
                        <RTE
                            label="Content: "
                            name="content"
                            control={control}
                            defaultValue={getValues("content")}
                        />
                    </div>

                    <hr />
                    <div
                        className="w-full md:w-full lg:w-full xl:max-w-[1050px]
         flex flex-col justify-start items-start gap-3 mb-8"
                    >
                        <h3 className=" font-semibold text-lg">SEO Details</h3>
                        <Input
                            id="metaTitle"
                            label="Meta title"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <Input
                            id="metaDescription"
                            label="Meta description"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </>
        );
    };
    {
        /* end inner components */
    }

    return (
        <Container>
            <div className=" mt-4 flex justify-center items-center">
                <div className="w-3/5">
                    <Heading title="Update Listing" />
                </div>
                <div
                    className="
                            flex
                            w-1/5
                            flex-row-reverse
                            justify-between
                            items-center z-10
                            gap-3
                            sticky bottom-0 bg-slate-50 py-4
                        "
                >
                    <Button
                        disabled={isLoading}
                        label={"Cancel"}
                        onClick={() => router.back()}
                        outline
                    />

                    <Button
                        disabled={isLoading}
                        label={
                            isLoading ? (
                                <div className="flex justify-center items-center gap-2">
                                    <Spinner
                                        aria-label="Spinner button"
                                        size="md"
                                        className=" text-white fill-rose-500"
                                    />
                                    <span className="">Updating</span>
                                </div>
                            ) : (
                                "Update"
                            )
                        }
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center items-start gap-6">
                <div className=" w-full md:w-2/4">
                    <BodyContent />
                </div>
                <div className="w-1/4 flex flex-col gap-2 justify-start items-start">
                    <Category />
                    <Groups />
                    <Types />
                    <ImageSection />
                </div>
            </div>
        </Container>
    );
};

export default PropertyClient;

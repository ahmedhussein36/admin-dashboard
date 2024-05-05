"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";

import Counter from "../customInputs/Counter";
import Input from "../customInputs/Input";
import CategoryInput from "../customInputs/CategoryInput";
import {
    categories,
    commercialTypes,
    paymentPlans,
    groups,
    residentalTypes,
    saleTypes,
    amenitiesItems,
    rentTypes,
    allTypes,
} from "../data/data";
// import Input from "@/app/components/inputs/Input";
import RTE from "@/app/components/postForm/RTE";
import { SafeArea, SafeCompound, SafeDeveloper } from "@/app/types";
import Select from "react-select";

import ImageUpload from "../customInputs/ImageUpload";
import Heading from "../Heading";
import Button from "../Button";
import CitySelect from "../customInputs/CitySelect";
import { FC, useMemo, useState } from "react";
import { Label, Radio, Spinner } from "flowbite-react";
import ClientOnly from "../ClientOnly";

enum STEPS {
    CATEGORY = 0,
    SUBCATEGORY = 1,
    GROUP = 2,
    INFO = 3,
}

interface PageProps {
    compounds: SafeCompound[];
    areas: SafeArea[];
    developers: SafeDeveloper[];
}

const AddNewProperty: FC<PageProps> = ({ compounds, areas, developers }) => {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [getGroup, setGetGroup] = useState("1");
    const [isOtherGroup, setIsOtherGroup] = useState(false);
    const [isInstallment, setIsInstallment] = useState(false);
    const [isDeveloper, setIsDeveloper] = useState(false);
    const [allPropertyImages, setAllPropertyImages] = useState<string[]>([]);

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
            title: "",
            description: "",
            content: "",
            slug: "",
            images: [],
            mainImage: "",
            category: "",
            roomCount: 0,
            bathroomCount: 0,
            propertyType: "",
            group: "",
            saleType: null,
            amenities: [],
            status: "",
            isFeatured: false,
            isAddHome: false,
            isRecommended: false,
            isFooterMenu: false,
            finishing: "",
            deliveryStatus: "",
            furniture: "",
            paymentPlan: "",
            rentalPlan: '',
            rentValue: null,
            RentalPeriod: null,
            rentAvailableDate: null,
            downPayment: 0,
            installmentValue: 0,
            installmentPeriod: 0,
            developerName: "",
            commissionValue: 0,
            deliveryDate: null,
            country: "مصر",
            city: null,
            phone: "",
            whatsapp: "",
            price: 0,
            currency: "ج.م",
            size: 0,
            sizeUnit: "sqm",
            compound: null, developer: null, area: null
        },
    });

    const city = watch("city");
    const area = watch("area");
    const compound = watch("araa");
    const developer = watch("araa");
    const category = watch("category");
    const propertyType = watch("propertyType");
    const group = watch("group");
    const paymentPlan = watch("paymentPlan");
    const rentalPlan = watch("rentalPlan");
    const saleType = watch("saleType");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const mainImage = watch("mainImage");
    const images = watch("images");
    const amenities = watch("amenities");
    const price = watch("price");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const handleCheck = (e: any) => {
        setCustomValue(
            "amenities",
            e.target.checked
                ? [...amenities, e.target.id]
                : amenities.filter((id: any) => id !== e.target.id)
        );

    };


    const slugGeneration = (title: string) => {
        const slug = title.toLowerCase().replace(/\s+/g, "-");
        return slug;
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        setIsLoading(true);


        const generatedSlug = slugGeneration(data.title);
        data.slug = generatedSlug; // Set t  

        axios
            .post("/api/properties", data)
            .then(() => {
                toast.success("تم إضافة وحدتك بنجاح !", {
                    position: "bottom-right",
                });

                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
            })
            .catch(() => {
                toast.error("!خطأ. تعذر اضافة وحدتك", {
                    position: "bottom-right",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    {
        /* handel next button value */
    }
    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO && isLoading)
            return (
                <div className="flex justify-center items-center gap-2">
                    <Spinner
                        aria-label="Spinner button"
                        size="md"
                        className=" text-white fill-rose-500"
                    />
                    <span className="">حفظ</span>
                </div>
            );

        if (step === STEPS.INFO) {
            return "إضافة عقار جديد";
        }
        return "التالي";
    }, [step, isLoading]);

    {
        /* handel back button  */
    }
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return (
            <>
                {" "}
                رجوع <FaArrowRightLong />
            </>
        );
    }, [step]);

    {
        /* handel body content */
    }
    let bodyContent = (
        <div className="w-full flex flex-col gap-8">
            <div className=" absolute right-1 w-[300px] ">
                <Button
                    label={"Cancel"}
                    outline
                    onClick={() => router.back()}
                />
            </div>
            <Heading
                title="مرحباَ، اختر التصنيف المناسب للوحدة"
                subtitle=" اختر نوع العرض الذي تود إضافته"
                center
            />
            <div
                className="
                    grid w-full
                    grid-cols-1 
                    md:grid-cols-2 
                    gap-3
                    "
            >
                {categories.map((item) => (
                    <div key={item.name} className="col-span-1 p-4">
                        <CategoryInput
                            onClick={(category) => {
                                setCustomValue("category", category);
                            }}
                            selected={category === item.name}
                            label={item.name}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.SUBCATEGORY) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title=" ماهو نوع العقار؟"
                    subtitle=" اختر نوع العقار الذي تود الإعلان عنه."
                    center
                />
                <div
                    className="
                        grid 
                        grid-rows-1 
                        md:grid-rows-2 
                        gap-1
                        max-h-[50vh]
        "
                >
                    {groups.map((item) => (
                        <div key={item.id} className="col-span-1 p-2">
                            <CategoryInput
                                onClick={(group) => {
                                    setCustomValue(
                                        "group",
                                        group
                                    );
                                    setGetGroup(item.id);
                                }}
                                selected={group === item.value}
                                label={item.value}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (step === STEPS.GROUP) {
        let groups = [];
        if (getGroup === "1") {
            groups = residentalTypes;
        } else {
            groups = commercialTypes;
        }

        bodyContent = (
            <div className="flex flex-col gap-4 text-lg">
                <Heading
                    title=" ماهو نوع العقار الذي تريد عرضه"
                    subtitle="حدد من الخيارات التالية نوع العقار  "
                    center
                />
                <div
                    className="
                        grid 
                        grid-cols-1 
                        md:grid-cols-2 
                        gap-1
                        max-h-full
        "
                >
                    {groups.map((item: any) => (
                        <div key={item.name} className="col-span-1 p-2">
                            <CategoryInput
                                onClick={(propertyType) => {
                                    setCustomValue(
                                        "propertyType",
                                        propertyType
                                    );
                                    if (
                                        getGroup === "2" &&
                                        item.name === "أخرى"
                                    )
                                        setIsOtherGroup(true);
                                    else if (
                                        getGroup === "2" &&
                                        item.name !== "أخرى"
                                    ) {
                                        setIsOtherGroup(false);
                                    }
                                    setIsSelected(true);
                                }}
                                selected={propertyType === item.name}
                                label={item.name}
                            />
                        </div>
                    ))}
                </div>
                {isOtherGroup ? (
                    <Input
                        id="otherGroup"
                        label="اكتب نوع الوحدة"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }

    const salePayment = (
        <div className=" flex flex-col gap-4 justify-center">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  max-h-full " >
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
                ))
                }
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

            {

                (isDeveloper ? (
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
                    />)
                )}


        </div>
    )

    const rentPayment = (
        <div className=" flex flex-col gap-4 justify-center">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  max-h-full " >
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
                ))
                }
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
    )

    if (step === STEPS.INFO) {
        bodyContent = (
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
                                    placeholder="Select area"
                                    formatOptionLabel={(areas: SafeArea) => (
                                        <div>{areas.title}</div>
                                    )}
                                    classNames={{
                                        control: () =>
                                            "p-1 border placeholder:text-slate-400 focus:border-primary-500",
                                        input: () => "text-slate-300",
                                        option: () => "",
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 8,
                                        colors: {
                                            ...theme.colors,
                                            primary50: "rgb(241 245 249)",
                                            primary25: "rgb(241 245 249)",
                                            primary: "#CBD2E0",
                                        },
                                    })}
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
                                    formatOptionLabel={(compound: SafeCompound) => (
                                        <div>{compound.title}</div>
                                    )}
                                    classNames={{
                                        control: () =>
                                            "p-1 border placeholder:text-slate-400 focus:border-primary-500",
                                        input: () => "text-slate-300",
                                        option: () => "",
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 8,
                                        colors: {
                                            ...theme.colors,
                                            primary50: "rgb(241 245 249)",
                                            primary25: "rgb(241 245 249)",
                                            primary: "#CBD2E0",
                                        },
                                    })}
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
                                    formatOptionLabel={(
                                        developers: SafeDeveloper
                                    ) => <div>{developers.title}</div>}
                                    classNames={{
                                        control: () =>
                                            "p-1 border placeholder:text-slate-400 focus:border-primary-500",
                                        input: () => "text-slate-300",
                                        option: () => "",
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 8,
                                        colors: {
                                            ...theme.colors,
                                            primary50: "rgb(241 245 249)",
                                            primary25: "rgb(241 245 249)",
                                            primary: "#CBD2E0",
                                        },
                                    })}
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
                        onChange={(value) => setCustomValue("bathroomCount", value)}
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


                    {
                        category === "للبيع" && salePayment
                    }

                    {
                        category === "للإيجار" && rentPayment
                    }

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
                                onChange={(value) => setCustomValue("city", value)}
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
                                <Label htmlFor="half-furnitured">مفروش جزئي</Label>
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

                    <div className=" w-full mt-4 mx-4 flex justify-start items-center gap-3">
                        <div className=" w-full">
                            <h3 className="my-2">Main Image:</h3>
                            <ImageUpload
                                label="Upload thumbnail Image"
                                thumbnail={true}
                                onAction={() => {
                                    setCustomValue("mainImage", "");
                                    setAllPropertyImages(
                                        allPropertyImages.slice(0, -1)
                                    );
                                }}
                                onChange={(value) => {
                                    setCustomValue("mainImage", value);
                                    setAllPropertyImages([
                                        ...allPropertyImages,
                                        value,
                                    ]);
                                    setCustomValue("images", [
                                        ...allPropertyImages,
                                        value,
                                    ]);
                                }}
                                value={mainImage}
                                allImages={allPropertyImages}
                            />
                        </div>
                        <div className=" w-full">
                            <h3 className="my-2">Other Images:</h3>
                            <ImageUpload
                                label="Upload compound Images"
                                thumbnail={false}
                                onAction={() => {
                                    setCustomValue("mainImage", "");
                                    setAllPropertyImages(
                                        allPropertyImages.slice(0, -1)
                                    );
                                }}
                                onChange={(value) => {
                                    setCustomValue("images", value);
                                    setAllPropertyImages([
                                        ...allPropertyImages,
                                        value,
                                    ]);
                                    setCustomValue("images", [
                                        ...allPropertyImages,
                                        value,
                                    ]);
                                }}
                                value={images}
                                allImages={allPropertyImages}
                            />
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
                                    id={item.name}
                                    // {...register("amenities")}
                                    type="checkbox"
                                    className=" focus:ring-0 transition-all rounded"
                                    onChange={handleCheck}
                                />
                                <label htmlFor={item.name}>{item.name}</label>
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
             flex flex-col justify-start items-start gap-3"
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
    }

    return (
        <>
            <div className="relative flex justify-center items-center mt-4 mb-24">
                <div className="max-w-[680px] md:w-full lg:w-[600px] flex flex-col justify-center items-center p-6 gap-8">
                    <div className="w-full">{bodyContent}</div>
                    <div
                        className="
                                    flex 
                                    flex-row-reverse
                                    justify-between
                                    items-center z-10
                                    gap-4 w-full
                                    sticky bottom-0 bg-slate-50 py-4
                                "
                    >
                        {secondaryActionLabel && (
                            <Button
                                disabled={isLoading}
                                label={secondaryActionLabel}
                                onClick={onBack}
                                outline
                            />
                        )}

                        <Button
                            disabled={isLoading}
                            label={actionLabel}
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNewProperty;

"use client";

import Button from "@/app/components/Button";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import PropretyContacts from "@/app/components/properties/PropretyContacts";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { MdWhatsapp } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";
import { initializeGoogleTagManager } from "@/app/googleTagManager";

export default function Page() {
    const [data, setData] = useState({
        name: "",
        phone: "",
        subject: "مشروع ات ايست الاهلي صبور",
    });

    const [isLoading, setIsLoading] = useState(false);

    const { name, phone, subject } = data;

    useEffect(() => {
        // Initialize Google Tag Manager with your GTM ID
        initializeGoogleTagManager("GTM-K5KSH3B9");
    }, []);

    const handelChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (name === "" || phone === "") {
                alert("يجب ملئ جميع الحقول");
            } else if (phone.length < 11 || phone.length > 11) {
                alert("رقم الهاتف يجب ان يكون 11 رقم");
            } else if (name.length < 3) {
                alert("الاسم يجب ان يكون اكبر من 3 حروف");
            } else {
                setIsLoading(true);
                const response = await fetch(
                    "https://v1.nocodeapi.com/ahmedhussein36/google_sheets/fOUAbkxGGwjmiLnK?tabId=data",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },

                        body: JSON.stringify([
                            [name, phone, new Date().toLocaleString(), subject],
                        ]),
                    }
                );

                await response.json();
                setIsLoading(false);
                setData({ ...data, name: "", phone: "" });
                alert("تم تقديم طلبك بنجاح");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const compound = {
        id: 1,
        slug: "",
        image: "/images/At-East-Al-Mostakbal-City.jpg",
        name: "مشروع ات ايست الأهلي صبور - At East",
        phone: "20225388918",
        whatsApp: "20225388918",
        discription: "",
        developer: {
            image: "/images/alahly-sabbour.jpg",
            name: "Al ahly Sabbour - الأهلي صبور للتطوير العقاري",
        },
        area: {
            name: "  مدينة المستقبل سيتي",
        },
        images: [],
        location: "المستقبل سيتي",
        properties: ["تاون هاوس", "توين هاوس", "(فيلا مستقلة) استاند ألون"],
        propertiesDetails: [
            {
                type: "Townhouse",
                size: "160m²+ Roof",
                bedrooms: 3,
                priceRange: "12,240,000 up to 13,600,000",
            },
            {
                type: "Townhouse",
                size: "180m² + roof",
                bedrooms: 4,
                priceRange: "13,770,000 up to 15,300,000",
            },
            {
                type: "Twinhouse",
                size: "180m2",
                bedrooms: 4,
                priceRange: "14,580,000",
            },
            {
                type: "Villa",
                size: "1 story 220m2",
                bedrooms: 4,
                priceRange: "25,000,000 up to 28,000,000",
            },
            {
                type: "Villas",
                size: "190m2 1 story",
                bedrooms: 4,
                priceRange: "14,000,000 up to 16,000,000",
            },
            {
                type: "Villa",
                size: "205m2",
                bedrooms: 4,
                priceRange: "15,000,000 up to 17,000,000",
            },
            {
                type: "Villa",
                size: "250m2",
                bedrooms: 4,
                priceRange: "20,000,000 up to 23,000,000",
            },
            {
                type: "Villa",
                size: "300m2",
                bedrooms: 4,
                priceRange: "25,000,000 up to 27,000,000",
            },
            {
                type: "Villa",
                size: "370m2",
                bedrooms: 4,
                priceRange: "30,000,000 up to 34,000,000",
            },
        ],
        size: 186,
        sizeByMeter: 665280,
        paymentPlans: {
            minPrice: 12000000,
            maxPrice: null,
            plans: [
                {
                    installmentPeriod: 8,
                    installmentValue: null,
                    downPayment: 5,
                },
                {
                    installmentPeriod: 9,
                    installmentValue: null,
                    downPayment: 10,
                },
            ],
        },
        amenities: [
            "كلوب هاوس",
            "خدمات أمنية",
            "أماكن ترفيهية",
            "ملاعب رياضية",
            "ملاعب بادل تنس",
            "ملاعب كرة قدم",
            "هايبر ماركت",
            "صالات رياضية",
            "حمامات سباحة",
            "مساحات خضراء",
            "منطقة تجارية",
            "مطاعم وكافيهات",
            "مساحات ترفيهية للأطفال",
            "مراكز تجميل",
            "خدمات طبية",
            "صيدليات",
            "جراج خاص للسيارات",
            "بوابات إلكترونية",
        ],
    };

    const formatNumber = (number: number | undefined): string => {
        if (!number) return String(0);
        if (number >= 1000) {
            return number.toLocaleString();
        } else {
            return number.toString();
        }
    };

    const minPriceInt = Math.floor(compound.paymentPlans.minPrice || 0);

    const formattedMinPrice = formatNumber(minPriceInt) || null;

    const placeholder = "/assets/images/placeholder2.png";

    return (
        <ClientOnly>
            <Container>
                <div className=" flex flex-col md:flex-row justify-between items-start gap-4 my-8">
                    <div className="flex flex-col justify-center items-start w-full md:w-2/3 h-fit gap-4">
                        <div className="w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden relative">
                            <Image
                                src={compound.image || placeholder}
                                layout="fill"
                                priority
                                objectFit="cover"
                                alt={compound.name}
                            />{" "}
                        </div>
                        <div className=" flex flex-col md:flex-row justify-start items-center gap-4">
                            <div className="relative aspect-square w-[70px] rounded-full overflow-hidden border-4 border-slate-200">
                                <Image
                                    src={
                                        compound.developer.image || placeholder
                                    }
                                    layout="fill"
                                    loading="lazy"
                                    objectFit="cover"
                                    alt={compound.developer.name}
                                />
                            </div>
                            <div className="flex flex-col justify-center items-start gap-3">
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        {compound.name}
                                    </h1>
                                </div>
                                <div className=" flex flex-col md:flex-row gap-2 w-full">
                                    <p>{compound.area.name}</p>
                                    <div className=" flex gap-2">
                                        <span>من تطوير</span>
                                        <span className=" rounded-lg bg-slate-100 px-3">
                                            {compound.developer.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 h-full">
                        <div className=" w-full h-full rounded-lg border-2 p-4">
                            <h4 className=" font-bold text-xl mb-6">
                                خطط السداد
                            </h4>
                            <div className=" flex flex-wrap justify-center items-center gap-5">
                                {compound.paymentPlans.plans.map((plan, i) => (
                                    <div
                                        key={i}
                                        className="w-full flex flex-col md:flex-row justify-center items-center gap-2"
                                    >
                                        <div className="w-full flex justify-between items-center ">
                                            <div
                                                className="w-[45%] flex flex-col justify-center items-center gap-2 
                                                rounded-lg p-4 bg-indigo-50 border border-indigo-600"
                                            >
                                                <span className=" font-extrabold text-6xl text-indigo-600">
                                                    {plan.downPayment}
                                                    <span className=" text-lg font-medium">
                                                        %
                                                    </span>
                                                </span>
                                                <span className=" text-indigo-600">
                                                    مقدم
                                                </span>
                                            </div>
                                            <div
                                                className="w-[45%] flex flex-col justify-center items-center gap-2 
                                                rounded-lg p-4 bg-indigo-50 border border-indigo-600"
                                            >
                                                <span className=" font-extrabold text-6xl text-indigo-600">
                                                    {plan.installmentPeriod}
                                                </span>
                                                <span className=" text-indigo-700">
                                                    سنوات
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="w-full flex flex-col gap-2 justify-center items-center my-6">
                                    <span>سعر يبدأ من</span>
                                    <span className=" font-bold text-3xl mx-2">
                                        {formattedMinPrice} ج.م
                                    </span>
                                </div>
                                <div className=" flex-1 flex justify-center items-center my-6 ">
                                    <PropretyContacts
                                        phone={compound.phone}
                                        whatsApp={compound.whatsApp}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="m-8"></hr>

                <div className=" grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-12">
                    <div className=" col-span-full md:col-span-2 w-full">
                        <div className=" flex flex-col justify-center items-start gap-3">
                            <div className=" text-xl font-bold my-4">
                                <h2>نبذة عن المشروع</h2>
                            </div>
                            <div className=" border-blue-200 border rounded-lg p-4 bg-blue-50 w-full">
                                <p className=" leading-7">
                                    شركة الأهلي صبور للتنمية العقارية تقدم
                                    نموذجًا فريدًا للعيش الفخم من خلال مشروعها
                                    الرائد، كمبوند ات ايست مدينة المستقبل، الذي
                                    يعكس مفهوم الحياة العصرية الأنيقة. يهدف هذا
                                    المشروع إلى خلق ملاذ سكني يجمع بين الأناقة
                                    والرفاهية، موفرًا لقاطنيه تجربة معيشية لا
                                    مثيل لها. يبرز المشروع بفضل تصميمه الفريد
                                    والمتطور الذي يرتقي بمعايير البناء العالمية،
                                    ليصبح بذلك رمزًا معماريًا بارزًا في مدينة
                                    المستقبل.
                                </p>
                            </div>
                        </div>

                        <div className="my-12">
                            <h2 className="text-xl font-bold mb-4">
                                تفاصيل المشروع
                            </h2>
                            <div className=" w-full">
                                <table className=" w-full ">
                                    <tbody>
                                        <tr className="">
                                            <td className=" p-2">
                                                اسم المشروع
                                            </td>
                                            <td>{compound.name}</td>
                                        </tr>
                                        <tr>
                                            <td className=" p-2 w-[120px]">
                                                المطور العقاري
                                            </td>
                                            <td className=" p-2">
                                                {compound.developer.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className=" p-2">الموقع</td>
                                            <td>{compound.location}</td>
                                        </tr>
                                        <tr>
                                            <td className=" p-2">الوحدات</td>
                                            <td>
                                                {compound.properties.join(
                                                    " - "
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className=" p-2">المساحة</td>
                                            <td> {compound.size} فداناً</td>
                                        </tr>
                                        <tr>
                                            <td className=" p-2">التسليم</td>
                                            <td>يبدأ عام 2027</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="my-12">
                            <h2 className="text-xl font-bold my-2">
                                موقع {compound.name}
                            </h2>
                            <div className="py-4 mb-8">
                                <p className=" leading-7">
                                    اختيار الموقع المثالي يشكل ركيزة أساسية
                                    لنجاح أي مشروع سكني، وهذا ما أولته شركة
                                    الأهلي صبور اهتمامًا خاصًا. يتمركز كمبوند ات
                                    ايست مدينة المستقبل في نقطة استراتيجية داخل
                                    مدينة المستقبل، مما يضعه في موقع قريب من
                                    المعالم البارزة والضرورية. يبرز المشروع
                                    بموقعه القريب من الخدمات والمرافق الترفيهية،
                                    موفرًا للمقيمين إمكانية سهلة للوصول إلى كل
                                    ما يحتاجونه من متطلبات يومية ووسائل ترفيه
                                    بكل يسر وسهولة.
                                </p>
                            </div>
                            <div className=" w-full h-[400px] relative mb-12">
                                <Image
                                    src="/images/map.webp"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="مشروع ات ايست المستقبل سيتي - At East Almustakbal city"
                                />
                            </div>
                            <div className=" my-6">
                                <h4 className=" text-xl font-bold my-4">
                                    أهم المحاور والمناطق القريبة من{" "}
                                    {compound.name}
                                </h4>
                                <p className=" leading-7">
                                    كذلك، يوفر الموقع المتميز للمشروع، القريب من
                                    الشرايين الرئيسية للمدينة، للمقيمين إمكانية
                                    الوصول السريع والسهل إلى المواقع المختلفة
                                    التي يريدون زيارتها في زمن قياسي، ما يعزز من
                                    مستوى الراحة لديهم ويساهم في تعزيز جودة
                                    حياتهم. إليكم بعض المعالم البارزة والحيوية
                                    القريبة من الكمبوند والتي تعكس أهمية موقعه:
                                </p>
                                <ul className=" my-4 flex flex-col gap-2">
                                    <li className=" list-disc">
                                        يتمتع المشروع بموقع قريب من الطريق
                                        الدائري، ما يجعل الوصول إليه والتنقل منه
                                        وإليه في القاهرة أمرًا سهلاً ومريحًا.
                                    </li>
                                    <li className=" list-disc">
                                        يسهل الوصول إلى المشروع عبر طريق السويس،
                                        ما يضمن سلاسة التنقل للمقيمين ويساعد في
                                        توفير الوقت والمجهود.
                                    </li>
                                    <li className=" list-disc">
                                        يقع الكمبوند على بعد دقائق من مطار
                                        القاهرة الدولي، مما يسهل على السكان
                                        السفر والتنقل الجوي بكل راحة.
                                    </li>
                                    <li className=" list-disc">
                                        يتواجد المشروع بالقرب من الجامعة
                                        الأمريكية والجامعة الألمانية، ما يجعله
                                        خيارًا مثاليًا للطلاب وعائلاتهم.
                                    </li>
                                    <li className=" list-disc">
                                        يتميز المشروع بقربه الشديد من مناطق
                                        الرحاب ومدينتي، مما يمكن السكان من
                                        الاستفادة بسهولة من الخدمات والمرافق
                                        المتنوعة المتاحة في هذه المناطق.
                                    </li>
                                </ul>

                                <p className=" leading-7">
                                    بهذه الخصائص، يضمن كمبوند ات ايست مدينة
                                    المستقبل لقاطنيه تجربة عيش رفيعة المستوى
                                    ومريحة، بفضل موقعه الاستراتيجي والمرافق
                                    العديدة القريبة التي يستفيدون منها.
                                </p>
                            </div>
                            <div className=" w-full border-2 rounded-lg bg-blue-900 p-6 ">
                                <div className="hidden md:block w-full border-2 rounded-lg bg-blue-900 p-6 ">
                                    <div className="w-full text-center font-bold text-white">
                                        تواصل معنا لمعرفة احدث الأسعار وأفضل
                                        أنظمة السداد
                                    </div>
                                    <div className="w-full flex-1 flex justify-center items-center my-6 ">
                                        <PropretyContacts
                                            phone={compound.phone}
                                            whatsApp={compound.whatsApp}
                                        />
                                    </div>
                                </div>
                                <div className=" block md:hidden">
                                    <div className="w-full text-center font-bold text-white">
                                        تواصل معنا لمعرفة احدث الأسعار وأفضل
                                        أنظمة السداد و الحجز او الاستفسار
                                    </div>{" "}
                                    <div className="w-full col-span-full md:col-span-1 p-0 lg:p-4 relative ">
                                        <div className="w-full sticky top-0 pt-8">
                                            <form
                                                onSubmit={onSubmit}
                                                id="form"
                                                className=" w-full border-2 flex flex-col gap-3 p-4 rounded-lg bg-slate-100"
                                            >
                                                <div className="w-full flex flex-col justify-center items-start gap-2">
                                                    <label htmlFor="name">
                                                        الاسم*
                                                    </label>
                                                    <input
                                                        name="name"
                                                        value={name}
                                                        onChange={handelChange}
                                                        className="w-full border p-2 py-4 rounded-md"
                                                        type="text"
                                                        placeholder="ادخل الاسم"
                                                        min={3}
                                                        max={50}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full flex flex-col justify-center items-start gap-2">
                                                    <label htmlFor="phone">
                                                        رقم الهاتف*
                                                    </label>
                                                    <input
                                                        name="phone"
                                                        value={phone}
                                                        onChange={handelChange}
                                                        className="w-full border p-2 py-4 rounded-md"
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="ادخل رقم هاتفك"
                                                        min={11}
                                                        max={11}
                                                        required
                                                    />
                                                </div>

                                                <div className="w-full flex flex-col justify-center items-start gap-2">
                                                    <Button
                                                        label={`${
                                                            isLoading
                                                                ? "جاري الارسال"
                                                                : "ارسال"
                                                        }`}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </form>
                                            <div className=" flex-1 flex justify-center items-center my-6 ">
                                                <PropretyContacts
                                                    phone={compound.phone}
                                                    whatsApp={compound.whatsApp}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" my-4">
                                <h4 className=" text-xl font-bold my-4">
                                    تصميم {compound.name}
                                </h4>
                                <p className=" leading-7 my-4">
                                    تبرز الأهلي صبور كواحدة من الشركات البارزة
                                    التي تركز بشكل مستمر على الابتكار والتفرد في
                                    كافة أبعاد مشروعاتها، مع إيلاء اهتمام خاص
                                    للتصميمات المعمارية الراقية. هذه التصميمات
                                    تستهدف إضافة قيمة متميزة وتنافسية
                                    لمشروعاتها، ما يعود بالنفع على سعادة وراحة
                                    المقيمين. تتجلى هذه التصميمات في استغلال
                                    مثالي للمساحات، حيث تضمن توفير مناطق خضراء
                                    واسعة ومناظر طبيعية خلابة تحتضن المباني، ما
                                    يسهم في توفير بيئة هادئة وإطلالات طبيعية
                                    مميزة للسكان.
                                </p>
                                <p className=" leading-7 my-4">
                                    الأبحاث تدل على أن الأماكن الخضراء تعزز من
                                    مستويات السعادة والاسترخاء لدى الأفراد.
                                    يتبنى كمبوند ات ايست مدينة المستقبل سيتي
                                    فلسفة تصميم تؤكد على الانسجام والتوازن بين
                                    جميع العناصر، سواء كان ذلك داخل الوحدات
                                    السكنية أو في الفضاءات الخارجية، وتهدف إلى
                                    تقديم مساحات واسعة بين الوحدات لضمان
                                    الخصوصية القصوى للمقيمين.
                                </p>
                                <p className=" leading-7 my-4">
                                    يمتد المشروع على مساحة إجمالية تصل إلى 186
                                    فدانًا، مخصصًا جزءًا كبيرًا منها للمساحات
                                    الخضراء والتصميم الطبيعي، ما يعكس التزام
                                    الشركة بخلق بيئة سكنية فريدة تمزج بين
                                    الفخامة والجمال الطبيعي بأروع صورة.
                                </p>
                            </div>

                            <div className=" my-12">
                                <h4 className=" text-xl font-bold my-4">
                                    أسعار ومساحة الوحدات
                                </h4>
                                <p className=" leading-7 my-4">
                                    فلل كمبوند ات ايست مدينة المستقبل ستُطرح
                                    للبيع بأسعار تنافسية تعكس التزام شركة الأهلي
                                    صبور بتقديم عروض قيمة ومغرية لعملائها.
                                    تستهدف هذه الأسعار إتاحة الفرصة أمام العملاء
                                    لاقتناء الوحدات التي يحلمون بها بتكلفة
                                    مقبولة وجذابة لجميع الشرائح.
                                </p>
                                <div className="overflow-x-auto ltr">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Size
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Bedrooms
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Price Range
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {compound.propertiesDetails.map(
                                                (property, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {property.type}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {property.size}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {property.bedrooms ||
                                                                "N/A"}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {
                                                                property.priceRange
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className=" my-12">
                                <h4 className=" text-xl font-bold my-4">
                                    الأسعار وأنظمة السداد في {compound.name}
                                </h4>
                                <p className=" leading-7 my-4">
                                    تلتزم شركة الأهلي صبور بتسهيل عملية شراء
                                    الوحدات السكنية في الكمبوند، من خلال تقديم
                                    خطط دفع مرنة للحجز والتقسيط، مما يمنح
                                    العملاء الفرصة لترتيب أمورهم المالية بكل
                                    يسر. تتميز هذه الخطط بإمكانية البدء بدفعة
                                    أولى منخفضة، وتوزيع القيمة المتبقية على
                                    فترات طويلة بدون أي فوائد.
                                </p>
                                <p className=" leading-7 my-4">
                                    يُمنح العملاء الحرية في اختيار الخطة التي
                                    تناسب احتياجاتهم وميزانيتهم من بين مجموعة
                                    واسعة من الخيارات المتاحة، مما يضمن الوصول
                                    إلى حلول مالية مثالية. إليكم نظرة على خطط
                                    الدفع المعروضة في الكمبوند:
                                </p>
                                <ul className=" my-4 flex flex-col gap-2">
                                    {" "}
                                    <li className=" list-disc">
                                        <span className=" bg-amber-400 p-1 font-medium">
                                            {" "}
                                            الخطة الأولى:
                                        </span>{" "}
                                        تشمل دفعة أولى بنسبة 5%، يليها دفعة
                                        ثانية بنسبة 5% بعد فترة معينة، ومن ثم
                                        تقسيط القيمة المتبقية على مدار 8 سنوات.
                                    </li>
                                    <li className=" list-disc">
                                        <span className=" bg-amber-400 p-1 font-medium">
                                            {" "}
                                            الخطة الثانية:
                                        </span>{" "}
                                        تتطلب دفعة أولى بنسبة 10%، مع إمكانية
                                        تقسيط المبلغ الباقي على مدى 9 سنوات.
                                    </li>
                                </ul>

                                <p className=" leading-7 my-4">
                                    بهذه الخطط المرنة والمدروسة، توفر شركة
                                    الأهلي صبور لعملائها إمكانية الحصول على
                                    وحدتهم السكنية المثالية في كمبوند ات ايست
                                    المستقبل سيتي بكل سلاسة وراحة.
                                </p>
                            </div>
                            <div className=" w-full border-2 rounded-lg bg-slate-700 p-6 ">
                                <div className="w-full text-center font-bold text-white">
                                    تواصل معنا لمعرفة احدث الأسعار وأفضل أنظمة
                                    السداد
                                </div>
                                <div className="w-full flex-1 flex justify-center items-center my-6 ">
                                    <PropretyContacts
                                        phone={compound.phone}
                                        whatsApp={compound.whatsApp}
                                    />
                                </div>
                            </div>

                            <div className=" py-4 my-8">
                                <h4 className=" text-xl font-bold mt-4">
                                    أهم الخدمات والمرافق في {compound.name}
                                </h4>
                                <p className=" leading-7 my-4">
                                    إن كنت تسعى لإيجاد بيئة سكنية مثالية تلبي
                                    جميع احتياجاتك الأساسية وتلك الخاصة بعائلتك،
                                    فإن كمبوند ات ايست مدينة المستقبل يُعد
                                    الخيار الأنسب لك. يبرز هذا المشروع بفضل
                                    تطويره على يد شركة الأهلي صبور، الشهيرة
                                    بخبرتها في إنشاء مجتمعات سكنية تفي بأعلى
                                    المقاييس الدولية. تضع الشركة في مقدمة
                                    أولوياتها توفير مسكن يربط السكان بمحيطهم
                                    الجديد، مزودًا بكافة الخدمات والمرافق
                                    الضرورية داخل نطاق المشروع، مما يضمن لهم
                                    حياة مريحة ومستقلة دون الحاجة للتوجه خارجه
                                    لأي سبب.
                                </p>

                                <p className=" leading-7 my-4">
                                    داخل كمبوند ات ايست مدينة المستقبل، يستمتع
                                    السكان بتشكيلة واسعة من المرافق الخدمية
                                    والترفيهية المصممة خصيصًا لضمان أقصى درجات
                                    الراحة والمتعة، وتتضمن::
                                </p>
                            </div>
                            <div className=" w-full grid grid-cols-2 md:grid-cols-4 gap-2 ">
                                {compound.amenities.map((item, i) => (
                                    <div
                                        className="border-2 p-8 bg-slate-100 text-center
                                        hover:bg-slate-500 hover:text-slate-50 transition-all"
                                        key={i}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        id="contacts"
                        className=" w-full col-span-full md:col-span-1 p-0 lg:p-4 relative "
                    >
                        <div className="w-full sticky top-0 pt-8">
                            <div className=" text-xl font-bold mb-4">
                                للحجز و الاستفسار
                            </div>
                            <form
                                onSubmit={onSubmit}
                                id="form"
                                className=" w-full border-2 flex flex-col gap-3 p-4 rounded-lg bg-slate-100"
                            >
                                <div className="w-full flex flex-col justify-center items-start gap-2">
                                    <label htmlFor="name">الاسم*</label>
                                    <input
                                        name="name"
                                        value={name}
                                        onChange={handelChange}
                                        className="w-full border p-2 py-4 rounded-md"
                                        type="text"
                                        placeholder="ادخل الاسم"
                                        min={3}
                                        max={50}
                                        required
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-center items-start gap-2">
                                    <label htmlFor="phone">رقم الهاتف*</label>
                                    <input
                                        name="phone"
                                        value={phone}
                                        onChange={handelChange}
                                        className="w-full border p-2 py-4 rounded-md"
                                        id="phone"
                                        type="tel"
                                        placeholder="ادخل رقم هاتفك"
                                        min={11}
                                        max={11}
                                        required
                                    />
                                </div>

                                <div className="w-full flex flex-col justify-center items-start gap-2">
                                    <Button
                                        label={`${
                                            isLoading ? "جاري الارسال" : "ارسال"
                                        }`}
                                        disabled={isLoading}
                                    />
                                </div>
                            </form>
                            <div className=" flex-1 flex justify-center items-center my-6 ">
                                <PropretyContacts
                                    phone={compound.phone}
                                    whatsApp={compound.whatsApp}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="md:hidden w-full m-2 fixed bottom-0 bg-slate-100 rounded-lg mb-0 shadow-xl p-4 flex justify-between items-center gap-4">
                <div
                    onClick={() => {
                        open(`https://wa.me/20225388918`);
                    }}
                    className=" flex justify-center items-center gap-3 w-1/2 rounded-lg bg-green-600 text-white p-2 text-center"
                >
                    <MdWhatsapp color="#fff" size={30} />
                    تواصل
                </div>
                <a
                    href="#contacts"
                    className="flex justify-center items-center gap-3 w-1/2 rounded-lg bg-blue-600 text-white p-2 text-center"
                >
                    <RiShareBoxLine color="#fff" size={30} />
                    تواصل معنا
                </a>
            </div>
        </ClientOnly>
    );
}

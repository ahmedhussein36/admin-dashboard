import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

import { FaShop } from "react-icons/fa6";
import { MdVilla } from "react-icons/md";

export const userRoles = [
    {
        id: 1,
        name: "admin",
        label: "Admin",
    },
    {
        id: 2,
        name: "manager",
        label: "Manager",
    },
    {
        id: 3,
        name: "editor",
        label: "Editor",
    },
    {
        id: 4,
        name: "auther",
        label: "Auther",
    },
    {
        id: 5,
        name: "user",
        label: "User",
    },
];

export const categories = [
    {
        id: "1",
        name: "للبيع",
        name_en: "Property for sale",
        icon: "/assets/icons/house.svg",
    },
    {
        id: "2",
        name: "للإيجار",
        name_en: "Property for rent",
        icon: "/assets/icons/house-rent.svg",
    },
];

export const groups = [
    {
        id: "1",
        value: "سكني",
        label: "وحدات سكنية",
        name_en: "Residental Property",
        icon: <MdVilla size={20} color={"rgb(244 63 94)"} />,
    },
    {
        id: "2",
        value: "تجاري",
        label: "وحدات تجارية",
        name_en: "Commercial Property",
        icon: <FaShop size={20} color={"rgb(244 63 94)"} />,
    },
];

export const navItems = [
    {
        id: "1",
        name: "الرئيسية",
        slug: "/",
    },
    {
        id: "2",
        name: "للبيع",
        slug: "/properties-for-sale",
    },
    {
        id: "3",
        name: "للإيجار",
        slug: "/properties-for-rent",
    },

    {
        id: "4",
        name: "كمبوندات",
        slug: "/compounds",
    },
    {
        id: "5",
        name: "المطورون",
        slug: "/developers",
    },
    {
        id: "6",
        name: "المدونة",
        slug: "/#",
    },

    {
        id: "7",
        name: "اتصل بنا",
        slug: "/contact-us",
    },
    {
        id: "8",
        name: "من نحن",
        slug: "/#",
    },
];

export const allTypes = [
    {
        id: "1",
        label: "شقة",
        name: "شقة",
        name_en: "Apartmnet",
    },
    {
        id: "2",
        label: "فيلا",
        name: "فيلا",
        name_en: "Villa",
    },
    {
        id: "19",
        label: "ستاند آلون",
        name: "ستاند آلون",
        name_en: "Stand Alone",
    },
    {
        id: "3",
        label: "تاونهاوس",
        name: "تاونهاوس",
        name_en: "Townhouse",
    },
    {
        id: "20",
        label: "توين هاوس",
        name: "توين هاوس",
        name_en: "Twinhouse",
    },
    {
        id: "4",
        label: "بنتهاوس",
        name: "بنتهاوس",
        name_en: "penthouse",
    },
    {
        id: "5",
        label: "دوبلكس",
        name: "دوبلكس",
        name_en: "Duplex",
    },
    {
        id: "19",
        label: "استديو",
        name: "استديو",
        name_en: "Studio",
    },
    {
        id: "20",
        label: "شاليه",
        name: "شاليه",
        name_en: "Chalet",
    },
    {
        id: "6",
        label: "مبنى سكني",
        name: "مبنى سكني",
        name_en: "Building",
    },
    {
        id: "7",
        label: "مجمع فيلات",
        name: "مجمع فيلات",
        name_en: "Villa compound",
    },
    {
        id: "8",
        label: "طابق سكني",
        name: "طابق سكني",
        name_en: "Floor",
    },
    {
        id: "9",
        label: "منزل",
        name: "منزل",
        name_en: "House",
    },
    {
        id: "10",
        label: "قطعة أرض",
        name: "قطعة أرض",
        name_en: "Land",
    },
    {
        id: "11",
        label: "مكتب",
        name: "مكتب",
        name_en: "Office for sale",
    },
    {
        id: "12",
        label: "مخزن",
        name: "مخزن",
        name_en: "Warehouse",
    },
    {
        id: "13",
        label: "محل تجاري ",
        name: "محل تجاري ",
        name_en: "Shop for sale",
    },
    {
        id: "14",
        label: "طابق تجاري",
        name: "طابق تجاري",
        name_en: "commercial floor",
    },
    {
        id: "15",
        label: "مصنع",
        name: "مصنع",
        name_en: "Factory",
    },
    {
        id: "16",
        label: "مساحة عمل",
        name: "مساحة عمل",
        name_en: "Work space",
    },
    {
        id: "17",
        label: "قاعة عرض",
        name: "قاعة عرض",
        name_en: "Show room",
    },
    {
        id: "18",
        label: "مبنى تجاري",
        name: "مبنى تجاري",
        name_en: "Commercial building",
    },
];

export const commercialTypes = [
    {
        id: "11",
        label: "مكتب",
        name: "مكتب",
        name_en: "Office for sale",
    },
    {
        id: "12",
        label: "مخزن",
        name: "مخزن",
        name_en: "Warehouse",
    },
    {
        id: "13",
        label: "محل تجاري ",
        name: "محل تجاري ",
        name_en: "Shop for sale",
    },
    {
        id: "14",
        label: "طابق تجاري",
        name: "طابق تجاري",
        name_en: "commercial floor",
    },
    {
        id: "15",
        label: "مصنع",
        name: "مصنع",
        name_en: "Factory",
    },
    {
        id: "16",
        label: "مساحة عمل",
        name: "مساحة عمل",
        name_en: "Work space",
    },
    {
        id: "17",
        label: "قاعة عرض",
        name: "قاعة عرض",
        name_en: "Show room",
    },
    {
        id: "18",
        label: "مبنى تجاري",
        name: "مبنى تجاري",
        name_en: "Commercial building",
    },
];

export const residentalTypes = [
    {
        id: "1",
        label: "شقة",
        name: "شقة",
        name_en: "Apartmnet",
    },
    {
        id: "2",
        label: "فيلا",
        name: "فيلا",
        name_en: "Villa",
    },
    {
        id: "19",
        label: "ستاند آلون",
        name: "ستاند آلون",
        name_en: "Stand Alone",
    },
    {
        id: "3",
        label: "تاونهاوس",
        name: "تاونهاوس",
        name_en: "Townhouse",
    },
    {
        id: "20",
        label: "توين هاوس",
        name: "توين هاوس",
        name_en: "Twinhouse",
    },
    {
        id: "4",
        label: "بنتهاوس",
        name: "بنتهاوس",
        name_en: "penthouse",
    },
    {
        id: "5",
        label: "دوبلكس",
        name: "دوبلكس",
        name_en: "Duplex",
    },
    {
        id: "6",
        label: "مبنى سكني",
        name: "مبنى سكني",
        name_en: "Building",
    },
    {
        id: "7",
        label: "مجمع فيلات",
        name: "مجمع فيلات",
        name_en: "Villa compound",
    },
    {
        id: "8",
        label: "طابق سكني",
        name: "طابق سكني",
        name_en: "Floor",
    },
    {
        id: "9",
        label: "منزل",
        name: "منزل",
        name_en: "House",
    },
    {
        id: "10",
        label: "قطعة أرض",
        name: "قطعة أرض",
        name_en: "Land",
    },
    {
        id: "11",
        label: "استديو",
        name: "استديو",
        name_en: "Studio",
    },
    {
        id: "12",
        label: "شاليه",
        name: "شاليه",
        name_en: "Chalet",
    },
];

export const amenitiesItems = [
    {
        id: "1",
        name: "شرفة",
    },
    {
        id: "2",
        name: "حمام سباحة خاص  ",
    },
    {
        id: "3",
        name: "حمام سباحة مشترك   ",
    },
    {
        id: "4",
        name: "إطلالة على معلم رئيسي   ",
    },
    {
        id: "5",
        name: "خدمات المصاعد  ",
    },
    {
        id: "6",
        name: "مركز أعمال ",
    },

    {
        id: "7",
        name: "تسهيلات لأصحاب الهمم  ",
    },
    {
        id: "8",
        name: "صالة رياضية  ",
    },
    {
        id: "9",
        name: "حديقة خاصة  ",
    },
];

export const paymentPlans = [
    {
        id: "1",
        name: " الدفع كاش",
        name_en: "Cash Plan",
    },
    {
        id: "2",
        name: "  الدفع بنظام الأقساط",
        name_en: "Installment Plan",
    },
];

export const saleTypes = [
    {
        id: "1",
        name: "بيع من المطور",
        name_en: "By Developer",
    },
    {
        id: "2",
        name: " إعادة بيع ",
    },
];

export const rentTypes = [
    {
        id: "1",
        name: " سداد شهري",
        name_en: "monthly",
    },
    {
        id: "2",
        name: " سداد سنوي ",
        name_en: "yearly",
    },
    {
        id: "3",
        name: " سداد 3 شهور ",
        name_en: "3 monthes",
    },
    {
        id: "4",
        name: " سداد 6 شهور",
        name_en: "6 monthes",
    },
];

export const socialMedia = [
    {
        id: "1",
        name: "فيسبوك",
        name_en: "Facebook",
        icon: <FaFacebookF />,
        url: "https://facebook.com",
    },
    {
        id: "2",
        name: "تويتر",
        name_en: "Twitter",
        icon: <FaXTwitter />,
        url: "https://x.com",
    },
    {
        id: "3",
        name: "إنستجرام",
        name_en: "Instagram",
        icon: <FaInstagram />,
        url: "https://instagram.com",
    },
    {
        id: "4",
        name: "يوتيوب",
        name_en: "Youtube",
        icon: <FaYoutube />,
        url: "https://youtube.com",
    },
    {
        id: "5",
        name: "لينكد إن",
        name_en: "Linkedin",
        icon: <FaLinkedinIn />,
        url: "https://linkedin.com",
    },
];

export const topSearchingAreas = [
    {
        id: "1",
        label: "القاهرة الجديدة",
        name: "القاهرة الجديدة",
        name_en: "New Cairo",
        image: "/assets/images/new-cairo.jpg",
        slug: `/القاهرة الجديدة`,
    },
    {
        id: "2",
        label: "العاصمة الإدارية الجديدة",
        name: "العاصمة الإدارية ",
        name_en: "New Capital City",
        image: "/assets/images/new-capital-city.jpg",
        slug: `/area/العاصمة الإدارية الجديدة`,
    },
    {
        id: "3",
        label: "مدينة السادس من اكتوبر",
        name: " السادس من اكتوبر",
        name_en: " 6th October City",
        image: "/assets/images/6th-october-city.jpg",
        slug: `/area/مدينة السادس من اكتوبر`,
    },
    {
        id: "4",
        label: "الساحل الشمالي",
        name: "الساحل الشمالي",
        name_en: "The North Coast",
        image: "/assets/images/north-coast.jpg",
        slug: `/area/الساحل الشمالي`,
    },
    {
        id: "5",
        label: "مدينة الشيخ زايد",
        name: "مدينة الشيخ زايد",
        name_en: "Shiekh Zayed City",
        image: "/assets/images/shiekh-zayed-city.jpg",
        slug: `/area/مدينة الشيخ زايد`,
    },
    {
        id: "6",
        label: "الجونة",
        name: "الجونة",
        name_en: "El-Gouna",
        image: "/assets/images/algouna.jpg",
        slug: `/area/الجونة`,
    },
    {
        id: "7",
        label: "مدينة المستقبل",
        name: "مدينة المستقبل",
        name_en: "Al Mustakbal City",
        image: "/assets/images/almustakbal.jpg",
        slug: `/area/مدينة المستقبل`,
    },
    {
        id: "8",
        label: "العين السخنة",
        name: "العين السخنة",
        name_en: "Al-Ain Alsokhna",
        image: "/assets/images/alsokhna.jpg",
        slug: `/area/العين السخنة`,
    },
];

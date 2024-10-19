import {
    Property,
    Developer,
    Compound,
    Area,
    Lead,
    Category,
    Post,
    User,
} from "@prisma/client";

export type SafeProperty = Omit<Property, "createdAt"> & {
    createdAt: string;
    compound: lightCompond;
    developer: lightDeveloper;
    area: lightArea;
    user: {
        id: string;
        name: string;
    };
};

export type SafeCompound = Omit<Compound, "createdAt"> & {
    createdAt: string;
    area: {
        id: string;
        title: string;
    };
    developer: {
        id: string;
        title: string;
    };
    user: {
        id: string;
        name: string;
    };
    properties: lightProperty[];
};
export type SafeArea = Omit<Area, "createdAt"> & {
    createdAt: string;
};

export type SafeDeveloper = Omit<Developer, "createdAt"> & {
    createdAt: string;
    user: {
        id: string;
        name: string;
    };
};

export type SafeLead = Omit<Lead, "createdAt"> & {
    country: {
        name: {
            en: string;
            ar: string;
        };
        dialCode: string;
        flag: string;
        value: string;
    };
    createdAt: string;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type safeCategory = Omit<Category, "createdAt"> & {
    createdAt: string;
};

export type safePost = Omit<Post, "createdAt"> & {
    createdAt: string;
};

export type lightCompond = Pick<Compound, "title" | "id">;
export type lightArea = Pick<Area, "title" | "id">;
export type lightDeveloper = Pick<Developer, "title" | "id">;
export type lightProperty = Pick<Property, "title" | "id">;

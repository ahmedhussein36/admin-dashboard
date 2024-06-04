export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/listings",
        "/compounds",
        "/developers",
        "/areas",
        "/compounds/create-new-compound",
        "/listings/create-new-listing",
        "/listings/[listingId]",
        "/compounds/[compoundId]",
        "/developers/[developerId]",
        "/areas/[areaId]",
        "/trips",
        "/reservations",
        "/properties",
        "/favorites",
    ],
};

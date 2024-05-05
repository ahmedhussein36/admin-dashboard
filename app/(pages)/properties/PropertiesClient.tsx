"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeProperty, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeProperty[];
    currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onDelete = useCallback(
        (id: string) => {
            setDeletingId(id); 

            axios
                .delete(`/api/listings/${id}`)
                .then(() => {
                    toast.success("Listing deleted");
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.error);
                })
                .finally(() => {
                    setDeletingId("");
                });
        },
        [router]
    );

    return (
        <Container>
            <div className="mt-8 h-full flex flex-col justify-center items-start w-full">
                <Heading
                    title="قائمة اعلاناتك"
                    subtitle="قائمة الوحدات التي قمت بإضافتها"
                />
                <div
                    className="
                        mt-10
                        flex flex-col justify-between items-start w-full
                        gap-3 h-full
                        "
                >
                    {listings.map((listing: any) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            onAction={onDelete}
                            disabled={deletingId === listing.id}
                            actionLabel="حذف"
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default PropertiesClient;

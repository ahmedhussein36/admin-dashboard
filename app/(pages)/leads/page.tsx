import Container from "@/app/components/Container";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/app/components/Heading";
import LeadClient from "./LeadClient";
import Sorting from "@/app/components/Sorting";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { redirect } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";
import getLeads, { LeadParams } from "@/app/actions/getLeads";
import DatePickerWithRange from "@/app/components/inputs/DateRangePicker";

interface LeadProps {
    searchParams: LeadParams;
}

const UserPage = async ({ searchParams }: LeadProps) => {
    const leads = await getLeads(searchParams);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/login");
    }

    if (currentUser?.role?.toLocaleLowerCase() !== "admin") {
        return redirect("/");
    }

    return (
        <div className="">
            <Container>
                <div className=" flex gap-4 justify-between items-center my-2 w-full">
                    <div>
                        <Heading
                            title={"Leads"}
                            subtitle={`Users available: ${leads.length}`}
                        />
                    </div>
                    <div>
                        <DatePickerWithRange />
                    </div>
                </div>
                <ClientOnly>
                    <LeadClient leads={leads as any} />
                </ClientOnly>
            </Container>
        </div>
    );
};

export default UserPage;

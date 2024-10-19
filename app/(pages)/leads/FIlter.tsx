import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SafeLead } from "@/app/types";
import { set } from "date-fns";
import { id } from "date-fns/locale";
import ReactCountryFlag from "react-country-flag";

const FIlter = ({ leads }: { leads: SafeLead[] }) => {
    const [selectedLead, setSelectedLead] = React.useState<SafeLead | null>(
        null
    );
    const uniqueLeads = [...new Set(leads.map((lead) => lead.compoundName))];
    const uniCompoundRefs = [...new Set(leads.map((lead) => lead.compoundRef))];
    const uniqeUnitRefs = [...new Set(leads.map((lead) => lead.unitRef))];
    const uniqueCountries = [
        ...new Map(
            leads.map((lead) => [
                lead.country.name.en,
                { name: lead.country.name.en, flag: lead.country.flag },
            ])
        ).values(),
    ];

    return (
        <div className=" w-full">
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <Select>
                    <SelectTrigger
                        className="
                    w-[200px] rounded-md p-2 h-[42px] bg-white border border-gray-500"
                    >
                        <SelectValue placeholder="By Country" />
                    </SelectTrigger>
                    <SelectContent>
                        {leads &&
                            uniqueCountries.map((item) => (
                                <SelectItem key={item.flag} value={item.name}>
                                    <div className=" flex justify-start items-center gap-2">
                                        <ReactCountryFlag
                                            countryCode={item.flag}
                                            alt={item.flag}
                                            svg
                                            style={{
                                                marginRight: "8px",
                                                width: "18px",
                                                height: "18px",
                                            }}
                                        />
                                        {item.name}
                                    </div>
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[200px] rounded-md p-2 h-[42px] bg-white border border-gray-500">
                        <SelectValue placeholder="Compound name" />
                    </SelectTrigger>
                    <SelectContent>
                        {leads &&
                            uniqueLeads.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[200px] rounded-md p-2 h-[42px] bg-white border border-gray-500">
                        <SelectValue placeholder="Compound Ref" />
                    </SelectTrigger>
                    <SelectContent>
                        {leads &&
                            uniCompoundRefs.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[200px] rounded-md p-2 h-[42px] bg-white border border-gray-500">
                        <SelectValue placeholder="Unit Ref" />
                    </SelectTrigger>
                    <SelectContent>
                        {leads &&
                            uniqeUnitRefs.map((item) => (
                                <SelectItem
                                    key={item}
                                    value={item || "unknown"}
                                >
                                    {item}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default FIlter;

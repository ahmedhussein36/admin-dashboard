import React from "react";
import Select from "react-select";
import { useCities } from "@/app/hooks/useCIties";

export type CitySelectValue = {
    id: string;
    name: string;
    value: string;
};

interface CitySelectProps {
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void;
    isFilter?: boolean;
    isSearchable?: boolean;
    label?: string;
}

const CitySelect: React.FC<CitySelectProps> = ({
    value,
    onChange,
    isFilter,
    label,
    isSearchable,
}) => {
    const { getAll } = useCities();

    return (
        <div>
            {!isFilter ? <span className=" ">{label}</span> : ""}

            <Select
                value={value}
                onChange={(value) => onChange(value as CitySelectValue)}
                isClearable
                isSearchable={isSearchable}
                options={getAll()}
                placeholder="المدينة"
                formatOptionLabel={({ value }) => <div>{value}</div>}
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
    );
};

export default CitySelect;

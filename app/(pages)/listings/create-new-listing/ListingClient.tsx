import React, { FC } from "react";
import { SafeArea, SafeCompound, SafeDeveloper } from "@/app/types";
import AddNewProperty from "@/app/components/add-new-property/AddNewProperty";

interface Props {
    compounds: SafeCompound[];
    developers: SafeDeveloper[];
    areas: SafeArea[];
}

const Client: FC<Props> = ({ developers, areas, compounds }) => {
    return (
        <>
            <AddNewProperty
                areas={areas}
                developers={developers}
                compounds={compounds}
            />
        </>
    );
};
export default Client;

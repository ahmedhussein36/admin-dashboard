import React, { FC } from "react";
import {
    lightArea,
    lightCompond,
    lightDeveloper,
    lightProperty,
} from "@/app/types";
import AddNewProperty from "@/app/components/add-new-property/AddNewProperty";

interface Props {
    compounds: lightCompond[];
    listings: lightProperty[];
    developers: lightDeveloper[];
    areas: lightArea[];
}

const Client: FC<Props> = ({ developers, areas, compounds, listings }) => {
    return (
        <>
            <AddNewProperty
                areas={areas}
                listings={listings}
                developers={developers}
                compounds={compounds}
            />
        </>
    );
};
export default Client;

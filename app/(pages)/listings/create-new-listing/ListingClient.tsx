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
    count: number;
}

const Client: FC<Props> = ({ developers, areas, compounds, count }) => {
    return (
        <>
            <AddNewProperty
                areas={areas}
                developers={developers}
                compounds={compounds}
                count={count}
            />
        </>
    );
};
export default Client;

import getareaById from "@/app/actions/getAreaById";
import Client from "./Client";
import { SafeArea } from "@/app/types";

interface IParams {
    slug: string;
}

const Update = async ({ params }: { params: IParams }) => {
    const area = await getareaById({ slug: params.slug });

    const handler = () => {
        console.log("hello =>", area?.title);
    };

    handler();
    return (
        <>
            <Client area={area as any} />
        </>
    );
};

export default Update;

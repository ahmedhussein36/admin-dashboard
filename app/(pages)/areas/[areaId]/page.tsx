import getareaById from "@/app/actions/getAreaById";
import getLibrary from '@/app/actions/getLibrary'
import Client from "./Client";

interface IParams {
    areaId: string;
}

const Update = async ({ params }: { params: IParams }) => {
    const area: any = await getareaById(params);


    return (
        <>
            <Client area={area} />
        </>
    );
};

export default Update;

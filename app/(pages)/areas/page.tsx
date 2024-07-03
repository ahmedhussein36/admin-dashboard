import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import getAreas from "@/app/actions/getAreas";
import AreaClient from "./AreaClient";
import { IParams } from "@/app/actions/getProperties";
import Sorting from "@/app/components/Sorting";

interface AreasPageProps {
    searchParams: IParams;
}

const AreasPage = async ({ searchParams }: AreasPageProps) => {
    const areas = await getAreas(searchParams);
    return (
        <div>
            <Container>
                <div className="flex gap-4 justify-between items-center my-2 mb-2 w-full">
                    <div>
                        <Heading
                            title={"Areas"}
                            subtitle={`Areas available: ${areas.length}`}
                        />
                    </div>
                </div>
                <div className=" flex justify-between items-center ">
                    <Sorting data={areas} parent="areas" />
                </div>

                <AreaClient areas={areas as any} />
            </Container>
        </div>
    );
};

export default AreasPage;

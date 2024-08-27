import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";
import { IParams } from "@/app/actions/getDevelopers";
import Sorting from "@/app/components/Sorting";
import TagClient from "./TagClient";
import getTags from "@/app/actions/getTags";

interface DevelopersPageProps {
    searchParams: IParams;
}

const TagsPage = async ({ searchParams }: DevelopersPageProps) => {
    const tags = await getTags(searchParams);

    return (
        <div>
            <Container>
                <div className="flex gap-4 justify-between items-center my-2 mb-2 w-full">
                    <div>
                        <Heading
                            title={"Tags"}
                            subtitle={`tags available: ${tags.length}`}
                        />
                    </div>
                </div>
                <ClientOnly>
                    <TagClient tags={tags as any} />
                </ClientOnly>
            </Container>
        </div>
    );
};

export default TagsPage;

import Container from "@/app/components/Container";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/app/components/Heading";
import getPosts, { IParams } from "@/app/actions/getPosts";
import PostClient from "./PostClient";
import Sorting from "@/app/components/Sorting";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { redirect } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";
import Filter from "@/app/components/home/Filter";

interface DevelopersPageProps {
    searchParams: IParams;
}

const PostsPage = async ({ searchParams }: DevelopersPageProps) => {
    const posts = await getPosts(searchParams);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/login");
    }

    return (
        <div className="">
            <Container>
                <div className=" flex gap-4 justify-between items-center my-2 w-full">
                    <div>
                        <Heading
                            title={"Posts"}
                            subtitle={`posts available: ${posts.length}`}
                        />
                    </div>
                    <div className="my-1 cursor-pointer">
                        <Link
                            href={"/blog/posts/create-new-post"}
                            className="flex gap-2 justify-center items-center py-3 px-5 rounded-md border-2 border-slate-400 bg-slate-100"
                        >
                            <FaPlus size={"14"} color="blue" />{" "}
                            <p>Add new Post</p>
                        </Link>
                    </div>
                </div>
                <div className=" my-2 flex justify-between items-center ">
                    <Sorting data={posts} parent="posts" />
                </div>
                <div className="my-2 flex justify-center items-center ">
                    {/* <Filter /> */}
                </div>
                <ClientOnly>
                    <PostClient posts={posts as any} />
                </ClientOnly>
            </Container>
        </div>
    );
};

export default PostsPage;

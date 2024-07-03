import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import TopLoader from "./components/TopLoader";
import "./globals.css";
import { MainSidebar } from "./components/header/Sidebar";
import Navbar from "./components/header/Navbar";
import Login from "./components/add-new-property/Login";

export const metadata = {
    title: "Remaxroyal : Dashboard",
    description: "RemaxRoyal admin dashboard",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return <Login />;

    return (
        <html lang="en">
            <body className="">
                <TopLoader />
                <div className=" flex flex-col">
                    <div className=" z-10">
                        <ToasterProvider />
                    </div>
                    <main className=" flex justify-start items-start relative gap-2 transition-all">
                        <div
                            className="
                                                transition-all 
                                                md:h-[calc(100vh)] 
                                                w-fit
                                                bottom-24 md:left-0 
                                                md:sticky top-0 z-50"
                        >
                            <MainSidebar currentUser={currentUser} />
                        </div>

                        <div className="flex-grow ml-2 overflow-auto h-[99vh]">
                            <Navbar currentUser={currentUser} />
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}

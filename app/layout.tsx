import AreaModal from "@/app/components/modals/AreaModal";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import TopLoader from "./components/TopLoader";
import "./globals.css";
import { MainSidebar } from "./components/header/Sidebar";
import DeveloperModal from "./components/modals/DeveloperModal";
import Navbar from "./components/header/Navbar";
import UserMenu from "./components/header/UserMenu";
import Login from "./components/add-new-property/Login";

export const metadata = {
    title: "Remax royal",
    description: "Remax Royal all homes you search for",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={`relative`}>
                <TopLoader />
                <div className=" flex flex-col">
                    <div className=" z-10">
                        <AreaModal />
                        <LoginModal />
                        <RegisterModal />
                        <ToasterProvider />
                        <DeveloperModal />
                    </div>
                    {currentUser ? (
                        <main className=" flex justify-start items-start relative gap-2">
                            <div className="w-full h-[calc(100vh)] md:w-[90px] md:min-w-[90px] bottom-24 md:left-0 md:sticky top-0 z-50">
                                <MainSidebar />
                            </div>

                            <div className="flex-grow ml-2 overflow-auto h-[99vh]">
                                <Navbar currentUser={currentUser} />
                                {children}
                            </div>
                        </main>
                    ) : (
                        <Login />
                    )}
                </div>
            </body>
        </html>
    );
}

import React, { useEffect, useRef, useState, type JSX } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Cog, History, LayoutGrid, LogOut, Send } from "lucide-react";
import { useAuth } from "../MainRoutes/AuthContent";

interface MasterHeaderProps { }

const MasterHeader: React.FC<MasterHeaderProps> = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const [profileMenu, setProfileMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Check if click is outside menu AND profile image
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                imgRef.current &&
                !imgRef.current.contains(event.target as Node)
            ) {
                setProfileMenu(false);
            }
        }

        if (profileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenu]);

    const roleMenus: Record<
        string,
        { label: string; path: string; icon?: JSX.Element; ActivePath?: string[] }[]
    > = {
        user: [
            {
                label: "Dashboard",
                path: "/user/dashboard",
                icon: <LayoutGrid width={18} height={18} />,
                ActivePath: ["/user/dashboard"]
            },
            {
                label: "Configuration",
                path: "/user/configuration",
                icon: <Cog width={18} height={18} />,
                ActivePath: ["/user/configuration"]
            },
            {
                label: "Send Mail",
                path: "/user/send-mail",
                icon: <Send width={18} height={18} />,
                ActivePath: ["/user/send-mail"]
            },
            {
                label: "Mail History",
                path: "/user/mail-history",
                icon: <History width={18} height={18} />,
                ActivePath: ["/user/mail-history"]
            },
            {
                label: "Logout",
                path: "/logout",
                icon: <LogOut color="red" width={18} height={18} />,
                ActivePath: ["/logout"]
            },
        ],
    };
    const { role } = useAuth();

    const menus = role?.type ? roleMenus[role.type] || [] : [];

    return (
        <div className="relative w-full h-screen overflow-auto px-4 lg:px-23">
            {/* Main Content */}
            <Outlet />

            {/* Right Side Floating Tabs */}
            <div className="hidden lg:flex fixed top-1/3 left-4 z-50 flex-col gap-2">
                <div className="bg-[#F5F2F2] border border-[#576A8F] flex flex-col shadow-2xl px-2 gap-2 py-2 justify-center items-center rounded-2xl">

                    {menus.map((menu) => (
                        <div
                            key={menu.label}
                            onClick={() => {
                                if (menu.path === "/logout") {
                                    localStorage.clear();
                                    navigate("/");
                                } else {
                                    navigate(menu.path);
                                }
                            }}
                            className="relative group cursor-pointer"
                        >
                            {/* Icon */}
                            <div
                                className={`${menu.ActivePath?.includes(location.pathname)
                                    ? "bg-[#04387a] text-white"
                                    : "hover:bg-[#E6E6E6] text-[#37353E]"
                                    } p-4 rounded-xl transition-all duration-200`}
                            >
                                {menu.icon}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute border left-16 top-1/2 -translate-y-1/2 whitespace-nowrap 
                        bg-[#04387a] text-white text-sm px-3 py-1 rounded-md shadow-lg
                        opacity-0 group-hover:opacity-100 -translate-x-2.5 
                        group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                                {menu.label}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* 📱 Mobile Bottom Navbar */}
            <div className="flex lg:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-90 flex-col gap-2">
                <div className="bg-[#F5F2F2] border border-[#576A8F] flex flex-row shadow-2xl px-2 gap-2 py-2 justify-center items-center rounded-2xl cursor-pointer">
                    {menus.map((menu) => (
                        <div
                            key={menu.label}
                            onClick={() => navigate(menu.path)}
                            className={`${menu.ActivePath?.includes(location.pathname)
                                ? "bg-[#04387a] text-white"
                                : "hover:bg-[#E6E6E6] text-[#37353E]"
                                } p-4 rounded-xl`}
                        >
                            {menu.icon}
                        </div>
                    ))}
                </div>
            </div>


        </div>

    );
};

export default MasterHeader;
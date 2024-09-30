import { Header } from "@/components/admin/Header";
import { Sidebar } from "@/components/admin/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Outlet, useLocation } from "react-router-dom";

import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
const sidebarNavItems = [
    {
        title: "모델관리",
        to: "/admin/model",
    },
    {
        title: "회사관리",
        to: "/admin/company",
    },
    {
        title: "현장관리",
        to: "/admin/field",
    },
    {
        title: "tps관리",
        to: "/admin/serial",
    },
];
export const AdminLayout = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.startsWith(path);

    return (
        // <div className="flex h-screen flex-col">
        //     <header className="p-4 sticky top-0 z-10">
        //         <Header />
        //     </header>

        //     <div className="flex flex-1">
        //         <aside className="w-64 flex h-screen sticky top-0">
        //             <Sidebar items={sidebarNavItems} />
        //         </aside>

        //         <div className="flex-1 p-6 overflow-auto">
        //             <Outlet />
        //         </div>
        //     </div>
        // </div>
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link to="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                        <h2>GoodMorning</h2>
                    </Link>
                    <form className="">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search products..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
                        </div>
                    </form>
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link
                                to="/admin/dashboard"
                                className={cn(
                                    isActive("/admin/dashboard") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                대시보드
                            </Link>
                            <Link
                                to="/admin/company"
                                className={cn(
                                    isActive("/admin/company") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                회사관리
                            </Link>
                            <Link
                                to="/admin/model"
                                className={cn(isActive("/admin/model") ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
                            >
                                모델관리
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <nav className="ml-auto flex-1 sm:flex-initial flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            to="/admin/dashboard"
                            className={cn(isActive("/admin/dashboard") ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
                        >
                            대시보드
                        </Link>
                        <Link
                            to="/admin/company"
                            className={cn(isActive("/admin/company") ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
                        >
                            회사관리
                        </Link>
                        <Link
                            to="/admin/model"
                            className={cn(isActive("/admin/model") ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
                        >
                            모델관리
                        </Link>
                    </nav>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <Outlet />
            </main>
        </div>
    );
};

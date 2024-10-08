import { useAppSelector } from "@/app/hooks";
import { selectName } from "@/features/admin/company/settingCompanySlice";
import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

export const AdminSettingLayout = () => {
    const location = useLocation();
    const { id } = useParams();
    const isActive = (path: string) => location.pathname.startsWith(path);
    const name = useAppSelector(selectName);
    return (
        <>
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">{name} 설정</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
                    <Link to="user" className={cn(isActive(`/admin/company/setting/${id}/user`) ? "font-semibold text-primary" : "")}>
                        사용자 관리
                    </Link>
                    <Link to="field" className={cn(isActive(`/admin/company/setting/${id}/field`) ? "font-semibold text-primary" : "")}>
                        현장 관리
                    </Link>
                    <Link to="unit" className={cn(isActive(`/admin/company/setting/${id}/unit`) ? "font-semibold text-primary" : "")}>
                        유닛 관리
                    </Link>
                </nav>
                <div className="grid gap-6">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

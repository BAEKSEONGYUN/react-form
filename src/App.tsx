import "./App.css";
import { Counter } from "./features/counter/Counter";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Serial } from "./pages/admin/serial/SerialPage";
import { AddSerial } from "./pages/admin/serial/AddSerialPage";
import { AdminLayout } from "./layout/admin/AdminLayout";
import { ModelPage } from "./pages/admin/model/ModelPage";
import { AddModelPage } from "./pages/admin/model/AddModelPage";
import { CompanyPage } from "./pages/admin/company/CompanyPage";
import { EmployeePage } from "./pages/admin/employee/EmployeePage";
import { FieldPage } from "./pages/admin/field/FieldPage";
import { AddCompanyPage } from "./pages/admin/company/AddCompanyPage";
import { SettingEmployeePage } from "./pages/admin/company/setting/employee/SettingEmployeePage";
import { AdminDashboardPage } from "./pages/admin/dashboard/DashboardPage";
import { AdminSettingLayout } from "./layout/admin/AdminSettingLayout";
import { SettingUnitPage } from "./pages/admin/company/setting/unit/SettingUnitPage";
import { SettingFieldPage } from "./pages/admin/company/setting/field/SettingFieldPage";
import { AddSettingEmployeePage } from "./pages/admin/company/setting/employee/AddSettingEmployeePage";
import { AddSettingUnitPage } from "./pages/admin/company/setting/unit/AddSettingUnitPage";
import { AddSeetingFieldPage } from "./pages/admin/company/setting/field/AddSettingFieldPage";
import { LoginPage } from "./pages/login/LoginPage";
import { useEffect, useState } from "react";

function App() {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null); // token을 null로 초기화
    const [loading, setLoading] = useState(true); // 초기 로딩 상태 추가

    useEffect(() => {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (user && user.access_token) {
            setToken(user.access_token); // 토큰을 상태에 저장
        } else {
            setToken(null);
        }

        setLoading(false); // 로딩이 완료되면 상태를 false로 변경
    }, []);

    // Protected Route를 별도의 함수로 관리
    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        if (loading) {
            return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
        }
        if (!token) {
            // 토큰이 없으면 로그인 페이지로 리다이렉트
            return <Navigate to="/login" replace />;
        }
        return children; // 토큰이 있으면 보호된 경로로 이동
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to="admin" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/counter" element={<Counter />} />

            {/* /admin 경로를 ProtectedRoute로 감싸서 보호 */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/admin" element={<AdminLayout />}></Route>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="serial" element={<Serial />} />
                <Route path="serial/add" element={<AddSerial />} />
                <Route path="model" element={<ModelPage />} />
                <Route path="model/add" element={<AddModelPage />} />
                <Route path="company" element={<CompanyPage />} />
                <Route path="company/add" element={<AddCompanyPage />} />
                <Route path="company/setting/:id" element={<AdminSettingLayout />}>
                    <Route index element={<Navigate to="employee" replace />} />
                    <Route path="employee" element={<SettingEmployeePage />} />
                    <Route path="employee/add" element={<AddSettingEmployeePage />} />
                    <Route path="unit" element={<SettingUnitPage />} />
                    <Route path="unit/add" element={<AddSettingUnitPage />} />
                    <Route path="field" element={<SettingFieldPage />} />
                    <Route path="field/add" element={<AddSeetingFieldPage />} />
                </Route>
                <Route path="employee" element={<EmployeePage />} />
                <Route path="field" element={<FieldPage />} />
            </Route>
        </Routes>
    );
}

export default App;

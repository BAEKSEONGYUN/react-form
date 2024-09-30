import "./App.css";

import { Counter } from "./features/counter/Counter";
import { Quotes } from "./features/quotes/Quotes";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { SignInPage } from "./pages/admin/auth/SignInPage";
import { SignUpPage } from "./pages/admin/auth/SignUpPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="admin" replace />} />
                <Route path="/counter" element={<Counter />} />

                {/* /* 로그인 페이지 경로 */}
                <Route path="signIn" element={<SignInPage />} />
                {/* /* 회원가입 페이지 경로 */}
                <Route path="signUp" element={<SignUpPage />} />
                {/* nested routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    {/* 그냥 /admin 경로로 접근하면 /admin/serial로 replace */}
                    <Route index element={<Navigate to="dashboard" replace />} />

                    {/* /* 대시보드 페이지 경로 */}
                    <Route path="dashboard">
                        <Route index element={<AdminDashboardPage />} />
                    </Route>
                    {/* /* 센서 페이지 경로 */}
                    <Route path="serial">
                        {/* /* 센서 페이지 메인 경로 */}
                        <Route index element={<Serial />} />
                        {/* /* 센서 등록 페이지 경로 */}
                        <Route path="add" element={<AddSerial />} />
                    </Route>
                    {/* /* 모델 페이지 경로 */}
                    <Route path="model">
                        {/* /* 모델 페이지 메인 경로 */}
                        <Route index element={<ModelPage />} />
                        {/* /* 모델 등록 페이지 경로 */}
                        <Route path="add" element={<AddModelPage />} />
                    </Route>
                    {/* /* 회사 페이지 경로*/}
                    <Route path="company">
                        {/* /* 회사 페이지 메인 경로 */}
                        <Route index element={<CompanyPage />} />
                        {/* /* 회사 등록 페이지 경로 */}
                        <Route path="add" element={<AddCompanyPage />} />
                        {/* /* 회사 설정 레이아웃 */}
                        <Route path="setting/:id" element={<AdminSettingLayout />}>
                            {/* /* 회사 설정 페이지 메인 경로가 */}
                            <Route index element={<Navigate to="employee" replace />} />
                            {/* /* 직원 페이지 */}
                            <Route path="user">
                                {/* /* 직원 페이지 메인 경로 */}
                                <Route index element={<SettingEmployeePage />} />
                                {/* /* 직원 등록 페이지 경로 */}
                                <Route path="add" element={<AddSettingEmployeePage />} />
                            </Route>
                            {/* /* 센서 페이지 경로 */}
                            <Route path="unit">
                                {/* /* 센서 페이지 메인 경로 */}
                                <Route index element={<SettingUnitPage />} />
                                {/* /* 센서 등록 페이지 경로 */}
                                <Route path="add" element={<AddSettingUnitPage />} />
                            </Route>
                            {/* /* 장소 페이지 경로 */}
                            <Route path="field">
                                {/* /* 장소 페이지 메인 경로 */}
                                <Route index element={<SettingFieldPage />} />
                                {/* /* 장소 등록 페이지 경로 */}
                                <Route path="add" element={<AddSeetingFieldPage />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;

import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuthUserMutation } from "@/features/admin/sign/signApiSlice";
import { setUser } from "@/features/admin/sign/signSlice";
import { useAppDispatch } from "@/app/hooks";
interface PrivateRouteProps {
    children: ReactNode; // children의 타입을 ReactNode로 지정
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
    // react-cookie의 useCookies 훅 사용
    const [cookies] = useCookies(["refresh_token"]);
    const refreshToken = cookies.refresh_token;
    const [authUser, { isLoading, data, isSuccess, error }] = useAuthUserMutation(); // Mutation 훅 사용
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        // refresh_token이 존재할 경우 유저 정보 요청
        if (refreshToken) {
            const fetchUserData = async () => {
                try {
                    const res = await authUser({ refresh_token: refreshToken }).unwrap(); // 토큰을 이용해 유저 정보 요청

                    dispatch(setUser(res.detail));
                    setIsUserLoaded(true); // 유저 정보가 성공적으로 로드된 경우
                } catch (err) {
                    console.error("Failed to load user data:", err);
                    setIsUserLoaded(false); // 오류 발생 시
                }
            };

            fetchUserData();
        } else {
            setIsUserLoaded(false);
        }
    }, [authUser, refreshToken]);
    // 쿠키에 refresh_token이 없으면 로그인 페이지로 리다이렉트
    if (!refreshToken || error) {
        return <Navigate to="/signIn" replace />;
    }

    // 유저 정보 로딩 중일 때 로딩 화면 표시
    if (!isUserLoaded || isLoading) {
        return <p>Loading user data...</p>;
    }

    // 토큰이 있으면 요청된 페이지 렌더링
    return children;
};

export default PrivateRoute;

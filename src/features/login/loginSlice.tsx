import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:8000";

// 로그인 요청에 필요한 필드 정의
interface LoginCredentials {
    email: string;
    password: string;
}

// API 요청의 응답 데이터 타입 정의
interface User {
    id: number;
    name: string;
    email: string;
}

// 상태 관리 타입 정의
interface LoginState {
    user: User | null; // 로그인 성공 시 유저 정보가 들어감
    status: "idle" | "loading" | "succeeded" | "failed"; // 요청 상태
    error: string | null; // 에러 메시지, 없으면 null
}

// 초기 상태 정의
const initialState: LoginState = {
    user: null,
    status: "idle",
    error: null,
};

// 로그인 API 호출 함수
export const loginUser = createAsyncThunk(
    "login/loginUser",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        console.log(email, password);
        const formData = new URLSearchParams();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));

            return data; // 성공 시 반환되는 유저 데이터
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null; // 이전 에러 메시지 초기화
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload; // 성공 시 유저 데이터 저장
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string; // 실패 시 에러 메시지 저장
            });
    },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

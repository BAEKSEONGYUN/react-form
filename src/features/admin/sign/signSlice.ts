import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type UserIfo = {
    id: string;
    email: string;
    username: string;
    password: string;
};
const initialState: UserIfo = {
    id: '',
    email: '',
    username: "",
    password: ''
}
export const settingUserInfoSlice = createSlice({
    name: "sign",
    initialState,
    reducers: create => ({
        setUser: create.reducer((state, action: PayloadAction<UserIfo>) => {

            return action.payload
        },)
    }),
    selectors: {
        selectUserInfo: sign => sign.username
    }
})
// action creator는 각 케이스 리듀서 함수에 대해 생성됩니다.
export const { setUser } =
    settingUserInfoSlice.actions
// slice.selectors가 반환하는 셀렉터는 첫 번째 인자로 루트 상태를 받습니다.
export const { selectUserInfo } = settingUserInfoSlice.selectors
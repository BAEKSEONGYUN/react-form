import { combineSlices, configureStore } from '@reduxjs/toolkit' // CombineSlices: Slice(상태 관리 조각)을 합치는 역할을 합니다. 각 슬라이스는 특정 기능에 대한 상태 및 리듀서를 포함하고 있습니다.
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { counterSlice } from '@/features/counter/counterSlice'; // Counter를 관리하는 Slice (상태 관리 조각)
import { quotesApiSlice } from '@/features/quotes/quotesApiSlice'; // quote데이터를 관리하는 슬라이스
import { setupListeners } from '@reduxjs/toolkit/query';
import { settingCompanySlice } from '@/features/admin/company/settingCompanySlice';
import { AdminSignUpApiSlice } from '@/features/admin/sign/signApiSlice';
import { tokenSlice } from '@/store/Auth';
import { settingUserInfoSlice } from '@/features/admin/sign/signSlice';
import { ModelApiSlice } from '@/features/admin/model/modelApiSlice';


// combineSlices를 사용하여 counterSlice와 quotesApiSlice를 하나의 rootReducer로 만듭니다. 
// 이 리듀서는 Redux 스토어의 최상위 리듀서가 됩니다.
const rootReducer = combineSlices(counterSlice, quotesApiSlice, settingCompanySlice, AdminSignUpApiSlice, tokenSlice, settingUserInfoSlice, ModelApiSlice);

// rootReducer에서 반환되는 상태를 추론하여, 스토어의 상태 타입을 정의합니다.
export type RootState = ReturnType<typeof rootReducer>;

// makeStore: 스토어를 생성하는 함수로, 테스트와 재사용을 위해 preloadedState(초기 상태)를 선택적으로 전달할 수 있습니다.
export const makeStore = (preloadedState?: Partial<RootState>) => {
    // configureStoer: Redux Toolki에서 제공하는 함수로, 스토어에서 설정을 쉽게 할 수 있도록 도와줍니다.
    const store = configureStore({
        // reducer: 앞서 정의한 rootReducer를 스토어에 전달하여 상태와 리듀서를 연결합니다.
        reducer: rootReducer,
        // middleware: 기본 미들웨어를 설정하는 동시에 quotesApiSlice에서 제공하는 미들웨어를 추가합니다. 이 미들웨어는 API 캐싱, 자동 재요청 등과 같은 기능을 지원합니다.
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware().concat(quotesApiSlice.middleware, AdminSignUpApiSlice.middleware, ModelApiSlice.middleware)
        },
        preloadedState
    })
    // API 통신에서 포커스가 변경되거나 네트워크가 다시 연결되었을 때 자동으로 데이터를 다시 가져오는 기능을 설정합니다.
    setupListeners(store.dispatch);
    return store;
}
// store 생성
export const store = makeStore();


// AppStore 스토어의 타입을 정의합니다.
export type AppStore = typeof store;
// 스토어에서 사용되는 dispatch 타입을 정의합니다. 이는 비동기 작업을 처리할 때 유용합니다.
export type AppDispatch = AppStore["dispatch"]
// 비동기 작업을 정의하는 데 사용되는 ThunkAction의 타입입니다. Thunk는 비동기 작업을 처리하는 미들웨어 입니다.
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>
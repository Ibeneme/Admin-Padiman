import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import dashboardReducer from './Dashboard/Dashboard'


const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
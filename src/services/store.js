import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";
import { summaryApi } from "./summary";

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [summaryApi.reducerPath]: summaryApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([articleApi.middleware, summaryApi.middleware])
});
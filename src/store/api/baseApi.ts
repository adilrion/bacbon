import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.omdbapi.com/",
        // prepareHeaders: (headers) => {
        //     const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        //     if (apiKey) {
        //         headers.set("apikey", apiKey);
        //     }
        //     return headers;
        // },
    }),
    tagTypes: ["Movie"],
    endpoints: () => ({}),
});

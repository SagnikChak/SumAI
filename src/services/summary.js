import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const rapidApiKey = import.meta.env.VITE_RAPID_API_O_ARTICLE_KEY;
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const summaryApi = createApi({
  reducerPath: "summaryApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    baseUrl:
      "https://article-data-extraction-and-summarization.p.rapidapi.com/",
    method: "POST",
    // mode: 'no-cors',
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("X-RapidAPI-Key", rapidApiKey);
      // headers.set("X-RapidAPI-Host", "article-extractor-and-summarizer.p.rapidapi.com");
      headers.set(
        "X-RapidAPI-Host",
        "article-data-extraction-and-summarization.p.rapidapi.com"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getText: builder.query({
      query: (params) =>
        // `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        `/summary?text=${encodeURIComponent(
          params.articleUrl
        )}&language=english`,
    }),
  }),
});

export const { useLazyGetTextQuery } = summaryApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const rapidApiKey = import.meta.env.VITE_RAPID_API_O_ARTICLE_KEY;
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    baseUrl:
      "https://article-data-extraction-and-summarization.p.rapidapi.com/",
    method: "GET",
    // mode: 'no-cors',
    prepareHeaders: (headers) => {
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
    getSummary: builder.query({
      query: (params) =>
        // `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        `/article?url=${encodeURIComponent(
          params.articleUrl
        )}&summarize=true&summarize_language=english`,
    }),
    getArticle: builder.query({
      query: (params) => ({
          url: "/summary",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin":
              "https://article-data-extraction-and-summarization.p.rapidapi.com/",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
          body: {
            text: params.articleText,
            // JSON.stringify(params.articleText)
          },
        }),
    }),
  }),
});

export const { useLazyGetSummaryQuery, useLazyGetArticleQuery } = articleApi;
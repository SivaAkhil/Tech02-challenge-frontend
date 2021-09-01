// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const restApi = createApi({
//   reducerPath: "restApi",

//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_BACKEND_URL,
//     // prepareHeaders: (headers, { getState }) => {
//     //   const token = getState().auth.token;

//     //   if (token) {
//     //     headers.set("authorization", `Bearer ${token}`);
//     //   }
//     // },
//   }),

//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (body) => ({
//         url: "/api/users/login",
//         method: "POST",
//         body: body,
//       }),
//     }),

//     signup: builder.mutation({
//       query: (body) => ({
//         url: "/api/users/signup",
//         method: "POST",
//         body: body,
//       }),
//     }),
//   }),
// });

// export const { useSignupMutation, useLoginMutation } = restApi;

// export default restApi;

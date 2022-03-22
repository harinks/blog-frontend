import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-backend-nks.herokuapp.com/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["User", "Blog"],

    endpoints: (builder) => ({

        //login user
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/api/login',
                method: 'POST',
                body: user,
            }),
        }),

        //register user
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/api/register',
                method: 'POST',
                body: user,
            })
        }),

        //logout user
        logoutUser: builder.mutation({
            query:() => ({
                url:'/api/logout',
                method: 'DELETE',
            })
        }),

        //blog routes

        //create blog
        createBlog: builder.mutation({
            query: (blog) => ({
                url: '/api/blog/create',
                method: 'POST',
                body: blog,
            }),
            invalidatesTags: ["Blog"],
        }),

        //get all blogs
        getAllBlogs: builder.query({
            query: () => ({
                url: '/api/blogs', 
            }),
            providesTags: ["Blog"],
        }),

        //get single blog details
        getSingleBlog: builder.query({
            query: (id) => ({
                url: `/api/blogs/${id}`,
            }),
            providesTags: ["Blog"],
        }),

        //get single user blogs
        getUserBlogs: builder.query({
            query: () => ({
                url:'/api/blogs/me',
            }),
            providesTags: ["Blog"],
        }),
        
        //delete blog
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/api/blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),

        //update blog
        updateBlog: builder.mutation({
            query: ({id, ...blog}) => ({
                url: `/api/blogs/${id}`,
                method: "PATCH",
                body: blog,
            }),
            invalidatesTags: ["Blog"],
        })
    })
})

export default appApi;

export const { 
    useLoginUserMutation, 
    useSignupUserMutation, 
    useLogoutUserMutation, 
    useCreateBlogMutation, 
    useGetAllBlogsQuery, 
    useGetSingleBlogQuery,
    useGetUserBlogsQuery,
    useDeleteBlogMutation,
    useUpdateBlogMutation
} = appApi;
import { useRequest } from 'cosey';

const Api = {
  PostsResource: '/blog/posts',
  PostCommentsResource: '/blog/post-comments',
  PosttypesResource: '/blog/post-types',
};

export const usePostsApi = () => {
  return useRequest().map({
    getPosts: (http) => (params?: any) => {
      return http.get(Api.PostsResource, {
        params,
      });
    },

    getPost: (http) => (id: number) => {
      return http.get(`${Api.PostsResource}/${id}`);
    },

    addPost: (http) => (data: any) => {
      return http.post(Api.PostsResource, data);
    },

    updatePost: (http) => (id: number, data: any) => {
      return http.patch(`${Api.PostsResource}/${id}`, data);
    },

    deletePost: (http) => (id: number) => {
      return http.delete(`${Api.PostsResource}/${id}`);
    },
  });
};

export const usePostCommentsApi = () => {
  return useRequest().map({
    getPostComments: (http) => (params?: any) => {
      return http.get(Api.PostCommentsResource, {
        params,
      });
    },

    getPostComment: (http) => (id: number) => {
      return http.get(`${Api.PostCommentsResource}/${id}`);
    },

    addPostComment: (http) => (data: any) => {
      return http.post(Api.PostCommentsResource, data);
    },

    updatePostComment: (http) => (id: number, data: any) => {
      return http.patch(`${Api.PostCommentsResource}/${id}`, data);
    },

    deletePostComment: (http) => (id: number) => {
      return http.delete(`${Api.PostCommentsResource}/${id}`);
    },
  });
};

export const usePosttypesApi = () => {
  return useRequest().map({
    getPosttypes: (http) => (params?: any) => {
      return http.get(Api.PosttypesResource, {
        params,
      });
    },

    getPosttype: (http) => (id: number) => {
      return http.get(`${Api.PosttypesResource}/${id}`);
    },

    addPosttype: (http) => (data: any) => {
      return http.post(Api.PosttypesResource, data);
    },

    updatePosttype: (http) => (id: number, data: any) => {
      return http.patch(`${Api.PosttypesResource}/${id}`, data);
    },

    deletePosttype: (http) => (id: number) => {
      return http.delete(`${Api.PosttypesResource}/${id}`);
    },
  });
};

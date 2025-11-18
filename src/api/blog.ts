import { http } from 'cosey';

const Api = {
  PostsResource: '/blog/posts',
  PostCommentsResource: '/blog/post-comments',
  PosttypesResource: '/blog/post-types',
};

export default {
  getPosts: (params?: any) => {
    return http.get(Api.PostsResource, {
      params,
    });
  },

  getPost: (id: number) => {
    return http.get(`${Api.PostsResource}/${id}`);
  },

  addPost: (data: any) => {
    return http.post(Api.PostsResource, data);
  },

  updatePost: (id: number, data: any) => {
    return http.patch(`${Api.PostsResource}/${id}`, data);
  },

  deletePost: (id: number) => {
    return http.delete(`${Api.PostsResource}/${id}`);
  },

  getPostComments: (params?: any) => {
    return http.get(Api.PostCommentsResource, {
      params,
    });
  },

  getPostComment: (id: number) => {
    return http.get(`${Api.PostCommentsResource}/${id}`);
  },

  addPostComment: (data: any) => {
    return http.post(Api.PostCommentsResource, data);
  },

  updatePostComment: (id: number, data: any) => {
    return http.patch(`${Api.PostCommentsResource}/${id}`, data);
  },

  deletePostComment: (id: number) => {
    return http.delete(`${Api.PostCommentsResource}/${id}`);
  },

  getPosttypes: (params?: any) => {
    return http.get(Api.PosttypesResource, {
      params,
    });
  },

  getPosttype: (id: number) => {
    return http.get(`${Api.PosttypesResource}/${id}`);
  },

  addPosttype: (data: any) => {
    return http.post(Api.PosttypesResource, data);
  },

  updatePosttype: (id: number, data: any) => {
    return http.patch(`${Api.PosttypesResource}/${id}`, data);
  },

  deletePosttype: (id: number) => {
    return http.delete(`${Api.PosttypesResource}/${id}`);
  },
};

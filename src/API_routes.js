export const API_address = "https://localhost:44363";

//Routes
//User
export const getUserProfileById_API_route = '/api/v1/user/userprofile/id';
export const patchUserProfileData_API_route = '/api/v1/user';
//FileStorage
export const fileStorageName_API_route = "/api/v1/fileStorage/file/name/";
export const fileStorageGetUserImage = '/api/v1/filestorage/file/id';
//Account
export const login_API_route = "/api/v1/account/login";
export const register_API_route = "/api/v1/user";
//LikedPost
export const likePost_API_route = "/api/v1/likedpost/post/id/";
export const likedPost_create_or_edit_API_route = "/api/v1/likedpost/create_or_edit";
//PostCategory
export const postCategory_GET_API_route = '/api/v1/postcategory';
//Post
export const getPostByUserId = '/api/v1/post'
export const uploadPost_API_route = "/api/v1/post/withpostcategoryname";
export const getUserPosts_APU_route = '/api/v1/post/user/id';
export const patchPost_API_route = '/api/v1/post/postcategoryname';
export const deletePost_API_route = '/api/v1/post'
//Comment
export const getCommentsByPostId_API_route = '/api/v1/comment/post';
export const postComment_API_route = '/api/v1/comment';
export const patchComment_API_route = '/api/v1/comment';
export const deleteComment_API_route = '/api/v1/comment';
export const getCommentById_API_route = '/api/v1/comment';
//LikedComment
export const getLikedComment_APi_route = '/api/v1/likedcomment/comment/id';
export const patchLikedComment_API_route = '/api/v1/likedcomment/create_or_edit'




//Functions
//const jwt = JSON.parse(window.localStorage.getItem('jwt'));
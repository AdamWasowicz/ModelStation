class PostDTO
{
    Id;
    Title;
    Text;
    Likes;
    CreationDate;

    IsActive;
    IsBanned;

    Files;
    Comments;

    UserId;
    UserName;

    PostCategoryId;
    PostCategoryName;


    constructor(Id, Title, Text, Likes, CreationDate,
        IsActive, IsBanned, Files, Comments,
        UserId, UserName, PostCategoryId, PostCategoryName)
        {
            this.Id = Id;
            this.Title = Title;
            this.Text = Text;
            this.Likes = Likes;
            this.CreationDate = CreationDate;

            this.IsActive = IsActive;
            this.IsBanned = IsBanned;

            this.Files = Files;
            this.Comments = Comments;
            
            this.UserId = UserId;
            this.UserName = UserName;

            this.PostCategoryId = PostCategoryId;
            this.PostCategoryName = PostCategoryName;
        }
}

export default PostDTO;
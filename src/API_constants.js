export const AccessLevels = {
    IsUser: 3, 
    IsModerator: 6, 
    IsAdmin: 10
};

export const RoleIds = {
    User: 1,
    Moderator: 2,
    Admin: 3
};

export const PostValidationParams = {
    Title_Min: 8,
    Title_Max: 64,

    Text_Min: 0,
    Text_Max: 256,
}

export const CommentValidationParams = {
    Text_Min: 1,
    Text_Max: 256
}

export const PostCategoryValidationParams = {
    Name_Min: 0,
    Name_Max: 32,

    Description_Min: 8,
    Description_Max: 256
}

export const UserValidationParams = {
    Name_Min: 0,
    Name_Max: 64,

    Surname_Min: 0,
    Surname_Max: 64,

    UserName_Min: 8,
    UserName_Max: 64,

    Description_Min: 0,
    Description_Max: 256,

    Password_Min: 8,
    Password_Max: 64
}
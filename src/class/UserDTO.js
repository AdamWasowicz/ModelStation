class UserDTO
{
    Id;
    Gender;
    UserName;
    Name;
    Surname;
    RegisterDate;
    Description;

    IsActive;
    IsBanned;

    Photo;

    
    constructor(Id, Gender, UserName, Surname, RegisterDate, Description,
        IsActive, IsBanned, Photo)
    {
        this.Id = Id;
        this.Gender = Gender;
        this.UserName = UserName;
        this.Surname = Surname;
        this.RegisterDate = RegisterDate;
        this.Description = Description;

        this.IsActive = IsActive;
        this.IsBanned = IsBanned;

        this.Photo = Photo;
    }
}

export default UserDTO;
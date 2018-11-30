export interface IError {
    status: number
    error: string 
}

export interface IUserListData {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface IResponseUserList {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: IUserListData[];
}

export interface IUser {
    id: string
    name: string
    job: string
}

export interface IResponseAddUser extends IUser {
    createdAt: string
}

export interface IResponseEditUser extends IUser {
    updatedAt: string
}

export interface IResponseGetUser {
    data: IUserListData
}
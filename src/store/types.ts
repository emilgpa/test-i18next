import { IResponseUserList, IUser, IResponseAddUser, IUserListData } from "../api/types";
import { IOptions } from "../api";
import * as i18n from "i18next";

export interface IAuth {
    user: gapi.auth2.BasicProfile | null
    auth: gapi.auth2.GoogleAuth | null
    //loginSuccess: any;
}

export interface IData {
    userList: IResponseUserList | null
    users: IUser[];
    userAdded: IResponseAddUser | null;
    user: IUserListData | null;
    userEdited: IUser | null;
}

export interface IAPI {
    status: number
    msg: string
    error: boolean
}

export interface IApp {
    init: boolean
    i18n: i18n.i18n | null
}

export interface IUserStore {
    addUser?: (name: string, job: string) => IResponseAddUser;
    getUser?: (id: string) => IUser;
    editUser?: (id: string, name: string, job: string) => IUser;
    deleteUser?: (id: string) => void;
    getUserList?: (opts?: IOptions) => any;
    fetchUser?: (user: gapi.auth2.BasicProfile | null) => void;
    data?: IData;
}

export interface IAuthStore {
    fetchAuth?: (auth: gapi.auth2.GoogleAuth | null) => void
    auth?: IAuth
}

export interface IAPIStore {
    api: IAPI
}

export interface IAppStore {
    appInitialized?: (instanceI18N) => void;
    changeLanguage?: (lang: "es" | "en") => void;
    app?: IApp;
}
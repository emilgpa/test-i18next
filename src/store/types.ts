import * as i18n from "i18next";

export interface IAuth {
    user: gapi.auth2.BasicProfile | null
    auth: gapi.auth2.GoogleAuth | null
    //loginSuccess: any;
}

export interface IApp {
    init: boolean
    i18n: i18n.i18n | null
}

export interface IUserStore {
    fetchUser?: (user: gapi.auth2.BasicProfile | null) => void;
}

export interface IAuthStore {
    fetchAuth?: (auth: gapi.auth2.GoogleAuth | null) => void
    auth?: IAuth
}

export interface IAppStore {
    appInitialized?: (instanceI18N) => void;
    changeLanguage?: (lang: "es" | "en") => void;
    app?: IApp;
}
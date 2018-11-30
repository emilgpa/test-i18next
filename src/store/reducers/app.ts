import {INIT_APP, CHANGE_LANGUAGE} from '../actions/types';
import {IApp} from "../types"

import {getLang} from "../../utils"

interface IAppAction extends IApp {
    type: string
    lang: string
}

export default (state: IApp = {init: false, i18n: null}, action: IAppAction): IApp => {
    switch(action.type) {
        case INIT_APP:
            let lang = "es" // por defecto
            if (action.i18n!.language) {
                lang = getLang(action.i18n!.language);
            }
            const r = lang == "es" || lang == "en" ? lang : "es";
            action.i18n!.changeLanguage(r)
            return Object.assign<{}, IApp, IApp>({}, state, {init: action.init, i18n: action.i18n});
        case CHANGE_LANGUAGE:
            state.i18n!.changeLanguage(action.lang)
            return state;
        default:
            return state;
    }
}
import {INIT_APP, CHANGE_LANGUAGE} from './types';
import * as i18n from 'i18next';

export const appInitialized = (i18n: i18n.i18n) => ({
    type: INIT_APP,
    i18n: i18n,
});

export const changeLanguage = (lang: "es" | "en") => ({
    type: CHANGE_LANGUAGE,
    lang: lang,
});

import {FETCH_USER, FETCH_AUTH} from './types';
import { IAuth } from '../types';

export const initialAuth: IAuth = {
    user: null, 
    auth: null,
}

export const fetchUser = (user: gapi.auth2.BasicProfile | null) => ({
    type: FETCH_USER,
    user: user
});
export const fetchAuth = (auth: gapi.auth2.GoogleAuth | null) => ({
    type: FETCH_AUTH,
    auth: auth
});
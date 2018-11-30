import {FETCH_USER, FETCH_AUTH} from '../actions/types';
import {initialAuth} from '../actions/index';
import {IAuth} from "../types"

interface IAuthAction extends IAuth {
    type: string
}

export default (state: IAuth = initialAuth, action: IAuthAction): IAuth => {
    switch(action.type) {
        case FETCH_USER:
            return {...state, user: action.user}
        case FETCH_AUTH:
            return {...state, auth: action.auth}
        default:
            return state;
    }
}
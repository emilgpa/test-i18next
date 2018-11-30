import {IError, response, JSONHeaders as headers} from "./index"
import { IResponseUserList, IResponseAddUser, IResponseEditUser, IResponseGetUser } from "./types";

export interface IOptions {
    per_page?: number;
    page?: number;
    total?: number;
    total_pages?: number;
}

const defaultOpts = {per_page: 5, page: 1};

export const getUserList = async (opts: IOptions = defaultOpts) => {
    // si no está incluido el perPage en el opts, incluir el por defecto
    const _opts: IOptions = {...defaultOpts, ...opts}
    const qs = Object.keys(_opts).map(key => `${key}=${_opts[key]}`).join("&");
    const resp = await fetch(`https://reqres.in/api/users?${qs}`);
    return response<IResponseUserList>(resp)
}

export const getUser = async (id: string) => {
    const resp = await fetch(`https://reqres.in/api/users/${id}`, {method: "GET", headers});
    return response<IResponseGetUser>(resp)
}

export const addUser = async (name: string, job: string) => {
    const body = JSON.stringify({
        name: name,
        job: job
    })
    const resp = await fetch(`https://reqres.in/api/users`, {method: "POST", body, headers});
    return response<IResponseAddUser>(resp)
}

export const editUser = async (id: string, name: string, job: string) => {
    const body = JSON.stringify({
        name: name,
        job: job
    })
    const resp = await fetch(`https://reqres.in/api/users/${id}`, {method: "PATCH", body, headers});
    return response<IResponseEditUser>(resp)
}

export const deleteUser = async (id: string) => {
    const resp = await fetch(`https://reqres.in/api/users/${id}`, {method: "DELETE", headers});
    return response<"">(resp)
}
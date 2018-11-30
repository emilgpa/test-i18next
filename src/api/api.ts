import { IError } from "./types";

export const JSONHeaders = new Headers({
    "content-type": "application/json",
    "accept": "*",
})

export const ok = async <T>(resp: Response): Promise<T | string> => {
    const contentType = resp.headers.get("content-type");
    if (!contentType) {
        // body vacio
        return ""
    }
    if (contentType.match("application/json")) {
        const json = await resp.json()
        console.log(`[api] ${resp.status} `, json)
        return json;
    }
    // desconocemos el content-type, devolver el body en formato texto
    const txt = await resp.text();
    console.log(`[api] ${resp.status} ${txt}`)
    return txt;
}

export const error = async (resp: Response): Promise<IError> => {
    const txt = await resp.text();
    console.log(`[api] ${resp.status} ${txt}`)
    return {status: resp.status, error: txt}
}

export const response = async <T>(resp: Response): Promise<T | string | IError> => {
    if (resp.ok) {
        return await ok<T>(resp)
    } else {
        throw error(resp);
        //return await error(resp);
    }
}
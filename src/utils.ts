export const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getLang = (str: string) => {
    const r = str.split("-");
    return r[0];
}

export const isValidLang = (str: string) => str == "es" || str == "en";

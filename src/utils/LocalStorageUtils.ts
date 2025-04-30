export const setLocalStorage = (key: string, value: string, isJson: boolean = false) => {
    if (isJson) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
}
export const getLocalStorage = (key: string, isJson: boolean = false) => {
    if (isJson) {
        const item = localStorage.getItem(key);
        if (item === null) {
            return null;
        }
        return JSON.parse(item);
    } else {
        return localStorage.getItem(key);
    }
}
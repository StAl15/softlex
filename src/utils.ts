import {IOption} from "./App";

export const getKoef = (options: IOption[], selectedValue: string): number => {
    for (let [key, v] of Object.entries(options)) {
        if (key === selectedValue) {
            return Number(v);
        }
    }
    return 1
}

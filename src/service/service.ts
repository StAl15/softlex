import axios from "axios";

export const getValues = async () => {
    const res = await axios.get('https://www.cbr-xml-daily.ru/latest.js');
    return res.data;
}

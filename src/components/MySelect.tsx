import React, {useEffect} from "react";
import {IOption} from "../App";

export const MySelect: React.FC<{
    options: IOption[],
    value?: string,
    setValue?: (it: string) => void,
}> = ({
          options,
          value,
          setValue,
      }) => {

    return (
        <select
            onChange={(event) => {
                localStorage.setItem('selected', event.target.value)
                setValue!(localStorage['selected']);
            }}
            value={value}
            className={'appearance-none outline-0 p-2 w-full rounded text-black bg-[#EAEFF3]'}>
            {
                Object.entries(options).map(([key, value], v) => (
                    <option key={key} value={key}>{key}</option>
                ))
            }
        </select>
    );
};

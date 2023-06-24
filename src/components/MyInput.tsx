import React, {ChangeEvent} from "react";

export const MyInput: React.FC<{
    placeholder: string,
    value: string,
    setValue: (event: string) => void,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    children?: React.ReactNode
}> = props => {
    return (
        <div>
            <input
                value={props.value}
                onChange={props.onChange ? props.onChange : (e) => props.setValue(e.target.value)}
                type={'number'}
                className={'outline-0 p-2 w-full rounded text-black bg-[#EAEFF3]'}
                placeholder={props.placeholder}/>
            {props.children}
        </div>

    );
};

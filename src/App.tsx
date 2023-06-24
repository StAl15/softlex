import React, {useEffect, useState} from 'react';
import {MyInput} from "./components/MyInput";
import {MySelect} from "./components/MySelect";
import axios from "axios";
import {getKoef} from "./utils";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {getValues} from "./service/service";

export type IOption = {
    [currencyCode: string]: number;
}

function App() {
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>
        <Content/>
    </QueryClientProvider>
}

function Content() {
    const [initialValue, setInitialValue] = useState('');
    const [convertedValue, setConvertedValue] = useState('');
    const [selectedValute, setSelectedValute] = useState(localStorage['selected'] ? localStorage['selected'] : '');
    const [options, setOptions] = useState<IOption[]>(localStorage.getItem('rates') ? JSON.parse(localStorage['rates']) : []);

    const {isError, isLoading, isSuccess} = useQuery('rates', getValues)

    useEffect(() => {
        return () => {
            localStorage['rates']
                ? console.log(options, selectedValute, localStorage['selected'])
                : getValues().then(r => {
                    localStorage.setItem('rates', JSON.stringify(r.rates))
                    localStorage.setItem('selected', Object.keys(options).at(0)!)
                    setOptions(JSON.parse(localStorage['rates']));
                    setSelectedValute(localStorage['selected'])
                    console.log(options, selectedValute, localStorage['selected'])
                })

        };
    }, []);


    return isError
        ? <p>Error</p>
        : isLoading ? <p>Loading...</p>
            : <div className={'w-screen h-screen inline-flex justify-center items-center bg-[#EAEFF3]'}>
                <div className={'w-1/3 h-fit p-5 bg-white space-y-4 rounded'}>
                    <h3 className={'font-semibold text-2xl'}>Конвертер валют</h3>
                    <MyInput onChange={(e) => {
                        setInitialValue(e.target.value);
                        setConvertedValue(`${((1 / getKoef(options, selectedValute)) * Number(e.target.value)).toFixed(2)}`);
                    }} placeholder={'Введите сумму...'} value={initialValue} setValue={setInitialValue}/>
                    <MySelect
                        value={selectedValute}
                        setValue={setSelectedValute}
                        options={options}/>
                    <MyInput
                        onChange={(e) => {
                            setConvertedValue(e.target.value);
                            setInitialValue(`${(getKoef(options, selectedValute) * Number(e.target.value)).toFixed(2)}`);
                        }}
                        placeholder={'Введите сумму в рублях...'}
                        value={convertedValue}
                        setValue={setConvertedValue}/>
                </div>
            </div>
}

export default App;

import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        //get list from localstorage or return initialvalue 
        return getLocalstorage(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])

    return [state, setState]
}

function getLocalstorage(key, initialValue){
    const storedValue = JSON.parse(localStorage.getItem(key))
    if (storedValue) return storedValue
    if (initialValue instanceof Function) return initialValue()
    return initialValue 
}
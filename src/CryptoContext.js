import React, { useContext, useEffect, useState } from "react"
import { createContext } from "react";

const Crypto = createContext();

const CryptoContext = ({children}) => {

    //state used to update the currency the user is using
    const [currency,setCurrency] = useState("USD");

    //will update the symbol to match the currency
    const [symbol, setSymbol] = useState("$");
    

    //everytime cryptoContext is called it will check the state of the currency
    //and update if required
    useEffect(() => {

        if(currency === "INR") setSymbol("₹");
        else if(currency === "USD") setSymbol("$");
        else if(currency === "AUD") setSymbol("$")


    }, [currency]
    
    )

    return (

        <Crypto.Provider value={{currency,symbol,setCurrency}}>
            {children}

        </Crypto.Provider>

    )
};

export default CryptoContext


export const CryptoState = () => {
    return useContext(Crypto);
}
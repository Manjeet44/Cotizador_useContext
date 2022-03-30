import { useState, createContext } from "react";

const CotizadorContext = createContext();

const CotizadorProvaider = ({children}) => {

    return (
        <CotizadorContext.Provider
            value={{
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvaider
}
export default CotizadorContext;
import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({children}) =>{

    const [testSeconds, setTestSeconds] = useState(15);
    
    const values = {
        testSeconds,
        setTestSeconds
    }

    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

export const useTestMode = ()=>useContext(TestModeContext);
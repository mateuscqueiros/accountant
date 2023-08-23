import { useDisclosure } from "@mantine/hooks";
import userData from "data";
import { createContext, useState } from "react";

export const DataContext = createContext({
    data: userData,
    onChange: handleDataChange,
});

function handleDataChange(data: any) {
    console.log("Mudança de dados", data);
}

export default function DataProvider({ children }: { children: any }) {

    return (
        <DataContext.Provider value={{
            data: userData,
            onChange: handleDataChange,
        }}>
            {children}
        </DataContext.Provider>
    )
}
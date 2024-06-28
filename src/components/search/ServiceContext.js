import React, { createContext, useReducer } from 'react';
import { serviceReducer, initialState } from './serviceReducer';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
    const [state, dispatch] = useReducer(serviceReducer, initialState);

    return (
        <ServiceContext.Provider value={{ state, dispatch }}>
            {children}
        </ServiceContext.Provider>
    );
};

export default ServiceContext;

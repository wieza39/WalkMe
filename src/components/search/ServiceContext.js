import React, { createContext, useState } from 'react';

const ServiceContext = createContext(1);

export const ServiceProvider = ({ children }) => {
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [serviceSelected, setServiceSelected] = useState([]);
    const [petAmount, setPetAmount] = useState([]);

    return (
        <ServiceContext.Provider
            value={{
                location,
                setLocation,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                serviceSelected,
                setServiceSelected,
                petAmount,
                setPetAmount
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
};

export default ServiceContext;
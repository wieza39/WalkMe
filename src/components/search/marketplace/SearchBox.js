import React, { useContext, useState } from 'react';
import Input from "../../elements/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, FormControl, InputAdornment, InputLabel, TextField, MenuItem } from "@mui/material";
import ServiceContext from "../ServiceContext";

export default function SearchBox({ onSearch }) {
    const { state: { location, startDate, endDate, serviceSelected, petAmount }, dispatch } = useContext(ServiceContext);
    const [error, setError] = useState('');

    const services = [
        { id: 1, name: "stay", icon: "fa-solid fa-house" },
        { id: 2, name: "walk", icon: "fa-solid fa-person-walking-with-cane" },
        { id: 3, name: "take", icon: "fa-solid fa-house-user" },
        { id: 4, name: "feed", icon: "fa-solid fa-bowl-rice" }
    ];

    const petType = [
        { id: 1, type: "dog", icon: "fa-solid fa-dog" },
        { id: 2, type: "cat", icon: "fa-solid fa-cat" },
        { id: 3, type: "caged", icon: "fa-solid fa-fish" }
    ];

    const handleLocationChange = (e) => {
        dispatch({ type: 'SET_LOCATION', payload: e.target.value });
    };

    const toggleService = (serviceName) => {
        dispatch({ type: 'TOGGLE_SERVICE', payload: serviceName });
    };

    const handlePetAmount = (event, pet) => {
        const amount = event.target.value;
        dispatch({ type: 'SET_PET_AMOUNT', payload: { type: pet.type, amount } });
    };

    const validateDates = (start, end) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (start && start < today) {
            setError('Początkowa data nie może być z przeszłości');
            return false;
        }
        if (end && end < today) {
            setError('Końcowa data nie może być z przeszłości');
            return false;
        }
        if (start && end && start > end) {
            setError('Data początkowa, nie może być późniejsza niż końcowa');
            return false;
        }
        setError('');
        return true;
    };

    const handleStartDateChange = (date) => {
        if (validateDates(date, endDate)) {
            dispatch({ type: 'SET_START_DATE', payload: date });
        }
    };

    const handleEndDateChange = (date) => {
        if (validateDates(startDate, date)) {
            dispatch({ type: 'SET_END_DATE', payload: date });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted with data:", { location, startDate, endDate, serviceSelected, petAmount });
        onSearch();
    };

    return (
        <div className="search-box-container">
            <div className="search-box">
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <Input value={location} onChange={handleLocationChange} />

                        <div className="date-picker">
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="dd-MM-yyyy"
                                className="input date-picker-input"
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="dd-MM-yyyy"
                                className="input date-picker-input"
                            />
                        </div>
                        {error && <div className="error">{error}</div>}

                        <div className="service-choice">
                            {services.map((service) => (
                                <Button
                                    key={service.id}
                                    className={`service-button ${serviceSelected.includes(service.name) ? 'service-selected' : ''}`}
                                    variant="contained"
                                    onClick={() => toggleService(service.name)}
                                >
                                    <i className={service.icon}></i>
                                </Button>
                            ))}
                        </div>
                        <div className="pets-selection">
                            {petType.map((pet) => (
                                <FormControl key={pet.type} variant="outlined" fullWidth>
                                    <InputLabel className="pet-button"></InputLabel>
                                    <TextField
                                        select
                                        labelId={`pet-button-${pet.type}`}
                                        className="pet-button-text"
                                        value={petAmount.find(p => p.type === pet.type)?.amount || ''}
                                        label={pet.name}
                                        onChange={(event) => handlePetAmount(event, pet)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <i className={pet.icon}></i>
                                                </InputAdornment>
                                            ),
                                        }}
                                    >
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                    </TextField>
                                </FormControl>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Szukaj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

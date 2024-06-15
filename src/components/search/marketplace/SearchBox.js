import React, {useContext, useState} from 'react';
import Input from "../../elements/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Button, FormControl, InputAdornment, InputLabel, TextField, MenuItem} from "@mui/material";
import ServiceContext from "../ServiceContext";


export default function SearchBox() {

    const {
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
    } = useContext(ServiceContext);

    const services = [
        {id: 1, name: "stay", icon: "fa-solid fa-house"},
        {id: 2, name: "walk", icon: "fa-solid fa-person-walking-with-cane"},
        {id: 3, name: "take", icon: "fa-solid fa-house-user"},
        {id: 4, name: "feed", icon: "fa-solid fa-bowl-rice"}
    ]

    const petType = [
        {id: 1, type: "dog", icon: "fa-solid fa-dog"},
        {id: 2, type: "cat", icon: "fa-solid fa-cat"},
        {id: 3, type: "caged", icon: "fa-solid fa-fish"}
    ]

    const toggleService = (serviceName) => {
        setServiceSelected((prevSelected) => {
            if (prevSelected.includes(serviceName)) {
                const updatedSelected = prevSelected.filter((name) => name !== serviceName);
                return updatedSelected.filter((name) => name !== "");
            } else {
                return [...prevSelected, serviceName];
            }
        });
    };

    const handlePetAmount = (event, pet) => {
        const amount = event.target.value;
        setPetAmount((prevAmounts) => {
            const existingPetIndex = prevAmounts.findIndex(p => p.type === pet.type);
            if (existingPetIndex !== -1) {
                const updatedAmounts = [...prevAmounts];
                updatedAmounts[existingPetIndex] = { ...updatedAmounts[existingPetIndex], amount };
                return updatedAmounts;
            } else {
                return [...prevAmounts, { type: pet.type, amount }];
            }
        });
    };



    console.log(petAmount);

    return (
        <div className="search-box-container">
            <div className="search-box">
                <div className="input-field">
                    <Input value={location} setter={setLocation}/>

                    <div className="date-picker">
                        <DatePicker
                            selected={startDate}
                            onChange={(newDate) => setStartDate(newDate)}
                            onSelect={(newDate) => setStartDate(newDate)}
                            dateFormat="dd-MM-yyyy"
                            className="input date-picker-input"
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(newDate) => setEndDate(newDate)}
                            onSelect={(newDate) => setEndDate(newDate)}
                            dateFormat="dd-MM-yyyy"
                            className="input date-picker-input"
                        />
                    </div>

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
                </div>
            </div>
        </div>
    )
}
import React, {useContext} from 'react';
import Input from "../../elements/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Button} from "@mui/material";
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
        setServiceSelected
    } = useContext(ServiceContext);


    const services = [
        {id: 1, name: "stay", icon: "fa-solid fa-house"},
        {id: 2, name: "walk", icon: "fa-solid fa-person-walking-with-cane"},
        {id: 3, name: "take", icon: "fa-solid fa-house-user"},
        {id: 4, name: "feed", icon: "fa-solid fa-bowl-rice"}
    ]

    const petType = [
        {id: 1, name: "dog", icon: "fa-solid fa-dog"},
        {id: 2, name: "cat", icon: "fa-solid fa-cat"},
        {id: 3, name: "caged", icon: "fa-solid fa-fish"}
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
                            <Button
                                key={pet.id}
                                className="pet-button"
                                variant="contained"

                            >
                                <i className={pet.icon}></i>
                            </Button>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
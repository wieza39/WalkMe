import React, {useState} from "react";
import Rating from "../../elements/Rating";
import Popover from '@mui/material/Popover';
import "react-datepicker/dist/react-datepicker.css";
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import '../../../assets/Calendar.css'
import {useNavigate} from "react-router-dom";

export default function SitterInfo({sitter}) {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    const services = [
        {id: 1, name: "stay", icon: "fa-solid fa-house"},
        {id: 2, name: "walk", icon: "fa-solid fa-person-walking-with-cane"},
        {id: 3, name: "take", icon: "fa-solid fa-house-user"},
        {id: 4, name: "feed", icon: "fa-solid fa-bowl-rice"}
    ];

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setPopoverOpen(true);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverOpen(false);
    };

    const handleChange = (date) => {
        //setSelectedDate(date);
    };

    const isDateBooked = (dateToCheck) => {
        // Check if the dateToCheck is in the list of unavailability dates
        return sitter.sitterInfo.unavailability.some(unavailable => {
            const unavailableDate = new Date(unavailable.date);
            return dateToCheck.getDate() === unavailableDate.getDate() &&
                dateToCheck.getMonth() === unavailableDate.getMonth() &&
                dateToCheck.getFullYear() === unavailableDate.getFullYear();
        });
    };

    const tileClassName = ({ date }) => {
        return isDateBooked(date) ? 'react-calendar__tile--booked' : '';
    };

    return (
        <div className="sitter-info-container">
            <div className="sitter-info-details-container">
                <div className="sitter-info-photo">
                    <img src={sitter.basicInfo.photo} alt="avatar"/>
                </div>
                <div className="sitter-info-header">
                    <h2>{`${sitter.basicInfo.name} ${sitter.basicInfo.surname}`}</h2>
                </div>
                <div className="sitter-info-details">
                    <p>Miasto: {`${sitter.basicInfo.location}`}</p>
                    <div className="sitter-info-details-services">
                        <p>Usługi:
                            {sitter.sitterInfo.services.map(service => {
                                const serviceIcon = services.find(s => s.name === service)?.icon;
                                return serviceIcon ? <i className={serviceIcon} key={service}></i> : "";
                            })}
                        </p>
                    </div>
                    <div className="sitter-info-details-rating">
                        <Rating ratings={sitter.sitterInfo.ratings}/>
                    </div>
                    <div className="sitter-info-details-actions">
                        <button
                            className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handlePopoverOpen}
                        >
                            <i className="fa-regular fa-calendar calendar-icon"></i>
                        </button>
                        <Popover
                            open={popoverOpen}
                            anchorEl={anchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >

                                <Calendar
                                    onChange={setSelectedDate}
                                    value={selectedDate}
                                    className="calendar-in-popover"
                                    tileClassName={tileClassName}
                                />

                        </Popover>
                        <button
                            className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <i className="fa-regular fa-message"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="sitter-info-description">
                <div className="sitter-info-description-header">
                    O mnie
                </div>
                <div className="sitter-description">
                    <p>{sitter.basicInfo.description}</p>
                </div>
            </div>
        </div>
    );
}
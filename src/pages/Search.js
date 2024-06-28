import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBox from "../components/search/marketplace/SearchBox";
import "../assets/sass/searchMarket.css";
import ServiceContext from "../components/search/ServiceContext";
import SearchResults from "../components/search/marketplace/SearchResults";
import useFetch from "../components/hooks/useFetch";

export default function Search() {
    const [filteredSitters, setFilteredSitters] = useState([]);
    const { error, isPending, data: users } = useFetch('http://localhost:8000/users');
    const { state: { location, startDate, endDate, serviceSelected } } = useContext(ServiceContext);

    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    const handleSearch = () => {
        if (users) {
            const availableSitters = users.filter(user => {
                // Check if the user is a sitter and has necessary information
                if (user.roles.includes("sitter") && user.sitterInfo && user.sitterInfo.services) {
                    if (serviceSelected.some(service => user.sitterInfo.services.includes(service))) {
                        if (location === user.basicInfo.location || location === '') {
                            // Check if the sitter is available within the date range
                            if (!user.sitterInfo.unavailability || user.sitterInfo.unavailability.length === 0) {
                                return true; // Available if no unavailability dates are set
                            } else {
                                return user.sitterInfo.unavailability.every(unavailability => {
                                    const unavailableDate = new Date(unavailability.date);
                                    return unavailableDate < new Date(startDate) || unavailableDate > new Date(endDate);
                                });
                            }
                        }
                    }
                }
                return false;
            }).filter(user => user.id !== loggedUser?.id);
            setFilteredSitters(availableSitters);
        }
    }

    return (
        <>
            <Navbar/>
            <div className="search-container">
                <SearchBox onSearch={handleSearch} />
                <SearchResults availableSitters={filteredSitters} />
            </div>
            <Footer/>
        </>
    );
}

import React, {useContext, useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBox from "../components/search/marketplace/SearchBox";
import "../assets/sass/searchMarket.css";
import ServiceContext, {ServiceProvider} from "../components/search/ServiceContext";
import SearchResults from "../components/search/marketplace/SearchResults";
import useFetch from "../components/hooks/useFetch";

export default function Search() {

    const [filteredSitters, setFilteredSitters] = useState([]);
    const {error, isPending, data: users} = useFetch('http://localhost:8000/users');
    const {
        location,
        startDate,
        endDate,
        serviceSelected,
        petAmount,
        setPetAmount
    } = useContext(ServiceContext);

    const handleSearch = () => {
        if (users) {
            // filter users
            const availableSitters = users.filter(user => {
                // user that is a sitter
                if (user.roles.includes("sitter")) {
                    // and provides chosen service
                    if (serviceSelected.some(service => user.sitterInfo.services.includes(service))) {
                        // in selected area
                        if (location === user.basicInfo.location || location === '') {
                            // is available that time, then return
                            return user.sitterInfo.unavailability.every(unavailability => {
                                const unavailableDate = new Date(unavailability.date);
                                return unavailableDate < new Date(startDate) || unavailableDate > new Date(endDate);
                            });
                        }
                    }
                }
                return false;
            });

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
    )
}
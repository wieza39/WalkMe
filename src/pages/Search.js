import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBox from "../components/search/marketplace/SearchBox";
import "../assets/sass/searchMarket.css";
import {ServiceProvider} from "../components/search/ServiceContext";

export default function Search() {
    return (
        <>
            <Navbar/>
            <div className="search-container">
                <ServiceProvider>
                    <SearchBox/>
                    {/*<SearchResults />*/}
                </ServiceProvider>
            </div>
            <Footer/>
        </>
    )
}
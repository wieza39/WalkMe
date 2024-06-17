import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBox from "../components/search/marketplace/SearchBox";
import "../assets/sass/searchMarket.css";
import {ServiceProvider} from "../components/search/ServiceContext";
import SearchResults from "../components/search/marketplace/SearchResults";
import useFetch from "../components/hooks/useFetch";

export default function Search() {


    return (
        <>
            <Navbar/>
            <div className="search-container">
                <ServiceProvider>
                    <SearchBox/>
                    <div className="results-container">
                        <SearchResults/>
                    </div>
                </ServiceProvider>
            </div>
            <Footer/>
        </>
    )
}
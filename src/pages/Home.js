import React from "react";
import Hero from '../components/Hero';
import HowDoesItWork from "../components/HowDoesItWork"
import About from "../components/About";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {

    return(
        <>
            <Navbar/>
            <Hero/>
            <HowDoesItWork/>
            <About/>
            <div
                className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 flex justify-center items-center">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:items-start ">
                    <div className="lg:max-w-lg text-center">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better
                            workflow</h1>
                    </div>
                </div>
            </div>
            <Reviews />
            <Contact />
            <Footer />
        </>
    );
}

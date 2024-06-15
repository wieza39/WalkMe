import React from "react";
import Footer from "../components/Footer";
import SignForm from "../components/SignForm";
import Navbar from "../components/Navbar";

export default function SignIn() {
    return(
        <>
            <Navbar />
            <SignForm />
            <Footer />
        </>
    );
}
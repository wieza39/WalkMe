import React from 'react';
import Navbar from "../components/Navbar";
import RegisterForm from "../components/register/RegisterForm";
import Footer from "../components/Footer";


export default function Register() {

    return (
        <>
            <Navbar/>
            <div className="register-container">
                <RegisterForm/>
            </div>
            <Footer/>
        </>
    )
}
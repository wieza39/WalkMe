import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Search from "./pages/Search";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/sign-in" element={<SignIn/>} />
                <Route path="/search" element={<Search/>} />
            </Routes>
        </Router>
    );
}

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Search from "./pages/Search";
import {ServiceProvider} from "./components/search/ServiceContext";
import Register from "./pages/Register";
import SitterProfileInfo from "./pages/SitterProfileInfo";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/sign-in" element={<SignIn/>} />
                <Route path="/search" element={<ServiceProvider><Search/></ServiceProvider>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/sitter/:id" element={<SitterProfileInfo />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

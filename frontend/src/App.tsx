import React from 'react';
import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Container} from "@mui/material";
import ConfirmRide from './pages/ConfirmRide';
import RideHistory from "./pages/RideHistory";

const App: React.FC = () => {
    return (
        <Container>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/confirm-ride" element={<ConfirmRide />} />
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/ride-history" element={<RideHistory />} />
                </Routes>
            </Router>
        </Container>
    );
};

export default App;
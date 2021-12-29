import React from 'react';
import './App.scss';
import Header from "./Components/Header/Header";
import {
    Route,
    Routes
} from "react-router-dom";
import Books from "./Components/Books/Books";
import Gives from "./Components/Gives/Gives";
import Readers from "./Components/Readers/Readers";

function App() {
    return (
        <>
            <div className="container">
                <Header/>
            </div>
            <div className="container">
                    <Routes>
                        <Route path="/books" element={<Books/>}/>
                        <Route path="/readers" element={<Readers/>}/>
                        <Route path="/gives" element={<Gives/>}/>
                        <Route path="*" element={<Books/>}/>
                    </Routes>
                </div>
        </>
    );
}

export default App;

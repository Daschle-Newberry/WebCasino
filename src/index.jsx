import React, { StrictMode, Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { BlackJack } from "./games/blackjack";
import "./styles/index.css";
class App extends Component {
    render() {
        return <div>
            <p id="welcome-message">Awesome Fucking Casino!</p>
            <p><a href="/blackjack">Blackjack</a></p>
        </div>;
    }
}
const rootElem = document.getElementById('root');
if (rootElem == null) {
    throw new Error("No root element found in HTML file.");
}
const root = createRoot(rootElem);
root.render(<StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/blackjack" element={<BlackJack />}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>);

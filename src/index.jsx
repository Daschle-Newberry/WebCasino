import React, { StrictMode, Component } from "react";
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { BlackJack } from "./games/blackjack";
import { Roulette } from "./games/roulette";
import "./styles/index.css";
import "./styles/roulette.css";
class App extends Component {
    render() {
        return <div className="main-menu-page">
            <div id="menu-menu">
                <h1>Awesome Casino</h1>
                <Link to="/blackjack" className="menu-item"> Blackjack </Link>
                <Link to="/roulette" className="menu-item"> Roulette </Link>
                <Link to="/blackjack" className="menu-item"> Slots </Link>
                <Link to="/blackjack" className="menu-item"> Game3 </Link>
            </div>
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
                <Route path="/roulette" element={<Roulette />}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>);

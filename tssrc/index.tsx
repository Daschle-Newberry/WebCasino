import React, { StrictMode, Component, ReactNode } from "react";
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { BlackJack } from "./games/blackjack"
import "./styles/index.css"

class App extends Component {
    override render(): ReactNode {
        return <div className = "main-menu-page">
            <div id = "menu-menu">
                <h1>Awesome Casino</h1>
                <Link to="/blackjack" className="menu-item"> Blackjack </Link>
                <Link to="/blackjack" className="menu-item"> Roulette </Link>
                <Link to="/blackjack" className="menu-item"> Slots </Link>
                <Link to="/blackjack" className="menu-item"> Game3 </Link>
            </div>
        </div>
    }
}

const rootElem = document.getElementById('root');

if( rootElem == null ) {
    throw new Error("No root element found in HTML file.");
}

const root = createRoot( rootElem as HTMLElement );

root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/blackjack" element={<BlackJack/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);

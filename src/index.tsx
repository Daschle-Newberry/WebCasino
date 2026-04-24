import React, { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { BlackJack } from "./games/blackjack/Blackjack"
import { MainMenu, MenuButton } from "./menu/MainMenu";
import { Roulette } from "./games/roulette/roulette";


const rootElem = document.getElementById('root');

if( rootElem == null ) {
    throw new Error("No root element found in HTML file.");
}

const root = createRoot( rootElem as HTMLElement );

root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <MainMenu title="Awesome Casino">
                        <MenuButton text="Slots" link="/slots"/>
                        <MenuButton text="Roulette" link="/roulette"/> 
                        <MenuButton text="Blackjack" link="/blackjack"/>
                        <MenuButton text="Game3" link="/game3"/>
                    </MainMenu>
                    }/>
                <Route path="/blackjack" element={<BlackJack/>}/>
                <Route path="/roulette" element={<Roulette/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);

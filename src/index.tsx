import React, { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Blackjack } from "./games/blackjack/Blackjack";
import { MainMenu, MenuButton } from "./menu/MainMenu";
import { RoulettePage } from "./games/roulette/roulette";
import { Slots } from "./games/slots/Slots";

import "./global.module.css";

const rootElem = document.getElementById("root");

if (rootElem == null) {
  throw new Error("No root element found in HTML file.");
}

const root = createRoot(rootElem as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainMenu title="Awesome Casino">
              <MenuButton text="Slots" link="/slots" />
              <MenuButton text="Roulette" link="/roulette" />
              <MenuButton text="Blackjack" link="/blackjack" />
              <MenuButton text="Craps" link="/craps" />
            </MainMenu>
          }
        />
        <Route path="/blackjack" element={<Blackjack />} />
        <Route path="/roulette" element={<RoulettePage />} />
        <Route path="/slots" element={<Slots />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

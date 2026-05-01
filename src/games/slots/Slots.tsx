import React, {StrictMode, Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MainMenu, MenuButton } from "../../menu/MainMenu";
import { Link } from 'react-router-dom';


import MainStyles from "../../menu/main-menu.module.css"
import SlotStyles from "./slots.module.css"


interface SlotButtonProps {
    link: string;
    text: string;
    children?: ReactNode;
    btnWidth: number;
    fSize: number; 
}



export function PageButton({ link, text, children, btnWidth, fSize}: SlotButtonProps ) {

    console.log("SlotStyles:", SlotStyles);

    return  <div className = {SlotStyles["slots-button"]} style={{width:btnWidth}}>
            <Link className={SlotStyles["slots-button-text"]} to={link} style={{fontSize:fSize}}>{text}</Link>
            {children}
        </div>

}



export function GambleButton() {
    console.log(Math.random()*100)
}


export class Slots extends Component {
    override render(): ReactNode {
        return <div className = {MainStyles['main-menu-page']}> 
            <div>
            <p>testing testing 1 2 1 2</p>
            <PageButton text="Main Menu" link="/" btnWidth={150} fSize={20} />
            <button onClick={GambleButton}>Gamble!</button>
            </div>
        </div>
    }
}
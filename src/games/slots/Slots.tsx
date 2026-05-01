import React, {StrictMode, Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MainMenu, MenuButton } from "../../menu/MainMenu";
import { Link } from 'react-router-dom';


import MainStyles from "../../menu/main-menu.module.css"
import SlotStyles from "./slots.module.css"


interface SlotProps {
    link: string;
    text: string;
    children?: ReactNode;
    btnWidth: number;
    fSize: number; 
}



export function PageButton({ link, text, children, btnWidth, fSize}: SlotProps ) {

    console.log("SlotStyles:", SlotStyles);

    return  <div className = {SlotStyles["slots-button"]} style={{width:btnWidth}}>
            <Link className={SlotStyles["slots-button-text"]} to={link} style={{fontSize:fSize}}>{text}</Link>
            {children}
        </div>

}




class GambleState {
    num: number = 0;
}

export class Slots extends Component<{}, GambleState> {

    constructor(props: SlotProps) {
        super({})
        this.state = new GambleState();
        this.GambleButton = this.GambleButton.bind(this);
    }

    GambleButton() {
        let newState = new GambleState();
        newState.num = Math.floor(Math.random() * 100);
        this.setState( newState );
    }

    override render(): ReactNode {
        return <div className = {MainStyles['main-menu-page']}> 
            <div>
            <p>You got {this.state.num} </p>
            <PageButton text="Main Menu" link="/" btnWidth={150} fSize={20} />
            <button onClick={this.GambleButton}>Gamble!</button>
            </div>
        </div>
    }
}
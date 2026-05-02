import React, {StrictMode, Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MainMenu, MenuButton } from "../../menu/MainMenu";
import { Link } from 'react-router-dom';


import MainStyles from "../../menu/main-menu.module.css"
import SlotStyles from "./slots.module.css"
import { wrap } from "node:module";


interface PageProps {
    link: string;
    text: string;
    children?: ReactNode;
    btnWidth: number;
    fSize: number; 
}

export function PageLinkButton({ link, text, children, btnWidth, fSize}: PageProps ) {

    return  <div className = {SlotStyles["slots-button"]} style={{width:btnWidth}}>
            <Link className={SlotStyles["slots-button-text"]} to={link} style={{fontSize:fSize}}>{text}</Link>
            {children}
        </div>

}

class GambleState {
    numbers: number[] = [0,0,0];
    win : boolean = false;
    colors : string[] = ["black","black","black"];
    status : string = "Press Spin!";
    match : number = 3;
    house : number = 0;
}

export class Slots extends Component<{}, GambleState> {

    constructor(props: PageProps) {
        super({})
        this.state = new GambleState();
        this.GambleButton = this.GambleButton.bind(this);
        this.RandomNumber = this.RandomNumber.bind(this);
        this.changeMatchRule = this.changeMatchRule.bind(this);
        this.changeHouseRule = this.changeHouseRule.bind(this);
        this.checkWinners = this.checkWinners.bind(this)
    }

    RandomNumber() : number {
        return Math.floor(Math.random() * 6) + 1;
    }

    checkWinners(arr: number[]): number[] {

        let winners = [];
        for (let i=0; i<arr.length-1; i++) {
            winners.push(i);

            for (let j=0; j<arr.length; j++) {
                if (j==i) { continue; } // Dont check against self
                if (arr[i] == arr[j]) { 
                    winners.push(j);
                } 

            }

            // If didn't find 3 matches on first pass and MUST match 3 for win, no winners
            if (this.state.match == 3 && winners.length != 3) { return []; }

            // Return all 3 matching or if 2 matching, the third can't be a winner
            if (winners.length >= 2) { return winners; } 
            

            winners = []

        }

        return []

    }

    GambleButton() {
        let newState = new GambleState();
        newState.numbers = [this.RandomNumber(),this.RandomNumber(),this.RandomNumber()]
        newState.status = "tested" + newState.numbers;
        newState.colors = this.state.colors;
        newState.match = this.state.match;
        newState.house = this.state.house;

        // Does dealer interfere this round if it wins?
        let dealerInterferes = 0; // 0 does not, 1 will interfere, 2 did interfere

        if (newState.house && Math.floor(Math.random() * 100) + 1 < 30 ) { dealerInterferes = 1 }

        // Check if it is a winning round
            // Determined by how many of matching there are and matching in rule
        
        let winners : number[] = [];
        while (true) {

            winners = this.checkWinners(newState.numbers)

            if (dealerInterferes == 1 && winners.length > 0) {
                newState.numbers = [this.RandomNumber(),this.RandomNumber(),this.RandomNumber()]
                dealerInterferes = 2;
            } else { break; }
        }


        // Set colors
        for (let i=0; i<newState.numbers.length; i++) {
            if (winners.includes(i)) {
                newState.colors[i] = "green"
            } else if (dealerInterferes == 2) {
                newState.colors[i] = "maroon"
            } else {
                newState.colors[i] = "red"
            }
        }

        if (winners.length != 0 && !dealerInterferes) {
            newState.status = "You won!";
        } else if (winners.length != 0 && dealerInterferes == 2) {
            newState.status = "You won with house interference!"
        } else if (winners.length == 0 && dealerInterferes == 2) {
            newState.status = "You lost, the dealer interfered!"
        } else {
            newState.status = "You lost."
        }

        this.setState( newState );
    }

    changeMatchRule() {
        let newState = new GambleState();
        newState.numbers = this.state.numbers;
        newState.status = this.state.status;
        newState.colors = this.state.colors;
        newState.house = this.state.house;


        if (this.state.match == 3) { 
            newState.match = 2; 
        } else { newState.match = 3; } 
        this.setState( newState );
    }

    changeHouseRule() {

        let newState = new GambleState();
        newState.numbers = this.state.numbers;
        newState.status = this.state.status;
        newState.colors = this.state.colors;
        newState.match = this.state.match;
        
        if (this.state.house == 1) { 
            newState.house = 0; 
        } else { newState.house = 1; } 

        this.setState( newState );

    }

    override render(): ReactNode {
        return <div className = {MainStyles['main-menu-page']}> 
            <div className={MainStyles['main-menu']} style={{width:500, display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div>

                    <div style={{display:"flex", flex:"wrap", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <PageLinkButton text="Main Menu" link="/" btnWidth={150} fSize={20} />
                    </div>
                    
                    <div className={SlotStyles["slots-text"]}>{this.state.status}</div>

                    <div className={SlotStyles["slots-machine"]}>
                        <div className={SlotStyles["slots-machine-text"]} style={{color:this.state.colors[0]}}>{this.state.numbers[0]}</div>
                        <div className={SlotStyles["slots-machine-text"]} style={{color:this.state.colors[1]}}>{this.state.numbers[1]}</div>
                        <div className={SlotStyles["slots-machine-text"]} style={{color:this.state.colors[2]}}>{this.state.numbers[2]}</div>

                    </div>


                    <div className={SlotStyles["button-container"]}>
                        <button className = {SlotStyles["slots-button"]} style={{width:85}} onClick={this.changeMatchRule}>
                        Match {this.state.match}
                        </button>
                        <button className = {SlotStyles["slots-button"]} style={{width:40}} onClick={this.GambleButton}>
                        Spin
                        </button>
                        <button className = {SlotStyles["slots-button"]} style={{width:160}} onClick={this.changeHouseRule}>
                        House {["won't", "will"][this.state.house]} interfere
                        </button>
                    </div>

                    <div className={SlotStyles["slots-text"]}>House Interference: Winning spins have a 30% chance to be re-spun.</div>
                    <div className={SlotStyles["slots-text"]}>Match X: Match X amount of numbers to win.</div>
                </div>
            </div>
        </div>
    }
}
import React, { StrictMode, Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { linkedListNode , linkedList } from "./linkedlist"

import styles from "./roulette.module.css"

// May need to edit linkedList when accepting BLACK/RED bets
let tableSelections = new linkedList();

// https://www.typescriptlang.org/docs/handbook/jsx.html#value-based-elements 
// Handles the state of each tile (onClick, selected, color, value)
const Square2 = (value : {value: number}) => {
    const [selected, setSelected] = useState(Boolean);
    const [style, setStyle] = useState(styles.square);

    const standardStyle = () => {
        if(value.value % 2 > 0){setStyle(styles.redSquare);}   
        else {setStyle(styles.blackSquare);}
    }

    const changeStyle = () => {
        if(style === styles.selected){standardStyle();}
        else{setStyle(styles.selected)};
    }

    function handleClick(){
        // toggle boolean : selected
        // set color blue (?)
        // add/remove from list of values to be submitted
        
        if(selected === true){
            setSelected(false);
            tableSelections.remove(value.value);
        }
        else if(selected === false){
            setSelected(true);
            tableSelections.add(value.value);
        }
        
        changeStyle();
        console.log('clicked', value, selected, style, tableSelections);
    }

    if(style === styles.square){
        standardStyle();
        return (
        <button 
            className={style}
            onClick={handleClick}
            >
                {value.value}
        </button>
        );
    }
    
    return (
    <button 
        className={style}
        onClick={handleClick}
        >
            {value.value}
    </button>
    );
}

const Gamble = () => {

    // function to handle money
    const [bet, setBet] = useState('');
    const numBet = Number(bet);

    const [bank, setBank] = useState(100000);

    console.log(numBet);

    function handleClick(){
        // Can only land on 0 through 36
        let marbleSlot = Math.floor(Math.random() * 37);
        console.log(marbleSlot);
        console.log(tableSelections);

        if(tableSelections.contains(marbleSlot)){
            console.log("Winner!");
            winMoney();
            // add in money rules and effects
        }
        else{
            console.log("Better luck next time.");
            setBank(bank - numBet);
        }
    }

    function winMoney(){
        // adjust to have actual payout values
        setBank(bank + numBet);
    }

    return (
        <div className="betTab">
            <div className="spacing">
                <label>Bank: {bank}</label>
            </div>
            <div className="spacing">
                <input
                    value={bet}
                    onChange={e => setBet(e.target.value)}
                    type="number"
                />
            </div>
            <div className="spacing">
                <button
                    onClick={handleClick}
                >
                    Let it ride!
                </button>
            </div>
        
        </div>
    );
}

{/* Controls the layout of the page, creates the table number layout */}
function Roulette() {
    return(
        <div className={styles["roulette-table"]}>
            
            <div className={styles["board-row"]}>
                <Square2 value={3}/>
                <Square2 value={6}/>
                <Square2 value={9}/>
                <Square2 value={12}/>
                <Square2 value={15}/>
                <Square2 value={18}/>
                <Square2 value={21}/>
                <Square2 value={24}/>
                <Square2 value={27}/>
                <Square2 value={30}/>
                <Square2 value={33}/>
                <Square2 value={36}/>
            </div>
            <div className={styles["board-row"]}>
                <Square2 value={2}/>
                <Square2 value={5}/>
                <Square2 value={8}/>
                <Square2 value={11}/>
                <Square2 value={14}/>
                <Square2 value={17}/>
                <Square2 value={20}/>
                <Square2 value={23}/>
                <Square2 value={26}/>
                <Square2 value={29}/>
                <Square2 value={32}/>
                <Square2 value={35}/>
            </div>
            <div className={styles["board-row"]}>
                <Square2 value={1}/>
                <Square2 value={4}/>
                <Square2 value={7}/>
                <Square2 value={10}/>
                <Square2 value={13}/>
                <Square2 value={16}/>
                <Square2 value={19}/>
                <Square2 value={22}/>
                <Square2 value={25}/>
                <Square2 value={28}/>
                <Square2 value={31}/>
                <Square2 value={34}/>
            </div>
            <div className={styles["betTab"]}>
                <div className={styles["roulette-bar"]}>
                    <Gamble></Gamble>
                </div>
            </div>
        </div>
    );
}

export function RoulettePage(){
    return (
        <div className={styles["roulette-main-page"]}>
            <div className={styles["roulette-main"]}>
                <h1 className={styles["roulette-title"]}>
                    Welcome to the Roulette table!
                </h1>
            </div>
            <div className={styles["roulette-main-page"]}>
                {Roulette()}
            </div>
        </div>
    )
}
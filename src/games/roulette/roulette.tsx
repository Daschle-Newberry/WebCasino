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
        // Red 1, 3, 5, 7, 9
        if(value.value % 2 > 0 && value.value < 10){
            setStyle(styles.redSquare);
        }   
        // Black 10 (odd one out)
        else if(value.value == 10){
            setStyle(styles.blackSquare);
        }
        else if(value.value % 2 > 0 && value.value < 19){
            setStyle(styles.blackSquare);
        }
        else if(value.value % 2 == 0 && value.value < 19 && value.value > 10){
            setStyle(styles.redSquare);
        }
        else if(value.value % 2 > 0 && value.value < 28 && value.value > 18){
            setStyle(styles.redSquare);
        }
        else if(value.value % 2 == 0 && value.value < 28 && value.value > 18){
            setStyle(styles.blackSquare);
        }
        else if(value.value % 2 > 0 && value.value < 37 && value.value > 28){
            setStyle(styles.blackSquare);
        }
        else if(value.value % 2 == 0 && value.value < 37 && value.value > 28){
            setStyle(styles.redSquare);
        }
        else {
            setStyle(styles.blackSquare);
        }
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

const OutsideBets = (value: {value: string}) => {
    const [selected, setSelected] = useState(Boolean);
    const [style, setStyle] = useState(styles.square);

    function handleClick(){
        // toggle boolean : selected
        // set color blue (?)
        // add/remove from list of values to be submitted
        
        if(selected === true){
            setSelected(false);
            tableSelections = new linkedList();
            setStyle(styles.square);
        }
        else if(selected === false){
            setSelected(true);
            setStyle(styles.selectedSquare);
            if(value.value === "1 to 12"){
                for(let i = 1; i < 13; i++){
                    tableSelections.add(i);
                }
            }
            else if(value.value === "13 to 24"){
                for(let i = 13; i < 25; i++){
                    tableSelections.add(i);
                }
            }
            else if(value.value === "25 to 36"){
                for(let i = 25; i < 37; i++){
                    tableSelections.add(i);
                }
            }
        }
        
        // changeStyle();
        // console.log('clicked', value, selected, style, tableSelections);
    }



    return (
        <button
            onClick={handleClick}
            className={style}
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
            winMoney(marbleSlot);
            // add in money rules and effects
        }
        else{
            console.log("Better luck next time.");
            setBank(bank - numBet);
        }
    }

    function winMoney(marbleSlot: number){
        // adjust to have actual payout values
        let payout = numBet;

        //
        // Inside bets 
        //

        // Straight up : One number only
        if(tableSelections.length() == 1){
            payout *= 35;
        }

        // Split : Two numbers only (neighboring tiles)
        else if(tableSelections.length() == 2){
            payout *= 17;
        }

        // Street : 3 numbers only (consecutive line)
        else if(tableSelections.length() == 3){
            payout *= 11;
        }

        // Corner : 4 numbers only (block format)
        else if(tableSelections.length() == 4){
            payout *= 8
        }

        // 0-1-2-3

        // Five Numbers : 5 numbers only (consecutive)
        else if(tableSelections.length() == 5){
            payout *= 6;
        }

        // Line: 6 numbers only (consecutive)
        else if(tableSelections.length() == 6){
            payout *= 5;
        }

        //
        // Outside bets
        // 

        // Column 1
        else if( marbleSlot == 1 ||
            marbleSlot == 4 ||
            marbleSlot == 7 || 
            marbleSlot == 10 ||
            marbleSlot == 13 ||
            marbleSlot == 16 ||
            marbleSlot == 19 ||
            marbleSlot == 22 ||
            marbleSlot == 25 ||
            marbleSlot == 28 ||
            marbleSlot == 31 ||
            marbleSlot == 34)
            {
                payout *= 2;
        }

        // Column 2
        else if( marbleSlot == 2 ||
            marbleSlot == 5 ||
            marbleSlot == 8 || 
            marbleSlot == 11 ||
            marbleSlot == 14 ||
            marbleSlot == 17 ||
            marbleSlot == 20 ||
            marbleSlot == 23 ||
            marbleSlot == 26 ||
            marbleSlot == 29 ||
            marbleSlot == 32 ||
            marbleSlot == 35)
            {
                payout *= 2;
        }

        // Column 3
        else if( marbleSlot == 3 ||
            marbleSlot == 6 ||
            marbleSlot == 9 || 
            marbleSlot == 12 ||
            marbleSlot == 15 ||
            marbleSlot == 18 ||
            marbleSlot == 21 ||
            marbleSlot == 24 ||
            marbleSlot == 27 ||
            marbleSlot == 30 ||
            marbleSlot == 33 ||
            marbleSlot == 36)
            {
                payout *= 2;
        }

        // Dozen 1
        else if(marbleSlot < 13 && marbleSlot != 0){
            payout *= 2;
        }

        // Dozen 2
        else if(marbleSlot > 12 && marbleSlot < 25){
            payout *= 2;
        }

        // Dozen 3
        else if(marbleSlot > 24){
            payout *= 2;
        }

        // Red
        else if( (marbleSlot % 2 > 0 && marbleSlot < 10) ||
            (marbleSlot % 2 == 0 && marbleSlot > 10 && marbleSlot < 19) ||
            (marbleSlot % 2 > 0 && marbleSlot > 18 && marbleSlot < 28) || 
            (marbleSlot % 2 == 0 && marbleSlot > 28) )
            {
                payout;
        }

        // Black
        else if( (marbleSlot % 2 == 0 && marbleSlot < 11) ||
            (marbleSlot % 2 > 0 && marbleSlot > 10 && marbleSlot < 19) ||
            (marbleSlot % 2 == 0 && marbleSlot > 19 && marbleSlot < 29) || 
            (marbleSlot % 2 > 0 && marbleSlot > 28) )
            {
                payout;
        }

        // Odd
        else if(marbleSlot % 2 > 0){
            payout;
        }

        // Even
        else if(marbleSlot % 2 == 0){
            payout;
        }

        // High or Low
        else if(marbleSlot < 19 && marbleSlot != 0){
            payout;
        }

        else if(marbleSlot > 18){
            payout;
        }

        setBank(bank + payout);
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
            <div>
                
            </div>
            
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

            <div>
                <OutsideBets value={"1 to 12"}></OutsideBets>
                <OutsideBets value={"13 to 24"}></OutsideBets>
                <OutsideBets value={"25 to 36"}></OutsideBets>
            </div>

            <div>
                <OutsideBets value="1 to 18"></OutsideBets>
                <OutsideBets value="Even"></OutsideBets>
                <OutsideBets value="Red"></OutsideBets>
                <OutsideBets value="Black"></OutsideBets>
                <OutsideBets value="Odd"></OutsideBets>
                <OutsideBets value="19 to 36"></OutsideBets>
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
import React, { StrictMode, Component, ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
        /**
         * toggle boolean : selected
         * set color blue (?)
         * add/remove from list of values to be submitted
         * 
         * ---
         * 
         * Inside bets, keep selections to 6 max.
         * Organize into categories (straight, split, street, corner, etc.)
         */
        
        if(selected === true){
            setSelected(false);
            tableSelections.remove(value.value);
            changeStyle();
        }
        else if(selected === false && tableSelections.length() < 6){
            setSelected(true);
            tableSelections.add(value.value);
            changeStyle();
        }
        
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
        
        if(selected === true){
            setSelected(false);
            tableSelections = new linkedList();
            setStyle(styles.square);
        }
        else if(selected === false && tableSelections.isEmpty()){
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
            else if(value.value === "1 to 18"){
                for(let i = 1; i < 19; i++){
                    tableSelections.add(i);
                }
            }
            else if(value.value === "19 to 36"){
                for(let i = 19; i < 37; i++){
                    tableSelections.add(i);
                }
            }
            else if(value.value === "Even"){
                for(let i = 0; i < 37; i++){
                    if(i % 2 == 0){
                        tableSelections.add(i);
                    }
                }
            }
            else if(value.value === "Odd"){
                for(let i = 0; i < 37; i++){
                    if(i % 2 > 0){
                        tableSelections.add(i);
                    }
                }
            }
            else if(value.value === "Red"){
                for(let i = 0; i < 37; i++){
                    if(i % 2 > 0 && i < 10){
                        tableSelections.add(i);
                    }   
                    else if(i % 2 == 0 && i < 19 && i > 10){
                        tableSelections.add(i);
                    }
                    else if(i % 2 > 0 && i < 28 && i > 18){
                        tableSelections.add(i);
                    }
                    else if(i % 2 == 0 && i < 37 && i > 28){
                        tableSelections.add(i);
                    }
                }
            }
            else if(value.value === "Black"){
                for(let i = 0; i < 37; i++){
                    if(i % 2 == 0 && i < 11){
                        tableSelections.add(i);
                    }
                    else if(i % 2 > 0 && i < 19 && i > 10){
                        tableSelections.add(i);
                    }
                    else if(i % 2 == 0 && i < 29 && i > 18){
                        tableSelections.add(i);
                    }
                    else if(i % 2 > 0 && i < 37 && i > 28){
                        tableSelections.add(i);
                    }
                }
            }
        }
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

    const [prevMarble, setPrevMarble] = useState(Number);
    const [marble, setMarble] = useState(Math.ceil(Math.random() * 36));
    const [winner, setWinner] = useState("");

    function handleClick(){
        setMarble(Math.ceil(Math.random() * 36));
        setPrevMarble(marble);
        console.log(marble);
        console.log(tableSelections);

        if(tableSelections.contains(marble)){
            console.log("Winner!");
            setWinner("Winner!");
            winMoney();
            // add in money rules and effects
        }
        else{
            console.log("Better luck next time.");
            setWinner("Better luck next time.")
            setBank(bank - Math.abs(numBet));
        }
    }

    function winMoney(){
        // adjust to have actual payout values
        let payout = Math.abs(numBet);

        // Inside bets 

        // Straight up : One number only
        if(tableSelections.length() == 1){payout *= 35;}
        // Split : Two numbers only (neighboring tiles)
        else if(tableSelections.length() == 2){payout *= 17;}
        // Street : 3 numbers only (consecutive line)
        else if(tableSelections.length() == 3){payout *= 11;}
        // Corner : 4 numbers only (block format)
        else if(tableSelections.length() == 4){payout *= 8}
        // Five Numbers : 5 numbers only (consecutive)
        else if(tableSelections.length() == 5){payout *= 6;}
        // Line: 6 numbers only (consecutive)
        else if(tableSelections.length() == 6){payout *= 5;}

        // Outside bets 

        // Columns and other dozens
        else if(tableSelections.length() == 12){payout *= 2;}
        // Any half of board
        else if(tableSelections.length() == 18){payout;}

        setBank(bank + payout);
    }

    if(bank <= 0){
        return (
            <div> 
                No money, no chips, no spins.
            </div>
        )
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
                    Spin Big, Win Big!
                </button>
            </div>
            <div>
                Winning Slot: {prevMarble.toString()}
            </div>

            <div>
                {winner}
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
                <Link to="/" className={styles["main-menu-button"]}>Main Menu</Link> 
            </div>
            <div className={styles["roulette-main-page"]}>
                <table>
                    <td>
                        <table>
                            <tr><th className={styles["betStyle"]}>Inside Bets</th></tr>
                            <tr>
                                <th>Bet Type</th>
                                <th>Payout</th>
                            </tr>
                            <tr>
                                <td>Straight Up</td>
                                <td>35 : 1</td>
                            </tr>
                            <tr>
                                <td>Split</td>
                                <td>17 : 1</td>
                            </tr>
                            <tr>
                                <td>Triple</td>
                                <td>11 : 1</td>
                            </tr>
                            <tr>
                                <td>Quad</td>
                                <td>8 : 1</td>
                            </tr>
                            <tr>
                                <td>Fiver</td>
                                <td>6 : 1</td>
                            </tr>
                            <tr>
                                <td>Sixer</td>
                                <td>5 : 1</td>
                            </tr>
                        </table>
                    </td>
                
                    <td>
                        <table>
                            <tr><th className={styles["betStyle"]}>Outside Bets</th></tr>
                            <tr>
                                <th>Bet Type</th>
                                <th>Payout</th>
                            </tr>
                            <tr>
                                <td>Column</td>
                                <td>2 : 1</td>
                            </tr>
                            <tr>
                                <td>Dozen</td>
                                <td>2 : 1</td>
                            </tr>
                            <tr>
                                <td>Low / High</td>
                                <td>2 : 1</td>
                            </tr>
                            <tr>
                                <td>Odd / Even</td>
                                <td>2 : 1</td>
                            </tr>
                            <tr>
                                <td>Red / Black</td>
                                <td>2 : 1</td>
                            </tr>
                        </table>
                    </td>
                </table>
                {Roulette()}
            </div>
        </div>
    )
}
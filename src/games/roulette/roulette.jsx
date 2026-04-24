import React from "react";
import { useState } from "react";
import styles from "./roulette.module.css";
{ /* https://www.typescriptlang.org/docs/handbook/jsx.html#value-based-elements */ }
const Square2 = (value) => {
    const [selected, setSelected] = useState(Boolean);
    const [style, setStyle] = useState(styles.square);
    const standardStyle = () => {
        if (value.value % 2 > 0) {
            setStyle(styles.redSquare);
        }
        else {
            setStyle(styles.blackSquare);
        }
    };
    const changeStyle = () => {
        if (style === styles.selected) {
            standardStyle();
        }
        else {
            setStyle(styles.selected);
        }
        ;
    };
    function handleClick() {
        // toggle boolean : selected
        // set color blue (?)
        // add/remove from list of values to be submitted
        // changeStyle();
        if (selected === true) {
            setSelected(false);
        }
        else if (selected === false) {
            setSelected(true);
        }
        changeStyle();
        console.log('clicked', value, selected, style);
    }
    if (style === styles.square) {
        standardStyle();
        return (<button className={style} onClick={handleClick}>
                {value.value}
        </button>);
    }
    return (<button className={style} onClick={handleClick}>
            {value.value}
    </button>);
};
{ /** Used prior to function component, value-based element
     Issues with setting type to value

function Square({value}) {

    const [selected, setSelected] = useState(Boolean);

    function handleClick(){
        // toggle boolean : selected
        // set color blue (?)
        // add/remove from list of values to be submitted
        if(selected == true){setSelected(false);}
        else if(selected == false){setSelected(true);}

        console.log('clicked', value, selected);

    }
    return (
    <button
        className="square"
        onClick={handleClick}
        >
            {value}
        </button>
    );
}

*/
}
class SquareState {
    constructor() {
        this.selected = false;
    }
}
export function Roulette() {
    return (<div className={styles["roulette-main-page"]}>

            <p>Welcome to the Roulette table!</p>

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
        </div>
        </div>);
}
// const rootElem = document.getElementById('root');
// if( rootElem == null ) {
//     alert('you forgot to put a root element in your HTML file.');
// }
// const root = createRoot( rootElem as HTMLElement );
// root.render(
//     <StrictMode>
//         <Roulette/>
//     </StrictMode>
// );

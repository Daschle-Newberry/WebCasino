import React from "react";
import { Link } from 'react-router-dom';
import styles from "./main-menu.module.css";
export function MainMenu({ children, title }) {
    return (<div className={styles["main-menu-page"]}>
                <div className={styles["main-menu"]}>
                    <h1 className={styles["menu-title"]}>{title}</h1>
                    {children}
                </div>
            </div>);
}
export function MenuButton({ link, text, children }) {
    return (<div className={styles["menu-button"]}>
                <Link className={styles["menu-button-text"]} to={link}>{text}</Link>
                {children}
            </div>);
}

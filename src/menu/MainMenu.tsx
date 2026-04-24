import React, { Component, ReactNode } from "react";
import { Link } from 'react-router-dom';
import styles from "./main-menu.module.css"

//Uses function for component rendering as it is more modern and cleaner

interface MainMenuProps {
    children?: ReactNode;
    title: string;
}

export function MainMenu({ children, title}: MainMenuProps) {
    return (
            <div className = {styles["main-menu-page"]}>
                <div className = {styles["main-menu"]}>
                    <h1 className={styles["menu-title"]}>{title}</h1>
                    {children}
                </div>
            </div>
        );
}

interface MenuButtonProps {
    link: string;
    text: string;
    children?: ReactNode;
}

export function MenuButton({ link, text, children}: MenuButtonProps) {
    return (
            <div className = {styles["menu-button"]}>
                <Link className={styles["menu-button-text"]} to={link}>{text}</Link>
                {children}
            </div>
        );
}

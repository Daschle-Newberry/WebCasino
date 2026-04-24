import React, { Component, ReactNode } from "react";
import { Link } from 'react-router-dom';

import "../styles/index.css"

interface MainMenuProps {
    children?: React.JSX.Element | React.JSX.Element[];
    title?: string;
}

export class MainMenu extends Component<MainMenuProps> {
    override render(): ReactNode {
        const children = React.Children.toArray(this.props.children);
        return <div className = "main-menu-page">
            <div className = "main-menu">
                <h1 className="menu-title">{this.props.title}</h1>
                {children}
            </div>
        </div>
    }
}

interface MenuProps {
    children?: React.JSX.Element | React.JSX.Element[];
    link?: string;
    text?: string;
}

export class MenuButton extends Component<MenuProps> {
    override render(): ReactNode {
        const children = React.Children.toArray(this.props.children);
        return <div className = "menu-button">
                <Link className="menu-button-text" to={this.props.link ?? ""}>{this.props.text}</Link>
                {children}
            </div>
    }
}
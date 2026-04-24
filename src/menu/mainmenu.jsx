import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../styles/index.css";
export class MainMenu extends Component {
    render() {
        const children = React.Children.toArray(this.props.children);
        return <div className="main-menu-page">
            <div className="main-menu">
                <h1 className="menu-title">{this.props.title}</h1>
                {children}
            </div>
        </div>;
    }
}
export class MenuButton extends Component {
    render() {
        var _a;
        const children = React.Children.toArray(this.props.children);
        return <div className="menu-button">
                <Link className="menu-button-text" to={(_a = this.props.link) !== null && _a !== void 0 ? _a : ""}>{this.props.text}</Link>
                {children}
            </div>;
    }
}

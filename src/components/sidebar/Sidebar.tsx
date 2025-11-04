import React from "react";
import {Friends} from "./friends/Friends";
import s from "./Sidebar.module.css";

export const Sidebar = () => {
    return (
        <div>
            <h2>Friends</h2>
            <div className={s.friends}>
                <Friends/>
                <Friends/>
                <Friends/>
            </div>
        </div>
    )
}
import React from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => (
    <li>
        <input
            type="checkbox"
            checked={!!task.isChecked}
            onClick={() => onCheckboxClick(task)} 
        />
        <span>{task.text}</span>
        <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
);
import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection";

export function TaskForm({ user }) {

    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text) return;

        TasksCollection.insert({
            text: text.trim(),
            createdAt: new Date(),
            userId: user._id
        });

        setText("");
    }

    const handleChange = (e) => {
        setText(e.target.value); 
    }

    return(
        <div> 
            <form className="task-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type to add new task"
                    onChange={e => handleChange(e)}
                    value={text}
                />
                <button type="submit">Add task</button>
            </form>
        </div>
    )
    
}
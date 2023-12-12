import React, { useState } from "react"; 

export function TaskForm( ) {

    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text) return;
        
        Meteor.call('task.insert', text);

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
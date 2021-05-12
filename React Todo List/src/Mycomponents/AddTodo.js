import React, {useState} from 'react';

export const AddTodo = ({addTodo}) => {
    const [task, settask] = useState("");
    const [desc, setdesc] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if(!task || !desc){
            alert("Title or Description cannot be empty")
        }
        else{
            addTodo(task,desc);
            settask("");
            setdesc("");
        }
       

    
    }

    return (
        <div className="container my-3" >
            <h3 className="text-center"> Add Todo </h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor ="task" className="form-label">Todo Title</label>
                    <input type="text" value={task} onChange={e => settask(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp"/>
                    
                </div>
                <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Todo Description</label>
                        <input type="text" value={desc} onChange={e => setdesc(e.target.value)} className="form-control" id="desc"/>
                </div>
                
                <button type="submit" className="btn btn-sm btn-success">Submit</button>
            </form>

         </div>
    )
}



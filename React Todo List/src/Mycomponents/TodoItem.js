import React from 'react'

export const TodoItem = ({todo,onDelete}) => { /*using todo storing the array element here from Todos.js and hence referring to todo.task and other properties*/
    return (
        <div>
           <h4>{todo.task}</h4>  
           <p>{todo.desc}</p> 
           <button className= "btn btn-danger btn-sm" onClick={ () => {onDelete(todo)}}>Delete</button>
        </div>
    )
}

import logo from './logo.svg';
import './App.css';
import Header from './Mycomponents/Header';

import { Todos } from './Mycomponents/Todos';
import { AddTodo } from './Mycomponents/AddTodo'
import { Footer } from './Mycomponents/Footer';
import { TodoItem } from './Mycomponents/TodoItem';
import { About } from './Mycomponents/About'
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {

    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"))
  }
  let myvariable = 345;
  const onDelete = (todo) => {
    console.log("You deleted me", todo);

    setTodos(todos.filter((e) => {
      return e !== todo
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (task, desc) => {
    console.log("I am adding", task, desc);
    let sl;
    if (todos.length == 0) {
      sl = 0
    }
    else {
      let sl = todos[todos.length - 1].sl + 1;
    }

    const myTodo = {
      sl: sl,
      task: task,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);

    localStorage.setItem("todos", JSON.stringify(todos));


  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }, [todos]);

  return (
    <>
      <Router>
        <Header title="Title" searchBar={false} />
        <Switch>

          <Route exact path="/" render={() => {
            return (
              <>
                <Todos todos={todos} onDelete={onDelete} />
                <AddTodo addTodo={addTodo} />
              </>)
          }}>
          </Route>
          <Route exact path="/About">
            <About />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </>

  );
}
export default App;

import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

// mapStateToProps function to map the state to component props
const mapStateToProps = (state) => {
  return {
    todos: state, // Mapping the entire state to todos prop
  };
};

// mapDispatchToProps function to map dispatch actions to component props
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)), // Dispatching action to add todo
    removeTodo: (id) => dispatch(removeTodos(id)), // Dispatching action to remove todo
    updateTodo: (obj) => dispatch(updateTodos(obj)), // Dispatching action to update todo
    completeTodo: (id) => dispatch(completeTodos(id)), // Dispatching action to mark todo as completed
  };
};

// DisplayTodos component
const DisplayTodos = (props) => {
  // State for sorting todos
  const [sort, setSort] = useState("active");

  return (
    <div className="displaytodos">
      {/* Buttons for sorting todos */}
      <div className="buttons">
        {/* Button to show active todos */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        {/* Button to show completed todos */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>
        {/* Button to show all todos */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      {/* List of todos */}
      <ul>
        {/* AnimatePresence to animate when todos are added or removed */}
        <AnimatePresence>
          {/* Render active todos */}
          {props.todos.length > 0 && sort === "active"
            ? props.todos.map((item) => {
                return (
                  item.completed === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {/* Render completed todos */}
          {props.todos.length > 0 && sort === "completed"
            ? props.todos.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              })
            : null}
          {/* Render all todos */}
          {props.todos.length > 0 && sort === "all"
            ? props.todos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

// Connect DisplayTodos component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);

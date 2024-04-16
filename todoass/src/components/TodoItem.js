import { motion } from "framer-motion"; // Importing motion component from framer-motion library
import React, { useRef } from "react"; // Importing React and useRef hook from react library
import { AiFillEdit } from "react-icons/ai"; // Importing AiFillEdit icon from react-icons library
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5"; // Importing IoCheckmarkDoneSharp and IoClose icons from react-icons library

const TodoItem = (props) => { // Declaring TodoItem functional component with props parameter
  const { item, updateTodo, removeTodo, completeTodo } = props; // Destructuring props object to extract item, updateTodo, removeTodo, and completeTodo

  const inputRef = useRef(true); // Declaring inputRef variable using useRef hook, initially set to true

  const changeFocus = () => { // Declaring changeFocus function
    inputRef.current.disabled = false; // Enabling the input field
    inputRef.current.focus(); // Focusing on the input field
  };

  const update = (id, value, e) => { // Declaring update function with id, value, and event parameters
    if (e.which === 13) { // Checking if the key pressed is the Enter key (key code 13)
      // here 13 is key code for enter key
      updateTodo({ id, item: value }); // Calling updateTodo function with id and updated item value
      inputRef.current.disabled = true; // Disabling the input field after updating
    }
  };
  return (
    <motion.li // Using the motion component to create an animated list item
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }} // Setting initial animation properties
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }} // Setting animation properties for when the component is mounted
      whileHover={{ // Animation properties for when the component is being hovered over
        scale: 0.9, // Scale down effect
        transition: { type: "spring", duration: 0.1 }, // Spring animation with duration 0.1s
      }}
      exit={{ // Animation properties for when the component is being removed from the DOM
        x: "-60vw", // Move to the left by 60vw
        scale: [1, 0], // Scale down effect
        transition: { duration: 0.5 }, // Animation duration of 0.5s
        backgroundColor: "rgba(255,0,0,1)", // Background color change to red
      }}
      key={item.id} // Unique key for the list item
      className="card" // CSS class name for styling
    >
      <textarea // Textarea input element
        ref={inputRef} // Ref attribute to access the input element
        disabled={inputRef} // Disabling the input initially
        defaultValue={item.item} // Setting default value of the input field to the todo item text
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)} // Event handler for key press events, calling update function
      />
      <div className="btns"> // Container for buttons
        <motion.button // Button for editing todo item
          whileHover={{ scale: 1.4 }} // Scale up effect on hover
          whileTap={{ scale: 0.9 }} // Scale down effect on tap
          onClick={() => changeFocus()} // Click event handler to focus on the input field
        >
          {" "}
          <AiFillEdit />{" "} // Edit icon
        </motion.button>
        {item.completed === false && ( // Conditionally rendering the completion button
          <motion.button // Button for marking todo item as completed
            whileHover={{ scale: 1.4 }} // Scale up effect on hover
            whileTap={{ scale: 0.9 }} // Scale down effect on tap
            style={{ color: "green" }} // Styling the button color
            onClick={() => completeTodo(item.id)} // Click event handler to mark todo item as completed
          >
            <IoCheckmarkDoneSharp /> // Completion icon
          </motion.button>
        )}
        <motion.button // Button for removing todo item
          whileHover={{ scale: 1.4 }} // Scale up effect on hover
          whileTap={{ scale: 0.9 }} // Scale down effect on tap
          style={{ color: "red" }} // Styling the button color
          onClick={() => removeTodo(item.id)} // Click event handler to remove todo item
        >
          {" "}
          <IoClose /> // Close icon
        </motion.button>{" "} // Space after the close button
      </div>
      {item.completed && <span className="completed">done</span>} // Rendering "done" text if todo item is completed
    </motion.li> // Closing tag for the motion component
  );
};

export default TodoItem; // Exporting TodoItem component as default
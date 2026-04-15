import React, { useState, useEffect } from "react";

function Todolist() {
    const [todos, setTodos] = useState( () => JSON.parse(localStorage.getItem('todos')) || []);
    const [input, setInput] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Add a new todo
    const addTodo = () => {
    if (input.trim() === '') return;
    setTodos(prevTodos => [...prevTodos, { text: input, completed: false }]);
    setInput('');
  };

    // Toggle completed state of a todo
    const toggleTodo = (index) => {
        const updated = todos.map((todo, k) => k === index ? {...todo, completed: !todo.completed } : todo);
        setTodos(updated);
    };
    
    // Delete a todo
    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div className="card">
            <h2>To-Do List</h2>
        <div className="todo-input">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new task" onKeyDown={(e) => e.key === 'Enter' && addTodo()} />
            <button onClick={addTodo}>Add</button>
        </div>
        {todos.length === 0 && <p>No tasks added.</p>}
        {todos.map((todo, index) => (
            <div key={index} className="todo-item">
                <span onClick={() => toggleTodo(index)} style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}>
                    {todo.text}
                </span>
                <button onClick={() => deleteTodo(index)}>Delete</button>
            </div>
        ))}
        </div>
    );
}

export default Todolist;
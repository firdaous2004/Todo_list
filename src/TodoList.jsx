import React, { useState, useReducer } from 'react';
import './App.css';

// Actions possibles
const actions = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  COMPLETE_ALL_TASKS: 'COMPLETE_ALL_TASKS',
  DELETE_COMPLETED_TASKS: 'DELETE_COMPLETED_TASKS',
  DELETE_INCOMPLETE_TASKS: 'DELETE_INCOMPLETE_TASKS',
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }],
      };
    case actions.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case actions.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case actions.COMPLETE_ALL_TASKS:
      return {
        ...state,
        tasks: state.tasks.map(task => ({ ...task, completed: true })),
      };
    case actions.DELETE_COMPLETED_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.completed),
      };
    case actions.DELETE_INCOMPLETE_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.completed),
      };
    default:
      return state;
  }
};

// Composant Tâche
const Task = ({ task, onToggleComplete, onDelete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      {task.text}
      <button onClick={() => onDelete(task.id)}>Supprimer</button>
    </li>
  );
};

// Composant Liste de Tâches
const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <ul>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

// Composant Formulaire d'Ajout
const AddTaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');
  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button onClick={() => onAddTask(newTask)}>Ajouter</button>
    </div>
  );
};

// Composant principal
const TodoListApp = () => {
  const [state, dispatch] = useReducer(reducer, { tasks: [] });

  const handleAddTask = (text) => {
    dispatch({ type: actions.ADD_TASK, payload: text });
  };

  const handleToggleComplete = (id) => {
    dispatch({ type: actions.TOGGLE_TASK, payload: id });
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: actions.DELETE_TASK, payload: id });
  };

  const handleCompleteAllTasks = () => {
    dispatch({ type: actions.COMPLETE_ALL_TASKS });
  };

  const handleDeleteCompletedTasks = () => {
    dispatch({ type: actions.DELETE_COMPLETED_TASKS });
  };

  const handleDeleteIncompleteTasks = () => {
    dispatch({ type: actions.DELETE_INCOMPLETE_TASKS });
  };

  return (
    <div>
      <h1>Liste de Tâches</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={state.tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
      <button onClick={handleCompleteAllTasks}>Marquer toutes comme terminées</button>
      <button onClick={handleDeleteCompletedTasks}>Supprimer les tâches terminées</button>
      <button onClick={handleDeleteIncompleteTasks}>Supprimer les tâches non terminées</button>
    </div>
  );
};

export default TodoListApp;
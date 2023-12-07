import React, { createContext, useContext, useState, useEffect } from 'react';

interface Task {
  id: string;
  content: string;
}

interface TaskContextProps {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (content: string) => void;
  updateTask: (id: string, content: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    // Fetch tasks from the API
    const response = await fetch('/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (content: string) => {
    // Add task to the API
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const newTask = await response.json();
    console.log("data",tasks,newTask.error)
    if(!newTask?.error){
    setTasks([...tasks, newTask]);
    }
  };

  const updateTask = async (id: string, content: string) => {
    // Update task in the API
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = async (id: string) => {
    // Delete task from the API
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export { TaskProvider, useTaskContext };

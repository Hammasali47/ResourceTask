// pages/tasks/add-edit-task.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTaskContext } from '../../contexts/TaskContent';

const AddTaskPage: React.FC = () => {
  const router = useRouter();
  const { addTask } = useTaskContext();
  const [content, setContent] = useState('');

  const handleAddTask = () => {
    if (content.trim()) {
      addTask(content);
      router.push('/'); // Redirect to task list after adding
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Add Task</h1>
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskPage;

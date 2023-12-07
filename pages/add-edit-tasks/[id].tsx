import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTaskContext } from '../../contexts/TaskContent';

const EditDeleteTaskPage: React.FC = () => {
  const router = useRouter();
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [task, setTask] = useState({ id: '', content: '' });

  useEffect(() => {
    const taskId = router.query.id as string;
    const selectedTask = tasks.find((t) => t.id === taskId);
    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [router.query.id, tasks]);

  const handleUpdateTask = () => {
    updateTask(task.id, task.content);
    router.push('/');
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    router.push('/');
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Edit Task</h1>
      <input
        type="text"
        value={task.content}
        onChange={(e) => setTask({ ...task, content: e.target.value })}
      />
      <button onClick={handleUpdateTask}>Update Task</button>
      <button onClick={handleDeleteTask}>Delete Task</button>
    </div>
  );
};

export default EditDeleteTaskPage;

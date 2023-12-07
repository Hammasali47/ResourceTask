// components/TaskList.tsx

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTaskContext } from '../contexts/TaskContent';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  const router = useRouter();

  const addTask = () =>{
    router.push('/add-edit-tasks')
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{display:"flex"}}>
      <h1>Task List</h1>
      <button style={{width:"75px", height:"25px"}} onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.length>0 ?  tasks?.map((task) => (
          <li key={task.id}>
            <Link href={`/tasks/${task.id}`}>
              <a>{task.content}</a>
            </Link>
          </li>
        )):null}
      </ul>
    </div>
  );
};

export default TaskList;

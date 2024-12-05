import React, { useEffect, useState } from "react";
import { ChartBar, Plus, CheckSquare, Square, Edit2, Trash2, LogOut } from 'lucide-react';
import Modal from "../components/Task/AddTaskModal";
import { deleteTask, fetchTaskStatistics, getTasks, updateTask } from "../services/api";
import toast from "react-hot-toast";
import socket from "../utils/socket";
import TaskStatisticsModal from "../components/Task/TaskStatisticsModal";

const TaskDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isUpdating, setIsUpdating] = useState(null);
  const [statistics, setStatistics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    deletedTasks: 0,
    activeTasks: 0,
  });

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);
      const updatedTask = { ...task, completed: !task.completed };
      const response = await updateTask(id, updatedTask);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTask(id);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = (task) => {
    setIsUpdating(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsUpdating(null);
  };

  useEffect(() => {
    fetchTasks();

    socket.on("refreshTasks", (payload) => {
      console.log("Task update received:", payload);

      if (payload.success) {
        const updatedTask = payload.data;
        console.log("Updated task:", updatedTask);
        setTasks(updatedTask);
      } else {
        console.error("Error in task update:", payload.message);
      }
    });

    return () => {
      socket.off("refreshTasks");
    };
  }, []);


  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  const updateStatistics = async () => {
    try {
        const data = await fetchTaskStatistics();

        console.log(data);
        
        setStatistics(data.data);
    } catch (error) {
        console.error('Error updating statistics:', error);
    }
};

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
};


  useEffect(() => {
    socket.on('taskAdded', () => updateStatistics());
    socket.on('taskDeleted', () => updateStatistics());
    socket.on('taskUpdated', () => updateStatistics());

    return () => {
        socket.off('taskAdded');
        socket.off('taskDeleted');
        socket.off('taskUpdated');
    };
}, []);



  return (
    <>
    <TaskStatisticsModal
      isOpen={isStatModalOpen}
      onClose={() => setIsStatModalOpen(false)}
      statistics={statistics}
    />
    <Modal
      isOpen={isModalOpen}
      onClose={() => handleModalClose()}
      data={isUpdating}
    />

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Tasks
            </h1>
            <p className="text-gray-500 mt-1">Organize and track your daily activities</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsStatModalOpen(true)}
              className="group bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 border border-emerald-200"
            >
              <ChartBar size={18} className="group-hover:scale-110 transition-transform" />
              Analytics
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map((task) => (
            <div
              key={task.id}
              className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5 border border-gray-100 ${
                task.completed ? "bg-gray-50" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-semibold truncate ${
                      task.completed
                        ? "text-gray-500 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`text-sm mt-2 line-clamp-2 ${
                      task.completed ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {task.description}
                  </p>
                  <p className="text-xs mt-3 text-gray-400">
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-end items-center gap-1 mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleComplete(task._id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={task.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {task.completed ? (
                    <CheckSquare className="text-emerald-500" size={18} />
                  ) : (
                    <Square className="text-gray-400 hover:text-emerald-500" size={18} />
                  )}
                </button>
                <button
                  onClick={() => handleUpdate(task)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit task"
                >
                  <Edit2 className="text-blue-500" size={18} />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="text-red-500" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="fixed bottom-8 right-8">
          <button onClick={handleLogout} className="group bg-white hover:bg-red-50 text-red-600 px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow border border-red-200">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

export default TaskDashboard;

import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const useTaskActions = () => {
  const { deleteTask } = useTasks();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleDelete = (task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  const confirmDelete = async () => {
    if (!selectedTask) return;

    await deleteTask(selectedTask.id);

    setSelectedTask(null);
    setIsDeleteOpen(false);
  };

  return {
    selectedTask,

    isEditOpen,
    isDeleteOpen,

    handleEdit,
    handleDelete,

    closeEdit,
    closeDelete,

    confirmDelete,
  };
};

export default useTaskActions;
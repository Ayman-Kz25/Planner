import { useEffect, useRef } from "react";
import { useTasks } from "../context/TaskContext";
import { useSettings } from "../context/SettingsContext";

const getTaskDate = (dueDate) => {
  if (!dueDate) return null;

  if (dueDate?.seconds) {
    return new Date(dueDate.seconds * 1000);
  }

  if (dueDate instanceof Date) {
    return dueDate;
  }

  const date = new Date(dueDate);

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatReminderTime = (date) => {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const useTaskAutomation = () => {
  const { tasks, deleteTask } = useTasks();
  const { settings } = useSettings();

  const shownReminders = useRef(new Set());
  const deletingTasks = useRef(new Set());

  /*
   * Ask for browser notification permission.
   */
  useEffect(() => {
    if (!settings.notifications) return;

    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications.");
      return;
    }

    if (Notification.permission !== "default") {
      return;
    }

    const requestPermission = async () => {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.error(
          "Notification permission request failed:",
          error,
        );
      }
    };

    requestPermission();
  }, [settings.notifications]);

  /*
   * Task reminders.
   */
  useEffect(() => {
    if (!settings.notifications) return;
    if (!("Notification" in window)) return;

    const checkReminders = () => {
      if (Notification.permission !== "granted") {
        return;
      }

      const now = Date.now();
      const reminderMinutes = Number(settings.reminderMinutes) || 30;

      tasks.forEach((task) => {
        if (!task.dueDate) return;
        if (task.status === "completed") return;

        const dueDate = getTaskDate(task.dueDate);

        if (!dueDate) return;

        const dueTime = dueDate.getTime();

        const reminderTime =
          dueTime - reminderMinutes * 60 * 1000;

        const reminderId =
          `${task.id}-${dueTime}-${reminderMinutes}`;

        /*
         * Only show the reminder during the reminder window.
         */
        if (
          now >= reminderTime &&
          now < dueTime &&
          !shownReminders.current.has(reminderId)
        ) {
          new Notification("Planner Reminder", {
            body: `"${task.title}" is due at ${formatReminderTime(
              dueDate,
            )}.`,
            tag: `planner-${task.id}`,
          });

          shownReminders.current.add(reminderId);
        }
      });
    };

    checkReminders();

    const interval = setInterval(checkReminders, 30000);

    return () => clearInterval(interval);
  }, [
    tasks,
    settings.notifications,
    settings.reminderMinutes,
  ]);

  /*
   * Automatically delete completed tasks.
   */
  useEffect(() => {
    if (!settings.autoDelete) return;

    const completedTasks = tasks.filter(
      (task) => task.status === "completed",
    );

    if (!completedTasks.length) return;

    completedTasks.forEach(async (task) => {
      if (deletingTasks.current.has(task.id)) {
        return;
      }

      deletingTasks.current.add(task.id);

      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error(
          `Failed to auto-delete task "${task.title}":`,
          error,
        );

        deletingTasks.current.delete(task.id);
      }
    });
  }, [tasks, settings.autoDelete, deleteTask]);
};

export default useTaskAutomation;
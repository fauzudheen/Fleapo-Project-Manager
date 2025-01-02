import API from "@/api/axios";
import { TaskAnalytics } from "@/types/task";
import { useEffect, useState } from "react";
import TaskAnalyticsCard from "@/components/common/task/TaskAnalyticsCard";

const Dashboard = () => {
  const [tasksAnalytics, setTaskAnalytics] = useState<TaskAnalytics>();

  useEffect(() => {
    const getTaskAnalytics = async () => {
      try {
        const response = await API.get<TaskAnalytics>('/tasks/analytics/');
        setTaskAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    getTaskAnalytics();
  }, []);
  
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TaskAnalyticsCard
          title="Total Tasks"
          value={tasksAnalytics?.total_tasks}
          colorVariant="red"
        />
        <TaskAnalyticsCard
          title="Completed Tasks"
          value={tasksAnalytics?.completed_tasks}
          colorVariant="green"
        />
        <TaskAnalyticsCard
          title="Pending Tasks"
          value={tasksAnalytics?.pending_tasks}
          colorVariant="yellow"
        />
        <TaskAnalyticsCard
          title="In Progress Tasks"
          value={tasksAnalytics?.in_progress_tasks}
          colorVariant="blue"
        />
      </div>
    </div>
  );
};

export default Dashboard;
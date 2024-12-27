import React from "react";
import { useWebStore } from "../store/authStore";
import { Button } from "@/components/ui/button"; 
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { clearAuth, user } = useWebStore();

  const handleLogout = () => {
    clearAuth();
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Card className="max-w-md w-full text-center p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome, {user?.first_name}!
        </h1>
        <p className="text-gray-600 text-lg mb-2">
          Email: {user?.email}
        </p>
        <p className="text-gray-600 text-lg mb-4">
          Full Name: {user?.first_name} {user?.last_name}
        </p>
        <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            navigate("/profile");
          }}
          variant="secondary"
          className="w-full mt-6"
        >
          Update Profile
        </Button>
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full mt-6"
        >
          Logout
        </Button>
            
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
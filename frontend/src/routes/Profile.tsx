import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useWebStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import { API } from "../api/axios"
import { Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'


const Profile = () => {
  const { user, setUser } = useWebStore();
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([])
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await API.put(`/users/${user?.id}`, form) 
      console.log(response.data)
      setUser(response.data)
    } catch (error: any) {
      console.log(error)
      if (error.response?.data?.detail) {
        setErrors([error.response.data.detail]) 
      } else {
        setErrors(['An unknown error occurred'])
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <Card className="max-w-md w-full text-center p-8 shadow-lg border rounded-xl">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Update Profile</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="first_name" className="block text-left text-gray-700 font-medium">
              First Name
            </label>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Enter your first name"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-left text-gray-700 font-medium">
              Last Name
            </label>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Enter your last name"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-left text-gray-700 font-medium">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}

            {!isLoading ? (
                <Button type="submit">Update</Button>
              ) : (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              )}
        </form>
      </Card>
    </div>
  );
};

export default Profile;
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterForm } from '../types/auth'
import API from '../api/axios'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { fleapoLogo } from '@/assets/logo'


const Register = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<RegisterForm>({
      first_name: '',
      last_name: '',
      email: '',
      password: ''
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrors([])
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })  
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
          const response = await API.post('/users/register', form) 
          console.log(response.data)
          navigate('/login')
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
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-fleapo-green-150">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 m-4">
        <div className="flex flex-col items-center">
          <img
            src={fleapoLogo}
            alt="Logo"
            className="h-16 w-auto mb-6"
          />
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-500">
            Register to get started with your account
          </p>
        </div>
        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <div className="mt-1">
              <Input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                onChange={handleChange}
                value={form.first_name}
                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <div className="mt-1">
              <Input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                required
                onChange={handleChange}
                value={form.last_name}
                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleChange}
                value={form.email}
                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                onChange={handleChange}
                value={form.password}
                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </AlertDescription>
            </Alert>
          )}
          <div className="flex justify-center">
            {!isLoading ? (
              <Button
                type="submit"
                className="w-full bg-fleapo-green-100 hover:bg-fleapo-green-125 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Register
              </Button>
            ) : (
              <Button
                disabled
                className="w-full bg-gray-400 text-white font-medium py-2 px-4 rounded-lg"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            )}
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-fleapo-green-100 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default Register

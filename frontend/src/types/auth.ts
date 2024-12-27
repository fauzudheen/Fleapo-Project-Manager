export interface LoginForm {
    email: string
    password: string
}

export interface RegisterForm extends LoginForm {
    first_name: string
    last_name: string
}

export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    is_active: boolean
    is_admin: boolean
}

export interface Token {
    access_token: string
    token_type: string
}
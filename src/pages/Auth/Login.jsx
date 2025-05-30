import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const { updateUser } = useContext(UserContext)

    const handleLogin = async(e) => {
        e.preventDefault()

        if(!validateEmail(email)){
            setError("Coloque um email válido")
            return
        }

        if(!password){
            setError("Senha inválida")
            return
        }

        setError("")

        //Login api call
        try{
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            })
            const {token, user} = response.data

            if(token){
                localStorage.setItem("token", token)
                updateUser(user)
                navigate("/dashboard")
            }
        } catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message)
            } else{
                setError("Something went wrong. Please try again")
            }
        }
    }

    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Bem-vindo</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Insira seus dados para efetuar login
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({target}) => setEmail(target.value)}
                        label="Email"
                        placeholder=""
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                        label="Password"
                        placeholder=""
                        type="password"
                    />

                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                    <button type='submit' className='btn-primary'>ENTRAR</button>
                    
                    <p className='text-[13px] text-slate-800 mt-3'>
                        Não tem uma conta? {""}
                        <Link className='font-medium text-primary underline' to='/signup'>Entrar</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login

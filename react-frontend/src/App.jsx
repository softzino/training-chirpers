import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "./lib/axios.js";

function App() {
    const csrf = async () => axios.get('/sanctum/csrf-cookie')
    const [form, setForm] = useState({email: '', password: ''})

    const setFormValues = (key, value) => {
        setForm({...form, [key]: value});
    }

    const login = async (e) => {
        e.preventDefault();
        await csrf()

        const axiosRespons = await axios
            .post('/login', form)
            .catch(error => {
                if (error.response.status !== 422) throw error

                console.error("ERROR  ", error.response.data.errors)
            })

        setForm({email:'', password: ''})

        console.log("Successfully logged in", axiosRespons)
    }

    return (
        <>
            <div>
                <form onSubmit={login}>
                    <input type="email" value={form.email} required onChange={(e) => setFormValues('email', e.target.value)} />
                    <input type="password" value={form.password} required onChange={(e) => setFormValues('password', e.target.value)} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default App

import './App.css'
import axios from 'axios'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from './context/userContext'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
    const notify = () => toast("Wow so easy!");

    return (
        <UserContextProvider>
            <button onClick={notify}>Notify!</button>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            ></ToastContainer>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </UserContextProvider>
    )
}

export default App

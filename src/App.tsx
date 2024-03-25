import './App.css'
import axios from 'axios'
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from './context/userContext'
import { Routes, Route } from 'react-router-dom'
// @ts-ignore
import { Home } from './pages/Home'
import { Header } from './components/Header';
import { Error } from './pages/Error'
// @ts-ignore
import { Organizer } from './pages/Organizer'
// @ts-ignore
import { Event } from './pages/Event'
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Account } from './pages/Account';
import { useState } from 'react';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
    const [user, setUser] = useState(true)

    return (
        <UserContextProvider>
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
            <Header />
            <Routes>
                <Route element={<PrivateRoutes user={user} />}>
                    <Route path='/account' element={<Account />} />
                </Route>
                <Route path='/' element={<Home />} />
                <Route path="/organizer/:organizer" element={<Organizer />} />
                <Route path="/event/:organizer/:eventName" id='id' element={<Event />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </UserContextProvider>
    )
}

export default App

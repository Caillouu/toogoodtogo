// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
)

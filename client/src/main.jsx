import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import AppContextProvider from './context/AppContext.jsx'
import PostContextProvider from './context/PostContext.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <PostContextProvider>
        <App />
        <Toaster
          position="top-center"
          containerStyle={{
            top: 60,
          }}

        />
      </PostContextProvider>
    </AppContextProvider>
  </BrowserRouter>,
)

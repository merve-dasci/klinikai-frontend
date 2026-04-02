import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#fffaf7",
          color: "#5c4a42",
          border: "1px solid #eee3dc",
          borderRadius: "16px",
          padding: "14px 16px",
          boxShadow: "0 10px 30px rgba(92, 74, 66, 0.08)",
        },
        success: {
          iconTheme: {
            primary: "#c8a89e",
            secondary: "#fffaf7",
          },
        },
        error: {
          iconTheme: {
            primary: "#d08b8b",
            secondary: "#fffaf7",
          },
        },
      }}
    />
  </StrictMode>,
);

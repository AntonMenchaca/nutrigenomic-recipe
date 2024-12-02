'use client'; // Enables client-side rendering for hooks like useState
import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import { Switch, Spin, Button } from 'antd';


export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const checkFontsAndCSS = async () => {
      setTimeout(() => {
        setIsLoaded(true)
      }, 500)
    };

    checkFontsAndCSS();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <html lang="en">
      <body
      >
        {/* Show loader while waiting for CSS/fonts */}
        {!isLoaded ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            {/* Replace with your spinner */}
            <Spin size='large' />
          </div>
        ) : (
          <>
            <header style={{ display: 'flex', justifyContent: 'space-between', margin: 20 }}>
              <link rel="preload" href="/globals.css" as="style" />
              <div>
                <div style={{ fontSize: 20, marginLeft: 20 }}><strong>Nutrigenomic Recipes</strong></div>

              </div>
              {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: 20, alignItems: 'center' }}>
                <Button type='primary'>
                  Random Recipe
                </Button>
              </div> */}
            </header>
            {children}
          </>
        )}
        <style>
          {`@keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }`}
        </style>
      </body>
    </html >
  );
}

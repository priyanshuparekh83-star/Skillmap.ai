import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import OnboardingWizard from './components/OnboardingWizard';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Inner App Component to consume AuthContext
const AppContent = () => {
  const [appState, setAppState] = useState('LANDING');
  const [onboardingData, setOnboardingData] = useState(null);
  const [theme, setTheme] = useState('dark');
  const { currentUser } = useAuth();

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleStart = () => {
    if (currentUser) {
      setAppState('ONBOARDING');
    } else {
      setAppState('LOGIN'); // Require login to start
    }
  };

  const handleOnboardingComplete = (data) => {
    setOnboardingData(data);
    setAppState('DASHBOARD');
  };

  // Auth Persistence / Auto-Redirect
  useEffect(() => {
    if (currentUser) {
      // If logged in and on auth pages, go to dashboard
      if (appState === 'LOGIN' || appState === 'REGISTER') {
        setAppState('DASHBOARD');
      }
    } else {
      // If logged out and on protected pages, go to landing
      if (appState === 'DASHBOARD' || appState === 'ONBOARDING') {
        setAppState('LANDING');
      }
    }
  }, [currentUser, appState]);

  // Handle explicit navigation from Layout
  const handleNavigate = (page) => {
    setAppState(page);
  };

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} onNavigate={handleNavigate} currentAppState={appState}>
      {appState === 'LANDING' && <LandingPage onStart={handleStart} />}
      {appState === 'LOGIN' && <Login onSwitchToRegister={() => setAppState('REGISTER')} />}
      {appState === 'REGISTER' && <Register onSwitchToLogin={() => setAppState('LOGIN')} />}
      {appState === 'ONBOARDING' && <OnboardingWizard onComplete={handleOnboardingComplete} />}
      {appState === 'DASHBOARD' && currentUser && (
        <Dashboard
          initialData={onboardingData}
          onReset={() => {
            setOnboardingData(null);
            setAppState('LANDING');
          }}
          theme={theme}
        />
      )}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

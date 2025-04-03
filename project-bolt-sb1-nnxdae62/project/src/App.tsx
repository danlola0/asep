import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthGuard } from './components/AuthGuard';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Operations from './pages/Operations';
import Factures from './pages/Factures';
import Fiscalite from './pages/Fiscalite';
import Documents from './pages/Documents';
import Parametres from './pages/Parametres';
import Caisse from './pages/Caisse';
import IPR from './pages/IPR';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Auth from './pages/Auth';
import { supabase } from './utils/supabaseClient';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        console.log("utilisateur connecté");
      }
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });
    setIsLoading(false);
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/caisse" element={<Caisse />} />
                    <Route path="/operations" element={<Operations />} />
                    <Route path="/factures" element={<Factures />} />
                    <Route path="/fiscalite" element={<Fiscalite />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/parametres" element={<Parametres />} />
                    <Route path="/ipr" element={<IPR />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </AuthGuard>
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0ea5e9',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;

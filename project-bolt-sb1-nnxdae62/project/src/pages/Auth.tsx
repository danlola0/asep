import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSupabaseConfig = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Erreur de session:', sessionError);
          setError('Erreur de connexion: ' + sessionError.message);
          setIsSupabaseConfigured(false);
          return;
        }

        if (session) {
          navigate('/');
          return;
        }

        // Simple connection test without retries
        try {
          const { error: testError } = await supabase
            .from('company_profiles')
            .select('count')
            .single();

          if (testError?.code === 'invalid_api_key') {
            setError('Clé API Supabase invalide. Veuillez reconfigurer votre connexion.');
            setIsSupabaseConfigured(false);
            return;
          }

          if (testError?.message?.includes('Failed to fetch')) {
            setError('Impossible de se connecter à Supabase. Veuillez vérifier votre connexion internet.');
            setIsSupabaseConfigured(false);
            return;
          }

          setIsSupabaseConfigured(true);
          setError(null);
        } catch (err: any) {
          if (err?.message?.includes('Failed to fetch')) {
            setError('Erreur de connexion réseau. Veuillez vérifier votre connexion internet.');
          } else {
            setError('Erreur lors de la connexion à Supabase. Veuillez réessayer.');
          }
          setIsSupabaseConfigured(false);
        }
      } catch (err: any) {
        console.error('Erreur de configuration:', err);
        setIsSupabaseConfigured(false);
        setError(err?.message || 'Erreur de connexion à Supabase');
      }
    };

    checkSupabaseConfig();
  }, [navigate]);

  if (!isSupabaseConfigured || error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-secondary-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Configuration requise
          </h2>
          <div className="mt-4 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Configuration Supabase nécessaire
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Pour utiliser l'application, veuillez :</p>
                  <ol className="mt-4 list-decimal list-inside space-y-2">
                    <li>Cliquer sur le bouton "Connect to Supabase" en haut à droite</li>
                    <li>Suivre les étapes de configuration</li>
                    <li>Attendre la fin de la configuration</li>
                    <li>Rafraîchir la page une fois la configuration terminée</li>
                  </ol>
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-50 rounded-md">
                    <p className="text-sm text-red-600">
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Asepfinance
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Gestion financière pour PME en RDC
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0ea5e9',
                    brandAccent: '#0284c7'
                  }
                }
              }
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Adresse email",
                  password_label: "Mot de passe",
                  button_label: "Se connecter"
                },
                sign_up: {
                  email_label: "Adresse email",
                  password_label: "Mot de passe",
                  button_label: "S'inscrire"
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUp: React.FC = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [photoEntreprise, setPhotoEntreprise] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [numeroImpot, setNumeroImpot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhotoEntreprise(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Inscription de l'utilisateur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error('Erreur d\'inscription :', authError);
        toast.error(`Erreur d'inscription: ${authError.message}`); // Afficher l'erreur spécifique
        throw new Error(`Erreur d'inscription: ${authError.message}`);
      }

      let photoUrl = null;
      if (photoEntreprise) {
        // 2. Téléchargement de la photo
        const { data: storageData, error: storageError } = await supabase.storage
          .from('company-logos')
          .upload(`${authData.user?.id}/${photoEntreprise.name}`, photoEntreprise, {
            cacheControl: '3600',
            upsert: false
          });

        if (storageError) {
          console.error('Erreur lors du téléchargement de la photo :', storageError);
          toast.error(`Erreur lors du téléchargement de la photo: ${storageError.message}`); // Afficher l'erreur spécifique
          throw new Error(`Erreur lors du téléchargement de la photo: ${storageError.message}`);
        }

        photoUrl = supabase.storage.from('company-logos').getPublicUrl(storageData.path).data.publicUrl;
      }

      // 3. Insertion du profil
      const { error: profileError } = await supabase.from('company_profiles').insert({
        user_id: authData.user?.id,
        name: nom,
        email: email,
        logo_url: photoUrl,
        rccm: numeroImpot,
      });

      if (profileError) {
        console.error('Erreur lors de la création du profil :', profileError);
        toast.error(`Erreur lors de la création du profil: ${profileError.message}`); // Afficher l'erreur spécifique
        throw new Error(`Erreur lors de la création du profil: ${profileError.message}`);
      }

      console.log('Inscription réussie :', authData);
      toast.success('Inscription réussie !');
      navigate('/dashboard');
    } catch (err: any) {
      // Gestion des erreurs
      setError(err.message || 'Erreur lors de l\'inscription');
      console.error('Erreur lors de l\'inscription :', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nom" className="block mb-2">Nom de l'entreprise:</label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="photoEntreprise" className="block mb-2">Photo de l'entreprise:</label>
            <input
              type="file"
              id="photoEntreprise"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Mot de passe:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="numeroImpot" className="block mb-2">Numéro d'impôt:</label>
            <input
              type="text"
              id="numeroImpot"
              value={numeroImpot}
              onChange={(e) => setNumeroImpot(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {isLoading ? 'Création en cours...' : 'Créer un compte'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-primary-600 hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

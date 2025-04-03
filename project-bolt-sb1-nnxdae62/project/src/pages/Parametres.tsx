import React, { useState, useEffect } from 'react';
import { Building2, Mail, Phone, CreditCard, Upload, Camera } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import toast from 'react-hot-toast';

interface CompanyProfile {
  id: string;
  name: string;
  rccm: string;
  email: string;
  phone: string;
  logo_url: string;
  payment_method: string;
  address: string;
  updated_at?: Date;
}

function Parametres() {
  const [profile, setProfile] = useState<CompanyProfile>({
    id: '',
    name: '',
    rccm: '',
    email: '',
    phone: '',
    logo_url: '',
    payment_method: 'M-PESA',
    address: ''
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  async function fetchCompanyProfile() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) return;

      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data as CompanyProfile);
    } catch (error) {
      console.error('Error fetching company profile:', error);
      toast.error('Erreur lors du chargement du profil');
    }
  }

  async function updateProfile() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        toast.error('Veuillez vous connecter');
        return;
      }

      const updates: CompanyProfile = {
        ...profile,
        id: user.id,
        updated_at: new Date()
      };

      const { error } = await supabase
        .from('company_profiles')
        .upsert(updates);

      if (error) throw error;
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur lors de la mise à jour du profil');
    }
  }

  async function uploadLogo(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Veuillez sélectionner une image');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath);

      setProfile({ ...profile, logo_url: data.publicUrl });
      toast.success('Logo téléchargé avec succès');
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Erreur lors du téléchargement du logo');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-800">Paramètres</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-6 text-primary-800">Logo de l'entreprise</h3>
          <div className="flex items-center space-x-6">
            <div className="relative">
              {profile.logo_url ? (
                <img
                  src={profile.logo_url}
                  alt="Logo de l'entreprise"
                  className="w-32 h-32 rounded-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={uploadLogo}
                  disabled={uploading}
                />
              </label>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                Formats acceptés : JPG, PNG. Taille maximale : 2MB
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary-800">Informations de l'entreprise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom de l'entreprise
              </label>
              <div className="mt-1 flex items-center">
                <Building2 className="w-5 h-5 text-primary-400 mr-2" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Votre entreprise SARL"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                RCCM
              </label>
              <input
                type="text"
                value={profile.rccm}
                onChange={(e) => setProfile({ ...profile, rccm: e.target.value })}
                className="mt-1 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="CD/KIN/RCCM/XX-X-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 flex items-center">
                <Mail className="w-5 h-5 text-primary-400 mr-2" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="contact@entreprise.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <div className="mt-1 flex items-center">
                <Phone className="w-5 h-5 text-primary-400 mr-2" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="+243 XX XXX XXXX"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <textarea
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                rows={3}
                className="mt-1 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Adresse complète de l'entreprise"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary-800">Paramètres de paiement</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mode de paiement préféré
              </label>
              <div className="mt-1 flex items-center">
                <CreditCard className="w-5 h-5 text-primary-400 mr-2" />
                <select
                  value={profile.payment_method}
                  onChange={(e) => setProfile({ ...profile, payment_method: e.target.value })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option>M-PESA</option>
                  <option>Orange Money</option>
                  <option>Airtel Money</option>
                  <option>Virement bancaire</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={updateProfile}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}

export default Parametres;
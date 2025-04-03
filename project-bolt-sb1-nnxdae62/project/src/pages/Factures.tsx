import React from 'react';
import { Plus, Download } from 'lucide-react';

function Factures() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-800">Gestion des factures</h2>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-primary-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nouvelle facture</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-primary-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-primary-800">Facture #2024-001</h3>
              <p className="text-sm text-gray-500">Client XYZ SARL</p>
            </div>
            <button className="text-primary-600 hover:text-primary-700 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Montant</span>
              <span className="font-medium text-primary-700">5,000 USD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date d'émission</span>
              <span>27/02/2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Échéance</span>
              <span>27/03/2024</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-secondary-100 text-secondary-800">
              En attente de paiement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Factures;
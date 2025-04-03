import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

function Fiscalite() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-800">Gestion fiscale</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-primary-800">Obligations fiscales</h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-secondary-400 pl-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-secondary-400 mr-2" />
              <h4 className="font-medium text-primary-800">TVA - Février 2024</h4>
            </div>
            <p className="text-sm text-gray-500 mt-1">À déclarer avant le 15/03/2024</p>
            <div className="mt-2">
              <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                Préparer la déclaration
              </button>
            </div>
          </div>

          <div className="border-l-4 border-primary-400 pl-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-primary-400 mr-2" />
              <h4 className="font-medium text-primary-800">IPR - Janvier 2024</h4>
            </div>
            <p className="text-sm text-gray-500 mt-1">Déclaré le 10/02/2024</p>
          </div>

          <div className="border-l-4 border-secondary-400 pl-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-secondary-400 mr-2" />
              <h4 className="font-medium text-primary-800">Impôt sur les sociétés 2024</h4>
            </div>
            <p className="text-sm text-gray-500 mt-1">À déclarer avant le 30/04/2024</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-primary-800">Résumé fiscal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">TVA collectée</p>
            <p className="text-xl font-bold text-primary-700">2,500 USD</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">TVA déductible</p>
            <p className="text-xl font-bold text-primary-700">550 USD</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">TVA à payer</p>
            <p className="text-xl font-bold text-secondary-600">1,950 USD</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fiscalite;
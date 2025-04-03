import React from 'react';
import { ArrowUpRight, ArrowDownRight, AlertCircle, Bell } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-800">Tableau de bord</h2>
        <div className="flex space-x-4">
          <button className="p-2 rounded-full bg-primary-100 hover:bg-primary-200 transition-colors">
            <Bell className="w-5 h-5 text-primary-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Revenus du mois</p>
              <p className="text-2xl font-bold text-primary-700">15,000 USD</p>
            </div>
            <div className="flex items-center text-green-500">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm">+12.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Dépenses du mois</p>
              <p className="text-2xl font-bold text-secondary-700">8,500 USD</p>
            </div>
            <div className="flex items-center text-red-500">
              <ArrowDownRight className="w-4 h-4" />
              <span className="text-sm">-3.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">TVA à payer</p>
              <p className="text-2xl font-bold text-primary-700">1,950 USD</p>
            </div>
            <div className="flex items-center text-secondary-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Échéance: 15j</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-primary-800">Rappels importants</h3>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
            Déclaration TVA à soumettre avant le 15 du mois
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            3 factures en attente de paiement
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
            Mise à jour des états financiers OHADA requise
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
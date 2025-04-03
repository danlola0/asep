import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';

function Operations() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-800">Opérations financières</h2>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-primary-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nouvelle opération</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une opération..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 border rounded-md flex items-center space-x-2 hover:bg-gray-50 text-primary-700">
          <Filter className="w-4 h-4" />
          <span>Filtres</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2024-02-28
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Paiement fournisseur ABC
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Dépense
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                -2,500 USD
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                  Complété
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2024-02-27
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Facture client XYZ
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Revenu
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                +5,000 USD
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800">
                  En attente
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Operations;
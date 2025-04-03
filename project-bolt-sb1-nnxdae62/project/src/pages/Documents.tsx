import React from 'react';
import { File, Upload, FolderOpen } from 'lucide-react';

function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-800">Archives documentaires</h2>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-primary-700 transition-colors">
          <Upload className="w-4 h-4" />
          <span>Importer un document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-primary-100">
          <div className="flex items-center space-x-3 mb-4">
            <FolderOpen className="w-6 h-6 text-primary-500" />
            <h3 className="font-semibold text-primary-800">Factures</h3>
          </div>
          <p className="text-sm text-gray-500 mb-2">15 documents</p>
          <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
            Voir le dossier
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-primary-100">
          <div className="flex items-center space-x-3 mb-4">
            <FolderOpen className="w-6 h-6 text-primary-500" />
            <h3 className="font-semibold text-primary-800">Déclarations fiscales</h3>
          </div>
          <p className="text-sm text-gray-500 mb-2">8 documents</p>
          <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
            Voir le dossier
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-primary-100">
          <div className="flex items-center space-x-3 mb-4">
            <FolderOpen className="w-6 h-6 text-primary-500" />
            <h3 className="font-semibold text-primary-800">États financiers</h3>
          </div>
          <p className="text-sm text-gray-500 mb-2">5 documents</p>
          <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
            Voir le dossier
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-primary-800">Documents récents</h3>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <File className="w-5 h-5 text-primary-400" />
              <div>
                <p className="font-medium text-primary-800">Facture_Client_XYZ_2024001.pdf</p>
                <p className="text-sm text-gray-500">Ajouté le 27/02/2024</p>
              </div>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
              Télécharger
            </button>
          </div>
          
          <div className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <File className="w-5 h-5 text-primary-400" />
              <div>
                <p className="font-medium text-primary-800">Declaration_TVA_Janvier2024.pdf</p>
                <p className="text-sm text-gray-500">Ajouté le 15/02/2024</p>
              </div>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
              Télécharger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
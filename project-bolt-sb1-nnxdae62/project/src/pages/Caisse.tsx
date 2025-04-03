import React, { useState } from 'react';
import { Plus, Trash2, Edit, DollarSign, ArrowUpRight, ArrowDownRight, FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  generateJournalCaissePDF,
  generateGrandLivrePDF,
  generateBalancePDF,
  generateExcelReport,
  Transaction
} from '../utils/documentGenerator';

function Caisse() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-03-01',
      description: 'Vente au comptant',
      montant: 1500,
      type: 'entree'
    },
    {
      id: '2',
      date: '2024-03-01',
      description: 'Achat fournitures',
      montant: 500,
      type: 'sortie'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    montant: '',
    type: 'entree' as 'entree' | 'sortie'
  });

  const solde = transactions.reduce((acc, curr) => {
    return curr.type === 'entree' ? acc + curr.montant : acc - curr.montant;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.montant) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const newTransaction = {
      id: editingTransaction?.id || Date.now().toString(),
      date: formData.date,
      description: formData.description,
      montant: parseFloat(formData.montant),
      type: formData.type
    };

    if (editingTransaction) {
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id ? newTransaction : t
      ));
      toast.success('Transaction modifiée avec succès');
    } else {
      setTransactions([...transactions, newTransaction]);
      toast.success('Transaction ajoutée avec succès');
    }

    setIsModalOpen(false);
    setEditingTransaction(null);
    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      description: '',
      montant: '',
      type: 'entree'
    });
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      date: transaction.date,
      description: transaction.description,
      montant: transaction.montant.toString(),
      type: transaction.type
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      setTransactions(transactions.filter(t => t.id !== id));
      toast.success('Transaction supprimée avec succès');
    }
  };

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-800">Livre de caisse</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="bg-secondary-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-secondary-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Documents comptables</span>
            </button>
            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu">
                  <button
                    onClick={() => {
                      generateJournalCaissePDF(transactions);
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Journal de caisse (PDF)
                  </button>
                  <button
                    onClick={() => {
                      generateGrandLivrePDF(transactions);
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Grand livre (PDF)
                  </button>
                  <button
                    onClick={() => {
                      generateBalancePDF(transactions);
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Balance (PDF)
                  </button>
                  <button
                    onClick={() => {
                      generateExcelReport(transactions);
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Rapport complet (Excel)
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle transaction</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Solde actuel</p>
              <p className="text-2xl font-bold text-primary-700">{solde.toLocaleString('fr-FR')} USD</p>
            </div>
            <DollarSign className="w-8 h-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total entrées</p>
              <p className="text-2xl font-bold text-green-600">
                {transactions
                  .filter(t => t.type === 'entree')
                  .reduce((acc, curr) => acc + curr.montant, 0)
                  .toLocaleString('fr-FR')} USD
              </p>
            </div>
            <ArrowUpRight className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total sorties</p>
              <p className="text-2xl font-bold text-red-600">
                {transactions
                  .filter(t => t.type === 'sortie')
                  .reduce((acc, curr) => acc + curr.montant, 0)
                  .toLocaleString('fr-FR')} USD
              </p>
            </div>
            <ArrowDownRight className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(transaction.date), 'dd MMMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'entree'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.type === 'entree' ? 'Entrée' : 'Sortie'}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  transaction.type === 'entree' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'entree' ? '+' : '-'} {transaction.montant.toLocaleString('fr-FR')} USD
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="text-primary-600 hover:text-primary-900 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingTransaction ? 'Modifier la transaction' : 'Nouvelle transaction'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Description de la transaction"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'entree' | 'sortie' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="entree">Entrée</option>
                  <option value="sortie">Sortie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Montant (USD)</label>
                <input
                  type="number"
                  value={formData.montant}
                  onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTransaction(null);
                    setFormData({
                      date: format(new Date(), 'yyyy-MM-dd'),
                      description: '',
                      montant: '',
                      type: 'entree'
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {editingTransaction ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Caisse;
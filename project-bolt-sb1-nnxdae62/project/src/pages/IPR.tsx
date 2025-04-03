import React, { useState } from 'react';
import { Plus, Download, Users, DollarSign, Calculator } from 'lucide-react';
import toast from 'react-hot-toast';
import { format, addMonths, isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Employee, calculateIPR, calculateNetSalary, generatePayslip } from '../utils/iprCalculator';

function IPR() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      nom: 'Mutombo',
      prenom: 'Jean',
      salaireBrut: 2500000,
      dateEmbauche: '2024-01-15',
    },
    {
      id: '2',
      nom: 'Kabongo',
      prenom: 'Marie',
      salaireBrut: 1800000,
      dateEmbauche: '2024-02-01',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    salaireBrut: '',
    dateEmbauche: format(new Date(), 'yyyy-MM-dd'),
  });

  const totalIPR = employees.reduce((acc, emp) => acc + calculateIPR(emp.salaireBrut), 0);
  const nextPaymentDate = addMonths(new Date(), 1);
  const isPaymentDueSoon = isAfter(nextPaymentDate, new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom || !formData.salaireBrut) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const newEmployee: Employee = {
      id: Date.now().toString(),
      nom: formData.nom,
      prenom: formData.prenom,
      salaireBrut: parseFloat(formData.salaireBrut),
      dateEmbauche: formData.dateEmbauche,
    };

    setEmployees([...employees, newEmployee]);
    toast.success('Employé ajouté avec succès');
    setIsModalOpen(false);
    setFormData({
      nom: '',
      prenom: '',
      salaireBrut: '',
      dateEmbauche: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  const handleGeneratePayslips = () => {
    employees.forEach(employee => {
      const payslip = generatePayslip(employee);
      // Ici, vous pouvez ajouter la logique pour générer un PDF de la fiche de paie
      console.log('Fiche de paie générée pour:', employee.nom);
    });
    toast.success('Fiches de paie générées avec succès');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-800">Gestion de l'IPR</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleGeneratePayslips}
            className="bg-secondary-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-secondary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Générer fiches de paie</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvel employé</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total employés</p>
              <p className="text-2xl font-bold text-primary-700">{employees.length}</p>
            </div>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">IPR mensuel total</p>
              <p className="text-2xl font-bold text-secondary-600">
                {totalIPR.toLocaleString('fr-FR')} FC
              </p>
            </div>
            <Calculator className="w-8 h-8 text-secondary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Prochaine échéance</p>
              <p className="text-2xl font-bold text-primary-700">
                {format(nextPaymentDate, 'dd MMMM yyyy', { locale: fr })}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-primary-500" />
          </div>
        </div>
      </div>

      {isPaymentDueSoon && (
        <div className="bg-secondary-50 border-l-4 border-secondary-500 p-4 rounded-md">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-secondary-800">
                Rappel : Déclaration IPR à venir
              </h3>
              <p className="mt-1 text-sm text-secondary-700">
                N'oubliez pas de déclarer et payer l'IPR avant le {format(nextPaymentDate, 'dd MMMM yyyy', { locale: fr })}.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'embauche
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salaire brut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IPR
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salaire net
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {employee.nom} {employee.prenom}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(employee.dateEmbauche), 'dd MMMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.salaireBrut.toLocaleString('fr-FR')} FC
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 font-medium">
                  {calculateIPR(employee.salaireBrut).toLocaleString('fr-FR')} FC
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 font-medium">
                  {calculateNetSalary(employee.salaireBrut).toLocaleString('fr-FR')} FC
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
              Nouvel employé
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salaire brut (FC)</label>
                <input
                  type="number"
                  value={formData.salaireBrut}
                  onChange={(e) => setFormData({ ...formData, salaireBrut: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date d'embauche</label>
                <input
                  type="date"
                  value={formData.dateEmbauche}
                  onChange={(e) => setFormData({ ...formData, dateEmbauche: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default IPR;
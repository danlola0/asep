import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Workbook } from 'exceljs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export type Transaction = {
  id: string;
  date: string;
  description: string;
  montant: number;
  type: 'entree' | 'sortie';
};

const formatDate = (date: string) => format(new Date(date), 'dd MMMM yyyy', { locale: fr });
const formatMontant = (montant: number) => montant.toLocaleString('fr-FR');

export const generateJournalCaissePDF = (transactions: Transaction[]) => {
  const doc = new jsPDF();
  
  doc.setFont('helvetica', 'bold');
  doc.text('Journal de Caisse', 14, 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Généré le ${formatDate(new Date().toISOString())}`, 14, 22);

  const tableData = transactions.map(t => [
    formatDate(t.date),
    t.description,
    t.type === 'entree' ? formatMontant(t.montant) : '',
    t.type === 'sortie' ? formatMontant(t.montant) : '',
  ]);

  (doc as any).autoTable({
    head: [['Date', 'Description', 'Entrées (USD)', 'Sorties (USD)']],
    body: tableData,
    startY: 30,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [2, 136, 209] },
  });

  doc.save('journal-caisse.pdf');
};

export const generateGrandLivrePDF = (transactions: Transaction[]) => {
  const doc = new jsPDF();
  
  doc.setFont('helvetica', 'bold');
  doc.text('Grand Livre', 14, 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Généré le ${formatDate(new Date().toISOString())}`, 14, 22);

  let solde = 0;
  const tableData = transactions.map(t => {
    solde += t.type === 'entree' ? t.montant : -t.montant;
    return [
      formatDate(t.date),
      t.description,
      t.type === 'entree' ? formatMontant(t.montant) : '',
      t.type === 'sortie' ? formatMontant(t.montant) : '',
      formatMontant(solde),
    ];
  });

  (doc as any).autoTable({
    head: [['Date', 'Description', 'Débit (USD)', 'Crédit (USD)', 'Solde (USD)']],
    body: tableData,
    startY: 30,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [2, 136, 209] },
  });

  doc.save('grand-livre.pdf');
};

export const generateBalancePDF = (transactions: Transaction[]) => {
  const doc = new jsPDF();
  
  doc.setFont('helvetica', 'bold');
  doc.text('Balance des Comptes', 14, 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Généré le ${formatDate(new Date().toISOString())}`, 14, 22);

  const totalEntrees = transactions
    .filter(t => t.type === 'entree')
    .reduce((acc, curr) => acc + curr.montant, 0);

  const totalSorties = transactions
    .filter(t => t.type === 'sortie')
    .reduce((acc, curr) => acc + curr.montant, 0);

  const tableData = [
    ['Caisse', formatMontant(totalEntrees), formatMontant(totalSorties), formatMontant(totalEntrees - totalSorties)],
  ];

  (doc as any).autoTable({
    head: [['Compte', 'Débit (USD)', 'Crédit (USD)', 'Solde (USD)']],
    body: tableData,
    startY: 30,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [2, 136, 209] },
  });

  doc.save('balance.pdf');
};

export const generateExcelReport = (transactions: Transaction[]) => {
  const wb = XLSX.utils.book_new();

  // Journal de caisse
  const journalData = transactions.map(t => ({
    'Date': formatDate(t.date),
    'Description': t.description,
    'Entrées (USD)': t.type === 'entree' ? t.montant : '',
    'Sorties (USD)': t.type === 'sortie' ? t.montant : '',
  }));
  const wsJournal = XLSX.utils.json_to_sheet(journalData);
  XLSX.utils.book_append_sheet(wb, wsJournal, 'Journal de Caisse');

  // Grand livre
  let solde = 0;
  const grandLivreData = transactions.map(t => {
    solde += t.type === 'entree' ? t.montant : -t.montant;
    return {
      'Date': formatDate(t.date),
      'Description': t.description,
      'Débit (USD)': t.type === 'entree' ? t.montant : '',
      'Crédit (USD)': t.type === 'sortie' ? t.montant : '',
      'Solde (USD)': solde,
    };
  });
  const wsGrandLivre = XLSX.utils.json_to_sheet(grandLivreData);
  XLSX.utils.book_append_sheet(wb, wsGrandLivre, 'Grand Livre');

  // Balance
  const totalEntrees = transactions
    .filter(t => t.type === 'entree')
    .reduce((acc, curr) => acc + curr.montant, 0);
  const totalSorties = transactions
    .filter(t => t.type === 'sortie')
    .reduce((acc, curr) => acc + curr.montant, 0);
  const balanceData = [{
    'Compte': 'Caisse',
    'Débit (USD)': totalEntrees,
    'Crédit (USD)': totalSorties,
    'Solde (USD)': totalEntrees - totalSorties,
  }];
  const wsBalance = XLSX.utils.json_to_sheet(balanceData);
  XLSX.utils.book_append_sheet(wb, wsBalance, 'Balance');

  XLSX.writeFile(wb, 'rapports-comptables.xlsx');
};
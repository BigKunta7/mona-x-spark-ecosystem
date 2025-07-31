// ecosystem-mona-spark/app/client/src/app/dashboard/my-investments/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Investment {
  id: number;
  offering_id: number;
  offering_title: string;
  artist_name: string;
  amount_invested: number;
  revenue_share_owned: number | null;
  totalEarnings: number; // Note: Ce champ n'est pas encore dans l'API, on le garde à 0
  status: 'active' | 'staked' | 'sold';
}

const InvestmentRow = ({ investment }: { investment: Investment }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="font-bold">{investment.offering_title}</div>
        <div className="text-sm text-gray-500">{investment.artist_name}</div>
      </td>
      <td className="px-6 py-4 font-mono text-right">${Number(investment.amount_invested).toFixed(2)}</td>
      <td className="px-6 py-4 font-mono text-right">{investment.revenue_share_owned ? `${investment.revenue_share_owned.toFixed(4)}%` : 'N/A'}</td>
      <td className="px-6 py-4 font-mono text-right text-green-600 font-bold">${investment.totalEarnings.toFixed(2)}</td>
      <td className="px-6 py-4">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            investment.status === 'active' ? 'bg-green-100 text-green-800' : 
            investment.status === 'staked' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {investment.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <a href={`/finance/offering/${investment.offering_id}`} className="text-indigo-600 hover:text-indigo-900">
            Détails
        </a>
      </td>
    </tr>
  );
};

export default function MyInvestmentsPage() {
  const [portfolio, setPortfolio] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/finance/investments/me');
        if (!response.ok) throw new Error('Erreur lors de la récupération du portefeuille.');
        const data = await response.json();
        // Ajout du champ totalEarnings manquant
        const portfolioWithEarnings = data.map((inv: any) => ({ ...inv, totalEarnings: 0 }));
        setPortfolio(portfolioWithEarnings);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const totalInvested = portfolio.reduce((sum, inv) => sum + Number(inv.amount_invested), 0);
  const totalEarnings = portfolio.reduce((sum, inv) => sum + inv.totalEarnings, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Portefeuille d'Investissements</h1>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-500">Total Investi</h3>
          <p className="text-3xl font-bold mt-2">${totalInvested.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-500">Gains Totaux</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">+${totalEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-500">Retour sur Investissement</h3>
          <p className="text-3xl font-bold mt-2">{totalInvested > 0 ? ((totalEarnings / totalInvested) * 100).toFixed(2) : '0.00'}%</p>
        </div>
      </div>
      
      {loading && <p className="text-center">Chargement...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Investi</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ma Part</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gains</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portfolio.map((investment) => (
                <InvestmentRow key={investment.id} investment={investment} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

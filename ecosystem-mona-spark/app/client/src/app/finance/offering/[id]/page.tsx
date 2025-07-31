// ecosystem-mona-spark/app/client/src/app/finance/offering/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Types pour l'offre détaillée et le panneau d'investissement
interface OfferingDetail {
  id: number;
  artist_name: string;
  genre: string;
  title: string;
  description: string;
  funding_goal: number;
  amount_raised: number;
  revenue_share_percentage: number;
  end_date: string;
  min_investment: number;
  // On pourrait ajouter d'autres champs comme le scoring, les perks, etc.
}

const InvestmentPanel = ({ offering }: { offering: OfferingDetail }) => {
    const [investmentAmount, setInvestmentAmount] = useState('');

    const handleInvest = async () => {
        alert(`Logique d'investissement à implémenter. Montant : ${investmentAmount}`);
        // Ici, on appellerait POST /api/finance/investments
        // avec { offeringId: offering.id, amountInvested: investmentAmount }
    };

    return (
        <div className="sticky top-8 border rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Investir dans ce projet</h3>
            <div className="mb-4">
                <label htmlFor="investment-amount" className="block text-sm font-medium text-gray-700">
                    Montant de l'investissement (min. ${offering.min_investment})
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                        type="number"
                        name="investment-amount"
                        id="investment-amount"
                        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={offering.min_investment.toString()}
                        min={offering.min_investment}
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
                Vous recevrez une part des revenus du créateur proportionnelle à votre investissement.
            </p>
            <button 
                onClick={handleInvest}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                disabled={!investmentAmount || parseFloat(investmentAmount) < offering.min_investment}
            >
                Confirmer l'investissement
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center">Les paiements sont sécurisés. En investissant, vous acceptez les termes et conditions.</p>
        </div>
    );
}

export default function OfferingDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [offering, setOffering] = useState<OfferingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchOffering = async () => {
      try {
        const response = await fetch(`/api/finance/offerings/${id}`);
        if (!response.ok) {
          throw new Error('Offre non trouvée.');
        }
        const data = await response.json();
        setOffering(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOffering();
  }, [id]);

  if (loading) return <p className="text-center py-12">Chargement de l'offre...</p>;
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;
  if (!offering) return <p className="text-center py-12">Aucune offre trouvée.</p>;

  const progressPercentage = (offering.amount_raised / offering.funding_goal) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{offering.title}</h1>
            <p className="text-xl text-gray-600 mb-8">par {offering.artist_name}</p>

            <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-bold">${Number(offering.amount_raised).toLocaleString()} levés</span>
                    {/* On pourrait ajouter le nombre d'investisseurs ici */}
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">À propos du projet</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
                {offering.description || "Aucune description fournie."}
            </p>
        </div>

        <div>
            <InvestmentPanel offering={offering} />
        </div>
      </div>
    </div>
  );
}

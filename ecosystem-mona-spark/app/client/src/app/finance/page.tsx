// ecosystem-mona-spark/app/client/src/app/finance/page.tsx
'use client'; // Indique que c'est un composant client pour utiliser useState et useEffect

import React, { useState, useEffect } from 'react';

// Définition du type pour une offre, correspondant à ce que l'API retourne
interface Offering {
  id: number;
  artist_name: string;
  genre: string;
  title: string;
  funding_goal: number;
  amount_raised: number;
  revenue_share_percentage: number;
  end_date: string;
  instagram_url?: string;
}

const OfferingCard = ({ offering }: { offering: Offering }) => {
  const progressPercentage = (offering.amount_raised / offering.funding_goal) * 100;

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="ml-4">
            <h3 className="text-xl font-bold">{offering.title}</h3>
            <p className="text-md text-gray-600">par {offering.artist_name} - {offering.genre}</p>
          </div>
        </div>
        <div className="my-4">
          <div className="flex justify-between items-end mb-1">
            <span className="text-2xl font-bold text-indigo-600">${Number(offering.amount_raised).toLocaleString()}</span>
            <span className="text-lg text-gray-500">sur ${Number(offering.funding_goal).toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <div className="flex justify-between text-sm mt-4">
          <span>{offering.revenue_share_percentage}% des revenus</span>
          <span>Termine le {new Date(offering.end_date).toLocaleDateString()}</span>
        </div>
        <a href={`/finance/offering/${offering.id}`} className="block text-center w-full mt-6 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
          Voir l'offre et investir
        </a>
      </div>
    </div>
  );
};

export default function FinanceMarketplacePage() {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        // L'URL de l'API doit être dans une variable d'environnement dans une vraie app
        const response = await fetch('/api/finance/offerings');
        if (!response.ok) {
          throw new Error('Erreur réseau lors de la récupération des offres.');
        }
        const data = await response.json();
        setOfferings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferings();
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois au montage

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-2">Marketplace des Créateurs</h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        Investissez dans les artistes que vous aimez et partagez leur succès.
      </p>
      
      {loading && <p className="text-center">Chargement des offres...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering) => (
            <OfferingCard key={offering.id} offering={offering} />
          ))}
        </div>
      )}
    </div>
  );
}

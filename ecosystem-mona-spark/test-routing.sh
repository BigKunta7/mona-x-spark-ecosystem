#!/bin/bash

echo "🧪 Test du Routing MONA x SPARK"
echo "=================================="

# Vérifier que le serveur de développement est en cours d'exécution
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Le serveur de développement n'est pas accessible sur http://localhost:3000"
    echo "💡 Assurez-vous que 'npm run dev' est en cours d'exécution"
    exit 1
fi

echo "✅ Serveur de développement accessible"

# Liste des pages à tester
pages=(
    "/"
    "/mona"
    "/spark"
    "/sponsors"
    "/partners"
    "/marketplace"
    "/automation"
    "/contact"
    "/login"
    "/register"
)

echo ""
echo "🔍 Test des pages :"
echo "=================="

for page in "${pages[@]}"; do
    echo -n "Test de $page ... "
    
    # Tester la page
    if curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$page" | grep -q "200"; then
        echo "✅ OK"
    else
        echo "❌ ERREUR"
    fi
done

echo ""
echo "🎯 Pages testées :"
echo "=================="
echo "• Accueil (/)"
echo "• MONA (/mona)"
echo "• SPARK (/spark)"
echo "• Sponsors (/sponsors)"
echo "• Experts (/partners)"
echo "• Marketplace (/marketplace)"
echo "• Automation (/automation)"
echo "• Contact (/contact)"
echo "• Login (/login)"
echo "• Register (/register)"

echo ""
echo "🚀 Pour tester manuellement :"
echo "============================"
echo "1. Ouvrez http://localhost:3000"
echo "2. Testez la navigation avec le menu"
echo "3. Vérifiez que toutes les pages se chargent"
echo "4. Testez le menu hamburger sur mobile"

echo ""
echo "📱 Test responsive :"
echo "==================="
echo "• Redimensionnez la fenêtre pour tester le menu hamburger"
echo "• Testez sur différentes tailles d'écran"
echo "• Vérifiez que les liens fonctionnent partout"

echo ""
echo "✅ Test du routing terminé !" 
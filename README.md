# Vickrey Auction Simulator

Une implémentation d'une enchère Vickrey (enchère au second prix) avec une interface utilisateur React.

## Description

Ce projet implémente un système d'enchères où :
* L'enchérisseur le plus offrant remporte l'enchère
* Le prix payé est égal à la deuxième offre la plus élevée
* Un prix de réserve minimum est défini
* Chaque enchérisseur peut placer plusieurs enchères

## Fonctionnalités

* Interface utilisateur intuitive en React
* Gestion dynamique des enchérisseurs
* Ajout/suppression d'enchérisseurs
* Multiples enchères par enchérisseur
* Calcul automatique du gagnant et du prix final
* Prix de réserve configurable

## Prérequis

* Node.js (v14 ou supérieur)
* npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone git@github.com:lechaabani/vickrey-auction.git
cd vickrey-auction
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application :
```bash
npm start
```

L'application sera accessible à l'adresse http://localhost:3000

## Structure du Projet

```
vickrey-auction/
├── src/
│   ├── domain/          # Logique métier
│   │   ├── types.ts
│   │   └── VickreyAuction.ts
│   ├── components/      # Composants React
│   │   └── AuctionUI.tsx
│   ├── __tests__/      # Tests
│   │   ├── unit/
│   │   │   └── VickreyAuction.test.ts
│   │   └── components/
│   │       └── AuctionUI.test.tsx
│   └── App.tsx         # Point d'entrée
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
├── jest.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Utilisation

1. Définissez un prix de réserve
2. Ajoutez des enchérisseurs avec le bouton "Add Bidder"
3. Pour chaque enchérisseur, ajoutez une ou plusieurs enchères
4. Cliquez sur "Run Auction" pour voir les résultats

## Tests

### Installation des dépendances de test
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest @types/jest ts-jest
```

### Exécution des tests

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch
npm test -- --watch

# Lancer les tests avec couverture
npm test -- --coverage

# Lancer un fichier spécifique
npm test src/__tests__/unit/VickreyAuction.test.ts
# ou
npm test src/__tests__/components/AuctionUI.test.tsx

# Lancer les tests avec plus de détails
npm test -- --verbose
```

### Couverture des Tests
Les tests couvrent :
- La logique d'enchère Vickrey (VickreyAuction)
  - Validation du prix de réserve
  - Détermination du gagnant
  - Calcul du prix final
  - Gestion des cas limites

- L'interface utilisateur (AuctionUI)
  - Rendu des composants
  - Ajout/suppression d'enchérisseurs
  - Ajout d'enchères
  - Validation des entrées
  - Affichage des résultats

## Exemple

Considérons 5 enchérisseurs (A, B, C, D, E) qui enchérissent pour un objet avec un prix de réserve de 100€ :
* A : 2 enchères de 110€ et 130€
* B : aucune enchère
* C : 1 enchère de 125€
* D : 3 enchères de 105€, 115€ et 90€
* E : 3 enchères de 132€, 135€ et 140€

L'enchérisseur E remporte l'enchère au prix de 130€ (la deuxième enchère la plus élevée).

## Contribuer

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Développement

### Scripts disponibles

```bash
npm start           # Lance l'application en mode développement
npm run build      # Compile l'application pour la production
npm test           # Lance les tests
npm run test:watch # Lance les tests en mode watch
npm run lint       # Vérifie le code avec ESLint
```

### Technologies utilisées

- React 18
- TypeScript
- Jest & Testing Library
- TailwindCSS
- ESLint

## Licence

MIT

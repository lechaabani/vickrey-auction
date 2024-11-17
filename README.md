# Vickrey Auction Simulator

Une implémentation d'une enchère Vickrey (enchère au second prix) avec une interface utilisateur React.

## Description

Ce projet implémente un système d'enchères où :
- L'enchérisseur le plus offrant remporte l'enchère
- Le prix payé est égal à la deuxième offre la plus élevée
- Un prix de réserve minimum est défini
- Chaque enchérisseur peut placer plusieurs enchères

## Fonctionnalités

- Interface utilisateur intuitive en React
- Gestion dynamique des enchérisseurs
- Ajout/suppression d'enchérisseurs
- Multiples enchères par enchérisseur
- Calcul automatique du gagnant et du prix final
- Prix de réserve configurable

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone [URL_DU_REPO]
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
│   └── App.tsx         # Point d'entrée
├── public/
└── package.json
```

## Utilisation

1. Définissez un prix de réserve
2. Ajoutez des enchérisseurs avec le bouton "Add Bidder"
3. Pour chaque enchérisseur, ajoutez une ou plusieurs enchères
4. Cliquez sur "Run Auction" pour voir les résultats

## Tests

Pour lancer les tests :
```bash
npm test
```

## Exemple

Considérons 5 enchérisseurs (A, B, C, D, E) qui enchérissent pour un objet avec un prix de réserve de 100€ :
- A : 2 enchères de 110€ et 130€
- B : aucune enchère
- C : 1 enchère de 125€
- D : 3 enchères de 105€, 115€ et 90€
- E : 3 enchères de 132€, 135€ et 140€

L'enchérisseur E remporte l'enchère au prix de 130€ (la deuxième enchère la plus élevée).

## Licence

MIT

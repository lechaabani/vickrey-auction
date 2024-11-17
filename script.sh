#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔨 Création de la structure des tests...${NC}"

# Création des dossiers
mkdir -p src/__tests__/unit
mkdir -p src/__tests__/components
mkdir -p cypress/e2e
mkdir -p cypress/fixtures
mkdir -p cypress/support

# Copie des fichiers de test unitaires
cat > src/__tests__/unit/VickreyAuction.test.ts << 'EOL'
[Contenu du test VickreyAuction.test.ts]
EOL

cat > src/__tests__/components/AuctionUI.test.tsx << 'EOL'
[Contenu du test AuctionUI.test.tsx]
EOL

# Copie des fichiers de test E2E
cat > cypress/e2e/auction.cy.ts << 'EOL'
[Contenu du test auction.cy.ts]
EOL

# Configuration
cat > jest.config.js << 'EOL'
[Contenu du jest.config.js]
EOL

cat > cypress/tsconfig.json << 'EOL'
[Contenu du cypress/tsconfig.json]
EOL

cat > cypress/support/commands.ts << 'EOL'
[Contenu du commands.ts]
EOL

cat > cypress/support/e2e.ts << 'EOL'
[Contenu du e2e.ts]
EOL

cat > src/setupTests.ts << 'EOL'
import '@testing-library/jest-dom';
EOL

# Installation des dépendances
echo -e "${BLUE}📦 Installation des dépendances de test...${NC}"
npm install --save-dev \
  @testing-library/jest-dom \
  @testing-library/react \
  @testing-library/user-event \
  cypress \
  jest \
  ts-jest \
  @types/jest

# Mise à jour du package.json
echo -e "${BLUE}📝 Mise à jour des scripts de test...${NC}"
npm pkg set scripts.test:unit="jest"
npm pkg set scripts.test:e2e="cypress open"
npm pkg set scripts.test:e2e:headless="cypress run"

echo -e "${GREEN}✅ Configuration des tests terminée !${NC}"
echo -e "\nPour exécuter les tests :"
echo -e "- Tests unitaires : ${BLUE}npm run test:unit${NC}"
echo -e "- Tests E2E (UI) : ${BLUE}npm run test:e2e${NC}"
echo -e "- Tests E2E (Headless) : ${BLUE}npm run test:e2e:headless${NC}"
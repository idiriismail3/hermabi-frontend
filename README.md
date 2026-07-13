# Hermabi — Modern Moroccan Fashion (site vitrine)

Un site e-commerce complet et fonctionnel côté client : accueil, boutique avec filtres,
fiche produit, panier et tunnel de commande avec choix **carte bancaire** ou
**paiement à la livraison**. Le design reprend directement le logo Hermabi — noir profond,
doré, vert bouteille et rouge oxblood — avec vos 12 vraies photos produits, toutes à 300 MAD.

## Ce qui fonctionne déjà (dans votre navigateur, une fois hébergé)
- Navigation entre pages, filtres par catégorie (Femme / Homme / Accessoires)
- Panier persistant (localStorage), quantités, calcul du sous-total / livraison / total
- Formulaire de commande avec validation
- Choix du mode de paiement : à la livraison (fonctionnel tel quel) ou carte (interface prête,
  voir ci-dessous pour l'activer réellement)
- Vos 12 produits déjà en place, avec vos vraies photos, à 300 MAD chacun

## À vérifier / personnaliser
1. **Noms et catégories des produits** : dans `js/store.js`, le tableau `PRODUCTS`. Les noms et
   catégories (Femme/Homme/Accessoires) ont été attribués à partir des photos — relisez-les et
   corrigez ceux qui ne correspondent pas exactement à vos articles. L'`id` et le chemin `img`
   ne doivent pas changer.
2. **Prix** : tous fixés à 300 MAD comme demandé. Modifiez `price` par produit si certains
   articles doivent avoir un prix différent plus tard.
3. **Photos** : vos 12 photos sont dans `images/` (hermabi-01.jpg à hermabi-13.jpg) et le logo
   dans `images/logo.jpg`. Pour ajouter de nouveaux produits, déposez la photo dans ce dossier
   et ajoutez une ligne dans `PRODUCTS`.
4. **Frais de livraison / seuil offert** : constantes `SHIPPING_FLAT` et `FREE_SHIPPING_THRESHOLD`
   en haut de `js/store.js`.
5. **Couleurs / polices** : variables `:root` en haut de `css/style.css`, calées sur le logo
   (`--brass` = doré, `--bottle` = vert médaillon, `--error` = rouge oxblood).

## Paiement à la livraison
Déjà fonctionnel côté interface. Pour un vrai site, la seule chose à ajouter est un moyen de
recevoir la commande quelque part (voir "Backend requis" ci-dessous) — sinon les commandes
ne sont visibles que dans le navigateur du client.

## Paiement par carte bancaire — ce qu'il reste à faire
**Important : aucun site ne peut traiter de vrais paiements par carte uniquement avec du code
côté navigateur (HTML/JS).** Ce n'est pas une limite de ce projet en particulier — c'est une
règle de sécurité bancaire universelle (PCI-DSS). Il faut :

1. **Un compte marchand CMI** (Centre Monétique Interbancaire) — à demander auprès de votre
   banque marocaine (Attijariwafa, BMCE/Bank Of Africa, BCP, etc.). La banque vous fournira :
   - un identifiant marchand (`clientid`)
   - une clé secrète de hachage (`storekey`)
   - l'accès à la plateforme de test (sandbox) CMI avant la mise en production
2. **Un petit serveur backend** (Node.js, PHP, Python — au choix) qui :
   - reçoit le panier + infos client depuis ce site
   - calcule le montant et génère la signature de sécurité (hash) exigée par CMI
   - redirige le client vers la page de paiement hébergée par CMI (c'est CMI qui affiche le
     vrai formulaire de carte bancaire, jamais votre site — c'est plus sûr pour vous et vos clients)
   - reçoit la notification de paiement (callback) de CMI et met à jour la commande
3. **Un hébergement** pour ce backend (ex. un petit VPS, ou un service comme Render/Railway/OVH).

En résumé : ce site est prêt à envoyer les données au backend ; il ne lui manque que ce
backend et vos identifiants CMI réels. Une agence ou un développeur freelance peut brancher
cette partie en général en 1 à 3 jours une fois le compte CMI obtenu — c'est une étape standard.

Alternative plus rapide à mettre en place si vous ne voulez pas gérer de backend vous-même :
des plateformes comme **PayZone**, **HPS/PayFast**, ou une solution e-commerce clé en main
(Shopify avec CMI, WooCommerce + plugin CMI) gèrent cette partie pour vous.

## Comment publier ce site en ligne
- Le plus simple : un hébergement mutualisé marocain ou international (ex. o2switch, Hostinger,
  Netlify pour un site statique) — il suffit d'uploader tous ces fichiers tels quels.
- Pensez à un **nom de domaine** (ex. hermabi.ma ou hermabi.com) et à activer le **HTTPS**
  (obligatoire pour rassurer vos clients et pour toute intégration de paiement).

## Structure des fichiers
```
site/
├── index.html      → page d'accueil
├── shop.html       → boutique avec filtres
├── product.html    → fiche produit (?id=1, ?id=2, …)
├── cart.html        → panier
├── checkout.html    → tunnel de commande
├── css/style.css    → tous les styles
├── js/store.js      → catalogue produits + logique panier
└── images/          → vos 12 photos produits + logo
```

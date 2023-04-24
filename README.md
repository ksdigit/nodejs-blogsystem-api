## Les différentes étapes de la création du blog

-   installation des packages : **express**, **sequelize**, **sequelize-cli** and **mysql2**
-   mise en place des configurations de base de notre serveur dans les fichiers **app.js** & **server.js**
-   mise en place des routes et des controllers folders
-   configuration de la base de données avec **sequelize** avec la commande : `npx sequelize init`. Cette dernière génère les dossiers : **config/**, **models/**, et **seeders/** dans la racine de notre projet
-   création des modèles avec la commande : `npx sequelize-cli models:generate --name ModelName --attributes attr1:type,attr2:type,...`. Cette commande permet de générer un modèle et sa migration correspondante.
-   migration des modèles avec la commande : `npx sequelize db:migrate`
-   mise en place des fonctions pour les opérations CRUD de la BDD
-   Mise en place d'un système de validation des données avec le package **fastest-validator** : `npm i fastest-validator`
-   Mise en place de l'authentification à l'aide des packages : **bcryptjs** pour cacher le mot de passe, **jsonwebtoken** pour la génération de token
-   Création du middleware **auth** pour la gestion des accès, usage de _POSTMAN_ pour tester notre API
-   Implémentation du préchargement d'image avec le package **multer**, création des dossiers **helpers** et **uploads**, mise en place de la route **image** et de sa controller
- Créer un premier __seed__ pour la faciliter l'insertion de données dans la bdd avec la commande : `npx sequelize seed:generate`. Puis après définition de notre seed, on l'exécute à l'aide de la commande : `npx sequelize db:seed --seed seedName`
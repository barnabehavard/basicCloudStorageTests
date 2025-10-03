# Exampes Basiques Cloud Storage :

## 1. Installer Cloud Storage :
`npm install @google-cloud/storage`

## 2. Créer le bucket

Se rendre sur : https://console.cloud.google.com/storage/overview;tab=overview

Créer un bucket avec les propriétés suivantes :

* Nom (doit etre unique parmis tous les Cloud Storage existants). Par ex : `CloudStorageCheckMatesTests`
* Mettre les données en "Region" (moins cher), et par exemple, les mettre en France (west-9) ou Belgique (west1)
* Choisir "Standard" comme classe (= plus cher par mois mais aucun cout pour récuperer ces fichiers, à l'inverse des 3 autres)
* Ne pas toucher au reste

## 3. Créer les accès

Se rendre sur : https://console.cloud.google.com/iam-admin/iam

Cliquer (dans le menu à gauche) sur "Comptes de Services" puis "Créer un compte de service"

Mettre les propriétés suivantes :

* Nom (par exemple: `Acces CheckMates Cloud Storage`)
* Lui donner les permissions nécéssaires (Soit `Administrateur Storage` directement, soit `Utilisateur d'objet storage`)
* Ne pas toucher au reste et valider

On retourne alors sur la page précédente.

Cliquer sur les 3 points à droite de notre utilisateur et choisir `Gérer les clés`, puis `Ajouter une clé` > `Créer une clé` au format JSON, et la télécharger.

Déposer la clé dans le dossier sous le nom `gcloud-key.json`
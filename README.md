# Exampes Basiques Cloud Storage :

## 1. Installer Cloud Storage :
`npm install @google-cloud/storage`

## 2. Créer les accès

Se rendre sur : https://console.cloud.google.com/iam-admin/iam

Cliquer (dans le menu à gauche) sur "Comptes de Services" puis "Créer un compte de service"

Mettre les propriétés suivantes :

* Nom (par exemple: `Acces CheckMates Cloud Storage`)
* Lui donner les permissions nécéssaires: `Administrateur Storage` (attention, il y en a d'autres qui ressemblent, qui ne sont pas celles dont nous avons besoin)
* Ne pas toucher au reste et valider

On retourne alors sur la page précédente.

Cliquer sur les 3 points à droite de notre utilisateur et choisir `Gérer les clés`, puis `Ajouter une clé` > `Créer une clé` au format JSON, et la télécharger.

Déposer la clé à la racine du projet sous le nom `gcloud-key.json`
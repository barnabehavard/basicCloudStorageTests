import {Storage} from '@google-cloud/storage'
import * as fs from "node:fs";

import {CloudFunctions} from './functions'

const storage = new Storage({
    keyFilename: "gcloud-key.json",
})


// ATTENTION :
// Pas de majuscules, espaces ou points dans le nom du bucket.
const bucketName = 'testcodenetexpo'

/* Décomenter les lignes suivantes pour créer le buket si il n'existe pas : */
// await creerBucket(bucketName)
// await listerBucket()

// Un bucket est un "dossier".
// On pourrait créer un bucket "Photos", "Documents", ...
// Ou un bucket "RotaryParisMai2025", "SortieNiortSeptembre", "MarchéNoelEnBus2025" ect..., ce qui permettrait aussi de facturer l'espace de stockage utilisé
// À voir.
const bucket = storage.bucket(bucketName)


const cf = new CloudFunctions(bucket)



let filename: string;

/* Modifier cette variable pour, soit uploader un fichier présent sur le disque (true), soit uploader un Buffer stocké dans la ram (false) */
const uplaoderDepuisDisque = false;


if (uplaoderDepuisDisque) {
    // On demande à GCP d'envoyer un fichier présent sur le disque
    filename = await cf.uploaderFichierDepuisPath('files/toUpload/caline1.png')
} else {
    // Ici, on le charge. Mais il aurait pu nous etre envoyé depuis l'API => On ne l'aurait alors pas enregistré sur le disque.
    const filecontent = fs.readFileSync('files/toUpload/arrietty2.png')

    // On demande à GCP d'envoyer un fichier présent en mémoire
    filename = await cf.uploadFileFromMemory('png', filecontent)
}



// Lien accessible par tous.
// ATTENTION : NE FONCTIONNE QUE SI LE BUCKET EST EN PUBLIQUE, CE QUI N'EST PAS LE CAS PAR DEFAUT
console.log('URL Publique : https://storage.googleapis.com/' + bucketName + '/' + filename)
// Lien privé
// Accessible que pour ceux connectés à GCP avec les permissions nécéssaires
console.log('URL Privée : https://storage.cloud.google.com/' + bucketName + '/' + filename)


console.log('=== Lien Publique, accessible par tous pendant 15 minutes ===')
// URL Signé par nous/google. Il peut etre partagé à n'importe qui. L'url expire à un moment donné (ici, 15 minutes)
// Intérêt : Au lieu de laisser l'api récuperer l'image et la renvoyer au client, on pourrait directement renvoyer le lien au client,
// et laisser le client faire la requete et charger l'image de son côté. Cela allège la charge réseau serveur, en ajoutant une requete coté client.
await cf.getPublicSharableURL(filename, 15*60*1000)
console.log('=== === ===')


// On sauvegarde le fichier crée sur le disque (dans /files/downloaded)
await cf.downloadFileToDisk(filename)


// On récupère le fichier crée dans une variable, au format Buffer.
// On le sauvegarde ensuite sur le disque
const fileData = await cf.downloadFileToMemory(filename)
fs.writeFileSync('files/downloaded/buffered-' + filename, fileData)


/* On supprime l'image de chez Google : */
// await cf.deleteFile(filename)

import {randomUUID} from "node:crypto";
import {Bucket, GetSignedUrlConfig, Storage} from "@google-cloud/storage";


export class CloudFunctions {

    private bucket: Bucket;

    constructor(bucket: Bucket) {
        this.bucket = bucket;
    }


    static async creerBucket(storage: Storage, name: Lowercase<string>) {
        // "name" ne peut contenir que des minuscules chiffres - et _
        // entre 3 et 63 caractères inclus
        // cf. https://cloud.google.com/storage/docs/buckets?hl=fr#naming
        const [bck] = await storage.createBucket(name, {
            location: 'EUROPE-WEST1', // belgique
        })

        return bck
    }

    // Retourne la liste des buckets existants
    static async listerBucket(storage: Storage) {
        const [bck] = await storage.getBuckets()
        console.log(bck)

        return bck
    }

// Permets d'uploader un fichier depuis chemin sur le disque
    async uploaderFichierDepuisPath(path: string) {
        const uuid = randomUUID()

        const fileExt = path.split('.').at(-1)

        const filename = uuid + '.' + fileExt

        const options = {
            // 1234-(...)-5678.png
            destination: filename
        }

        await this.bucket.upload(path, options)

        return filename
    }

// Permet d'obtenir un lien publique partageable, grace à une durée.
    async getPublicSharableURL(filename: string, expiration: number) {
        // Je précise le "GetSignedUrlConfig" sinon il est pas content
        const options: GetSignedUrlConfig = {
            version: 'v4',
            action: "read",
            expires: Date.now() + expiration
        }

        const [url] = await this.bucket.file(filename).getSignedUrl(options);

        console.log(url)

        return url
    }


// Permets d'uploader un fichier depuis la mémoire.
    async uploadFileFromMemory(fileExt: string, fileContent: Buffer) {
        const uuid = randomUUID()

        const filename = uuid + '.' + fileExt

        await this.bucket.file(filename).save(fileContent)

        return filename
    }

    async downloadFileToDisk(filename: string) {
        await this.bucket.file(filename).download({
            destination: 'files/downloaded/' + filename,
        })
    }


    async downloadFileToMemory(filename: string) {
        const [content] = await this.bucket.file(filename).download()

        return content

    }


    async deleteFile(filename: string) {
        await this.bucket.file(filename).delete()
    }

}
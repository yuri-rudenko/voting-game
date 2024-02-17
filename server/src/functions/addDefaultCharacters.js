import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

export default function addDefaultCharacters() {
    return new Promise((resolve, reject) => {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const charPath = path.resolve(__dirname, '..', '..', 'myAnimeCharacters2.json');

        fs.readFile(charPath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
}
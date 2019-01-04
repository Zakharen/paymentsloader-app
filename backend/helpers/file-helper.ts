import {readFileSync, writeFileSync} from 'fs';

export class FileHelper {
    public static loadData(path: string) {
        try {
            const file = readFileSync(path, 'utf8');
            return JSON.parse(file);
        } catch (err) {
            console.error(err);
            return false
        }
    }

    public static storeData(data: any, path: string) {
        try {
            writeFileSync(path, JSON.stringify(data))
        } catch (err) {
            console.error(err)
        }
    }
}

import * as fs from 'fs';

export const getDirectories = (source:string) =>
fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {products,locations} from '../src/storeData.js';
const routes=['order','shop','cart','checkout','locations','story','catering','workshops','account','contact','faq','shipping','returns','careers','press','privacy','terms','community',...products.map(p=>`product/${p.slug}`),...locations.map(l=>`locations/${l.slug}`)];
const source=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
for(const route of routes){const dir=new URL(`../dist/${route}/`,import.meta.url);await mkdir(dir,{recursive:true});await writeFile(new URL('index.html',dir),source)}
await writeFile(new URL('../dist/404.html',import.meta.url),source);
await writeFile(new URL('../dist/_redirects',import.meta.url),'/* /index.html 200\n');
console.log(`Prepared ${routes.length} direct-load storefront routes and SPA fallback.`);

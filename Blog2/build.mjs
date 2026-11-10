import {build} from 'esbuild';
import {copyFileSync} from 'node:fs';
await build({entryPoints:['src/main.tsx'],outfile:'assets/blog2.js',bundle:true,minify:true,jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof'});
copyFileSync('src/styles.css','assets/blog2.css');

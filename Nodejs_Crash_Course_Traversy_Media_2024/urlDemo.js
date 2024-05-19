import url from 'url';
const urlString = 'https://www.google.com/search?q=hello+world';
// URL object
const urlObject = new URL(urlString);
console.log(urlObject);
//format()
console.log(url.format(urlObject));
//import.meta.url - it gives you file path as the URL 
console.log(import.meta.url);
//fileURLToPath() - it converts file URL to file path
console.log(url.fileURLToPath(import.meta.url));
//searchParams
const params = new URLSearchParams(urlObject.search);
console.log(params.get('q'));
params.append('limit', '5');
params.delete('limit');
console.log(params);
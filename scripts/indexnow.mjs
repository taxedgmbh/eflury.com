// Tells Bing (which also feeds ChatGPT search and Copilot), Yandex, Seznam and Naver
// that pages changed, via IndexNow (https://www.indexnow.org). Run after a deploy:
//   node scripts/indexnow.mjs            every URL in the live sitemap
//   node scripts/indexnow.mjs URL ...    only these
// The key is public by design; it is the file public/<key>.txt.
const KEY = 'f537b48c3d0337b18cee96f375d94718';
const HOST = 'eflury.com';
let urls = process.argv.slice(2);
if (!urls.length) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(res.status, res.statusText, `${urls.length} URLs`);

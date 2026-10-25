export default async () => {
 try {
  const response=await fetch('https://api.lmp.mx/3.0.0/teams/moc/roster?general=true',{signal:AbortSignal.timeout(12000)});
  if(!response.ok)throw Error('Fuente no disponible');
  const raw=await response.json();
  if(!Array.isArray(raw.response)||!raw.response.length)throw Error('Formato no disponible');
  const players=raw.response.map(p=>({name:[p.firstName,p.lastName].filter(Boolean).join(' '),position:String(p.playerPosition||''),number:String(p.playerNum||''),status:String(p.playerStatus||'').toLowerCase()}));
  return Response.json({players,checkedAt:new Date().toISOString(),source:'https://www.lmp.mx/rosters/caneros'},{headers:{'Netlify-CDN-Cache-Control':'public, s-maxage=3600, stale-while-revalidate=60','Cache-Control':'public, max-age=300'}});
 } catch {return Response.json({error:'No pudimos consultar el roster. Revisa la fuente oficial.'},{status:502,headers:{'Cache-Control':'no-store'}})}
};

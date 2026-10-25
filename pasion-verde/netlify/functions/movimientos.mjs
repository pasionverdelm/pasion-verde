export default async()=>{
 try{
 const r=await fetch('https://api.lmp.mx/3.0.0/movements?limit=100&page=1',{signal:AbortSignal.timeout(12000)});
 if(!r.ok)throw Error();const data=await r.json();if(!Array.isArray(data.response?.movements))throw Error();
 const movements=data.response.movements.map(m=>({team:String(m.team||''),teamAbbr:String(m.teamAbbr||''),date:String(m.transactionDate||''),type:String(m.transactionType||''),description:String(m.description||'')}));
 return Response.json({movements,checkedAt:new Date().toISOString(),source:'https://www.lmp.mx/movimientos'},{headers:{'Cache-Control':'public, max-age=15','Netlify-CDN-Cache-Control':'public, s-maxage=30'}});
 }catch{return Response.json({error:'No se pudo consultar la fuente oficial.'},{status:502,headers:{'Cache-Control':'no-store'}})}
};

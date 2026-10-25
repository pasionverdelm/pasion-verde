export default async()=>{
 try{
 const date=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mazatlan',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const r=await fetch('https://api.lmp.mx/3.0.0/scoreboard/'+date.replaceAll('-','/'),{signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error();
 const data=await r.json();if(!Array.isArray(data.response))throw Error();
 const games=data.response.filter(g=>g.gameTime!=='No Hay Juegos').map(g=>({away:String(g.awayTeamShort||g.awayTeam||''),home:String(g.homeTeamShort||g.homeTeam||''),awayRuns:g.awayRuns??null,homeRuns:g.homeRuns??null,status:Number(g.gameStatus),inning:g.inningCurrent??null,half:g.inningArrow==='top'?'Alta':g.inningArrow==='bottom'?'Baja':'',stadium:String(g.stadium||''),time:String(g.gameTimeH||'')}));
 return Response.json({games,date,checkedAt:new Date().toISOString()},{headers:{'Cache-Control':'public, max-age=15','Netlify-CDN-Cache-Control':'public, s-maxage=30'}});
 }catch{return Response.json({error:'La fuente no está disponible'},{status:502,headers:{'Cache-Control':'no-store'}})}
};

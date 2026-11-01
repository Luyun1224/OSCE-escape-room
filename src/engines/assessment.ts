import {rubric,clues} from '../data/case';
export function report(s:{ids:string[];hints:number;started:number;completed:number;events:unknown[];profile:unknown}) {
 const achieved=[...s.ids,'reasoning','safety','summary'];
 return {schemaVersion:1,caseId:'chest-pain-01',review:'待教師審核',profile:s.profile,durationSeconds:Math.round(((s.completed||Date.now())-s.started)/1000),hints:s.hints,dimensions:rubric.map(r=>({...r,score:Math.round(r.ids.filter(id=>achieved.includes(id)).length/r.ids.length*100)})),unassessed:['身體檢查','臨床技能流程認知'],missing:clues.filter(c=>!s.ids.includes(c.id)).map(c=>c.name),events:s.events};
}
export function download(data:unknown,format:'json'|'csv') {
 const r=data as ReturnType<typeof report>;
 const content=format==='json'?JSON.stringify(data,null,2):'dimension,score,weight\r\n'+r.dimensions.map(d=>`${d.label},${d.score},${d.weight}`).join('\r\n')+`\r\nhints,${r.hints},\r\ndurationSeconds,${r.durationSeconds},`;
 const url=URL.createObjectURL(new Blob(['\uFEFF'+content],{type:format==='json'?'application/json':'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`osce-report.${format}`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

import { required } from '../data/case';
export type Links = Record<string,'support'|'context'|'limit'>;
export function evaluate(ids:string[], links:Links, summary:string, safety:boolean) {
 const missing = required.filter(id=>!ids.includes(id));
 const reasoning = links.onset==='support' && links.pain==='support' && links.associated==='support' && links.negative==='limit';
 const problem = summary==='suspected';
 return {missing,reasoning,problem,safety,pass:missing.length===0&&reasoning&&problem&&safety};
}

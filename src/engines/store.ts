import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {Links} from './puzzle';
export type Profile={name:string;role:string;mode:string;difficulty:string};
export type Event={action:string;at:number;detail:string};
type State={profile:Profile;started:number;completed:number;ids:string[];interpreted:string[];links:Links;summary:string;safety:boolean;notes:string;hints:number;events:Event[];collect:(id:string)=>void;interpret:(id:string)=>void;link:(id:string,bucket:Links[string])=>void;set:(v:Partial<State>)=>void;log:(action:string,detail:string)=>void;begin:(p:Profile)=>void;reset:()=>void};
const initial={profile:{name:'',role:'PGY1',mode:'story',difficulty:'standard'},started:0,completed:0,ids:[],interpreted:[],links:{},summary:'',safety:false,notes:'',hints:0,events:[]};
export const useGame=create<State>()(persist((set,get)=>({...initial,collect:(id)=>{if(get().ids.includes(id))return;set(s=>({ids:[...s.ids,id],events:[...s.events,{action:'取得線索',detail:id,at:Date.now()}]}));},interpret:id=>set(s=>({interpreted:[...new Set([...s.interpreted,id])]})),link:(id,bucket)=>set(s=>({links:{...s.links,[id]:bucket},events:[...s.events,{action:'證據連結',detail:`${id}:${bucket}`,at:Date.now()}]})),set:v=>set(v),log:(action,detail)=>set(s=>({events:[...s.events,{action,detail,at:Date.now()}]})),begin:profile=>set({...initial,profile,started:Date.now()}),reset:()=>set({...initial})}),{name:'osce-escape-v1',version:1}));

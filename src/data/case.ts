export type Clue = {id:string; name:string; source:string; text:string; group:string; question?:string; needs?:string};
export const clues:Clue[] = [
{id:'chart',name:'遺失的急診病歷',source:'病歷夾',group:'環境',text:'陳先生，58 歲。主訴：胸口不舒服。到院時間 00:12。病史欄位遺失。'},
{id:'intro',name:'同意與主訴',source:'病人',group:'建立關係',question:'您好，我是值班醫師。可以確認您的稱呼，並談談不舒服的情形嗎？',text:'我姓陳，可以。胸口很悶，讓我有點害怕。'},
{id:'onset',name:'發作與持續時間',source:'病人',group:'現病史',question:'什麼時候開始？當時在做什麼？持續多久？',text:'大約 40 分鐘前爬樓梯時開始，坐下休息後仍持續。',needs:'intro'},
{id:'pain',name:'疼痛特徵',source:'病人',group:'現病史',question:'哪裡不舒服？感覺、強度，以及有沒有延伸到其他地方？',text:'胸口中央像被重物壓住，大約 8 分，延伸到左手臂。',needs:'intro'},
{id:'associated',name:'伴隨症狀',source:'病人',group:'相關症狀',question:'有喘、冒汗、噁心或暈厥嗎？',text:'有冒冷汗、噁心和喘，但沒有昏倒。',needs:'intro'},
{id:'negative',name:'重要陰性資訊',source:'病人',group:'相關症狀',question:'呼吸或姿勢會影響疼痛嗎？有突然撕裂般背痛嗎？',text:'呼吸、換姿勢都不太影響，沒有突然撕裂到背部的疼痛。這些陰性病史不能單獨排除其他急症。',needs:'pain'},
{id:'history',name:'心血管危險因子',source:'病人',group:'背景病史',question:'過去有什麼疾病？有抽菸嗎？',text:'有高血壓和糖尿病，抽菸約 30 年。',needs:'intro'},
{id:'meds',name:'用藥與過敏',source:'病人',group:'背景病史',question:'平時用什麼藥？有藥物過敏嗎？',text:'平時吃 amlodipine 和 metformin；目前不知道有藥物過敏。',needs:'history'},
{id:'concern',name:'病人的擔心',source:'病人',group:'建立關係',question:'您最擔心什麼？我會持續評估並向您說明。',text:'我爸爸以前心肌梗塞，我擔心自己也是。謝謝你跟我說明。',needs:'intro'},
{id:'handover',name:'交班便條',source:'工作站',group:'環境',text:'系統故障發生前，護理師記下：持續胸痛需立即評估。請勿為了補完病史而延誤求援、監測及心電圖。'}
];
export const required = ['chart','intro','onset','pain','associated','history','meds','handover'];
export const hints = ['先找回病歷與工作站便條，再向病人自我介紹。','釐清發作、疼痛特徵、伴隨症狀及背景風險；別遺漏用藥與過敏。','將持續壓迫性胸痛與冷汗列為支持證據；陰性病史不能排除急症。提出「疑似急性冠心症，需立即評估」，而非確診。'];
export const levels = ['消失的病歷','身體留下的訊號','數據背後的秘密','危急時刻','關鍵操作','最後的交班'];
export const rubric = [
{label:'病史詢問',ids:['intro','onset','pain','associated','negative','history','meds'],weight:45},
{label:'臨床推理',ids:['reasoning'],weight:30},
{label:'病人安全',ids:['safety'],weight:15},
{label:'溝通與整合',ids:['concern','summary'],weight:10}
];
export const review = {status:'待教師審核',basis:['2021 AHA/ACC Guideline for the Evaluation and Diagnosis of Chest Pain','2023 ESC Guidelines for the management of acute coronary syndromes'],limits:'僅為虛構病例的病史與認知推理訓練；不提供確診、處方或正式 OSCE／EPA 信賴等級。'};

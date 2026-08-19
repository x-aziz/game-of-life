export const DAYS = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']
export const DAYS_SHORT = ['Sat','Sun','Mon','Tue','Wed','Thu','Fri']

export const DEFAULT_COLUMNS = [
  { id:'shower',     title:'Shower',              time:'03:45→04:00', color:'#e8f4ff' },
  { id:'prayer1',    title:'Prayer + Quran',       time:'04:00→04:30', color:'#f5f0ff' },
  { id:'breakfast',  title:'Breakfast',            time:'04:30→05:00', color:'#fffde0' },
  { id:'transport',  title:'Transport / Podcast',  time:'05:00→06:00', color:'#fffde0' },
  { id:'program',    title:'Program / Tasks',      time:'06:00→12:45', color:'#ffffff', wide:true },
  { id:'break',      title:'Break',                time:'12:45→01:00', color:'#fffde0' },
  { id:'networking', title:'Networking',           time:'01:00→03:00', color:'#fffde0' },
  { id:'english',    title:'English / SEQ',        time:'03:00→05:00', color:'#fffde0' },
  { id:'snack',      title:'Prayer + Snack',       time:'05:00→05:30', color:'#f5f0ff' },
  { id:'fun',        title:'Fun / Dinner',         time:'05:30→08:45', color:'#fffde0' },
  { id:'prayer2',    title:'Prayer',               time:'08:45→09:00', color:'#f5f0ff' },
  { id:'eval',       title:'Evaluation',           time:'09:00→09:30', color:'#fff8f0' },
  { id:'sleep',      title:'Sleep',                time:'10:00→03:45', color:'#e8f4ff' },
]

export const DEFAULT_HABITS = [
  '1H learning English','Watch motivation video','Learn skill (tech/coding)',
  'Sport + exercise + shower','Socialize / meet people','Eat healthy food',
  'Drink 1L water','10min meditation','5 prayers on time','Quran (2 pages)',
  'IT podcast (DA7I7)','10 pages from book','No wasted time','Journaling / brain dump',
]

export const DEBT_CATEGORIES = [
  'Skill','Gym','English','Immigration','Discover','dupamicaRin','URR','Other'
]

const CELL_DEFAULTS = {
  shower:     { all: 'سنة النبي\nCold water\nFajr prep' },
  prayer1:    { all: 'Fajr prayer\n+ 2 pages Quran\nبسم الله' },
  breakfast:  { all: 'Coffee + eggs\n+ bread' },
  transport: {
    Saturday:'Tram\nDA7I7 podcast\nIT content',Sunday:'Tram\nDA7I7 podcast\nIT content',
    Monday:'Tram\nDA7I7 podcast\nIT content',Tuesday:'Tram\nDA7I7 podcast\nIT content',
    Wednesday:'Tram\nDA7I7 podcast\nIT content',Thursday:'Tram\nDA7I7 podcast\nIT content',
    Friday:'Sport day\n+ Friday prep\nSorat Al-Kahf',
  },
  program: {
    Saturday:'① Follow the project\n② Understand by GPT\n③ Take notes\n④ Update GitHub',
    Sunday:'① Follow the project\n② Understand by GPT\n③ Take notes',
    Monday:'① Follow the project\n② Understand by GPT\n③ Take notes',
    Tuesday:'① Follow the project\n② Understand by GPT\n③ Take notes',
    Wednesday:'① Follow the project\n② Understand by GPT\n③ Take notes',
    Thursday:'① SES/English\n② Solve exercises\n③ Summarize lesson\n④ Take notes',
    Friday:'① Web Sémantique\n② Travel cours\n③ Take notes\n④ Révise QCM',
  },
  break:      { all: 'Rest\nDrink water\nStretch' },
  networking: { all: '① Look for internship\n② Improve my CV\n③ Create accounts\n④ Update GitHub' },
  english:    { all: '① Solve exercises\n② Summarize lesson\n③ Take notes\n④ Review' },
  snack:      { all: 'Asr prayer\nFruit / snack\nRest 10min' },
  fun: {
    Saturday:'Prepare dinner\n+ chakchouka\nListen culter podcast\n+ DA7I7',
    Sunday:'Prepare dinner\n+ onion + Tomato\nListen IT podcast',
    Monday:'Prepare dinner\n+ kebab + Tomato\nListen culter\n+ DA7I7',
    Tuesday:'Prepare dinner\n+ meet\nListen IT podcast',
    Wednesday:'Prepare dinner\n+ new dinner\nListen culter\nDA7I7',
    Thursday:'Prepare dinner\n+ expensive dinner\nListen Sorat Al-KahF',
    Friday:'Friends + Bosbus\nWeekly evaluation\nPlan next week\nSorat Al-Kahf',
  },
  prayer2:    { all: 'Maghrib prayer\nZikr\nالحمد لله' },
  eval:       { all: '① Complete habits\n② Summarize notes\n③ Plan tomorrow' },
  sleep:      { all: 'بسم الله\nوعلى بركة الله\n🌙' },
}

export function getCellDefault(colId,day){const d=CELL_DEFAULTS[colId];if(!d)return '';return d[day]||d['all']||''}
export function getWeekKey(n,y=2026){return `${y}-W${String(n).padStart(2,'0')}`}
export function getCurrentWeekNumber(){const n=new Date(),s=new Date(n.getFullYear(),0,1);return Math.ceil(((n-s)/86400000+s.getDay()+1)/7)}
export function getWeekDateRange(n,y=2026){const j=new Date(y,0,1),d=(6-j.getDay()+7)%7,f=new Date(j);f.setDate(j.getDate()+d);const s=new Date(f);s.setDate(f.getDate()+(n-1)*7);const e=new Date(s);e.setDate(s.getDate()+6);const fmt=x=>x.toLocaleDateString('en-GB',{day:'numeric',month:'short'});return `${fmt(s)} – ${fmt(e)}, ${y}`}

const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname, '..', 'app-main.js'),'utf8');
const section=(a,b)=>source.slice(source.indexOf(a),source.indexOf(b,source.indexOf(a)));
class Element {
 constructor(){this.style={};this.dataset={};this.attrs={};this.children=[];this.value='';this._html='';this.isConnected=true;this.classList={toggle(){}}}
 setAttribute(k,v){this.attrs[k]=v} appendChild(n){this.children.push(n);return n} append(...n){this.children.push(...n)}
 set innerHTML(v){this._html=v;this.children=[]}get innerHTML(){return this._html}
 set textContent(v){this._text=v;this._html='';this.children=[]}get textContent(){return this._text||''}
 addEventListener(){}getBoundingClientRect(){return {left:0,width:100}}
}
const elements=new Map(['toastMessage','progressFill','fullLyricsProgressFill','fullLyricsProgress','currentTime','duration','volumeFill','volumebutton','searchInput','ytSearchInput','searchResults'].map(id=>[id,new Element()]));
const document={getElementById:id=>elements.get(id)||null,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>new Element()};
const store=new Map();
const audio={currentTime:20,duration:100,volume:1,paused:false,play:async function(){this.paused=false},pause(){this.paused=true}};
const audio2={...audio,paused:true};
const context={console,document,URL,AbortSignal,AbortController,Map,Set,Date,Math,Number,Promise,setTimeout,clearTimeout,queue:[],currentTrackIndex:-1,userQueue:[],currentVolume:1,isMuted:false,previousVolume:1,isPlaying1:false,isPlaying2:false,audio,audio2,audioContext:{state:'running'},AudioEngine:{},localStorage:{setItem:(k,v)=>store.set(k,v)},lyricsManager:null,toast(){},uqRender(){},currentView:'home',getQueueSearchQuery:()=>elements.get('searchInput').value,playTrackAtIndex(){},crossfadeTickHandle:null,isCrossfading:false,confirm:()=>true,apiKey:'key'};
vm.createContext(context);
for(const [a,b,name] of [['class Utils {','// Expose globally','Utils'],['class YouTubeAPI {','const youtubeAPI =','YouTubeAPI'],['class PlayerController {','// Legacy global wrappers','PlayerController'],['class QueueManager {','let dragSrcIndex','QueueManager'],['class UnifiedLyricsManager {','// LYRICS SETTINGS UI','UnifiedLyricsManager']]){
 vm.runInContext(section(a,b)+`\nthis.${name}=${name};`,context);
}
vm.runInContext(section('function addTracksToUserQueue(', 'function addAlbumToUserQueue('),context);
let checks=0;const check=(name,fn)=>Promise.resolve().then(fn).then(()=>{checks++;console.log('PASS '+name)});
(async()=>{
await check('album play-next keeps album order',()=>{context.userQueue=[{uid:'old'}];context.addTracksToUserQueue([{uid:'a'},{uid:'b'}],true);assert.equal(context.userQueue.map(x=>x.uid).join(','),'a,b,old')});
await check('multiword accent-insensitive search across fields',()=>{assert(context.Utils.matchesTrack({title:'Café song',artist:'Daniel'},'daniel cafe'));assert(!context.Utils.matchesTrack({title:'Café',artist:'Daniel'},'other cafe'))});
const api=new context.YouTubeAPI('old');
await check('changing and clearing API keys changes active keys',()=>{api.key='new';assert.equal(api.keys.join(','),'new');api.key='';assert.equal(api.keys.length,0)});
await check('YouTube ID and URL validation',()=>{for(const input of ['abcdefghijk','https://youtu.be/abcdefghijk?t=5','https://m.youtube.com/watch?list=1&v=abcdefghijk','https://youtube.com/shorts/abcdefghijk','https://youtube.com/live/abcdefghijk'])assert.equal(api.parseID(input),'abcdefghijk');for(const input of ['invalid','https://evil.com/watch?v=abcdefghijk','https://youtube.com.evil.com/watch?v=abcdefghijk'])assert.equal(api.parseID(input),'')});
await check('seek clamps invalid times and ignores unloaded media',()=>{context.PlayerController.seekSeconds(-10);assert.equal(audio.currentTime,0);context.PlayerController.seekSeconds(110);assert.equal(audio.currentTime,100);audio.duration=NaN;context.PlayerController.seekTo({currentTarget:new Element(),clientX:25});assert.equal(audio.currentTime,100);audio.duration=100});
await check('full lyrics progress changes fill, not timeline width',()=>{audio.currentTime=40;context.PlayerController.updateProgressBar();assert.equal(elements.get('fullLyricsProgressFill').style.width,'40%');assert.equal(elements.get('fullLyricsProgress').style.width,undefined)});
await check('volume adjustment unmutes and persists',()=>{context.isMuted=true;context.PlayerController.applyVolume(.4);assert.equal(context.isMuted,false);assert.equal(audio.volume,.4);assert.equal(audio2.volume,.4);assert.equal(store.get('youtifiy_volume'),'0.4');context.PlayerController.toggleMute();assert.equal(audio.volume,0);context.PlayerController.toggleMute();assert.equal(audio.volume,.4)});
await check('play failure leaves playback state accurate',async()=>{audio.paused=true;audio.play=async()=>{throw new Error('blocked')};await context.PlayerController.resume();assert.equal(context.isPlaying1,false);assert.equal(context.isPlaying2,false)});
await check('undo restores deleted songs without discarding later additions',()=>{const q=context.QueueManager;q.render=()=>{};context.queue=[{uid:'a'},{uid:'b'}];context.currentTrackIndex=0;q.remove(1);context.queue.push({uid:'c'});q.undoRemoval();assert.equal(context.queue.map(x=>x.uid).join(','),'a,b,c');assert.equal(context.currentTrackIndex,0);q.remove(-1);assert.equal(context.queue.length,3)});
await check('duration loading deduplicates requests and limits concurrency',async()=>{const q=context.QueueManager;context.queue=Array.from({length:6},(_,i)=>({uid:i,type:'import'}));const calls=new Map(),pending=[];let active=0,max=0;q.refreshSearchStatus=()=>{};q.getAudioDuration=track=>{calls.set(track.uid,(calls.get(track.uid)||0)+1);active++;max=Math.max(max,active);return new Promise(resolve=>pending.push(()=>{active--;resolve(100)}))};q.loadMissingDurations();q.loadMissingDurations();assert.equal(active,3);while(pending.length){pending.shift()();await new Promise(resolve=>setImmediate(resolve))}assert.equal(max,3);assert.equal(calls.size,6);assert([...calls.values()].every(n=>n===1));assert.equal(q.durationWorkers,0)});
await check('latest YouTube search wins when older request finishes last',async()=>{const pending=[];context.youtubeAPI={search:(query,signal)=>new Promise(resolve=>pending.push({query,signal,resolve}))};vm.runInContext(section("let lastYouTubeSearchQuery = ''",'function addYouTubeTrack(index)'),context);elements.get('ytSearchInput').value='old';const old=context.searchYouTube();elements.get('ytSearchInput').value='new';const latest=context.searchYouTube();assert(pending[0].signal.aborted);pending[1].resolve({videos:[{video_id:'new',title:'New song',author:'Artist'}]});await latest;pending[0].resolve({videos:[{video_id:'old',title:'Old song'}]});await old;assert.equal(vm.runInContext('lastSearchVideos[0].video_id',context),'new');assert.equal(elements.get('searchResults').attrs['aria-busy'],'false')});
await check('lyrics reset before the first timestamp and recover after seeking',()=>{const m=Object.create(context.UnifiedLyricsManager.prototype);Object.assign(m,{currentSource:'spotify',isOpen:true,currentLineIndex:1,parsedLines:[{startMs:10000},{startMs:20000},{startMs:30000}],highlightLine(index){this.currentLineIndex=index}});audio.currentTime=0;m.handleTimeUpdate();assert.equal(m.currentLineIndex,-1);audio.currentTime=25;m.handleTimeUpdate();assert.equal(m.currentLineIndex,1)});
await check('metadata probes release temporary URLs and audio sources',async()=>{const q=context.QueueManager;const originalURL=context.URL;let revoked=0,released=0;context.URL={createObjectURL:()=> 'blob:test',revokeObjectURL:()=>revoked++};context.Audio=class{constructor(){this.duration=123}set src(value){queueMicrotask(()=>this.onloadedmetadata?.())}removeAttribute(){released++}load(){}};const method=section('  static getAudioDuration(track) {','  static rebuild()');const Probe=vm.runInContext('(class {'+method+'})',context);assert.equal(await Probe.getAudioDuration({type:'import',file:{}}),123);assert.equal(revoked,1);assert.equal(released,1);context.URL=originalURL});
await check('mirrored lyric highlights preserve the existing input DOM',()=>{vm.runInContext(section('function mirrorLyricsContent(source, target) {','const FullLyricsPlayer ='),context);const classes=()=>({toggle(name,value){this[name]=value},contains(name){return name==='active'}});const sourceLine={classList:classes()},targetLine={classList:classes()};const a={dataset:{lyricsRevision:'2'},querySelectorAll:()=>[sourceLine]};const b={dataset:{lyricsRevision:'2'},querySelectorAll:()=>[targetLine],set innerHTML(value){throw new Error('Focused input was recreated')}};context.mirrorLyricsContent(a,b);assert.equal(targetLine.classList.active,true)});

context.window = {};
context.localStorage.getItem = key => store.get(key) ?? null;
const lyricManager = () => Object.assign(Object.create(context.UnifiedLyricsManager.prototype), {
 cache: new Map(), parsedLines: [], currentLineIndex: -1, amToken: 0, isOpen: true,
 exitAm(){this.amActive=false;this.amToken++}, showLoading(){}, showEmpty(){this.empty=true},
 updateFetchButtonVisibility(){}, renderLyrics(){this.rendered=true}, loadAmOffset(){},
 showError(title, message){this.error={title,message}}, saveLyricsToDB:async()=>{}
});
await check('LRC import handles repeats, fractions, offsets and instrumental gaps',()=>{
 const m=lyricManager(); const data=m.parseLocalLyrics('[offset:200]\n[00:10.50][01:20.125]Repeated\n[00:15.000]\n[ar:Artist]');
 assert.equal(data.source,'imported-lrc');assert.equal(data.lines.length,3);
 assert.equal(data.lines[0].startMs,10300);assert.equal(data.lines[1].text,'♪');assert.equal(data.lines[2].startMs,79925);
});
await check('plain lyric import preserves headings without invented timing',()=>{
 const m=lyricManager(),data=m.parseLocalLyrics('[Chorus]\nSome words');assert.equal(data.source,'imported-text');
 assert.equal(data.lines[0].text,'[Chorus]');assert.equal(data.lines[1].startMs,undefined);
 assert.throws(()=>m.parseLocalLyrics('  \n '));assert.throws(()=>m.parseLocalLyrics('[ar:Artist]'));
});
await check('am-lyrics normalization accepts word arrays and text, sorts and rejects bad timestamps',()=>{
 const m=lyricManager(),lines=m.amLinesToParsed([{text:'Later',timestamp:5000},{text:[{text:'First '},{text:'line'}],timestamp:1000},{text:'Invalid',timestamp:'bad'},{text:'Backing',timestamp:0,background:true}]);
 assert.equal(lines.length,2);assert.equal(lines[0].text,'First line');assert.equal(lines[0].startMs,1000);assert.equal(lines[1].index,1);
});
await check('a cancelled old lookup cannot unlock or overwrite the next song',async()=>{
 const m=lyricManager(),waiting=[];m.tryAm=()=>new Promise(resolve=>waiting.push(resolve));
 const first={title:'First',artist:'A'},second={title:'Second',artist:'B'};
 context.queue=[first];context.currentTrackIndex=0;const old=m.fetchLyrics(first,true);
 assert.equal(context.window.__freshLyricsRequests,1);m.cancelLyricsFetch();context.queue=[second];
 const next=m.fetchLyrics(second);waiting[0](null);await old;
 assert.equal(m.isFetching,true);assert.equal(m.isLoading,true);assert.equal(context.window.__freshLyricsRequests,0);
 waiting[1]([{text:'new',timestamp:1000}]);await next;
 assert.equal(m.currentSource,'amlyrics');assert.equal(m.parsedLines[0].text,'new');
 const saved=m.cache.get(m.getLyricsTrackId(second));assert.equal(saved.source,'saved-amlyrics');assert.equal(saved.parsedLines[0].startMs,1000);
});
await check('clearing playback removes stale lyric state',async()=>{
 const m=lyricManager();Object.assign(m,{currentSource:'spotify',currentLyrics:'old',parsedLines:[{text:'old'}]});
 context.queue=[];context.currentTrackIndex=-1;await m.onTrackChange();assert.equal(m.currentSource,null);assert.equal(m.currentLyrics,null);assert.equal(m.parsedLines.length,0);assert(m.empty);
});
await check('returning to a track rejects an earlier storage read of that same song',async()=>{
 const m=lyricManager(),reads=[];m.getLyricsFromDB=()=>new Promise(resolve=>reads.push(resolve));
 const a={title:'A',artist:'A'},b={title:'B',artist:'B'};context.currentTrackIndex=0;context.queue=[a];const old=m.onTrackChange();
 context.queue=[b];const middle=m.onTrackChange();context.queue=[a];const latest=m.onTrackChange();
 reads[2]({lyrics:'latest',source:'genius',parsedLines:[{text:'latest'}]});await latest;
 reads[0]({lyrics:'old',source:'genius',parsedLines:[{text:'old'}]});reads[1](null);await Promise.all([old,middle]);assert.equal(m.currentLyrics,'latest');
});
await check('legacy featured-artist cache keys are still read',async()=>{
 const m=lyricManager(),seen=[],track={title:'Song (feat. Guest)',artist:'Artist'};
 const oldId=`${track.title}-${track.artist}`.replace(/[^\w\s&-]/g,'').trim();
 m.db={transaction:()=>({objectStore:()=>({get(key){seen.push(key);const req={};queueMicrotask(()=>{req.result=key===oldId?{lyrics:'saved'}:null;req.onsuccess()});return req}})})};
 const result=await m.getLyricsFromDB(track);assert.equal(result.lyrics,'saved');assert.equal(seen[0],m.getLyricsTrackId(track));assert.equal(seen[1],oldId);
});
await check('import does not attach lyrics to a song selected while reading the file',async()=>{
 const m=lyricManager();context.queue=[{title:'A',artist:'A'}];context.currentTrackIndex=0;
 let resolve;const task=m.importLyricsFile({size:10,text:()=>new Promise(done=>resolve=done)});
 context.queue=[{title:'B',artist:'B'}];resolve('[00:01]Wrong song');await task;assert.equal(m.parsedLines.length,0);assert.equal(m.cache.size,0);
});
await check('Next advances with repeat one while natural ending repeats the current song',()=>{
 context.queue=[{uid:'a'},{uid:'b'}];context.currentTrackIndex=0;context.repeatMode='one';context.uqPeek=()=>-1;context.uqReturnIndex=-1;context.isShuffle=false;context.updatePlayerUIWithoutAAB=()=>{};
 let selected=-1;context.playTrackAtIndex=(_,__,index)=>selected=index;
 context.PlayerController.next();assert.equal(selected,1);
 const resume=context.PlayerController.resume;let repeated=false;context.PlayerController.resume=()=>{repeated=true};audio.currentTime=50;
 context.PlayerController.next(0,false,true);assert.equal(audio.currentTime,0);assert(repeated);context.PlayerController.resume=resume;
});
await check('paused lyrics use an idle timer instead of animation frames',()=>{
 const m=lyricManager();let frames=0;context.requestAnimationFrame=()=>{frames++;return 1};context.cancelAnimationFrame=()=>{};audio.paused=true;
 m.startLyricsSync();assert.equal(frames,0);assert(m.lyricsIdleTimer);m.stopLyricsSync();assert.equal(m.lyricsSyncRunning,false);
});

await check('provider failure reuses saved synced lyrics without requiring an API key',async()=>{
 const m=lyricManager(),track={title:'Cached',artist:'Artist'};context.queue=[track];context.currentTrackIndex=0;
 m.apiKey='';m.tryAm=async()=>false;const saved={source:'saved-amlyrics',lyrics:[{text:'Saved',startMs:1000}],parsedLines:[{text:'Saved',startMs:1000}]};
 m.cache.set(m.getLyricsTrackId(track),saved);await m.fetchLyrics(track);assert.equal(m.currentSource,'saved-amlyrics');assert(m.rendered);assert(m.hasSyncedLyrics());
});
await check('explicit refresh bypasses a saved lyric fallback',async()=>{
 const m=lyricManager(),track={title:'Cached',artist:'Artist'};context.queue=[track];context.currentTrackIndex=0;m.apiKey='';m.tryAm=async()=>false;
 m.cache.set(m.getLyricsTrackId(track),{source:'saved-amlyrics',parsedLines:[{text:'Old',startMs:0}]});await m.fetchLyrics(track,true);assert(m.error);assert.equal(context.window.__freshLyricsRequests,0);
});
await check('settings open without mounting the removed lyrics section',()=>{
 const originalQuery=document.querySelector,container=new Element();let inserted;
 container.insertBefore=(node)=>{inserted=node};document.querySelector=selector=>selector==='#settingsModal .modal'?container:null;
 Element.prototype.querySelector=()=>null;
 const modal=new Element();modal.classList.add=()=>{};elements.set('settingsModal',modal);
 context.svgfile='';context.ensureHalloweenToggle=()=>{};context.lyricsManager=lyricManager();context.lyricsManager.apiKey='sensitive-key';
 vm.runInContext(section('function addLyricsSettings() {','function saveLyricsKey()'),context);
 vm.runInContext(section('class SettingsManager {','// Legacy wrappers')+'\nthis.SettingsManager=SettingsManager;',context);
 context.SettingsManager.open();assert.equal(inserted,undefined);assert.equal(typeof context.lyricsManager.importLyricsFile,'function');assert.equal(typeof context.lyricsManager.refreshAllLyrics,'function');
 document.querySelector=originalQuery;context.lyricsManager=null;
});

const lyricViewport={scrollTop:0,scrollTo(options){this.lastScroll=options},classList:{contains:()=>false},getBoundingClientRect:()=>({top:0,bottom:200,height:200})};
const lyricRect=(top,height=40)=>({getBoundingClientRect:()=>({top,bottom:top+height,height})});
await check('partly visible current lines at either edge need scrolling',()=>{
 const m=lyricManager();assert(m.amLineNeedsScroll(lyricViewport,lyricRect(-20)));assert(m.amLineNeedsScroll(lyricViewport,lyricRect(190)));
 assert(!m.amLineNeedsScroll(lyricViewport,lyricRect(70)));
});
await check('tall verses only recenter when too little remains readable',()=>{
 const m=lyricManager();assert(!m.amLineNeedsScroll(lyricViewport,lyricRect(-50,400)));assert(m.amLineNeedsScroll(lyricViewport,lyricRect(189,400)));
});
await check('automatic follow works without the floating jump button',()=>{
 const m=lyricManager(),calls=[];audio.paused=false;const line=lyricRect(190);
 m.amEl={isConnected:true,shadowRoot:{querySelector:()=>lyricViewport},scrollToActiveLineYouLy:()=>{throw new Error('Must not clear lyric highlights')},animateScrollYouLy:(...args)=>calls.push(args)};
 m.getAmCurrentLine=()=>line;m.updateAmJump();assert.equal(calls.length,0);assert.equal(lyricViewport.lastScroll.top,182);
});
await check('automatic follow respects manual scroll and unsynced lyrics',()=>{
 const m=lyricManager();let calls=0;m.amEl={isConnected:true,isUserScrolling:true,shadowRoot:{querySelector:()=>lyricViewport},scrollToActiveLineYouLy:()=>calls++};
 m.getAmCurrentLine=()=>lyricRect(190);audio.paused=false;m.updateAmJump();assert.equal(calls,0);
 m.amEl.isUserScrolling=false;m.amEl.cachedIsUnsynced=true;m.updateAmJump();assert.equal(calls,0);
});
await check('timestamp fallback accounts for the saved lyric offset',()=>{
 const m=lyricManager();m.amOffsetMs=2000;audio.currentTime=11;
 const selectors=[];m.amEl={lyrics:[{timestamp:0},{timestamp:10000}],shadowRoot:{querySelector:selector=>{selectors.push(selector);return selector==='.lyrics-line.active'?null:{}}}};
 m.getAmCurrentLine();assert.equal(selectors.at(-1),'#lyrics-line-0');
});
await check('shift-right-click passes the clicked unsynced line instead of its shared timestamp',()=>{
 const m=lyricManager();let selected,prevented=false;
 m.indexAtTs=()=>{throw new Error('Timestamp lookup must not select an unsynced line')};
 m.shareLineCard=(index,line)=>{selected=line};
 const clicked={dataset:{startTime:'0'},textContent:'  The second line  ',classList:{contains:name=>name==='lyrics-line'}};
 m.handleAmContextMenu({composedPath:()=>[clicked],shiftKey:true,preventDefault:()=>prevented=true});
 assert(prevented);assert.equal(selected.text,'The second line');
});
await check('line image renderer uses the supplied clicked text rather than the first parsed line',async()=>{
 const m=lyricManager(),drawn=[];context.queue=[{title:'Song',artist:'Artist'}];context.currentTrackIndex=0;
 m.parsedLines=[{text:'First line',startMs:0},{text:'Second line',startMs:0}];m.lineIndexAtMs=()=>{throw new Error('Should use the clicked line')};
 m.loadImageCors=async()=>null;m.dominantColor=async()=>null;m.downloadBlob=()=>{};
 const originalCreate=document.createElement;context.getComputedStyle=()=>({fontFamily:'sans-serif'});
 const drawing={fillRect(){},fillText:text=>drawn.push(text),measureText:text=>({width:text.length*10}),createLinearGradient:()=>({addColorStop(){}})};
 document.createElement=tag=>tag==='canvas'?{getContext:()=>drawing,toBlob:callback=>callback({})}:new Element();
 await m.shareLineCard(null,{text:'Second line'});assert(drawn.includes('Second line'));assert(!drawn.includes('First line'));document.createElement=originalCreate;
});
await check('these fixes stay in the 1.4.8 release',()=>{
 assert(source.includes('var version = "1.4.8";'));assert(!source.includes('"Release 1.4.9"'));
});

await check('scroll corrections do not clear word colors or toggle focus mode',()=>{
 const m=lyricManager(),line=lyricRect(190),attributes=new Map([['data-yl-focus',true]]);let moved=false;
 m.amEl={isUserScrolling:false,currentPrimaryActiveLine:line,highlightColor:'#abcdef',
 scrollToActiveLineYouLy(){throw new Error('This resets highlighting')},clearPastLineHighlights(){throw new Error('Must retain highlighting')},
 setUserScrolling(){throw new Error('Automatic correction must preserve user focus state')},
 animateScrollYouLy(){moved=true},toggleAttribute(){throw new Error('Must preserve focus mode')}};
 const before=m.amEl.currentPrimaryActiveLine;m.scrollAmLineIntoView(lyricViewport,line);
 assert.equal(moved,false);assert.equal(lyricViewport.lastScroll.top,182);assert.equal(m.amEl.currentPrimaryActiveLine,before);assert.equal(m.amEl.highlightColor,'#abcdef');assert.equal(attributes.get('data-yl-focus'),true);clearTimeout(m.amCorrectionTimer);
});
await check('the original focus toggle still applies and removes its attribute',()=>{
 const m=lyricManager(),attributes=new Map();m.amEl={parentElement:{id:'fullLyricsContent'},toggleAttribute:(name,value)=>attributes.set(name,value)};
 m.amFocus=true;m.amFade=true;m.applyAmFocus();assert.equal(attributes.get('data-yl-focus'),true);
 m.amFocus=false;m.applyAmFocus();assert.equal(attributes.get('data-yl-focus'),false);
});
await check('the added accent-color override is removed from lyric markup',()=>{
 const html=fs.readFileSync(require('node:path').join(__dirname,'..','app.html'),'utf8');
 assert(!html.includes('.lyrics-line.active { color: var(--accent); background: color-mix'));
});


await check('playback timestamps and colors stay valid when no lyric animation container is available',()=>{
 const m=lyricManager();m.amActive=true;m.currentSource='amlyrics';m.parsedLines=[];
 let deliveredTime;const clocks=new Proxy({}, {get(){throw new Error('App must not inspect native animation clocks')}});
 m.amEl={isConnected:true,constructor:clocks,lyricsContainer:{getAnimations(){throw new Error('App must not modify native animations')}},highlightColor:'#abcdef'};
 Object.defineProperty(m.amEl,'currentTime',{set(value){deliveredTime=value}});
 m.amOffsetMs=200;audio.currentTime=5;audio.playbackRate=2;audio.paused=false;
 m.handleTimeUpdate();assert.equal(deliveredTime,4800);assert.equal(m.amEl.highlightColor,'#abcdef');
});
await check('the old global animation-clock override remains absent',()=>{
 assert(!source.includes('syncAmAnimationClock'));
 assert(!source.includes('renderer.wipeClocks'));
 assert(!source.includes('animation.playbackRate = rate'));
});

await check('unsynced am-lyrics stay untimed when saved and reopened',async()=>{
 const m=lyricManager(),track={title:'Unsynced',artist:'Artist'};context.queue=[track];context.currentTrackIndex=0;
 m.amEl={cachedIsUnsynced:true};m.tryAm=async()=>[{text:'First',timestamp:0},{text:'Second',timestamp:0}];
 await m.fetchLyrics(track);assert.equal(m.hasSyncedLyrics(),false);
 const saved=m.cache.get(m.getLyricsTrackId(track));assert.equal(saved.source,'saved-amlyrics-text');
 m.loadCachedLyrics(saved);assert.equal(m.hasSyncedLyrics(),false);
});

await check('file imports remain playable when persistent storage is unavailable or returns no ID',async()=>{
 let handler;const input={addEventListener:(_,fn)=>handler=fn};const originalGet=document.getElementById;
 document.getElementById=id=>id==='fileInput'?input:originalGet(id);
 context.tracks=[];context.TrackManager={processAudioFile:async()=>({file:null,type:'local',src:null})};
 context.window.indexedDBManager={db:()=>null};
 const rebuild=context.QueueManager.rebuild;context.QueueManager.rebuild=()=>{};
 vm.runInContext(section("document.getElementById('fileInput').addEventListener('change'", "document.getElementById('folderInput').addEventListener('change'"),context);
 const file={name:'test.wav',size:100,type:'audio/wav'};await handler({target:{files:[file],value:'test'}});
 assert.equal(context.tracks[0].file,file);assert.equal(context.tracks[0].type,'import');
 context.window.indexedDBManager={db:()=>({}),saveTrackToDB:async()=>null};await handler({target:{files:[file],value:'test'}});
 assert.equal(context.tracks[1].file,file);assert.equal(context.tracks[1].type,'import');
 context.QueueManager.rebuild=rebuild;document.getElementById=originalGet;
});

vm.runInContext(section('class WinterSnakeGame {','(function installChristmasAndSnake()')+'\nthis.WinterSnakeGame=WinterSnakeGame;',context);
await check('Snake advances one cell without growing when no food is eaten',()=>{
 const game=new context.WinterSnakeGame(()=>0);const x=game.body[0].x;game.step();assert.equal(game.body[0].x,x+1);assert.equal(game.body.length,3);assert.equal(game.score,0);
});
await check('Snake rejects reversing and multiple turns within one tick',()=>{
 const game=new context.WinterSnakeGame(()=>0);assert.equal(game.steer(-1,0),false);assert.equal(game.steer(.5,.5),false);assert(game.steer(0,-1));assert.equal(game.steer(-1,0),false);game.step();assert(game.steer(-1,0));
});
await check('Snake food grows the body and respawns away from occupied cells',()=>{
 const game=new context.WinterSnakeGame(()=>0);game.food={x:game.body[0].x+1,y:game.body[0].y};game.step();assert.equal(game.body.length,4);assert.equal(game.score,1);assert(!game.body.some(p=>p.x===game.food.x&&p.y===game.food.y));
});
await check('Snake stops on wall and body collisions',()=>{
 const game=new context.WinterSnakeGame(()=>0);game.body=[{x:19,y:5},{x:18,y:5},{x:17,y:5}];game.step();assert(game.over);
 game.reset();game.body=[{x:2,y:2},{x:1,y:2},{x:1,y:3},{x:2,y:3}];game.direction={x:-1,y:0};game.step();assert(game.over);
});
await check('Snake permits moving into the tail cell when it moves away',()=>{
 const game=new context.WinterSnakeGame(()=>0);game.body=[{x:1,y:1},{x:2,y:1},{x:2,y:2},{x:1,y:2}];game.direction={x:0,y:1};game.food={x:0,y:0};game.step();assert.equal(game.over,false);assert.equal(game.body.length,4);
});
await check('Snake completes a full board without looping while placing food',()=>{
 const game=new context.WinterSnakeGame(()=>0,3);game.body=[{x:1,y:0},{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:2,y:2},{x:1,y:2},{x:0,y:2}];game.direction={x:1,y:0};game.food={x:2,y:0};game.step();assert(game.won);assert(game.over);assert.equal(game.food,null);assert.equal(game.body.length,9);
});
console.log(`${checks} regression checks passed`);
})().catch(e=>{console.error(e);process.exitCode=1});

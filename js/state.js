/* ATHAR browser-local progress state. No child data leaves the device. */
window.ATHAR=window.ATHAR||{};
ATHAR.state=(function(){
  var KEY='athar.progress.v1';
  function base(){return{
    traces:0,
    completed:{},
    badges:[],
    support:{},
    passports:{skills:[],safety:[]},
    companion:localStorage.getItem('athar.companion')||'none',
    lastMission:null
  }}
  function normalise(raw){
    var s=Object.assign(base(),raw||{});
    s.completed=s.completed&&typeof s.completed==='object'?s.completed:{};
    s.badges=Array.isArray(s.badges)?s.badges:[];
    s.support=s.support&&typeof s.support==='object'?s.support:{};
    s.passports=s.passports&&typeof s.passports==='object'?s.passports:{skills:[],safety:[]};
    s.passports.skills=Array.isArray(s.passports.skills)?s.passports.skills:[];
    s.passports.safety=Array.isArray(s.passports.safety)?s.passports.safety:[];
    s.traces=Number.isFinite(+s.traces)?+s.traces:0;
    return s;
  }
  function load(){try{return normalise(JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return base()}}
  var s=load();
  function save(){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
  function copy(v){return JSON.parse(JSON.stringify(v))}
  function uniquePush(arr,id){if(id&&arr.indexOf(id)<0){arr.push(id);return true}return false}
  return{
    all:function(){return copy(s)},
    reset:function(){s=base();save()},
    isDone:function(id){return !!s.completed[id]},
    lessonResult:function(id){return s.completed[id]?copy(s.completed[id]):null},
    completeLesson:function(id,traces,supported){
      var evidence=supported?'supported':'independent';
      if(!s.completed[id]){
        s.completed[id]={supported:!!supported,evidence:evidence};
        s.traces+=(+traces||0);
      }else if(s.completed[id].supported&&!supported){
        /* A replay without hints may upgrade supported evidence to independent. */
        s.completed[id].supported=false;
        s.completed[id].evidence='independent';
      }
      s.lastMission=id;
      save();
    },
    completedCount:function(){return Object.keys(s.completed).length},
    awardBadge:function(id){if(uniquePush(s.badges,id))save()},
    hasBadge:function(id){return s.badges.indexOf(id)>=0},
    markSupport:function(id){s.support[id]=true;save()},
    usedSupport:function(id){return !!s.support[id]},
    awardPassport:function(kind,id){
      kind=kind==='safety'?'safety':'skills';
      if(uniquePush(s.passports[kind],id))save();
    },
    passport:function(kind){kind=kind==='safety'?'safety':'skills';return s.passports[kind].slice()},
    setCompanion:function(v){s.companion=v||'none';try{localStorage.setItem('athar.companion',s.companion)}catch(e){}save()},
    companion:function(){return s.companion||'none'},
    setLastMission:function(id){s.lastMission=id||null;save()},
    lastMission:function(){return s.lastMission||null}
  };
})();

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
    ageBand:localStorage.getItem('athar.ageBand')||'7-9',
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
    s.ageBand=s.ageBand==='10-12'?'10-12':'7-9';
    return s;
  }
  function load(){try{return normalise(JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return base()}}
  var s=load();
  function emit(reason){
    try{document.dispatchEvent(new CustomEvent('athar:state-change',{detail:{reason:reason||'update'}}))}catch(e){}
  }
  function save(reason){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}emit(reason)}
  function copy(v){return JSON.parse(JSON.stringify(v))}
  function uniquePush(arr,id){if(id&&arr.indexOf(id)<0){arr.push(id);return true}return false}
  function rank(v){return v==='independent'?2:v==='supported'?1:0}
  function stronger(a,b){return rank(b)>rank(a)?b:a}
  function replaceBounded(remote){
    remote=remote||{};
    s=normalise({
      traces:remote.traces,
      completed:remote.completed,
      badges:remote.badges,
      support:{},
      passports:remote.passports,
      companion:remote.companion||'none',
      ageBand:remote.ageBand,
      lastMission:remote.lastMission
    });
    try{localStorage.setItem('athar.companion',s.companion);localStorage.setItem('athar.ageBand',s.ageBand)}catch(e){}
    save('cloud-hydrate');
  }
  function mergeBounded(remote){
    remote=normalise(remote||{});
    Object.keys(remote.completed).forEach(function(id){
      var incoming=remote.completed[id],current=s.completed[id];
      if(!current)s.completed[id]=copy(incoming);
      else{
        var evidence=stronger(current.evidence,incoming.evidence);
        s.completed[id]={supported:evidence==='supported',evidence:evidence};
      }
    });
    remote.badges.forEach(function(id){uniquePush(s.badges,id)});
    remote.passports.skills.forEach(function(id){uniquePush(s.passports.skills,id)});
    remote.passports.safety.forEach(function(id){uniquePush(s.passports.safety,id)});
    s.traces=Math.max(s.traces,remote.traces);
    s.companion=remote.companion||s.companion;
    s.ageBand=remote.ageBand||s.ageBand;
    s.lastMission=remote.lastMission||s.lastMission;
    try{localStorage.setItem('athar.companion',s.companion);localStorage.setItem('athar.ageBand',s.ageBand)}catch(e){}
    save('cloud-merge');
  }
  return{
    all:function(){return copy(s)},
    reset:function(){s=base();save('reset')},
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
      save('lesson-complete');
    },
    completedCount:function(){return Object.keys(s.completed).length},
    awardBadge:function(id){if(uniquePush(s.badges,id))save('badge')},
    hasBadge:function(id){return s.badges.indexOf(id)>=0},
    markSupport:function(id){s.support[id]=true;save('support')},
    usedSupport:function(id){return !!s.support[id]},
    awardPassport:function(kind,id){
      kind=kind==='safety'?'safety':'skills';
      if(uniquePush(s.passports[kind],id))save('passport');
    },
    passport:function(kind){kind=kind==='safety'?'safety':'skills';return s.passports[kind].slice()},
    setCompanion:function(v){s.companion=v||'none';try{localStorage.setItem('athar.companion',s.companion)}catch(e){}save('companion')},
    companion:function(){return s.companion||'none'},
    setAgeBand:function(v){s.ageBand=v==='10-12'?'10-12':'7-9';try{localStorage.setItem('athar.ageBand',s.ageBand)}catch(e){}save('age-band')},
    ageBand:function(){return s.ageBand==='10-12'?'10-12':'7-9'},
    setLastMission:function(id){s.lastMission=id||null;save('active-mission')},
    lastMission:function(){return s.lastMission||null},
    replaceBounded:replaceBounded,
    mergeBounded:mergeBounded
  };
})();

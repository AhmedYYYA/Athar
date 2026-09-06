/* ATHAR browser-local progress state. No child data leaves the device. */
window.ATHAR=window.ATHAR||{};
ATHAR.state=(function(){
  var KEY='athar.progress.v1';var empty={traces:0,completed:{},badges:[],support:{},companion:localStorage.getItem('athar.companion')||'none'};
  function load(){try{return Object.assign({},empty,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return Object.assign({},empty)}}
  var s=load();function save(){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
  return{all:function(){return JSON.parse(JSON.stringify(s))},reset:function(){s=JSON.parse(JSON.stringify(empty));save()},isDone:function(id){return !!s.completed[id]},completeLesson:function(id,traces,supported){if(!s.completed[id]){s.completed[id]={supported:!!supported};s.traces+=(+traces||0);save()}},awardBadge:function(id){if(s.badges.indexOf(id)<0){s.badges.push(id);save()}},hasBadge:function(id){return s.badges.indexOf(id)>=0},markSupport:function(id){s.support[id]=true;save()},usedSupport:function(id){return !!s.support[id]},setCompanion:function(v){s.companion=v||'none';try{localStorage.setItem('athar.companion',s.companion)}catch(e){}save()},companion:function(){return s.companion||'none'}};
})();

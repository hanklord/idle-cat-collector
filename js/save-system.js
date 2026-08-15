(function(){
  window.CC=window.CC||{}; var KEY='idleCatSave';
  function fresh(){return{coins:50,owned:{orange_tabby:1},levels:{},mainCatId:'orange_tabby',lastTimestamp:Date.now()}}
  function load(){
    var base=fresh();
    try{
      var saved=JSON.parse(localStorage.getItem(KEY)||'null');
      if(saved&&typeof saved==='object'){
        Object.assign(base,saved);
        if(!base.owned||typeof base.owned!=='object'||Object.keys(base.owned).length===0)base.owned={orange_tabby:1};
        if(!base.levels||typeof base.levels!=='object')base.levels={};
        if(!base.mainCatId||!base.owned[base.mainCatId])base.mainCatId='orange_tabby';
      }
    }catch(e){}
    return base;
  }
  function Save(g){this.game=g;this.data=load();this.data.lastTimestamp=this.data.lastTimestamp||Date.now();try{localStorage.setItem(KEY,JSON.stringify(this.data))}catch(e){}setInterval(this.save.bind(this),30000);document.addEventListener('visibilitychange',this.save.bind(this))}
  Save.prototype.save=function(){this.data.coins=this.game.coins;this.data.lastTimestamp=Date.now();this.data.owned=this.game.owned;this.data.levels=this.game.levels;this.data.mainCatId=this.game.mainCatId;try{localStorage.setItem(KEY,JSON.stringify(this.data))}catch(e){}};
  Save.prototype.offline=function(){return Math.min(CC.MAX_OFFLINE_HOURS,Math.max(0,(Date.now()-this.data.lastTimestamp)/36e5))};
  Save.prototype.reset=function(){this.data=fresh();this.save()}; CC.Save=Save;
})();

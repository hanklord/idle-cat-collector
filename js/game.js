(function(){
  window.CC=window.CC||{};
  function Game(){
    var self=this; this.coins=50; this.owned={orange_tabby:1}; this.levels={};
    this.save=new CC.Save(this); this.coins=Number(this.save.data.coins)||50; this.owned=this.save.data.owned||{orange_tabby:1}; this.levels=this.save.data.levels||{};
    this.gacha=new CC.Gacha(this); this.upgrade=new CC.Upgrade(this); this.ui=new CC.UI(this);
    this.scene=new CC.Scene(document.getElementById('scene'),this); this.spawn();
    document.getElementById('scene').addEventListener('click',function(e){var r=this.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;self.scene.cats.forEach(function(c){if(Math.hypot(c.x-x,c.y-y)<40)c.click()})});
    var h=this.save.offline(); if(h>0){var n=this.rate()*h*3600;this.coins+=n;this.ui.offline(h,n)}
    this.last=performance.now(); requestAnimationFrame(this.loop.bind(this));
  }
  Game.prototype.spawn=function(){var self=this;CAT_CONFIG.forEach(function(c,i){var cat=new CC.Cat(c,self.scene.w*(.2+(i%3)*.3),self.scene.h*(.72+(i%3)*.06));cat.active=!!self.owned[c.id];self.scene.add(cat)})};
  Game.prototype.rate=function(){var self=this;return this.scene?this.scene.cats.reduce(function(n,c){return n+(c.active?c.def.baseOutput*(RARITY_MULT[c.def.rarity]||1)*self.upgrade.mult(c.def):0)},0):0};
  Game.prototype.emit=function(x,y){this.coins+=1;this.scene.emit(x,y);CC.Audio.coin()};
  Game.prototype.loop=function(t){var dt=Math.min(.1,(t-this.last)/1000);this.last=t;this.coins+=this.rate()*dt;this.scene.update(dt);this.scene.draw();this.ui.hud();requestAnimationFrame(this.loop.bind(this))};
  CC.Game=Game;
})();

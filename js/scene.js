(function(){
  window.CC=window.CC||{};
  function Scene(canvas,g){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.game=g;this.cats=[];this.particles=[];this._bgCanvas=null;this.resize();window.addEventListener('resize',this.resize.bind(this))}
  Scene.prototype.resize=function(){var r=this.canvas.getBoundingClientRect();this.canvas.width=Math.max(1,r.width*devicePixelRatio);this.canvas.height=Math.max(1,r.height*devicePixelRatio);this.ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);this.w=r.width;this.h=r.height;this.sceneH=this.h;this._bgCanvas=null;this.cats.forEach(this._setCatBounds.bind(this))};
  Scene.prototype._setCatBounds=function(cat){cat.minY=this.sceneH*.68;cat.maxY=this.sceneH*.92};
  Scene.prototype.add=function(cat){cat.game=this.game;this._setCatBounds(cat);this.cats.push(cat)};
  Scene.prototype.emit=function(x,y){this.particles.push({x:x,y:y,life:1,text:'+1'})};
  Scene.prototype.update=function(dt){this.cats.forEach(function(c){c.update(dt)});this.particles.forEach(function(p){p.y-=25*dt;p.life-=dt});this.particles=this.particles.filter(function(p){return p.life>0})};
  Scene.prototype._renderBackground=function(){var self=this;var oc=document.createElement('canvas');oc.width=this.w;oc.height=this.sceneH;var c=oc.getContext('2d'),W=this.w,H=this.sceneH;
    if(!this.bgImg){this.bgImg=new Image();this.bgImg.onload=function(){self._bgCanvas=null};this.bgImg.src='assets/castle_bg.png'}
    if(this.bgImg&&this.bgImg.complete&&this.bgImg.naturalWidth>0){c.drawImage(this.bgImg,0,0,W,H)}else{
      var sky=c.createLinearGradient(0,0,0,H*.4);sky.addColorStop(0,'#1E3A5F');sky.addColorStop(1,'#87CEEB');c.fillStyle=sky;c.fillRect(0,0,W,H*.4);
      var cy=H*.2;c.fillStyle='#5A5A5A';c.fillRect(W*.4,cy,W*.2,H*.25);c.fillStyle='#8B0000';c.beginPath();c.moveTo(W*.4,cy);c.lineTo(W*.5,cy-H*.08);c.lineTo(W*.6,cy);c.fill();
    }
    this._bgCanvas=oc;
  };
  Scene.prototype.draw=function(){var c=this.ctx;if(!this._bgCanvas)this._renderBackground();c.clearRect(0,0,this.w,this.h);c.drawImage(this._bgCanvas,0,0,this.w,this.sceneH);this.cats.forEach(function(cat){cat.draw(c)});c.font='bold 16px sans-serif';c.textAlign='center';this.particles.forEach(function(p){c.globalAlpha=p.life;c.fillStyle='#ffd86b';c.fillText(p.text,p.x,p.y)});c.globalAlpha=1};CC.Scene=Scene;
})();

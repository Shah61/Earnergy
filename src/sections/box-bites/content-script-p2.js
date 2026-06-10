/* ============ PART 2: 3D table + falling biscuit ============ */
  (function(){
    var tz=document.getElementById('tz'), tstage=tz.querySelector('.tstage'),
        card=document.getElementById('card3d'),
        faller=document.getElementById('faller'),
        fshadow=document.getElementById('fshadow'),
        overlay=document.getElementById('theadOverlay'),
        rows=[].slice.call(card.querySelectorAll('.row'));

    // reuse the bite cutout already embedded above (no duplicate payload)
    faller.src=document.querySelector('#nodeProduct img').src;

    // biscuit fall: idx -1.6 = above the card, 0..5 = rows; holds between drops
    var FALL=[
      {p:0.00, idx:-1.6},
      {p:0.10, idx:-1.6},
      {p:0.18, idx:0},{p:0.26, idx:0},
      {p:0.32, idx:1},{p:0.40, idx:1},
      {p:0.46, idx:2},{p:0.54, idx:2},
      {p:0.60, idx:3},{p:0.68, idx:3},
      {p:0.74, idx:4},{p:0.82, idx:4},
      {p:0.88, idx:5},{p:1.00, idx:5}
    ];
    // camera: tilt -> zoom in, ease back slightly at end
    var CAM=[
      {p:0.00, rx:52, s:0.80},
      {p:0.10, rx:26, s:1.06},
      {p:0.22, rx:15, s:1.30},
      {p:0.86, rx:10, s:1.34},
      {p:1.00, rx:7,  s:1.16}
    ];
    var DROPS=[0.18,0.32,0.46,0.60,0.74,0.88]; // p where biscuit lands row i

    var vh=0,vw=0,mobile=false;
    var rowY=[], cardH=1, headH=0;
    function measure(){
      vw=tstage.clientWidth; vh=tstage.clientHeight; mobile=vw<760;
      cardH=card.offsetHeight;
      headH=card.querySelector('.chead').offsetTop;
      rowY=rows.map(function(r){ return r.offsetTop + r.offsetHeight/2; });
    }
    function idxToY(idx){
      if(idx<=0){ // from above card down to row 0
        var top=-cardH*0.34, y0=rowY[0];
        var t=(idx+1.6)/1.6; // -1.6..0 -> 0..1
        return top+(y0-top)*clamp(t,0,1);
      }
      var i=Math.floor(idx), f=idx-i;
      var a=rowY[Math.min(i,5)], b=rowY[Math.min(i+1,5)];
      return a+(b-a)*f;
    }
    function progress(){ var r=tz.getBoundingClientRect(), d=tz.offsetHeight-vh; return d<=0?0:clamp((-r.top)/d,0,1); }

    var cur={idx:-1.6,rx:52,s:0.8}, targetP=0, landed=-1;

    function countUp(row){
      var to=parseFloat(row.dataset.to), dec=parseInt(row.dataset.dec,10), unit=row.dataset.unit;
      var val=row.querySelector('.val'), dur=900, t0=null;
      if(REDUCED){ val.textContent=to.toFixed(dec)+unit; return; }
      function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1), e=1-Math.pow(1-p,3);
        val.textContent=(to*e).toFixed(dec)+unit; if(p<1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    }
    function setLanded(n){
      if(n===landed) return;
      var prev=landed; landed=n;
      rows.forEach(function(r,i){
        r.classList.toggle('on', i===n);
        r.classList.toggle('done', i<=n && n>=0);
      });
      if(n>prev){ for(var i=Math.max(prev+1,0);i<=n;i++) countUp(rows[i]); }
      if(n>=0 && n>prev && !REDUCED){
        card.classList.remove('jolt'); void card.offsetWidth; card.classList.add('jolt');
        burst(card.offsetWidth/2, rowY[n]);
      }
    }
    function landedFor(p){ var n=-1; for(var i=0;i<DROPS.length;i++){ if(p>=DROPS[i]-0.005) n=i; } return n; }

    /* ---- crumb particles ---- */
    var crumbs=[], crumbRAF=null;
    var COLORS=['#5a3a22','#7a4a26','#3a2417','#c9a25e','#e7d4a6','#8a5a2e'];
    function burst(x,y){
      if(REDUCED) return;
      var n=10+Math.floor(Math.random()*5);
      for(var i=0;i<n;i++){
        var el=document.createElement('span');
        el.className='crumb';
        var sz=3+Math.random()*5.5;
        el.style.width=sz+'px'; el.style.height=sz*(0.7+Math.random()*0.5)+'px';
        el.style.background=COLORS[(Math.random()*COLORS.length)|0];
        card.appendChild(el);
        var ang=Math.PI*(1.05+Math.random()*0.9); // mostly sideways-up
        var sp=2.2+Math.random()*3.4;
        crumbs.push({el:el,x:x+(Math.random()*30-15),y:y+8,
          vx:Math.cos(ang)*sp,vy:-Math.abs(Math.sin(ang))*sp*1.25-1.2,
          rot:Math.random()*360,vr:Math.random()*14-7,life:1});
      }
      if(!crumbRAF) crumbRAF=requestAnimationFrame(stepCrumbs);
    }
    function stepCrumbs(){
      crumbRAF=null;
      for(var i=crumbs.length-1;i>=0;i--){
        var c=crumbs[i];
        c.vy+=0.32; c.x+=c.vx; c.y+=c.vy; c.rot+=c.vr; c.life-=0.022;
        if(c.life<=0){ c.el.remove(); crumbs.splice(i,1); continue; }
        c.el.style.transform='translate(-50%,-50%) translateZ(48px) translate('+c.x+'px,'+c.y+'px) rotate('+c.rot+'deg)';
        c.el.style.left='0px'; c.el.style.top='0px';
        c.el.style.opacity=Math.min(1,c.life*1.6);
      }
      if(crumbs.length) crumbRAF=requestAnimationFrame(stepCrumbs);
    }

    function render(){
      var f=lerpKeys(FALL,targetP,['idx']), c=lerpKeys(CAM,targetP,['rx','s']);
      var k=REDUCED?1:0.10;
      cur.idx+=(f.idx-cur.idx)*k; cur.rx+=(c.rx-cur.rx)*k; cur.s+=(c.s-cur.s)*k;

      var s=mobile?Math.min(cur.s,1.04):cur.s;
      var rx=mobile?cur.rx*0.8:cur.rx;
      // keep the active part of the table in view: shift card up as biscuit descends
      var follow=clamp(idxToY(Math.max(cur.idx,0))-rowY[0],0,cardH)*0.62*(s>1.1?1:0.4);
      card.style.transform='translateY('+(-follow)+'px) rotateX('+rx+'deg) scale('+s+')';

      var y=idxToY(cur.idx);
      var falling=Math.abs(f.idx-cur.idx);          // how far from rest
      var squash=clamp(1-falling*0.16,0.86,1);      // mid-air stretch
      var rot=Math.sin(cur.idx*2.2)*6;
      faller.style.transform='translate(-50%,-50%) translateZ(46px) rotate('+rot+'deg) scale('+(2-squash)+','+squash+')';
      faller.style.top=y+'px';
      faller.style.opacity=clamp((targetP-0.06)/0.05,0,1);
      // contact shadow on the card under the biscuit
      var h=clamp(falling,0,1);
      fshadow.style.top=(y+ (mobile?26:34))+'px';
      fshadow.style.transform='translateX(-50%) scale('+(1+h*0.7)+')';
      fshadow.style.opacity=clamp((targetP-0.08)/0.05,0,1)*(0.85-h*0.45);

      overlay.style.opacity=clamp(1-(targetP-0.55)/0.12,0,1);
      overlay.style.transform='translateY('+(-clamp((targetP-0.55)/0.12,0,1)*30)+'px)';
      requestAnimationFrame(render);
    }
    function onScroll(){ targetP=progress(); setLanded(landedFor(targetP)); }
    function onResize(){ measure(); onScroll(); }

    if(faller.complete) init(); else { faller.addEventListener('load',init); faller.addEventListener('error',init); }
    function init(){
      measure(); onScroll(); requestAnimationFrame(render);
      window.addEventListener('scroll',onScroll,{passive:true});
      window.addEventListener('resize',onResize);
      window.addEventListener('orientationchange',onResize);
    }
  })();

  
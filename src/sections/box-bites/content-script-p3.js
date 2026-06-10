/* ============ PART 3: into the pouch ============ */
  (function(){
    var sz=document.getElementById('sz'), sstage=sz.querySelector('.sstage'),
        shead=document.getElementById('shead'),
        wrap=document.getElementById('pouchwrap'), pimg=document.getElementById('pouchImg'),
        mouth=document.getElementById('mouth'), iris=document.getElementById('iris'),
        inside=document.getElementById('inside'), fallworld=document.getElementById('fallworld'),
        speckl=document.getElementById('speckl'),
        insidehead=document.getElementById('insidehead'),
        stations=[].slice.call(document.querySelectorAll('.station')),
        landing=document.getElementById('landing'), stamp=document.getElementById('stamp');

    // reuse already-embedded cutouts (no extra payload)
    document.getElementById('stOat').src=document.querySelector('#nodeOat img').src;
    document.getElementById('stChoc').src=document.querySelector('#nodeChoc img').src;
    document.getElementById('stHoodia').src=document.querySelector('#nodeHoodia img').src;

    function clamp2(v,a,b){return v<a?a:(v>b?b:v);}
    function sstep(a,b,p){return (p<=a)?0:(p>=b)?1:(function(t){return t*t*(3-2*t);})((p-a)/(b-a));}

    /* timeline:
       0.00-0.10 pouch rises in under headline
       0.10-0.34 tilt back: looking down at the bag, the mouth dilates
       0.30-0.42 dive: zoom into the mouth, iris swallows the screen
       0.42-0.88 free-fall inside past 4 ingredient stations
       0.88-1.00 land at the bottom: RM30 stamp + chips                */
    var DIVE_IN=0.30, DIVE_FULL=0.42, FALL_END=0.88;
    var STA_P=[0.475,0.575,0.675,0.775], LAND_P=0.88;

    var vh=0,vw=0,mobile=false,FH=0;
    function fit(){
      vw=sstage.clientWidth; vh=sstage.clientHeight; mobile=vw<760;
      // lay out the fall: 4 stations then landing, ~0.95vh apart
      var gap=vh*0.95, y0=vh*0.62;
      stations.forEach(function(s,i){ s.style.top=(y0+gap*i - s.offsetHeight/2)+'px'; });
      landing.style.top=(y0+gap*4 - 40)+'px';
      FH=y0+gap*4+vh*0.55;
      fallworld.style.height=FH+'px'; speckl.style.height=FH+'px';
      seedSpecks();
    }
    var seeded=false;
    function seedSpecks(){
      if(seeded) return; seeded=true;
      var cols=['#5a3a22','#7a4a26','#c9a25e','#e7d4a6','#8a5a2e'];
      for(var i=0;i<46;i++){
        var s=document.createElement('span'); s.className='speck';
        var sz2=2+Math.random()*6;
        s.style.width=sz2+'px'; s.style.height=sz2*(0.7+Math.random()*0.5)+'px';
        s.style.left=(Math.random()*100)+'%';
        s.style.top=(Math.random()*100)+'%';
        s.style.background=cols[(Math.random()*cols.length)|0];
        s.style.opacity=0.18+Math.random()*0.4;
        speckl.appendChild(s);
      }
    }
    function progress(){ var r=sz.getBoundingClientRect(), d=sz.offsetHeight-vh; return d<=0?0:clamp2((-r.top)/d,0,1); }

    var targetP=0, cur={rise:1,rx:0,sc:1,m:0,ir:0,fall:0};
    function render(){
      var p=targetP, k=REDUCED?1:0.09;

      // phase A: rise + tilt + approach
      var rise=(1-sstep(0,0.10,p))*180;
      var rx=-sstep(0.10,0.34,p)*58;                       // top swings toward camera
      var sc=1+sstep(0.10,DIVE_IN,p)*0.9+sstep(DIVE_IN,DIVE_FULL,p)*2.3; // 1 -> 1.9 -> 4.2
      var down=sstep(0.10,DIVE_FULL,p)*vh*0.22;            // bring the mouth to screen centre
      var m=sstep(0.16,0.34,p);                            // mouth dilation
      var ir=sstep(0.33,DIVE_FULL,p);                      // iris swallow

      cur.rise+=(rise-cur.rise)*k; cur.rx+=(rx-cur.rx)*k; cur.sc+=(sc-cur.sc)*k;
      cur.m+=(m-cur.m)*k; cur.ir+=(ir-cur.ir)*k;

      var bob=REDUCED?0:Math.sin(Date.now()/1400)*5*(1-sstep(0.10,0.2,p));
      wrap.style.transform='translate(-50%,-50%) translateY('+(cur.rise+bob+down)+'px) rotateX('+cur.rx+'deg) scale('+cur.sc+')';
      wrap.style.opacity=clamp2(p/0.05,0,1)*(1-sstep(0.40,0.45,p));
      mouth.style.opacity=cur.m;
      mouth.style.transform='translate(-50%,-50%) scale('+(0.2+cur.m*0.95)+')';
      iris.style.transform='translate(-50%,-50%) scale('+(cur.ir*(mobile?6.5:5.2))+')';
      iris.style.opacity=cur.ir>0.01?1:0;

      shead.style.opacity=clamp2(p/0.03,0,1)*(1-sstep(0.16,0.26,p));
      shead.style.transform='translateY('+(-sstep(0.16,0.26,p)*36)+'px)';

      // phase B: inside fall
      var vis=sstep(0.39,DIVE_FULL,p);
      inside.style.opacity=vis;
      inside.style.pointerEvents='none';
      var fall=sstep(DIVE_FULL,FALL_END,p);
      cur.fall+=(fall-cur.fall)*(REDUCED?1:0.10);
      var ty=-cur.fall*(FH-vh);
      fallworld.style.transform='translateY('+ty+'px)';
      speckl.style.transform='translateY('+(ty*0.55)+'px)';   // parallax: crumbs fall slower
      insidehead.classList.toggle('show', p>DIVE_FULL-0.01 && p<0.56);

      requestAnimationFrame(render);
    }

    function update(p){
      stations.forEach(function(s,i){ s.classList.toggle('on', p>=STA_P[i]); });
      var land=p>=LAND_P-0.015;
      landing.classList.toggle('show',land);
      stamp.classList.toggle('show',land);
    }
    function onScroll(){ targetP=progress(); update(targetP); }
    function onResize(){ fit(); onScroll(); }
    function init(){ fit(); onScroll(); requestAnimationFrame(render);
      window.addEventListener('scroll',onScroll,{passive:true});
      window.addEventListener('resize',onResize);
      window.addEventListener('orientationchange',onResize);
    }
    if(pimg.complete) init(); else { pimg.addEventListener('load',init); pimg.addEventListener('error',init); }
  })();
})();

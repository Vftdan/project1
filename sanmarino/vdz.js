var VDZ=(function(){
function last(a){
return a[a.length-1];
}
function remfirst(s){
var a=s.split("");
a.shift();
return a.join("");
}
function remlast(s){
var a=s.split("");
a.pop();
return a.join("");
}
var crElem=function(t){
var el=document.createElement(t);
return el;
};
var vdzSet=function(el){
  var load=function(){
var a=el.getAttribute("vdz");
var VDZtype="",VDZprops=[],VDZsubtype="";
if(a){a=a.split(" ");
if(a.length==1){a=a[0].split("/");VDZtype=a[0];VDZsubtype=a[1]}else{
if(last(a[0].split(""))=="/"){VDZtype=remlast(a[0])};
if(last(a).split("")[0]=="/"){VDZsubtype=remfirst(last(a))};};
a.pop();
a.shift();
VDZprops=a;
};
el.VDZtype=VDZtype;
el.VDZprops=VDZprops;
el.VDZsubtype=VDZsubtype;
};
load();
var VDZcontains=function(p){
  return el.VDZprops.indexOf(p)!=-1;

}
var VDZadd=function(p){
  if(!VDZcontains(p)){el.VDZprops.push(p)};

}
var VDZrem=function(p){
  var j,i=el.VDZprops.indexOf(p);
  if(i!=-1){
   for(j=i;j<el.VDZprops.length-1;j++){
     el.VDZprops[j]=el.VDZprops[j+1];
  }
  el.VDZprops.pop();
  }
}
var hide=function(){
  VDZadd("hidden")
  
}
var show=function(){
  VDZrem("hidden")
  
}
var choose=function(){
  VDZadd(":chosen")
  
}
var unchoose=function(){
  VDZrem(":chosen")
  
}


el.VDZcontains=VDZcontains;
el.VDZadd=VDZadd;
el.VDZrem=VDZrem;
el.show=show;
el.hide=hide;
el.choose=choose;
el.unchoose=unchoose;
el.save=function(){
try{
el.setAttribute("vdz",el.VDZtype+"/ "+el.VDZprops.join(" ")+" /"+el.VDZsubtype)
}catch(e){throw e+" "+[el,el.VDZtype,el.VDZprops,el.VDZsubtype,typeof el.VDZprops]}
};
return el;
};
var createElem=function(t,o,de,ihtml){
var e=crElem(t);
vdzSet(e);
if(o){e.VDZtype=o[0]||"";e.VDZprops=(o[1]||[]);e.VDZsubtype=o[2]||""};
e.deploy=function(el){
if(!el)throw [e,el];
el.appendChild(e);
};
if(de)e.deploy(de);
if(ihtml)e.innerHTML=ihtml;
e.save();
return e;
}
var psImg=function(src){
var I=createElem("div",[0,["psimg"],0]);
I.style.backgroundImage="url("+src+")";
return I;
}
var Gal={
create:function(srcs){
var i,n=srcs.length;
var root=createElem("div",["gal",0,"cont"]);
var frames=[];
root.open=function(ei){
this.close()
frames[ei].show();
frames[ei].save();
};
root.close=function(){
var i;
for(i=0;i<n;i++){
frames[i].hide();
frames[i].save();
}
}
var curout,curwin,temp;
for(i=0;i<n;i++){
curout=createElem("div",["gal",["hidden"],"frame"],root);
frames.push(curout);
curout.i=i;
curwin=createElem("div",["gal",0,"win"],curout);
createElem("div",["gal",0,"over"],curout).onclick=function(){root.close()};
temp=psImg(srcs[i]);
temp.VDZtype="gal";
temp.VDZsubtype="img";
temp.save();
temp.deploy(curwin);
createElem("div",["gal",["hover"],"prev"],curwin,"‹").onclick=function(){root.open((this.parentNode.parentNode.i+n-1)%n)};
createElem("div",["gal",["hover"],"next"],curwin,"›").onclick=function(){root.open((this.parentNode.parentNode.i+1)%n)};
}
return root;
}
}
var setScale=function(s){document.lastChild.style.fontSize=s+'rem'};
return {vdzSet:vdzSet,setScale:setScale,create:createElem,Gal:Gal};
})();


var $3={
pi:Math.asin(1)*2,
normalize:function(a,l){var i;for(i=0;i<l;i++){if(!a[i]){a[i]=0}};return a},
Point:function(x,y){
var p={};
p.x=x;
p.y=y;
p.toString=function(){return this.x+' '+this.y};
return p;
},
Point3:function(x,y,z){
var p={};
p.x=x;
p.y=y;p.z=z;
p.toString=function(){return this.x+' '+this.y+' '+this.z};
return p;
},
sin:function(a){return Math.sin(a/180*this.pi)},
asin:function(a){return (Math.asin(a)/this.pi*180)},
nrot2d:function(r,p,a){with(this){var zx=p[0];var zy=p[1];while(a<0){a+=360};a=a%360;var q=0;while(!(a<90)){a-=90;q++};var x=0;var y=0; if(a!=0){y=sin(a)*r;x=r-Math.sqrt((r*r)-(y*y))};
var X,Y;
if(q==0){X=x;Y=y};
if(q==1){X=r+y;Y=r-x};
if(q==2){X=2*r-x;Y=-y};
if(q==3){X=r-y;Y=x-r};
return [zx+X,zy+Y];
}},
grot2d:function(p,s){with(this){var X=p[0]; var Y=p[1];var sx=s[0];var sy=s[1];var dx=X-sx;var dy=Y-sy;
var r=Math.sqrt((dy*dy)+(dx*dx));var q;

var x=0;var y=0;
if(dx<0){
if(dy<0){q=3;y=-dx}else{q=0;y=dy}
}else{
if(dy<0){q=2;y=-dy}else{q=1;y=dx}
};
var a=asin(y/r);
while(q!=0){a+=90;q--};
return [a,r]
}},
rot2d:function(d,s,a){with(this){var st=grot2d(d,s);a+=st[0];var r=st[1];return nrot2d(r,[s[0]-r,s[1]],a)}},
rot3d:function(d,s,a){with(this){

d=normalize(d,3);
s=normalize(s,3);
a=normalize(a,3);
var
 dx=d[0]
,dy=d[1]
,dz=d[2]
,sx=s[0]
,sy=s[1]
,sz=s[2]
,a0=a[0]
,a1=a[1]
,a2=a[2];
var dxz=rot2d([dx,dz],[sx,sz],a0);
dx=dxz[0];
dz=dxz[1];

var dzy=rot2d([dz,dy],[sz,sy],a1);
dz=dzy[0];
dy=dzy[1];

var dxy=rot2d([dx,dy],[sx,sy],a2);
dx=dxy[0];
dy=dxy[1];

return [dx,dy,dz];
}},
}
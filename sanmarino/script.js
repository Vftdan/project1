 try {
gmid=0;
        function gmapsInit() {
            var latlng = new google.maps.LatLng(43.935482, 12.451685);
            var settings = {
                zoom: 17,
                center: latlng,
                mapTypeControl: true,
                mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
                navigationControl: true,
                navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("mapwrap"), settings);
		var markers=[];
		window.crmarker=function(N,E,info){var m=new google.maps.Marker({
    position: new google.maps.LatLng(N,E),
    map: map
  });
				var w=new google.maps.InfoWindow({
    content: '<p>' + info + '</p>'
  });	
						   var mopen= function() {
    w.open(map, m);
  };
						   markers.push([m,N,E,mopen]);
						   m.mopen=mopen;
						   google.maps.event.addListener(m, 'click', mopen);
						   
						   return markers.length-1;}
		window.openmarker=function(i){
			var mp=markers[i];
			openmap(mp[1],mp[2]);
			mp[3]();
		}
            window.chcenter = function (N, E) { map.setCenter(new google.maps.LatLng(N, E));};
		
		
		crmarker(43.9317434,12.4515016,"<img src='img3.jpg'></img>Монте-Титано");
		crmarker(43.9352605,12.449917,"<img src='img4.jpg'></img>Гуаита");
		crmarker(43.9326271,12.4517282,"<img src='img5.jpg'></img>Честа");
		crmarker(43.9299942,12.4528373,"<img src='img6.jpg'></img>Монтале");
        }
      //  window.addEventListener("load",gmapsinit,false);
    } catch (e) { prompt("Error", e) };
    /*function noXML(s) {
    var s = s.split(""), i, o = "";
    for (i = 0; i < s.length; i++) {
    if (s[i] == "<") { o += "&lt;" } else
    if (s[i] == ">") { o += "&gt;" } else
    if (s[i] == "&") { o += "&amp;" } else o += s[i];
    }; return o
    }*/




window.onlyshow=function(h,s){
console.log(h,s);
var i,e;
for(i=0;i<h.length;i++){
    e = document.getElementById(h[i]);

if(!e.load)VDZ.vdzSet(e);
e.hide();
e.save();
};
if(!s){return};
e=document.getElementById(s);
if(!e.load)VDZ.vdzSet(e);
e.show();
e.save();
}
window.onlychoose=function(h,s){
console.log(h,s);
var i,e;
for(i=0;i<h.length;i++){
    e = document.getElementById(h[i]);

if(!e.load)VDZ.vdzSet(e);
e.unchoose();
e.save();
};
if(!s){return};
e=document.getElementById(s);
if(!e.load)VDZ.vdzSet(e);
e.choose();
e.save();
}
window.addEventListener("load",function(){onlyshow(["loading"],"")},false);
/////////////////////////////////////////////////////

 var checkanswers = (function () {
        var to;
        var correct = { q1: "a2", q2: [60,1], q3: ["a2","a4","a5"]/*, q4: [4,1]*/ };
        var qnames = { q1: 1, q2: 2, q3: 3 };
        return function (e) {
  try{          e.preventDefault();
            var i, j, b = 0, r, f, a, scur, scor, txt=[];
            var addInfo=function(){
            var i1;
            for(i1 in scur){
            scur[i1]=scur[i1].replace(/&/img,"&amp;").replace(/</img,"&lt;").replace(/>/img,"&gt;");
            }
            for(i1 in scor){
            scor[i1]=scor[i1].toString().replace(/&/img,"&amp;").replace(/</img,"&lt;").replace(/>/img,"&gt;");
            }
            if(!scur.length||scur[0]==""){scur=["<i>&lt;Нет ответа&gt;</i>"]};
            txt.push("Вопрос "+qnames[i]+": "+scur.join(", ")+(f?(" — верно."):(" — неверно. Верно: "+scor.join(", ")+".")));
            }
            for (i in correct) {
                r = document.getElementsByName(i);
              scur=[]; 
              scor=[];     if(r[0].type=="radio"){
                    f=0;
                for (j = 0; j < r.length; j++) {
                    f += (r[j].value == correct[i]) && (r[j].checked);
                    if(r[j].checked){scur.push(r[j].parentNode.textContent.trim())};
if(r[j].value == correct[i]){scor.push(r[j].parentNode.textContent.trim())};
                    
                };
                b+=f;
                if(!f) {VDZ.vdzSet(r[0].parentNode.parentNode).VDZadd("wrong")} else {VDZ.vdzSet(r[0].parentNode.parentNode).VDZrem("wrong")}; 
                r[0].parentNode.parentNode.save();
                
 addInfo();             
                    }else if(r[0].type=="checkbox"){
                            f=true;
                for (j = 0; j < r.length; j++) {
                    f = f&&((correct[i].indexOf(r[j].value) == -1 ) ^ (r[j].checked));
                    
                    if(r[j].checked){scur.push(r[j].parentNode.textContent.trim())};
if(correct[i].indexOf(r[j].value)!=-1){scor.push(r[j].parentNode.textContent.trim())};
                }
                            b+=f;
                            if(!f) {VDZ.vdzSet(r[0].parentNode.parentNode).VDZadd("wrong")} else {VDZ.vdzSet(r[0].parentNode.parentNode).VDZrem("wrong")};  
                            r[0].parentNode.parentNode.save();
                            addInfo();
                    }else if(r[0].type=="text"){
                            a=r[0].value;
                            if(correct[i][1]&1) a*=1;
                            b+=(correct[i][0]==a);
                            scor=[correct[i][0]];
                            scur=[r[0].value];
                          if(correct[i][0]!=a) {f=0;VDZ.vdzSet(r[0].parentNode.parentNode).VDZadd("wrong")} else {f=1;VDZ.vdzSet(r[0].parentNode.parentNode).VDZrem("wrong")};  
                          r[0].parentNode.parentNode.save();
                          addInfo();
                            continue;
                    }
            }
            if(to){clearTimeout(to)};
            onlyshow([], "message");
            document.getElementById("message").lastChild.innerHTML = "Правильных ответов: " + b + "<br />" + txt.join("<br />");
            to=setTimeout(onlyshow.bind(window,["message"],""),10000)
       
       } catch(e){alert(e)};
        }
    })();
	var openmap=function(N,E){document.getElementById("menutab3").onclick();chcenter(N,E)};
  ////////////////////////////////////////////////////
  
  
var gal;
window.addEventListener("load",function(){
gal=VDZ.Gal.create(["img1.svg","img2.svg","img3.jpg","img4.jpg","img5.jpg","img6.jpg"]);
gal.deploy(document.getElementById("gal_cont"));
},false);
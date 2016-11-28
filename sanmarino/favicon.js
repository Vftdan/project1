(function(id){var ic=document.getElementById(id);alert(ic);var i=false;ic.setAttribute("type","image/png");setInterval(function(){i=!i;ic.setAttribute("href","favicon_"+i+".png");},3000);})("icon")

(function(id){var ic=document.getElementById(id);var i=false;ic.setAttribute("type","image/png");setInterval(function(){i=!i;ic.setAttribute("href","favicon_"+i+".png");/*alert(i);*/},3000);})("icon")
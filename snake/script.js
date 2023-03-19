var canvContext;
var myInterval;
var score=0;
var showText = function (target, message, index, interval) {   
    if (index < message.length) {
        $(target).append(message[index++]);
        setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
    }
window.onload=function() {
    $(function () {
      showText(".welcome", "'Start' butonuna bastığında oyun hazır hale gelir açık turuncu renkteki kare elma, beyaz renkteki kare şans kutusudur. Şans kutusunu yediğinde 4 ihtimal vardır. Yılanın boyu uzar yada kısalır veya oyun hızlanır yada yavaşlar", 0, 50);   
    });
};

    
    var canv;
    function start(){
        canv = document.getElementById("gc");
        canvContext = canv.getContext("2d");
        document.addEventListener("keydown",keyPush);
        myInterval = setInterval(game,1000/15);
        $("#start").hide();
    }
    var xv=yv=0;
    var px=py=10;
    var gs=tc=20;
    var ax=ay=15;
    var zx=zy=-1;
    var randx=randy=randomNumber=0;
    var trail=[];
    var tail = 5;
    var movingLeft =movingRight=movingUp =movingDown=false;
    var eatchancebox=isAppleonSnake=isChanceonSnake=false;
    function game(){
        isAppleonSnake = false;
        isChanceonSnake = false;
        $("#score").text(score);
        console.log(randomNumber);
        if (movingLeft) {
            xv = -1;
            yv = 0;
        }
        if (movingRight) {
            xv = 1;
            yv = 0;
        }
        if (movingUp) {
            xv = 0;
            yv = -1;
        }
        if (movingDown) {
            xv = 0;
            yv = 1;
        }
        px+=xv;
        py+=yv;
        
        if(px<0){ // yılan sol kenara gelirse
           px=tc-1;
        }
        if(px>tc-1){ // yılan sağ kenara gelirse
            px=0;
        }
        if(py<0){ // yılan üst kenara gelirse
           py=tc-1;
        }
        if(py>tc-1){ // yılan alt kenara gelirse
            py=0;
        }
        var gradient = canvContext.createLinearGradient(0, 0, canv.width, canv.height);
        gradient.addColorStop(0, "#8EC5FC");
        gradient.addColorStop(1, "#E0C3FC");
        canvContext.fillStyle=gradient;
       
        canvContext.fillRect(0,0,canv.width,canv.height);
        var gradient2 = canvContext.createLinearGradient(0, 0, canv.width, canv.height);
        gradient2.addColorStop(0, "#FF3CAC");
        gradient2.addColorStop(0.5, "#784BA0");
        gradient2.addColorStop(1, "#2B86C5");
        canvContext.fillStyle=gradient2;
       
        
        for(var i=0;i<trail.length;i++){
            canvContext.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
            
            if((trail[i].x==px && trail[i].y==py) && tail!=5){//kendini yeme
              tail=5;
              score=0;
              clearInterval(myInterval);
              $("#start").show("slow");
            }
            
        }
        trail.push({x:px,y:py});
        
        while(trail.length>tail){
            trail.shift();
        }
        
        //elma
        
        var gradient3 = canvContext.createLinearGradient(ax*gs, ay*gs, gs-2, gs-2);
        gradient3.addColorStop(0, "#FF9A8B");
        gradient3.addColorStop(0.5, "#FF6A88");
        gradient3.addColorStop(1, "#FF99AC");

        canvContext.fillStyle=gradient3;
        canvContext.fillRect((ax*gs)+1,(ay*gs)+1,gs-2,gs-2);

        if(ax==px && ay == py){//elmayı yeme
            tail++;
            score++;
            ax=Math.floor(Math.random()*tc);
            ay=Math.floor(Math.random()*tc);
            
            for(var i=1;i<trail.length;i++){//elmanın yılanın üstünde olma durumu
                if((trail[i].x==ax && trail[i].y==ay)){   
                    isAppleonSnake = true;
                    break;
                    }
            }
    
            while(isAppleonSnake){//elma yılanın üstünde olduğu sürece yeni elma koordinatı üretir
                var check =false;
                ax=Math.floor(Math.random()*tc);
                ay=Math.floor(Math.random()*tc);
                for(var i=1;i<trail.length;i++){
                    if((trail[i].x==ax && trail[i].y==ay)){
                        check = true;
                        break;
                    }
                    else{
                        check =false;
                    }
                }
                if(check==false){
                    isAppleonSnake=false;
                }    
            }

            randomNumber = Math.floor(Math.random()*100);

            randx=Math.floor(Math.random()*tc);
            randy=Math.floor(Math.random()*tc);
            if(randomNumber>70){
                for(var i=1;i<trail.length;i++){//şansın yılanın üstünde olma durumu
                    if((trail[i].x==randx && trail[i].y==randy)){   
                        isChanceonSnake = true;
                        break;
                        }
                }
                while(isChanceonSnake){//şans yılanın üstünde olduğu sürece yeni şans koordinatı üretir
                    var checkchence =false;
                    randx=Math.floor(Math.random()*tc);
                    randy=Math.floor(Math.random()*tc);
                    for(var i=1;i<trail.length;i++){
                        if((trail[i].x==randx && trail[i].y==randy)){
                            checkchence = true;
                            break;
                        }
                        else{
                            checkchence =false;
                        }
                    }
                    if(checkchence==false){
                        isChanceonSnake=false;
                    }    
                }
            }
        }
        if(randomNumber>70){
            zx=randx;
            zy=randy;
            canvContext.fillStyle="#FFDEE9";
            canvContext.fillRect(zx*gs,zy*gs,gs-2,gs-2);
        }
        if(px==zx && py==zy){//chancei yeme durumu
            randomNumber = Math.floor(Math.random()*100);
            randx=Math.floor(Math.random()*tc);
            randy=Math.floor(Math.random()*tc);
            chance();
        }
    }


    function keyPush(e){
        
        if(e.keyCode==37 && xv!=1 ){
            movingLeft = true;
            movingRight = false;
            movingUp = false;
            movingDown = false;
         }
         else if(e.keyCode==39 && xv!=-1 ){
             movingLeft = false;
             movingRight = true;
             movingUp = false;
             movingDown = false;
         }
         else if(e.keyCode==38 && yv!=1){
             movingLeft = false;
             movingRight = false;
             movingUp = true;
             movingDown = false;
         }
         else if(e.keyCode==40 && yv!=-1){
            movingLeft = false;
            movingRight = false;
            movingUp = false;
            movingDown = true;
         }   
    }


    var rndchancenumbertemp=0;
    function chance(){
        do{
            var rndchancenumber = 1 + Math.floor(Math.random()*5);
            console.log(rndchancenumbertemp,rndchancenumber);
        }while(rndchancenumber==rndchancenumbertemp);//ardarda aynı şans olayının gelmesini engeller
        if(rndchancenumber==1){//tail uzaması
            rndchancenumbertemp=rndchancenumber;
            var rndextratail=Math.floor(Math.random()*8);
            tail +=rndextratail;
            score+=rndextratail;
        }
        if(rndchancenumber==2){//tail kısalması
            if(tail>5){
            rndchancenumbertemp=rndchancenumber;
            var rndlesstail=Math.floor(Math.random()*6);
            tail -=rndlesstail;
            score -=rndlesstail;
        }
        }
        if(rndchancenumber==3){//oyun yavaşlar
            rndchancenumbertemp=rndchancenumber;
            clearInterval(myInterval);
            myInterval = setInterval(game,45);
        }
        if(rndchancenumber==4){//oyun normal hızına döner
            rndchancenumbertemp=rndchancenumber;
            clearInterval(myInterval);
            myInterval = setInterval(game,1000/15);
        }
        if(rndchancenumber==5){//oyun yavaşlar
            rndchancenumbertemp=rndchancenumber;
            clearInterval(myInterval);
            myInterval = setInterval(game,120);
        }
    }
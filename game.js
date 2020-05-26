function load_images()
{
    //creating gem object
    gem_img=new Image();
    gem_img.src="Assets/gem.png"
    
    //creating player object
    player_img=new Image();
    player_img.src="Assets/player.png";
    
    //creating corona object
    corona_img=new Image();
    corona_img.src="Assets/coronavirus.png";
    
    //create trophy object
    trophy_img=new Image();
    trophy_img.src="Assets/trophy.png";
    
    winner_img=new Image();
    winner_img.src="Assets/better.jpeg";
}



function init()
{
    canvas=document.getElementById('mycanvas');
    W=canvas.width=700;
    H=canvas.height=450;
    
    //create context object
    pen=canvas.getContext('2d');
    score=0;
    game_over=false;
    e1={
        x:W*3/6,
        y:H*3/6,
        w:60,
        h:60,
        speed:10,
    }
    e2={
        x:W*4/6,
        y:H*4/6,
        w:60,
        h:60,
        speed:-10,
    }
    e3={
        x:W*2/6,
        y:H*2/6 ,
        w:60,
        h:60,
        speed:10,
    }
    enemy=[e1,e2,e3];
    
    //player object and movement
    
    player={
        x:0,//W/6,
        y:H/2,//H/6,
        w:60,
        h:60,
        speed:20,
        moving:"false",
        health:100
    };
    function mousePressed(e)
	{
		player.moving=true;
	}

	canvas.addEventListener('mousedown',mousePressed );
    
    function mouseReleased(e)
	{
		player.moving=false;
	}

	canvas.addEventListener('mouseup',mouseReleased );
    
    
    
    gem={
        x:W-80,
        y:H/2,
        w:60,
        h:60
    }
}


function checkColision(rec1,rec2)
{
    
        if(rec1.x<rec2.x+rec2.w&&
          rec1.x+rec1.w>rec2.x &&
          rec1.y<rec2.y+rec2.h&&
          rec1.y+rec1.h>rec2.y)
        {
            return true;
        }
    return false;
}




function draw()
{
    pen.clearRect(0,0,W,H);
    console.log("In draw");
    pen.fillStyle="red";
    //pen.drawImage(corona_img,box.x,box.y,box.w,box.h);
    //pen.fillRect(box.x,box.y,box.w,box.h);
    for(var i=0;i<3;i++)
    {
        pen.drawImage(corona_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    
    if(player.health<50)
    {
        pen.fillStyle="red";
        pen.drawImage(trophy_img,18,20,60,60);
    }
    else
    {
        pen.fillStyle="blue";
        pen.drawImage(winner_img,18,20,60,60);
    }
	//score printing
	
	pen.font=="40x Roboto";
	pen.fillText(player.health ,40,40);
}



function update()
{
    if(player.moving==true)
        player.x+=player.speed;
    
    for(var i=0;i<3;i++)
    {
        enemy[i].y+=enemy[i].speed;
        if(enemy[i].y+60>H || enemy[i].y<0)
            enemy[i].speed*=-1;
        
        if(checkColision(player,enemy[i]))
        {
            player.health-=10;
        }
    }
    if(player.health<=-20)
        {
            draw();
            
            game_over=true;
            alert("You Lost!");
            return;
        }
    if(checkColision(player,gem))
        {
            game_over=true;
            alert("You Won!");
            return;
        }
    
    
}



function gameloop()
{
    if(game_over==true)
	{
		clearInterval(f);
		alert("Game over"); 
		//if(alert('Alert For your User!')){}
		//else   
		 window.location.reload();
		return;
	}
    draw();
    update();
}



load_images();
init();
var f=setInterval(gameloop,100);
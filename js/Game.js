class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
            gameState = data.val();
        });
    }

    update(state){
        database.ref('/').update({
            gameState: state
        });  
    }

    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }

        car1 = createSprite(100,200,10,10);
        car1.addImage("car1", car1_img);
        car2 = createSprite(300,200,10,10);
        car2.addImage("car2", car2_img);
        car3 = createSprite(500,200,10,10);
        car3.addImage("car3", car3_img);
        car4 = createSprite(700,200,10,10);
        car4.addImage("car4", car4_img);
        cars = [car1, car2, car3, car4];
    }

    play(){
        form.hide();
        textSize();
        text("GAME START", 120, 100);
        Player.getPlayerInfo();
        player.getCarsAtEnd();
        if(allPlayers !== undefined){
            background("#c68767");
            image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
            var index = 0;
            var x = 175;
            var y;
            var displayPosition = 130;
            for(var plr in allPlayers){
                index++;
                x += 200;
                y = displayHeight - allPlayers[plr].distance;
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                if(index === player.index){
                    stroke(10);
                    fill("red");
                    ellipse(x,y,80,80);
                    cars[index - 1].shapeColour = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
                // if(plr === "player" + player.index){
                //     fill("red");
                // }else{
                //     fill("black");
                // }

                // displayPosition += 20;
                // textSize(15);
                // text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 120, displayPosition);
            }
        }

        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance += 10;
            player.update();
        }

        if(player.distance > 3800)
        {
            gameState = 2;
            player.rank++;
            Player.updateCarsAtEnd();
        }

        drawSprites();

    }

    end()
    {
        console.log("END");
        console.log(player.rank);
    }

}
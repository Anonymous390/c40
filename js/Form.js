class Form{
    constructor(){
        this.input = createInput("Name");
        this.button = createButton("Play");
        this.greeting = createElement('h3');
        this.reset = createButton("Reset") 
    }

    hide(){
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
    }

    display(){
        var title = createElement('h2');    
        title.html("Car Racing Game");
        title.position(130, 10);
        //var input  = createInput("Name");
        //var button  = createButton('Play');
        this.input.position(displayWidth/2 - 40,displayHeight/2 - 80);
        this.button.position(displayWidth/2 + 30,displayHeight/2);
        this.reset.position(displayWidth-100, 20);
        this.button.mousePressed(() => {

            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount++;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            //var greeting  = createElement('h3');
            this.greeting.html("Hello " + player.name);
            this.greeting.position(displayWidth/2 - 70,displayHeight/4);

        });
        this.reset.mousePressed(() => {
            player.updateCount(0);
            game.update(0);
        });
    }
}
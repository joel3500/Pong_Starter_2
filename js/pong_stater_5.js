var pipe;
var mur;
var ball;
var bg_image;
var tap;
var perd;

  //https://p5js.org/examples/sound-load-and-play-sound.html
  //https://p5js.org/examples/image-background-image.html
function setup()
{
    bg_image = loadImage('../img/terrain1.jfif');
    tap = loadSound('../sound/tap3.wav');
    perd = loadSound('../sound/perd.wav');

    canvas = createCanvas(600, 400);
    canvas.position(windowWidth/3, windowHeight/4);
    background(12,12,45);
    pipe = new Pipe();
    mur = new Mur();
    ball = new Ball();
}
//
function draw()
{
    background(bg_image);     // background(140)
    pipe.show();
    mur.show();
    ball.show();
	
    // ===================  Deplacement automatique des pipes  =================== //
	if(pipe.move === 1)
	{
		pipe.move_up();
	}
    else if(pipe.move === -1)
    {
		pipe.move_down();
	}
    else {
        pipe.stop();
    }

    // Deplacement vertical par defaut des pipes
    if(pipe.y1 <= (mur.y1 + mur.height))
    {
        pipe.move_down();
        pipe.move = -1;           // Si on veut faire coulisser up-and-down à l'infini 
    }
    if((pipe.y1 + pipe.height) >= mur.y2)
    {
        pipe.move_up();
        pipe.move = 1;            // Si on veut faire coulisser up-and-down à l'infini
    }

    // ====================  Deplacement automatique de la balle  ================== //
    // mouvement vertical
    if(ball.move_vert === 1)
	{
		ball.move_up();
	}
    else if(ball.move_vert === -1)
    {
		ball.move_down();
	}
    // mouvement horizontal
    if(ball.move_horiz === 1)
	{
		ball.move_right();
	}
    else if(ball.move_horiz === -1){
		ball.move_left();
	}
    else{
        ball.stop();
    }
    
    // Deplacement sur Y avec Condition de retour en sens UP-AND-DOWN
    if(ball.y-0.5*ball.height <= (mur.y1 + mur.height))
    {
        tap.play();
        ball.move_down();
        ball.move_vert = -1;           // Si on veut faire coulisser up-and-down à l'infini 
    }
    if((ball.y+0.5*ball.height) >= mur.y2)
    {
        tap.play();
        ball.move_up();
        ball.move_vert = 1;            // Si on veut faire coulisser up-and-down à l'infini
    }

    // Deplacement de la balle sur X, avec la balle sur le meme axe vertical que les PIPES
    if (ball.y >= pipe.y1 && ball.y <= (pipe.y1 + pipe.height))
    {
        if(ball.x-0.5*ball.width <= pipe.x1+pipe.width)
        {
            tap.play();
            ball.move_right();
            ball.move_horiz = 1;
        }
        if(ball.x+0.5*ball.width >= pipe.x2)
        {
            tap.play();
            ball.move_left();
            ball.move_horiz = -1;
        }
    } 
    // Si la balle touche les EXTREMITES GAUCHES ou DROITE du CANVAS
    if(ball.x - 0.5*ball.width <= 0 || ball.x + 0.5*ball.width >= width)
    {
        ball.stop();
        pipe.stop();
        //perd.play();
    }
}

function Pipe()
{
    this.width = 20;
    this.height = 150;
    this.x1 = 20;                                          // this.x = width - this.width;
    this.y1 = 1/3 * height;
                   
    this.x2 = width-40;                                    // je vais les mettre au même niveau pour faire plus simple.
    this.y2 = 1/3 * height; 
    this.speed = 2;                                       // le deplacement de nos 2 murs mobiles
	this.move = 1;                                         //  1 direction vers la haut   -1 direction vers le bas.
	
    this.show = function()
    {
        fill("Yellow");
        rect(this.x1, this.y1, this.width, this.height);   // Je dessine mes 2 murs mobiles (verticals).
        rect(this.x2, this.y2, this.width, this.height);
    }
    this.move_up = function()
    {
		this.y1 -= this.speed;
		this.y2 -= this.speed;
    }
    this.move_down = function()
    {
        this.y1 += this.speed;
        this.y2 += this.speed;
    }
    this.stop = function()
    {
        this.y1 = this.y1;        // les coordonnees restent inchangees
        this.y2 = this.y2;
        this.move = 0;
    }
}

function keyPressed()
{
    if(keyCode === UP_ARROW)
    {
        pipe.move_up();
		pipe.move = 1;
    }
    if(keyCode === DOWN_ARROW)
    {
        pipe.move_down();
		pipe.move = -1;
    }
}

function Mur(){
    this.width = width;
    this.height = 20;
    this.x1 = 0;                                          // this.x = width - this.width;
    this.y1 = 0;

    this.x2 = 0;                                          // je vais les mettre au même niveau pour faire plus simple.
    this.y2 = height-20;
    this.speed = 10;                                      // le deplacement de nos 2 murs mobiles

    this.show = function()
    {
        fill("Yellow");
        rect(this.x1, this.y1, this.width, this.height);  // Je dessine mes 2 murs mobiles (verticals).
        rect(this.x2, this.y2, this.width, this.height);
    }
}

function Ball()
{
    this.y = width / 3;                                  // position initiale.
    this.x = 200;
    this.width = 30;
    this.height = 30;
    this.speed = 2;
    this.move_vert = 1;
    this.move_horiz = 1;

    this.show = function ()
    {
        fill("Green");
        ellipse(this.x, this.y, this.width, this.height);
    }
    
    this.move_down = function()
    {
        this.y += this.speed; 
    }
    this.move_up = function()
    {
        this.y -= this.speed; 
    }
    this.move_right = function()
    {
        this.x += this.speed; 
    }
    this.move_left = function()
    {
        this.x -= this.speed; 
    }
    this.stop = function()
    {
        this.x = this.x;  // les coordonnees restent inchangees
        this.y = this.y;
        this.move_vert = 0;
        this.move_horiz = 0;
    }
}
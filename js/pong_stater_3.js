var pipe;
var mur;

function setup()
{
    createCanvas(600, 400);
    pipe = new Pipe();
    mur = new Mur();

}

function draw()
{
    background(140);
    pipe.show();
    mur.show();

}

function Pipe()
{
    this.width = 20;
    this.height = 150;
    this.x1 = 20;                                          // this.x = width - this.width;
    this.y1 = 1/3 * height;
                   
    this.x2 = width-40;                                    // je vais les mettre au même niveau pour faire plus simple.
    this.y2 = 1/3 * height; 
    this.speed = 10;                                       // le deplacement de nos 2 murs mobiles

    this.show = function()
    {
        fill(250);
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
}

function keyPressed()
{
    if(keyCode === UP_ARROW)
    {
        pipe.move_up();
    }
    if(keyCode === DOWN_ARROW)
    {
        pipe.move_down();
    }
}

function Mur(){
    this.width = width;
    this.height = 20;
    this.x1 = 0;                                           // this.x = width - this.width;
    this.y1 = 0;

    this.x2 = 0;                                           // je vais les mettre au même niveau pour faire plus simple.
    this.y2 = height-20;
    this.speed = 10;                                       // le deplacement de nos 2 murs mobiles

    this.show = function()
    {
        fill(250);
        rect(this.x1, this.y1, this.width, this.height);   // Je dessine mes 2 murs mobiles (verticals).
        rect(this.x2, this.y2, this.width, this.height);
    }
}

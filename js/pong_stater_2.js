var pipe;

function setup()
{
    createCanvas(600, 400);
    pipe = new Pipe();
}

function draw()
{
    background(140);
    pipe.show();
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
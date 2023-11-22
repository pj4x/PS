class Particle{
    constructor(){
        this.position = p5.Vector.random2D();
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector()
        this.types = [-1,0,1]
        this.type = this.types[Math.floor(Math.random() * 3)]
    }

    update(){
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        if(this.position.x > width)   this.position.x = 0
        if(this.position.x < 0)       this.position.x = width
        if(this.position.y > height)  this.position.y = 0
        if(this.position.y < 0)       this.position.y = height
        if(this.velocity.x > 5)       this.velocity.x = 5
        if(this.velocity.x < -5)      this.velocity.x = -5
        if(this.velocity.y > 5)       this.velocity.y = 5
        if(this.velocity.y < -5)      this.velocity.y = -5
    }

    collision(particles){
        let radius = 50
        let avg = createVector()
        for(let other of particles){
            let d = dist(this.position.x, 
                         this.position.y, 
                         other.position.x, 
                         other.position.y)
            if(d < radius && other != this){
                if(d<8 && this.type != 0 && other.type != 0){
                    this.velocity.mult(-1)
                    other.velocity.mult(-1)
                }
            }
        }
    }

    attraction(particles) {
        let radius = 100;
        let avg = createVector();
        let total = 0;
    
        for (let other of particles) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    
            if (d < radius && other !== this) {
                total++;
                let diff_type = this.type + other.type;
                if(this.type != 0 && other.type != 0){
                    if (diff_type === -2) {
                        let force = createVector(this.position.x - other.position.x, this.position.y - other.position.y);
                        avg.add(force);
                    } else if (diff_type === 0) {
                        if (this.type === -1) {
                            let force = createVector(other.position.x - this.position.x, other.position.y - this.position.y);
                            avg.add(force);
                        }
                    } else if (diff_type === 2) {
                        let force = createVector(this.position.x - other.position.x, this.position.y - other.position.y);
                        avg.add(force);
                    }
                }else{
                    let force = createVector(other.position.x - this.position.x, other.position.y - this.position.y);
                    force.mult(0.5)
                    avg.add(force)
                }
            }
        }
    
        if (total > 0) {
            avg.div(total);
            avg.sub(this.velocity);
            avg.mult(0.001)
            this.acceleration = avg; // Use acceleration to accumulate forces
        }
    }
    

    show(){
        strokeWeight(8)
        if(this.type == 0) stroke(255)
        else if(this.type == 1) stroke(255,0,0)
        else if(this.type == -1) stroke(0,0,255)
        
        point(this.position.x, this.position.y)
    }
}
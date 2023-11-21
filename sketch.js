const particles = []

function setup() {
    createCanvas(2000, 1000)
    for(let i=0; i<100; i++) particles.push(new Particle())
  }

  function draw() {
    background(51)
    for(let particle of particles){
      particle.attraction(particles)
      particle.collision(particles)
      particle.update()
      particle.show()
    }
}
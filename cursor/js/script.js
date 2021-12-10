if (window.matchMedia("(min-width: 1024px)").matches) {
  var scketch = function (p) {
    var particleNum = 0;
    var particle;
    var particles = [];
    var changecolor;

    var Particle = function (pos, v, d) {
      this.p = pos;
      this.v = v;
      this.a = p.createVector(0, 0);
      this.d = d;
      if(changecolor){
        this.r = d / 3;
        this.mass = this.r / 50;
        this.lifespan = 50;
        this.col_r = p.floor(p.random(255));
        this.col_g = p.floor(p.random(0));
        this.col_b = p.floor(p.random(50));
        this.col_a = 0.5;
      }
      else{
        this.r = d / 2;
        this.mass = this.r / 100;
        this.lifespan = 100;
        this.col_r = p.floor(p.random(255));
        this.col_g = p.floor(p.random(0));
        this.col_b = p.floor(p.random(200));
        this.col_a = 0.5;
      }

    };
    Particle.prototype.addForce = function (f) {
      this.a.add(f);
      this.a.div(this.mass);
    };
    Particle.prototype.update = function () {
      this.v.add(this.a);
      this.p.add(this.v);
      this.lifespan -= 2;
      this.col_a -= 0.044;
      this.a.mult(0);
    };
    Particle.prototype.draw = function () {
      p.noStroke();
      //gradation
      var grad = p.drawingContext.createRadialGradient(
        this.p.x,
        this.p.y,
        0,
        this.p.x,
        this.p.y,
        this.r
      );
      grad.addColorStop(
        0,
        "rgba(" +
          this.col_r +
          "," +
          this.col_g +
          "," +
          this.col_b +
          "," +
          this.col_a +
          ")"
      );
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      p.drawingContext.fillStyle = grad;
      p.ellipse(this.p.x, this.p.y, this.d, this.d);
    };
    Particle.prototype.isLive = function () {
      if (this.lifespan <= 0) {
        return false;
      } else {
        return true;
      }
    };

    /*--
    p5 framwork
  ------------------------------------*/
    p.setup = function () {
      var _wrapper = document.getElementById("wrapper");
      var height = _wrapper.offsetHeight;
      s = p.createCanvas(p.windowWidth, p.windowHeight);
      s.parent("wrapper");

        p.blendMode(p.ADD);

      p.background(0);
      controlZone = document.getElementById("defaultCanvas0")
    controlZone.addEventListener("mouseenter", function( event ) {   
      console.log("Enter the zone!", event);      
      console.log(Particle)
    }, false);
    controlZone.addEventListener("mouseleave", function( event ) {   
      console.log("Leave the zone!", event);
      
    }, false);
      
    };

    p.draw = function () {
      p.clear();
      //p.background(0);

      //add particle
      for (var i = 0; i < 3; i++) {
        var mpos = p.createVector(
          p.mouseX || p.touchX || p.windowWidth / 2,
          p.mouseY || p.touchY || p.windowHeight / 2
        );
        var vec = p.createVector(
          p.randomGaussian() * 3,
          p.randomGaussian(1, 3)
        );
        particle = new Particle(mpos, vec, 100);
        particles.push(particle);
      }

      //move upward as smoke
      for (var i = particles.length - 1; i >= 0; i--) {
        var mpos = p.createVector(
          p.mouseX || p.touchX || p.windowWidth / 2,
          p.mouseY || p.touchY || p.windowHeight / 2
        );
        var toMouse = p5.Vector.sub(mpos, particles[i].p);
        toMouse.normalize();
        toMouse.mult(0.1);
        var force = p.createVector(toMouse.x, -0.1);

        particles[i].addForce(force);
        particles[i].update();
        particles[i].draw();

        if (!particles[i].isLive()) {
          particles.splice(i, 1);
        }
      }
    };
    
    p.windowResized = function () {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    var link = document.querySelectorAll("a");

    link.forEach((b) =>
      b.addEventListener("mousemove", function () {
      changecolor = true;
      console.log(particle)
      console.log('on');
      })
    );
    link.forEach((b) =>
      b.addEventListener("mouseleave", function () {
      changecolor = false;
        console.log("hello");
      })
    );
  };

  fx = new p5(scketch);
}

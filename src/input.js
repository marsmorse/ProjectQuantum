var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class InputHandler {
  /**
   * Initializes the event handeling functions within the program.
   */
  constructor(canvas, scene, camera) {
    this.canvas = canvas;
    this.scene = scene;
    this.camera = camera;

    _inputHandler = this;

    // Mouse Events
    this.canvas.onmousedown = function(ev) {
      _inputHandler.mouseClick(ev);
    };
    this.canvas.onmousemove = function(ev) {
      _inputHandler.mouseMove(ev);
    };

    // Keyboard Events
    document.addEventListener(
      "keydown",
      function(ev) {
        _inputHandler.keyDown(ev);
      },
      false
    );
    document.addEventListener(
      "keyup",
      function(ev) {
        _inputHandler.keyUp(ev);
      },
      false
    );

    // Button Events
    document.getElementById("fileLoad").onclick = function() {
      _inputHandler.readSelectedFile();
    };

    // HTML Slider Events
  }

  /**
   * Function called upon mouse click.
   */
  mouseClick(ev) {
    // Print x,y coordinates.
    this.camera.canRotate *=-1;
  }

  mouseMove(ev) {
    if(this.camera.canRotate==1){
      var movementX = ev.movementX;
      this.camera.pan(movementX);
      var movementY = ev.movementY;
      this.camera.tilt(movementY);
    }/*
      var movementX = ev.movementX;
      this.camera.pan(movementX);
      var movementY = ev.movementY;
      this.camera.tilt(movementY);*/

  }

  keyUp(ev) {
    var keyName = event.key;
    console.log("key up", keyName);
  }

  keyDown(ev) {
    var keyName = event.key;
    console.log("key down", keyName);

    if (keyName == "a") {
      this.camera.truck(-1);
    } else if (keyName == "d") {
      this.camera.truck(1);
    } else if (keyName == "w") {
      this.camera.dolley(-1);
    } else if (keyName == "s") {
      this.camera.dolley(1);
    } else if (keyName == "q") {
      this.camera.zoom(5);
    } else if (keyName == "e") {
      this.camera.zoom(-5);
    }else if (keyName == "z") {
      this.camera.animating = 1;
    }else if (keyName == "x") {
      this.scene.cutGeometry();
    } else if(keyName == "c") {
      var circ = new Sphere(colorShader, 30, 2, 10, -8);
      this.scene.addGeometry(circ);
    }
    
  }

  /**
   * Function called to read a selected file.
   */
  readSelectedFile() {
    var fileReader = new FileReader();
    var objFile = document.getElementById("fileInput").files[0];

    if (!objFile) {
      alert("OBJ file not set!");
      return;
    }

    fileReader.readAsText(objFile);
    fileReader.onloadend = function() {
      alert(fileReader.result);
    };
  }

  readTexture(src, onTexLoad) {
    // Create the image object
    var image = new Image();
    if (!image) {
      console.log("Failed to create the image object");
      return false;
    }

    // Register the event handler to be called on loading an image
    image.onload = function() {
      _inputHandler.image = image;
      onTexLoad(image);
    };

    // Tell the browser to load an image
    image.src = src;
    return true;
  }
}

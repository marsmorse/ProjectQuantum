/**
 * Specifies a Camera that can Dolly/Truck and Tilt/Pan.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Camera {
  /**
   * Constructor for Camera.
   *
   * @constructor
   * @returns {Camera} Camera object created
   */
  constructor(shader) {
    this.speed = 0.4;
    // Camera view attributes
    this.eye = new Vector3([32, 4, -32]);
    this.center = new Vector3([0, 4, 0]);
    this.up = new Vector3([0, 1, 0]);

    this.viewMatrix = new Matrix4();
    this.updateView();

    this.rotationMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.projectionMatrix.setPerspective(45, 1, 0.5, 100);
  }

  truck(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    // Scale the u axis to the desired distance to move
    u = u.mul(dir * this.speed);

    // Add the direction vector to both the eye and center positions
    this.eye = this.eye.add(u);
    this.center = this.center.add(u);

    this.updateView();
  }
  dolley(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    // Scale the u axis to the desired distance to move
    n = n.mul(dir * this.speed);

    // Add the direction vector to both the eye and center positions
    this.eye = this.eye.add(n);
    this.center = this.center.add(n);

    this.updateView();
  }
  pan(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    var v = this.up.normalize();
    var originCenter = this.center.sub(this.eye);

    this.rotationMatrix.setRotate(
      -dir * 0.9,
      v.elements[0],
      v.elements[1],
      v.elements[2]
    );
    var rotatedCenter = this.rotationMatrix.multiplyVector3(originCenter);

    this.center = rotatedCenter.add(this.eye);
    this.updateView();
  }
  tilt(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    var bigVec = new Vector3([0, -0.1 * dir, 0.0]);
    this.center = this.center.add(bigVec);

    this.updateView();
  }
  zoom(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    //var bigVec = new Vector3([0, 0.0, ]);

    this.projectionMatrix.setPerspective(30, 1, 0.5, 100 - dir);
  }
  move() {}
  updateView() {
    this.viewMatrix.setLookAt(
      this.eye.elements[0],
      this.eye.elements[1],
      this.eye.elements[2],
      this.center.elements[0],
      this.center.elements[1],
      this.center.elements[2],
      this.up.elements[0],
      this.up.elements[1],
      this.up.elements[2]
    );
  }
}

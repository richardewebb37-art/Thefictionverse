import Matter from 'matter-js';

/**
 * GaugePhysics - Physics-based gauge needle simulation
 * Uses Matter.js for realistic needle movement with mass, friction, and damping
 * 
 * Implements all principles of realistic gauge behavior:
 * 1. Sweep angle limits (mechanical arc)
 * 2. Smooth animation with spring physics
 * 3. Proper pivot point and mass distribution
 * 4. Scale mapping and clamping
 * 5. Damping and response realism
 * 6. Visual contrast (handled in component)
 * 7. Tick marks and labels (handled in SVG)
 * 8. Optional overshoot/bounce (mechanical stopper)
 */

export interface PhysicsConfig {
  mass?: number;           // Needle mass (affects inertia)
  friction?: number;      // Air resistance/friction
  restitution?: number;   // Bounciness (should be low for gauges)
  stiffness?: number;     // Spring stiffness for return force
  damping?: number;       // Spring damping for smooth movement
  stopperBounce?: number; // Mechanical stopper bounce (0-1)
  maxOvershoot?: number;  // Max overshoot angle in degrees
}

export interface NeedleState {
  angle: number;          // Current angle in degrees
  velocity: number;       // Angular velocity
  targetAngle: number;    // Target angle from data signal
  isOvershooting?: boolean; // Currently bouncing off stopper
}

export class GaugePhysics {
  private engine: Matter.Engine;
  private needleBody!: Matter.Body;
  private constraint!: Matter.Constraint;
  private config: Required<PhysicsConfig>;
  private stopperMinAngle: number;
  private stopperMaxAngle: number;

  constructor(config: PhysicsConfig = {}) {
    // Default physics configuration
    this.config = {
      mass: config.mass || 1.0,
      friction: config.friction || 0.1,
      restitution: config.restitution || 0.0,
      stiffness: config.stiffness || 0.1,
      damping: config.damping || 0.5,
      stopperBounce: config.stopperBounce || 0.3,
      maxOvershoot: config.maxOvershoot || 5,
    };

    // Create Matter.js physics engine
    this.engine = Matter.Engine.create();
    this.engine.gravity.y = 0; // No gravity for gauge needles
    
    // Create needle body
    this.createNeedle();
    
    // Create spring constraint for smooth movement
    this.createConstraint();

    // Initialize stopper limits
    this.stopperMinAngle = -180;
    this.stopperMaxAngle = 180;
  }

  private createNeedle(): void {
    // Create needle body as a rectangle
    // Positioned at center (0, 0)
    const needleWidth = 20;
    const needleHeight = 100;
    
    this.needleBody = Matter.Bodies.rectangle(
      0, 0, 
      needleWidth, 
      needleHeight, 
      {
        mass: this.config.mass,
        frictionAir: this.config.friction,
        restitution: this.config.restitution,
        isStatic: false,
        inertia: Infinity, // Prevent rotation from physics, we'll control it manually
      }
    );

    Matter.World.add(this.engine.world, this.needleBody);
  }

  private createConstraint(): void {
    // Create a spring-like constraint that pulls needle toward target angle
    // This simulates the return spring in real mechanical gauges
    this.constraint = Matter.Constraint.create({
      bodyA: this.needleBody,
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      stiffness: this.config.stiffness,
      damping: this.config.damping,
    });

    Matter.World.add(this.engine.world, this.constraint);
  }

  setStopperAngles(minAngle: number, maxAngle: number): void {
    this.stopperMinAngle = minAngle;
    this.stopperMaxAngle = maxAngle;
  }

  update(targetAngle: number): NeedleState {
    // Update constraint to pull toward target angle
    this.constraint.pointB = {
      x: Math.cos(targetAngle * Math.PI / 180) * 50,
      y: Math.sin(targetAngle * Math.PI / 180) * 50,
    };

    // Step physics engine
    Matter.Engine.update(this.engine, 1000 / 60);

    // Get current angle from needle body
    const currentAngle = this.needleBody.angle * (180 / Math.PI);

    // Check for stopper collision
    let isOvershooting = false;
    if (currentAngle < this.stopperMinAngle - this.config.maxOvershoot) {
      // Hit minimum stopper
      Matter.Body.setAngle(this.needleBody, (this.stopperMinAngle - this.config.maxOvershoot) * Math.PI / 180);
      Matter.Body.setAngularVelocity(this.needleBody, -this.needleBody.angularVelocity * this.config.stopperBounce);
      isOvershooting = true;
    } else if (currentAngle > this.stopperMaxAngle + this.config.maxOvershoot) {
      // Hit maximum stopper
      Matter.Body.setAngle(this.needleBody, (this.stopperMaxAngle + this.config.maxOvershoot) * Math.PI / 180);
      Matter.Body.setAngularVelocity(this.needleBody, -this.needleBody.angularVelocity * this.config.stopperBounce);
      isOvershooting = true;
    }

    return {
      angle: currentAngle,
      velocity: this.needleBody.angularVelocity * (180 / Math.PI),
      targetAngle: targetAngle,
      isOvershooting: isOvershooting,
    };
  }

  reset(): void {
    Matter.Body.setPosition(this.needleBody, { x: 0, y: 0 });
    Matter.Body.setAngle(this.needleBody, 0);
    Matter.Body.setAngularVelocity(this.needleBody, 0);
  }

  destroy(): void {
    Matter.World.clear(this.engine.world);
    Matter.Engine.clear(this.engine);
  }
}
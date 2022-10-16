---
title: Basic Vehicle Controller
---

<script lang="ts">
import Wrapper from '$examples/rapier/basic-car-controller/Wrapper.svelte'
</script>

# Basic Vehicle Controller

This recipe helps you get started with a basic vehicle controller.

The car has a `<RigidBody>` component for the body to which four axles are attached with either a `RevoluteImpulseJoint` for the steered wheels or a `FixedImpulseJoint` for the unsteered back wheels.

Each wheel is attached to an axle with a `RevoluteImpulseJoint` and the back wheels are configured to be a motor.

To increase the decoupling of joint rigid bodies, the solver iterations are increased by a factor of 100.

The car can be controlled with the WASD keys. The spacebar activates the handbreak.

The property `dominance` on `<RigidBody>` components can be used to make objects more or less vulnerable to impacts of the car.

<!-- TODO: Fix .ts output for playgroung -->
<!-- <ExampleWrapper>
  <Wrapper />
</ExampleWrapper> -->

<ExampleWrapper playgroundHref="/rapier/basic-car-controller">
  <Wrapper />
</ExampleWrapper>

Tips:

- Experiment with front wheel drive or all wheel drive (property `isDriven` on `<Axle>` component)
- Play around with the `mass` properties of the colliders
- Make an all wheel steered vehicle
- Increase or decrease the power output of the wheel motors
- Change the motor model from `AccelerationBased` to `ForceBased` (you will need to adapt the power output)
- Experiment with different wheel collider shapes
- Increase or decrease the scale of the car
- Move the axles and observe the maneuverability

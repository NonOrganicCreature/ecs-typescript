import { describe, expect, test, vi } from "vitest";
import { createWorld } from "@/lib";
import { JumpComponent } from "./test-components";
import { TSystemCreationParams } from "@/lib/system";

describe("ECS world created", () => {
  test("Instance created", () => {
    const w = createWorld();
    expect(w).toBeDefined();
  });

  test("Has all public methods", () => {
    const w = createWorld();
    expect(w).toHaveProperty("addEntity");
    expect(w).toHaveProperty("addSystem");
    expect(w).toHaveProperty("addEntityComponent");
    expect(w).toHaveProperty("removeEntityComponent");
    expect(w).toHaveProperty("getEntityComponent");
    expect(w).toHaveProperty("run");
    expect(w).toHaveProperty("removeEntity");
  });

  test("Entity has been added to ECS world", () => {
    const w = createWorld();
    const entityId = w.addEntity([]);
    const removedEntityId = w.removeEntity(entityId);

    expect(entityId).toBe(removedEntityId);
  });

  test("Empty required component system has been added and called atleast once", () => {
    const w = createWorld();
    const emptyRequiredComponentsSystem: TSystemCreationParams = {
      requiredComponents: [],
      run: () => {}
    };

    const emptyRequiredComponentsSystemSpy = vi.spyOn(
      emptyRequiredComponentsSystem,
      "run"
    );

    w.addEntity([]);
    w.addSystem(emptyRequiredComponentsSystem);
    w.run();

    expect(emptyRequiredComponentsSystemSpy).toHaveBeenCalledOnce();
  });

  test("Required component system has been added and has not been called due no components on entity presented", () => {
    const w = createWorld();
    const emptyRequiredComponentsSystem: TSystemCreationParams = {
      requiredComponents: [JumpComponent],
      run: () => {
        
      }
    };

    const emptyRequiredComponentsSystemSpy = vi.spyOn(
      emptyRequiredComponentsSystem,
      "run"
    );

    w.addEntity([]);
    w.addSystem(emptyRequiredComponentsSystem);
    w.run();

    expect(emptyRequiredComponentsSystemSpy).toHaveBeenCalledTimes(0);
  });

  test("Required component system has been added and called", () => {
    const jumpComponent = new JumpComponent();
    const w = createWorld();
    const requiredComponentsSystem: TSystemCreationParams = {
      requiredComponents: [JumpComponent],
      run: () => {}
    };

    const requiredComponentsSystemSpy = vi.spyOn(
      requiredComponentsSystem,
      "run"
    );

    w.addEntity([jumpComponent]);
    w.addSystem(requiredComponentsSystem);
    w.run();

    expect(requiredComponentsSystemSpy).toHaveBeenCalled();
  });
});

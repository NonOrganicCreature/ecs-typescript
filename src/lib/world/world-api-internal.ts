import { ECSWorld, ECSWorldInternalState } from ".";
import { TComponent } from "../component";
import { TEntity } from "../entity";
import { TSystemCreationParams } from "../system";

const addSystemInternal = (
  system: TSystemCreationParams,
  state: ECSWorldInternalState,
  ecsWorldRef: ECSWorld
): void => {
  state.systems.push({
    requiredComponents: system.requiredComponents,
    run: (entity: TEntity) => {
      const entityComponents = state.entities.get(entity);
      if (entityComponents && system.requiredComponents.length > 0) {
        for (const requiredComponent of system.requiredComponents) {
          if (
            !entityComponents.some(
              (entityComponent) => entityComponent instanceof requiredComponent
            )
          ) {
            return;
          }
        }
      }

      system.run(entity, ecsWorldRef);
    }
  });
};

const addEntityInternal = (
  components: Array<TComponent>,
  state: ECSWorldInternalState
) => {
  state.entities.set(state.currentEntityId, components);
  return state.currentEntityId++;
};

const runInternal = (state: ECSWorldInternalState) => {
  for (const [e, _] of state.entities) {
    for (const system of state.systems) {
      system.run(e);
    }
  }
};

const getEntityComponentInternal = <T extends TComponent>(
  state: ECSWorldInternalState,
  entity: TEntity,
  componentClassRef: new (...args: any[]) => T
): T | undefined => {
  const components = state.entities.get(entity);
  if (components) {
    for (let c of components) {
      if (c instanceof componentClassRef) {
        return c as T;
      }
    }
  }

  return undefined;
};

const removeEntityComponentInternal = (
  state: ECSWorldInternalState,
  entity: TEntity,
  componentClassRef: new (...args: any[]) => any
) => {
  const entityComponents = state.entities.get(entity);

  if (entityComponents) {
    const excludedComponent: Array<TComponent> = entityComponents.filter(
      (entityComponent) => !(entityComponent instanceof componentClassRef)
    );
    state.entities.set(entity, excludedComponent);
  }
};

const addEntityComponentInternal = (
  state: ECSWorldInternalState,
  entity: TEntity,
  component: TComponent
) => {
  const entityComponents = state.entities.get(entity);

  if (entityComponents) {
    entityComponents.push(component);
  }
};

const removeEntityInternal = (state: ECSWorldInternalState, entity: TEntity) => {
  state.entities.delete(entity);
  return entity;
};

export {
  addSystemInternal,
  addEntityInternal,
  runInternal,
  getEntityComponentInternal,
  removeEntityComponentInternal,
  addEntityComponentInternal,
  removeEntityInternal
};

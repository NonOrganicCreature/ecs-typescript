import { TComponent } from "../component";
import { TEntity } from "../entity";
import { TSystemCreationParams, TSystems } from "../system";

type TEntityComponents = Map<TEntity, Array<TComponent>>;

export declare type ECSWorld = {
  addSystem: (system: TSystemCreationParams) => void;
  addEntity: (components: Array<TComponent>) => TEntity;
  addEntityComponent: (entity: TEntity, component: TComponent) => void;
  removeEntityComponent: (
    entity: TEntity,
    componentClassRef: new (...args: any[]) => any
  ) => void;
  getEntityComponent: <T extends TComponent>(
    entity: TEntity,
    componentClassRef: new (...args: any[]) => T
  ) => T | undefined;
  run: () => void;
  removeEntity: (entity: TEntity) => TEntity;
};

export const createWorld = (): ECSWorld => {
  const entities: TEntityComponents = new Map();
  const systems: TSystems = [];
  let currentEntityId: TEntity = 0;

  const removeEntity = (entity: TEntity) => {
    entities.delete(entity);
    return entity;
  };

  const addEntityComponent = (entity: TEntity, component: TComponent) => {
    const entityComponents = entities.get(entity);

    if (entityComponents) {
      entityComponents.push(component);
    }
  };

  const removeEntityComponent = (
    entity: TEntity,
    componentClassRef: new (...args: any[]) => any
  ) => {
    const entityComponents = entities.get(entity);

    if (entityComponents) {
      const excludedComponent: Array<TComponent> = entityComponents.filter(
        (entityComponent) => !(entityComponent instanceof componentClassRef)
      );
      entities.set(entity, excludedComponent);
    }
  };

  const getEntityComponent = <T extends TComponent>(
    entity: TEntity,
    componentClassRef: new (...args: any[]) => T
  ): T | undefined => {
    const components = entities.get(entity);
    if (components) {
      for (let c of components) {
        if (c instanceof componentClassRef) {
          return c as T;
        }
      }
    }

    return undefined;
  };

  const addSystem = (system: TSystemCreationParams) => {
    systems.push({
      requiredComponents: system.requiredComponents,
      run: (entity: TEntity) => {
        const entityComponents = entities.get(entity);
        if (entityComponents && system.requiredComponents.length > 0) {
          for (const requiredComponent of system.requiredComponents) {
            if (
              !entityComponents.some(
                (entityComponent) =>
                  entityComponent instanceof requiredComponent
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

  const addEntity = (components: Array<TComponent>) => {
    entities.set(currentEntityId, components);

    return currentEntityId++;
  };

  const run = () => {
    for (const [e, _] of entities) {
      for (const system of systems) {
        system.run(e);
      }
    }
    window.requestAnimationFrame(run);
  };

  const ecsWorldRef: ECSWorld = {
    addEntity,
    addSystem,
    addEntityComponent,
    getEntityComponent,
    run,
    removeEntity,
    removeEntityComponent
  };

  return ecsWorldRef;
};
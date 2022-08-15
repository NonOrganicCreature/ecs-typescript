import { TComponent } from "@/lib/component";
import { TEntity } from "@/lib/entity";
import { TSystemCreationParams, TSystems } from "@/lib/system";
import {
  addEntityComponentInternal,
  addEntityInternal,
  addSystemInternal,
  getEntityComponentInternal,
  removeEntityComponentInternal,
  removeEntityInternal,
  runInternal
} from "./world-api-internal";


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

export declare type TEntityComponents = Map<TEntity, Array<TComponent>>;

export declare type ECSWorldInternalState = {
  currentEntityId: TEntity;
  systems: TSystems;
  entities: TEntityComponents;
};

export const createWorld = (): ECSWorld => {
  const state: ECSWorldInternalState = {
    currentEntityId: 0,
    systems: [],
    entities: new Map()
  };

  const removeEntity = (entity: TEntity) => {
    return removeEntityInternal(state, entity);
  };

  const addEntityComponent = (entity: TEntity, component: TComponent) => {
    addEntityComponentInternal(state, entity, component);
  };

  const removeEntityComponent = (
    entity: TEntity,
    componentClassRef: new (...args: any[]) => any
  ) => {
    removeEntityComponentInternal(state, entity, componentClassRef);
  };

  const getEntityComponent = <T extends TComponent>(
    entity: TEntity,
    componentClassRef: new (...args: any[]) => T
  ): T | undefined => {
    return getEntityComponentInternal(state, entity, componentClassRef);
  };

  const addSystem = (system: TSystemCreationParams) => {
    addSystemInternal(system, state, ecsWorldRef);
  };

  const addEntity = (components: Array<TComponent>) => {
    return addEntityInternal(components, state);
  };

  const run = () => {
    runInternal(state);
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

import { TComponent } from "../component";
import { TEntity } from "../entity";
import { ECSWorld } from "../world";

export declare type TSystemCreationParams = {
  requiredComponents: Array<new (...args: any[]) => TComponent>;
  run: (e: TEntity, ecsWorldRef: ECSWorld) => void;
};

export declare type TSystem = {
  requiredComponents: Array<new (...args: any[]) => TComponent>;
  run: (e: TEntity) => void;
};

export declare type TSystems = Array<TSystem>;

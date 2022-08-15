import { createWorld } from "@/lib";
// import { TSystemCreationParams } from "@/lib/system";
// import { JumpComponent } from "../test/test-components";

// const w = createWorld();
// const jumpComponent = new JumpComponent();
// const jumpEntity = w.addEntity([jumpComponent]);
// const emptyEntity = w.addEntity([]);

// console.log(
//   `Jump entitiy ID: ${jumpEntity}. Empty components entity ID: ${emptyEntity}`
// );

// const requiredComponentsSystem: TSystemCreationParams = {
//   requiredComponents: [JumpComponent],
//   run: (e) => {
//     console.log(`Required components system run for entity with ID: ${e}`);
//   }
// };
// const systemWithoutRequiredComponentns: TSystemCreationParams = {
//   requiredComponents: [],
//   run: (e) => {
//     console.log(`Empty required components system run for entity with ID: ${e}`);
//   }
// };

// w.addSystem(requiredComponentsSystem);
// w.addSystem(systemWithoutRequiredComponentns);

// w.run();
export { createWorld };

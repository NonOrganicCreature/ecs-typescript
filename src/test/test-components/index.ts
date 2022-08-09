import { TComponent } from "../../lib/component";

type JumpComponentFields = {
  jumpHeight: number;
};
type JumpComponentGetters = {
  jumpHeight: () => number;
};
type JumpComponentSetters = {
  jumpHeight: (height: number) => void;
};

class JumpComponent extends TComponent<
  JumpComponentFields,
  JumpComponentGetters,
  JumpComponentSetters
> {
  fields: JumpComponentFields = {
    jumpHeight: 15
  };
  getters: JumpComponentGetters = {
    jumpHeight: () => this.fields.jumpHeight
  };
  setters: JumpComponentSetters = {
    jumpHeight: (height: number) => (this.fields.jumpHeight = height)
  };
}

export { JumpComponent };

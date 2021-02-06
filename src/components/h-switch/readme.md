# h-switch

**Use with Alpine.js**

Alpine.js component needs to be initialized after webcomponent has been rendered the first time

<details><summary>Click to show code</summary>

```html
<!-- head -->
<script type="module" src="/js/headlessui-webcomponents.esm.js"></script>
<script nomodule src="/js/headlessui-webcomponents.js"></script>
<script
  src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
  defer
></script>
```

```html
<div class="mt-6" x-data-defer="{ isChecked: true }">
  <h-switch
    class="flex items-center space-x-4"
    :checked="isChecked"
    @switched="isChecked = !isChecked"
  >
    <label label>Enable notifications</label>
    <button
      button
      class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring"
      :class="[ isChecked ? 'bg-indigo-600' : 'bg-gray-200' ]"
    >
      <span
        class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full"
        :class="[ isChecked ? 'translate-x-5' : 'translate-x-0' ]"
      ></span>
    </button>
  </h-switch>
</div>

<script>
  const components = document.querySelectorAll('[x-data-defer]');
  components.forEach(comp => {
    comp.addEventListener('componentRendered', function handleConnected() {
      comp.setAttribute('x-data', comp.getAttribute('x-data-defer'));
      Alpine.initializeComponent(comp);
      comp.removeEventListener('componentRendered', handleConnected);
    });
  });
</script>
```

</details>
<br>

**Use with Vue.js (vue-cli)**

Vue.js needs to be configured to recognize custom elements

<details><summary>Click to show code</summary>

```js
// vue.config.js
const vueConfig = {};
vueConfig.chainWebpack = config => {
  config.module
    .rule('vue')
    .use('vue-loader')
    .loader('vue-loader')
    .tap(options => {
      options.compilerOptions = {
        ...(options.compilerOptions || {}),
        isCustomElement: tag => /^h-/.test(tag),
      };
      return options;
    });
};
module.exports = vueConfig;
```

```js
// main.js
import { defineCustomElements } from 'headlessui-webcomponents/dist/esm/loader';

// Bind the custom elements to the window object
defineCustomElements();
```

```vue
// CustomSwitch.vue
<template>
  <div>
    <h-switch
      class="flex items-center space-x-4"
      :checked="modelValue"
      @switched="this.$emit('update:modelValue', $event.detail)"
    >
      <label label>{{ label }}</label>
      <button
        button
        class="w-11 focus:outline-none focus:ring relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer"
        :class="[modelValue ? 'bg-indigo-600' : 'bg-gray-200']"
      >
        <span
          class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full"
          :class="[modelValue ? 'translate-x-5' : 'translate-x-0']"
        ></span>
      </button>
    </h-switch>
  </div>
</template>

<script>
export default {
  name: 'CustomSwitch',
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: '' },
  },
};
</script>
```

</details>
<br>

**Use with React**

I did not try with React but there are extensive instructions in Stencilejs website and Stencilejs should also be able to output React components that wrap the webcomponent.
https://stenciljs.com/docs/react

**Use with Angular**

I did not try with Angular but there are extensive instructions in Stencilejs website and Stencilejs.
https://stenciljs.com/docs/angular

**Use with Ember**

I did not try with Ember but there are extensive instructions in Stencilejs website and Stencilejs.
https://stenciljs.com/docs/ember

**Implementation with Stenciljs**

This is the switch component ported as webcomponent

<details><summary>Click to show code</summary>

```typescript
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
} from '@stencil/core';
import { Keys } from '../../utils/keyboard';
import { useId } from '../../hooks/use-id';

@Component({
  tag: 'h-switch',
  shadow: false,
})
export class HSwitch {
  @Element() host: Element;

  /**
   * The status of checkbox
   */
  @Prop() checked: boolean = false;

  /**
   * Event emitted on status change
   */
  @Event({ bubbles: false }) switched: EventEmitter<boolean>;

  /**
   * Event emitted after component is rendered
   */
  @Event() componentRendered: EventEmitter;

  @State() button: HTMLButtonElement;
  @State() label: HTMLLabelElement;
  @State() id: number;

  // This is called only first time
  componentWillLoad() {
    this.id = useId();
    this.label = this.host.querySelector('[label]');
    this.button = this.host.querySelector('[button]');

    if (this.label) {
      this.label.id = 'headlessui-switch-label-' + this.id;
      this.label.addEventListener('click', () => this.handleLabelClick());
    }

    this.button.id = 'headlessui-switch-' + this.id;

    if (this.button.tagName === 'BUTTON') {
      this.button.tabIndex = 0;
      this.label && this.button.setAttribute('aria-labelledby', this.label.id);
      this.button.setAttribute('role', 'switch');
      this.button.addEventListener('click', e => this.handleClick(e));
      this.button.addEventListener('keyUp', e => this.handleKeyUp(e));
      this.button.addEventListener('keyPress', e => this.handleKeyPress(e));
    }
  }

  render() {
    this.button.setAttribute('aria-checked', this.checked.toString());

    return <slot></slot>;
  }

  componentDidRender() {
    this.componentRendered.emit();
  }

  private handleLabelClick() {
    this.button?.click();
    this.button?.focus({ preventScroll: true });
  }

  private handleClick(event) {
    event.preventDefault();
    this.toggle();
  }

  private handleKeyUp(event) {
    if (event.key !== Keys.Tab) event.preventDefault();
    if (event.key === Keys.Space) this.toggle();
  }

  private handleKeyPress(event) {
    event.preventDefault();
  }

  private toggle() {
    this.switched.emit(!this.checked);
  }
}
```

</details>

<!-- Auto Generated Below -->

## Properties

| Property  | Attribute | Description            | Type      | Default |
| --------- | --------- | ---------------------- | --------- | ------- |
| `checked` | `checked` | The status of checkbox | `boolean` | `false` |

## Events

| Event               | Description                               | Type                   |
| ------------------- | ----------------------------------------- | ---------------------- |
| `componentRendered` | Event emitted after component is rendered | `CustomEvent<any>`     |
| `switched`          | Event emitted on status change            | `CustomEvent<boolean>` |

---

_Built with [StencilJS](https://stenciljs.com/)_

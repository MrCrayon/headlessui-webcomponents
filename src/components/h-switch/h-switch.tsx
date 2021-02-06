import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'h-switch',
  shadow: true,
})
export class HSwitch {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

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

/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface HSwitch {
        /**
          * The status of checkbox
         */
        "checked": boolean;
    }
}
declare global {
    interface HTMLHSwitchElement extends Components.HSwitch, HTMLStencilElement {
    }
    var HTMLHSwitchElement: {
        prototype: HTMLHSwitchElement;
        new (): HTMLHSwitchElement;
    };
    interface HTMLElementTagNameMap {
        "h-switch": HTMLHSwitchElement;
    }
}
declare namespace LocalJSX {
    interface HSwitch {
        /**
          * The status of checkbox
         */
        "checked"?: boolean;
        /**
          * Event emitted after component is rendered
         */
        "onComponentRendered"?: (event: CustomEvent<any>) => void;
        /**
          * Event emitted on status change
         */
        "onSwitched"?: (event: CustomEvent<boolean>) => void;
    }
    interface IntrinsicElements {
        "h-switch": HSwitch;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "h-switch": LocalJSX.HSwitch & JSXBase.HTMLAttributes<HTMLHSwitchElement>;
        }
    }
}

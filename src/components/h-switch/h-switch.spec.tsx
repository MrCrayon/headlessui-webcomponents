jest.mock("../../hooks/use-id");

import { newSpecPage } from "@stencil/core/testing";
import { HSwitch } from "./h-switch";
import {
  assertSwitch,
  SwitchState,
} from "../../test-utils/accessibility-assertions";

async function renderTemplate(template) {
  return await newSpecPage({
    components: [HSwitch],
    html: template,
  });
}

describe("h-switch", () => {
  it("renders", async () => {
    const page = await renderTemplate(`<h-switch>
      <label label>Label</label>
      <button button>
        <span></span>
      </button>
    </h-switch>`);
    expect(page.root).toEqualHtml(`
      <h-switch>
        <label label id="headlessui-switch-label-1">Label</label>
        <button button aria-checked="false" aria-labelledby="headlessui-switch-label-1" id="headlessui-switch-1" role="switch" tabindex="0">
          <span></span>
        </button>
      </h-switch>
    `);
  });
});

describe("Rendering", () => {
  it("should be possible to render an (on) Switch using a render prop", async () => {
    await renderTemplate(`
      <h-switch checked>
        <label label>Label</label>
        <button button>
          <span>On</span>
        </button>
      </h-switch>
    `);
    assertSwitch({
      state: SwitchState.On,
      tag: "button",
      textContent: "On",
      label: "Label",
    });
  });

  it("should be possible to render an (off) Switch using a render prop", async () => {
    await renderTemplate(`
      <h-switch>
        <label label>Label</label>
        <button button>
          <span>Off</span>
        </button>
      </h-switch>
    `);
    assertSwitch({
      state: SwitchState.Off,
      tag: "button",
      textContent: "Off",
      label: "Label",
    });
  });
});

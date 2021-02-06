import { newSpecPage } from '@stencil/core/testing';
import { HSwitch } from './h-switch';

describe('h-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HSwitch],
      html: `<h-switch></h-switch>`,
    });
    expect(page.root).toEqualHtml(`
      <h-switch>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </h-switch>
    `);
  });
});

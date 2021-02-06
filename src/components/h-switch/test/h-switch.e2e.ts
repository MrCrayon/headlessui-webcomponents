import { newE2EPage } from '@stencil/core/testing';

describe('h-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<h-switch></h-switch>');

    const element = await page.find('h-switch');
    expect(element).toHaveClass('hydrated');
  });
});

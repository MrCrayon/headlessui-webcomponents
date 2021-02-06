expect.extend({
  toHaveAttributeValue(htmlElement, name, expectedValue) {
    const isExpectedValuePresent = expectedValue !== undefined;
    const hasAttribute = htmlElement.hasAttribute(name);
    const receivedValue = htmlElement.getAttribute(name);
    return {
      pass: isExpectedValuePresent
        ? hasAttribute && this.equals(receivedValue, expectedValue)
        : hasAttribute,
      message: () => 'message',
    };
  },
});

function expectToHaveAttributeValue(
  htmlElement: HTMLElement,
  name: string,
  expectedValue: string,
) {
  expect(htmlElement).toHaveAttribute(name);
  expectedValue !== undefined &&
    expect(htmlElement.attributes.getNamedItem(name).value).toEqual(
      expectedValue,
    );
}

function expectToHaveTextContent(
  htmlElement: HTMLElement,
  expectedValue: string,
) {
  expect(htmlElement.textContent.trim()).toEqual(expectedValue);
}

function expectToHaveStyle(htmlElement: HTMLElement, expectedValue: object) {
  Object.keys(expectedValue).forEach(attr => {
    expect(htmlElement.style[attr]).toBe(expectedValue[attr]);
  });
}

function expectNotToHaveStyle(htmlElement: HTMLElement, expectedValue: object) {
  Object.keys(expectedValue).forEach(attr => {
    expect(htmlElement.style[attr]).not.toBe(expectedValue[attr]);
  });
}

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

// ---

export function getSwitch(): HTMLElement | null {
  return document.querySelector('[role="switch"]');
}

export function getSwitchLabel(): HTMLElement | null {
  return document.querySelector('label,[id^="headlessui-switch-label"]');
}

// ---

export enum SwitchState {
  On,
  Off,
}

export function assertSwitch(
  options: {
    state: SwitchState;
    tag?: string;
    textContent?: string;
    label?: string;
  },
  switchElement = getSwitch(),
) {
  try {
    if (switchElement === null) return expect(switchElement).not.toBe(null);
    expectToHaveAttributeValue(switchElement, 'role', 'switch');
    expectToHaveAttributeValue(switchElement, 'tabindex', '0');

    if (options.textContent) {
      expectToHaveTextContent(switchElement, options.textContent);
    }

    if (options.tag) {
      expect(switchElement.tagName.toLowerCase()).toBe(options.tag);
    }

    if (options.label) {
      assertLabelValue(switchElement, options.label);
    }

    switch (options.state) {
      case SwitchState.On:
        expectToHaveAttributeValue(switchElement, 'aria-checked', 'true');
        break;

      case SwitchState.Off:
        expectToHaveAttributeValue(switchElement, 'aria-checked', 'false');
        break;

      default:
        assertNever(options.state);
    }
  } catch (err) {
    Error.captureStackTrace(err, assertSwitch);
    throw err;
  }
}

// ---

export function assertLabelValue(element: HTMLElement | null, value: string) {
  if (element === null) return expect(element).not.toBe(null);

  if (element.hasAttribute('aria-labelledby')) {
    let ids = element.getAttribute('aria-labelledby')!.split(' ');
    expect(
      ids.map(id => document.getElementById(id)?.textContent).join(' '),
    ).toEqual(value);
    return;
  }

  if (element.hasAttribute('aria-label')) {
    expectToHaveAttributeValue(element, 'aria-label', value);
    return;
  }

  if (
    element.hasAttribute('id') &&
    document.querySelectorAll(`[for="${element.id}"]`).length > 0
  ) {
    expectToHaveTextContent(
      document.querySelector(`[for="${element.id}"]`),
      value,
    );
    return;
  }

  expectToHaveTextContent(element, value);
}

// ---

export function assertActiveElement(element: HTMLElement | null) {
  try {
    if (element === null) return expect(element).not.toBe(null);
    expect(document.activeElement).toBe(element);
  } catch (err) {
    Error.captureStackTrace(err, assertActiveElement);
    throw err;
  }
}

// ---

export function assertHidden(element: HTMLElement | null) {
  try {
    if (element === null) return expect(element).not.toBe(null);

    expect(element).toHaveAttribute('hidden');
    expectToHaveStyle(element, { display: 'none' });
  } catch (err) {
    Error.captureStackTrace(err, assertHidden);
    throw err;
  }
}

export function assertVisible(element: HTMLElement | null) {
  try {
    if (element === null) return expect(element).not.toBe(null);

    expect(element).not.toHaveAttribute('hidden');
    expectNotToHaveStyle(element, { display: 'none' });
  } catch (err) {
    Error.captureStackTrace(err, assertVisible);
    throw err;
  }
}

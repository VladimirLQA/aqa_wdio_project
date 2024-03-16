export const isWebElement = (value: WebdriverIO.Element | string): value is WebdriverIO.Element => {
  return (
    value !== undefined && value !== null && (value as WebdriverIO.Element).selector !== undefined
  );
};

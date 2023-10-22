import { elementFinder } from './element-finder';
import { IProduct } from '../ui/types/products.type';
import { apiKeysMapper, tableHeadersForMapping } from './mapper-keys';

const isAttributeContainClass = async (element: string, className: string): Promise<boolean> => {
  const elem = await elementFinder.findElement(element);
  const classAttribute = await elem.getAttribute('class');
  return classAttribute.toLowerCase().includes(className);
};

const browserPause = async (timeout: number): Promise<void> => {
  await browser.pause(timeout);
};

const modalParser = async (modalData: string[]) => {
  return modalData.reduce((parsed, info) => {
    const [k, v] = info.split('\n');
    const clearedK = k.slice(0, -1); // remove semicolon
    parsed[clearedK] = v;
    return parsed;
  }, {} as IProduct);
};

const filterObjKeys = (obj, f) => {
  const res = Object.fromEntries(Object.entries(obj).filter(([k, v]) => f(k)))
  return res;
};

const select = (obj, ...props) => filterObjKeys(obj, k => props.includes(k));
const omit = async (obj, ...props) => filterObjKeys(obj, k => !props.includes(k));

const sortByNameASC = <T>(array: T) => {
  return [...array].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
}

const capitalize = (word: string): string => word.slice(0, 1).toUpperCase() + word.slice(1);

const apiKeyMapper = async (entity: any, pageName: string) => {
  const mappedEntity = {};
  for (const key of tableHeadersForMapping[pageName]) {
    mappedEntity[apiKeysMapper[key]] = entity[key];
  }
  return mappedEntity;
};

export { isAttributeContainClass, browserPause, modalParser, filterObjKeys, omit, select, sortByNameASC, capitalize, apiKeyMapper };

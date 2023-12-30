import { IInitObject } from '../ui/types/common.types';
import { apiKeysForMapping, apiKeysMapper } from './mapper-keys';

const browserPause = async (timeout: number): Promise<void> => {
  await browser.pause(timeout);
};

const modalParser = async (modalData: string[]) => {
  return modalData.reduce((parsed: { [key: string]: string }, info) => {
    const [k, v] = info.split('\n');
    const clearedK = k.slice(0, -1); // remove semicolon
    parsed[clearedK] = v;
    return parsed;
  }, {});
};

// const filterObjKeys = (obj, f) => {
//   const res = Object.fromEntries(Object.entries(obj).filter(([k, v]) => f(k)));
//   return res;
// };

// const select = (obj, ...props) => filterObjKeys(obj, (k) => props.includes(k));
// const omit = async (obj, ...props) => filterObjKeys(obj, (k) => !props.includes(k));

const sortByNameASC = <T extends any[]>(array: T) => {
  return [...array].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
};

const capitalize = (word: string): string => word.slice(0, 1).toUpperCase() + word.slice(1);

const apiKeyMapper = async (entity: any, pageName: string) => {
  const mappedEntity: IInitObject = {};
  for (const key of apiKeysForMapping[pageName]) {
    mappedEntity[apiKeysMapper[key]] = entity[key];
  }
  return mappedEntity;
};
// TODO implement Helper class
export { apiKeyMapper, browserPause, capitalize, modalParser, sortByNameASC };

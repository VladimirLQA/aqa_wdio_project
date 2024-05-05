import { IInitObject } from '../types/common.types.js';
import { apiKeysForMapping, apiKeysMapper } from './mapper-keys.js';
import { isWebElement } from './type-guards.js';

export type MappedOptionalType<T> = {
  [K in keyof T]+?: T[K];
};

export interface IOrderMappedObj {
  ['Order Number']: string;
  ['Order Status']: string;
  Price: string;
  Name: string;
  Delivery: string;
}

class Utils {
  filterObjKeys<T extends { [key: string]: any }>(obj: T, fn: Function) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => fn(k)));
  }

  select<T extends { [key: string]: any }>(obj: T, ...props: string[]) {
    this.filterObjKeys(obj, (k: string) => props.includes(k));
  }

  omit<T extends { [key: string]: any }>(obj: T, ...props: string[]) {
    this.filterObjKeys(obj, (k: string) => !props.includes(k));
  }

  async apiKeyMapper<T>(entity: any, pageName: string) {
    const mappedEntity: IInitObject = {};
    for (const key of apiKeysForMapping[pageName]) {
      mappedEntity[apiKeysMapper[key]] = entity[key];
    }
    if ('Customer' in mappedEntity || 'Delivery' in mappedEntity) {
      return { ...this.rebuildObj(mappedEntity) };
    }
    return mappedEntity;
  }

  rebuildObj(obj: any) {
    return {
      'Order Number': obj['Order Number'],
      Delivery: obj?.Delivery?.finalDate ? this.dateToYYYYMMDD(obj.Delivery!.finalDate) : '-',
      Name: obj.Customer.name,
      Email: obj.Customer.email,
      Price: obj['Price'],
      Status: obj['Status'],
    };
  }

  dateToYYYYMMDD(date: string) {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');

    return `${year}/${month}/${day}`;
  }

  async browserPause(timeout: number) {
    await browser.pause(timeout);
  }

  modalParser(modalData: string[]) {
    return modalData.reduce((parsed: { [key: string]: string }, info) => {
      const [k, v] = info.split('\n');
      const clearedK = k.slice(0, -1); // remove semicolon
      parsed[clearedK] = v;
      return parsed;
    }, {});
  }

  sortByNameASC<T extends { name: string }[]>(array: T) {
    return [...array].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
  }

  capitalize(word: string): string {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  }

  objectsEquals<T extends { [key: string]: any }>(obj1: T, obj2: T) {
    return (
      Object.keys(obj1).length === Object.keys(obj2).length &&
      Object.keys(obj1).every((key) => {
        obj1[key] === obj2[key];
      })
    );
  }

  sortById<T extends { _id: string }>(array: T[]) {
    return array.slice().sort((a, b) => {
      if (a._id.toLowerCase() < b._id.toLowerCase()) return -1;
      else if (a._id.toLowerCase() < b._id.toLowerCase()) return 1;
      else return 0;
    });
  }

  arraysEquals<T extends []>(arr1: T[], arr2: T[]) {
    return (
      arr1.length === arr2.length &&
      arr1.every((obj, idx) => {
        this.objectsEquals(obj, arr2[idx]);
      })
    );
  }

  getElementSelector(item: WebdriverIO.Element | string) {
    if (isWebElement(item)) {
      return item.selector.toString();
    } else {
      return item;
    }
  }

  getStringInDoubleQuotes(input: string) {
    if (input === 'string') {
      console.log('input in utils >>>>>> ', input)
      const matches = input.match(/"([^"]*)"/);
      if (matches && matches.length > 1) return matches[1]; // The first capturing group contains the string inside double quotes
    }
  }
}

export default new Utils();

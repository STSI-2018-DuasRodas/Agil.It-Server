import { Between, In, Like } from "typeorm";

export function getValueWhereConditions(arg: string = '') {
  if (arg.substring(0,7).toLowerCase() === 'between') {
    const values = arg.substring(7).replace(/[\(\)]/g, '').split(',')

    if (values[0] == values[1]) {
      return values[0];
    } else {
      return Between(values[0], values[1]);
    }

  } else if(arg.substring(0,3).toLowerCase() === 'in(') {
    const value = arg.substring(3).replace(')', '').split(',')
    return In(value);

  } else if (arg.substring(0,5).toLowerCase() === 'like(') {
    const value = arg.substring(5).replace(')', '')
    return Like(`%${value}%`);
  } else {
    return arg;
  }
}

export function flat(array: Array<any>) {
  return array.reduce((acc, val) => acc.concat(val), []);
}
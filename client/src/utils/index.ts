/* eslint-disable no-sequences */

export const pick = (obj: any, arr: string[]): any =>
  arr.reduce((acc: any, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

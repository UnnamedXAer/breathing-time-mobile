import { MessagePlural } from '../../types';

export const pluralization = (count: number): [keyof MessagePlural] => {
  if (count === 1) {
    return ['one'];
  }

  if ([2, 3, 4].indexOf(count % 10) >= 0 && [12, 13, 14].indexOf(count % 100) < 0) {
    return ['few'];
  }

  if (
    count % 10 == 0 ||
    [0, 1, 5, 6, 7, 8, 9].indexOf(count % 10) >= 0 ||
    [11, 12, 13, 14].indexOf(count % 100) >= 0
  ) {
    return ['many'];
  }

  return ['other'];
};

import { Api as Api1  } from '../api/Api1.ts';
import { Api as Api2 } from '../api/Api2.ts';

export const api1 = new Api1({
    baseURL: '/api1',
});

export const api2 = new Api2({
    baseURL: '/api2',
});
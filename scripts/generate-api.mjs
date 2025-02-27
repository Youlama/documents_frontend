import { resolve } from 'path';

import { generateApi } from 'swagger-typescript-api';

generateApi({
    name: 'Api1.ts',
    output: resolve(process.cwd(), './src/api'),
    url: 'http://localhost:8000/swagger/?format=openapi',
    httpClientType: 'axios',
});

generateApi({
    name: 'Api2.ts',
    output: resolve(process.cwd(), './src/api'),
    url: 'http://localhost:8001/swagger/?format=openapi',
    httpClientType: 'axios',
});
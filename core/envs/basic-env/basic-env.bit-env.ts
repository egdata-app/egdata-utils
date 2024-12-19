import { NodeEnv } from '@bitdev/node.node-env';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

export class BasicEnv extends NodeEnv {
  name = 'basic-env';

  type = 'env';

  protected dirName = dirname(fileURLToPath(import.meta.url));

  protected tsconfigPath = require.resolve('./config/tsconfig.json');
}

export default new BasicEnv();

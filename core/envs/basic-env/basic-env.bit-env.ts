import { NodeEnv } from '@bitdev/node.node-env';
import { NativeCompileCache } from '@teambit/toolbox.performance.v8-cache';
import { createRequire } from 'node:module';

// Disable v8-caching because it breaks ESM loaders
NativeCompileCache.uninstall();

const require = createRequire(import.meta.url);

export class BasicEnv extends NodeEnv {
  name = 'basic-env';

  type = 'env';

  protected tsconfigPath = require.resolve('./config/tsconfig.json');
}

export default new BasicEnv();

import { NodeEnv } from '@bitdev/node.node-env';
import { NativeCompileCache } from '@teambit/toolbox.performance.v8-cache';

// Disable v8-caching because it breaks ESM loaders
NativeCompileCache.uninstall();

export class BasicEnv extends NodeEnv {
  name = 'basic-env';

  type = 'env';
}

export default new BasicEnv();

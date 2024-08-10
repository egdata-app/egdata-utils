/**
 * this env extends the Bit official NodeJS environment.
 * learn more: https://bit.cloud/bitdev/node/node-env
 */
import { NodeEnv } from '@bitdev/node.node-env';
import { Compiler } from "@teambit/compiler";
import findRoot from 'find-root';
import { EnvHandler } from "@teambit/envs";
import { Pipeline } from '@teambit/builder';
import { ReactPreview } from '@teambit/preview.react-preview';
import {
  GLOBAL_TYPES_DIR,
  TypescriptCompiler,
  resolveTypes,
  TypescriptTask,
} from "@teambit/typescript.typescript-compiler";
import { ESLintLinter, EslintTask } from "@teambit/defender.eslint-linter";
// import { JestTask, JestTester } from "@teambit/defender.jest-tester";
import { VitestTester, VitestTask } from '@teambit/vite.vitest-tester';
import type { Preview } from '@teambit/preview';
import { PrettierFormatter } from "@teambit/defender.prettier-formatter";
import { Tester } from "@teambit/tester";
import { NativeCompileCache } from '@teambit/toolbox.performance.v8-cache';
import { createRequire } from "node:module";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Disable v8-caching because it breaks ESM loaders
NativeCompileCache.uninstall();

const require = createRequire(import.meta.url);
const fileFolderPath = dirname(fileURLToPath(import.meta.url));

export class BasicEnv extends NodeEnv {
  /* shorthand name for the environment */
  name = "basic-env";

  /* the compiler to use during development */
  compiler(): EnvHandler<Compiler> {
    return TypescriptCompiler.from({
      tsconfig: this.tsconfigPath,
      esm: true,
      types: this.types,
    });
  }

  /* the test runner to use during development */
  tester(): EnvHandler<Tester> {
    return VitestTester.from({
      config: this.vitestConfigPath
    });
    // return JestTester.from({
    //   config: require.resolve('./config/jest.config.cjs'),
    // });
  }

  /* the linter to use during development */
  linter() {
    return ESLintLinter.from({
      tsconfig: this.tsconfigPath,
      configPath: this.eslintConfigPath,
      pluginsPath: fileFolderPath,
      extensions: this.eslintExtensions,
    });
  }
  
  preview(): EnvHandler<Preview> {
    return ReactPreview.from({
      // configure the env not to create a preview for the impl. just for the composition.
      previewConfig: {
        splitComponentBundle: false
      },
      // docsTemplate: require.resolve('./preview/docs'),
      // mounter: require.resolve('./preview/mounter'),
      // transformers: [webpackTransformer],
    });
  }

  /**
   * the formatter to use during development
   * (source files are not formatted as part of the components' build)
   */
  formatter() {
    return PrettierFormatter.from({
      configPath: this.prettierConfigPath,
    });
  }

  /**
   * a set of processes to be performed before a component is snapped, during its build phase
   * @see https://bit.dev/docs/node-env/build-pipelines
   */
  build() {
    return Pipeline.from([
      TypescriptTask.from({
        tsconfig: this.tsconfigPath,
        types: this.types,
      }),
      EslintTask.from({
        tsconfig: this.tsconfigPath,
        configPath: this.eslintConfigPath,
        pluginsPath: fileFolderPath,
        extensions: this.eslintExtensions,
      }),
      // JestTask.from({ config: require.resolve('./config/jest.config') }),
      VitestTask.from({
        config: this.vitestConfigPath,
      }),
    ]);
  }

  protected tsconfigPath = require.resolve('./config/tsconfig.json');

  protected tsTypesPath = './types';

  protected get types() {
    const packagePath = require.resolve('@teambit/typescript.typescript-compiler');
    const packageRoot = findRoot(packagePath);

    return [
      ...resolveTypes(fileFolderPath, [this.tsTypesPath]),
      ...resolveTypes(packageRoot,[GLOBAL_TYPES_DIR]),
    ];
  }

  protected vitestConfigPath = require.resolve('./config/vitest.config.mjs');

  protected prettierConfigPath = require.resolve('./config/prettier.config.cjs');
  
  protected tsTypesPath = './types';

  protected eslintConfigPath = require.resolve('./config/eslintrc.cjs');
  
  protected eslintExtensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs'];
}

export default new BasicEnv();

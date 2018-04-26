"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("colors");

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _pify = _interopRequireDefault(require("pify"));

var _electronPackager = _interopRequireDefault(require("electron-packager"));

var _targets = require("electron-packager/targets");

var _forgeConfig = _interopRequireDefault(require("../util/forge-config"));

var _hook = _interopRequireDefault(require("../util/hook"));

var _messages = require("../util/messages");

var _readPackageJson = _interopRequireDefault(require("../util/read-package-json"));

var _rebuild = _interopRequireDefault(require("../util/rebuild"));

var _requireSearch = _interopRequireDefault(require("../util/require-search"));

var _resolveDir = _interopRequireDefault(require("../util/resolve-dir"));

var _outDir = _interopRequireDefault(require("../util/out-dir"));

var _electronVersion = _interopRequireDefault(require("../util/electron-version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:packager');
/**
 * @typedef {Object} PackageOptions
 * @property {string} [dir=process.cwd()] The path to the app to package
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {string} [arch=process.arch] The target arch
 * @property {string} [platform=process.platform] The target platform.
 * @property {string} [outDir=`${dir}/out`] The path to the output directory for packaged apps
 */

/**
 * Resolves hooks if they are a path to a file (instead of a `Function`).
 */

function resolveHooks(hooks, dir) {
  if (hooks) {
    return hooks.map(hook => typeof hook === 'string' ? (0, _requireSearch.default)(dir, [hook]) : hook);
  }

  return [];
}

function sequentialHooks(hooks) {
  return [
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(function* (...args) {
      const done = args[args.length - 1];
      const passedArgs = args.splice(0, args.length - 1);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = hooks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const hook = _step.value;
          yield (0, _pify.default)(hook)(...passedArgs);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      done();
    });

    return function () {
      return _ref.apply(this, arguments);
    };
  }()];
}
/**
 * Package an Electron application into an platform dependent format.
 *
 * @param {PackageOptions} providedOptions - Options for the Package method
 * @return {Promise} Will resolve when the package process is complete
 */


var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    let _Object$assign = Object.assign({
      dir: process.cwd(),
      interactive: false,
      arch: (0, _targets.hostArch)(),
      platform: process.platform
    }, providedOptions),
        dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        arch = _Object$assign.arch,
        platform = _Object$assign.platform;

    const ora = interactive ? _asyncOra.ora : _asyncOra.fakeOra;
    let prepareSpinner = ora(`Preparing to Package Application for arch: ${(arch === 'all' ? 'ia32' : arch).cyan}`).start();
    let prepareCounter = 0;
    dir = yield (0, _resolveDir.default)(dir);

    if (!dir) {
      throw 'Failed to locate compilable Electron application';
    }

    const packageJSON = yield (0, _readPackageJson.default)(dir);

    if (_path.default.dirname(require.resolve(_path.default.resolve(dir, packageJSON.main))) === dir) {
      console.error(`Entry point: ${packageJSON.main}`.red);
      throw 'The entry point to your application ("packageJSON.main") must be in a subfolder not in the top level directory';
    }

    const forgeConfig = yield (0, _forgeConfig.default)(dir);
    const outDir = providedOptions.outDir || (0, _outDir.default)(dir, forgeConfig);
    let packagerSpinner;
    const pruneEnabled = !('prune' in forgeConfig.packagerConfig) || forgeConfig.packagerConfig.prune;
    const afterCopyHooks = [
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(function* (buildPath, electronVersion, pPlatform, pArch, done) {
        if (packagerSpinner) {
          packagerSpinner.succeed();
          prepareCounter += 1;
          prepareSpinner = ora(`Preparing to Package Application for arch: ${(prepareCounter === 2 ? 'armv7l' : 'x64').cyan}`).start();
        }

        const bins = yield (0, _pify.default)(_glob.default)(_path.default.join(buildPath, '**/.bin/**/*'));
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = bins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            const bin = _step2.value;
            yield _fsExtra.default.remove(bin);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        done();
      });

      return function (_x, _x2, _x3, _x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    }(),
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(function* (buildPath, electronVersion, pPlatform, pArch, done) {
        prepareSpinner.succeed();
        yield (0, _hook.default)(forgeConfig, 'packageAfterCopy', buildPath, electronVersion, pPlatform, pArch);
        done();
      });

      return function (_x6, _x7, _x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
      };
    }(),
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(function* (buildPath, electronVersion, pPlatform, pArch, done) {
        yield (0, _rebuild.default)(buildPath, electronVersion, pPlatform, pArch, forgeConfig.rebuildConfig);
        packagerSpinner = ora('Packaging Application').start();
        done();
      });

      return function (_x11, _x12, _x13, _x14, _x15) {
        return _ref5.apply(this, arguments);
      };
    }()];
    afterCopyHooks.push(
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(function* (buildPath, electronVersion, pPlatform, pArch, done) {
        const copiedPackageJSON = yield (0, _readPackageJson.default)(buildPath);

        if (copiedPackageJSON.config && copiedPackageJSON.config.forge) {
          delete copiedPackageJSON.config.forge;
        }

        yield _fsExtra.default.writeJson(_path.default.resolve(buildPath, 'package.json'), copiedPackageJSON, {
          spaces: 2
        });
        done();
      });

      return function (_x16, _x17, _x18, _x19, _x20) {
        return _ref6.apply(this, arguments);
      };
    }());
    afterCopyHooks.push(...resolveHooks(forgeConfig.packagerConfig.afterCopy, dir));
    const afterPruneHooks = [];

    if (pruneEnabled) {
      afterPruneHooks.push(...resolveHooks(forgeConfig.packagerConfig.afterPrune, dir));
    }

    afterPruneHooks.push(
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(function* (buildPath, electronVersion, pPlatform, pArch, done) {
        yield (0, _hook.default)(forgeConfig, 'packageAfterPrune', buildPath, electronVersion, pPlatform, pArch);
        done();
      });

      return function (_x21, _x22, _x23, _x24, _x25) {
        return _ref7.apply(this, arguments);
      };
    }());
    const packageOpts = Object.assign({
      asar: false,
      overwrite: true
    }, forgeConfig.packagerConfig, {
      afterCopy: sequentialHooks(afterCopyHooks),
      afterExtract: sequentialHooks(resolveHooks(forgeConfig.packagerConfig.afterExtract, dir)),
      afterPrune: sequentialHooks(afterPruneHooks),
      dir,
      arch,
      platform,
      out: outDir,
      electronVersion: (0, _electronVersion.default)(packageJSON)
    });
    packageOpts.quiet = true;

    if (!packageJSON.version && !packageOpts.appVersion) {
      // eslint-disable-next-line max-len
      (0, _messages.warn)(interactive, "Please set 'version' or 'config.forge.electronPackagerConfig.appVersion' in your application's package.json so auto-updates work properly".yellow);
    }

    yield (0, _hook.default)(forgeConfig, 'generateAssets');
    yield (0, _hook.default)(forgeConfig, 'prePackage');
    d('packaging with options', packageOpts);
    yield (0, _electronPackager.default)(packageOpts);
    yield (0, _hook.default)(forgeConfig, 'postPackage');
    packagerSpinner.succeed();
  });

  return function () {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvcGFja2FnZS5qcyJdLCJuYW1lcyI6WyJkIiwicmVzb2x2ZUhvb2tzIiwiaG9va3MiLCJkaXIiLCJtYXAiLCJob29rIiwic2VxdWVudGlhbEhvb2tzIiwiYXJncyIsImRvbmUiLCJsZW5ndGgiLCJwYXNzZWRBcmdzIiwic3BsaWNlIiwicHJvdmlkZWRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwicHJvY2VzcyIsImN3ZCIsImludGVyYWN0aXZlIiwiYXJjaCIsInBsYXRmb3JtIiwib3JhIiwicHJlcGFyZVNwaW5uZXIiLCJjeWFuIiwic3RhcnQiLCJwcmVwYXJlQ291bnRlciIsInBhY2thZ2VKU09OIiwiZGlybmFtZSIsInJlcXVpcmUiLCJyZXNvbHZlIiwibWFpbiIsImNvbnNvbGUiLCJlcnJvciIsInJlZCIsImZvcmdlQ29uZmlnIiwib3V0RGlyIiwicGFja2FnZXJTcGlubmVyIiwicHJ1bmVFbmFibGVkIiwicGFja2FnZXJDb25maWciLCJwcnVuZSIsImFmdGVyQ29weUhvb2tzIiwiYnVpbGRQYXRoIiwiZWxlY3Ryb25WZXJzaW9uIiwicFBsYXRmb3JtIiwicEFyY2giLCJzdWNjZWVkIiwiYmlucyIsImpvaW4iLCJiaW4iLCJyZW1vdmUiLCJyZWJ1aWxkQ29uZmlnIiwicHVzaCIsImNvcGllZFBhY2thZ2VKU09OIiwiY29uZmlnIiwiZm9yZ2UiLCJ3cml0ZUpzb24iLCJzcGFjZXMiLCJhZnRlckNvcHkiLCJhZnRlclBydW5lSG9va3MiLCJhZnRlclBydW5lIiwicGFja2FnZU9wdHMiLCJhc2FyIiwib3ZlcndyaXRlIiwiYWZ0ZXJFeHRyYWN0Iiwib3V0IiwicXVpZXQiLCJ2ZXJzaW9uIiwiYXBwVmVyc2lvbiIsInllbGxvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztB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IG9yYSBhcyByZWFsT3JhLCBmYWtlT3JhIH0gZnJvbSAnQGVsZWN0cm9uLWZvcmdlL2FzeW5jLW9yYSc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcGlmeSBmcm9tICdwaWZ5JztcbmltcG9ydCBwYWNrYWdlciBmcm9tICdlbGVjdHJvbi1wYWNrYWdlcic7XG5pbXBvcnQgeyBob3N0QXJjaCB9IGZyb20gJ2VsZWN0cm9uLXBhY2thZ2VyL3RhcmdldHMnO1xuXG5pbXBvcnQgZ2V0Rm9yZ2VDb25maWcgZnJvbSAnLi4vdXRpbC9mb3JnZS1jb25maWcnO1xuaW1wb3J0IHJ1bkhvb2sgZnJvbSAnLi4vdXRpbC9ob29rJztcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlsL21lc3NhZ2VzJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi4vdXRpbC9yZWFkLXBhY2thZ2UtanNvbic7XG5pbXBvcnQgcmVidWlsZEhvb2sgZnJvbSAnLi4vdXRpbC9yZWJ1aWxkJztcbmltcG9ydCByZXF1aXJlU2VhcmNoIGZyb20gJy4uL3V0aWwvcmVxdWlyZS1zZWFyY2gnO1xuaW1wb3J0IHJlc29sdmVEaXIgZnJvbSAnLi4vdXRpbC9yZXNvbHZlLWRpcic7XG5pbXBvcnQgZ2V0Q3VycmVudE91dERpciBmcm9tICcuLi91dGlsL291dC1kaXInO1xuaW1wb3J0IGdldEVsZWN0cm9uVmVyc2lvbiBmcm9tICcuLi91dGlsL2VsZWN0cm9uLXZlcnNpb24nO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOnBhY2thZ2VyJyk7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUGFja2FnZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGlyPXByb2Nlc3MuY3dkKCldIFRoZSBwYXRoIHRvIHRoZSBhcHAgdG8gcGFja2FnZVxuICogQHByb3BlcnR5IHtib29sZWFufSBbaW50ZXJhY3RpdmU9ZmFsc2VdIFdoZXRoZXIgdG8gdXNlIHNlbnNpYmxlIGRlZmF1bHRzIG9yIHByb21wdCB0aGUgdXNlciB2aXN1YWxseVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFthcmNoPXByb2Nlc3MuYXJjaF0gVGhlIHRhcmdldCBhcmNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3BsYXRmb3JtPXByb2Nlc3MucGxhdGZvcm1dIFRoZSB0YXJnZXQgcGxhdGZvcm0uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW291dERpcj1gJHtkaXJ9L291dGBdIFRoZSBwYXRoIHRvIHRoZSBvdXRwdXQgZGlyZWN0b3J5IGZvciBwYWNrYWdlZCBhcHBzXG4gKi9cblxuLyoqXG4gKiBSZXNvbHZlcyBob29rcyBpZiB0aGV5IGFyZSBhIHBhdGggdG8gYSBmaWxlIChpbnN0ZWFkIG9mIGEgYEZ1bmN0aW9uYCkuXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVIb29rcyhob29rcywgZGlyKSB7XG4gIGlmIChob29rcykge1xuICAgIHJldHVybiBob29rcy5tYXAoaG9vayA9PiAodHlwZW9mIGhvb2sgPT09ICdzdHJpbmcnID8gcmVxdWlyZVNlYXJjaChkaXIsIFtob29rXSkgOiBob29rKSk7XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbmZ1bmN0aW9uIHNlcXVlbnRpYWxIb29rcyhob29rcykge1xuICByZXR1cm4gW2FzeW5jICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgZG9uZSA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBwYXNzZWRBcmdzID0gYXJncy5zcGxpY2UoMCwgYXJncy5sZW5ndGggLSAxKTtcbiAgICBmb3IgKGNvbnN0IGhvb2sgb2YgaG9va3MpIHtcbiAgICAgIGF3YWl0IHBpZnkoaG9vaykoLi4ucGFzc2VkQXJncyk7XG4gICAgfVxuICAgIGRvbmUoKTtcbiAgfV07XG59XG5cbi8qKlxuICogUGFja2FnZSBhbiBFbGVjdHJvbiBhcHBsaWNhdGlvbiBpbnRvIGFuIHBsYXRmb3JtIGRlcGVuZGVudCBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHtQYWNrYWdlT3B0aW9uc30gcHJvdmlkZWRPcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIFBhY2thZ2UgbWV0aG9kXG4gKiBAcmV0dXJuIHtQcm9taXNlfSBXaWxsIHJlc29sdmUgd2hlbiB0aGUgcGFja2FnZSBwcm9jZXNzIGlzIGNvbXBsZXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwcm92aWRlZE9wdGlvbnMgPSB7fSkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0LCBuby11bnVzZWQtdmFyc1xuICBsZXQgeyBkaXIsIGludGVyYWN0aXZlLCBhcmNoLCBwbGF0Zm9ybSB9ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgZGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICBhcmNoOiBob3N0QXJjaCgpLFxuICAgIHBsYXRmb3JtOiBwcm9jZXNzLnBsYXRmb3JtLFxuICB9LCBwcm92aWRlZE9wdGlvbnMpO1xuXG4gIGNvbnN0IG9yYSA9IGludGVyYWN0aXZlID8gcmVhbE9yYSA6IGZha2VPcmE7XG5cbiAgbGV0IHByZXBhcmVTcGlubmVyID0gb3JhKGBQcmVwYXJpbmcgdG8gUGFja2FnZSBBcHBsaWNhdGlvbiBmb3IgYXJjaDogJHsoYXJjaCA9PT0gJ2FsbCcgPyAnaWEzMicgOiBhcmNoKS5jeWFufWApLnN0YXJ0KCk7XG4gIGxldCBwcmVwYXJlQ291bnRlciA9IDA7XG5cbiAgZGlyID0gYXdhaXQgcmVzb2x2ZURpcihkaXIpO1xuICBpZiAoIWRpcikge1xuICAgIHRocm93ICdGYWlsZWQgdG8gbG9jYXRlIGNvbXBpbGFibGUgRWxlY3Ryb24gYXBwbGljYXRpb24nO1xuICB9XG5cbiAgY29uc3QgcGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04oZGlyKTtcblxuICBpZiAocGF0aC5kaXJuYW1lKHJlcXVpcmUucmVzb2x2ZShwYXRoLnJlc29sdmUoZGlyLCBwYWNrYWdlSlNPTi5tYWluKSkpID09PSBkaXIpIHtcbiAgICBjb25zb2xlLmVycm9yKGBFbnRyeSBwb2ludDogJHtwYWNrYWdlSlNPTi5tYWlufWAucmVkKTtcbiAgICB0aHJvdyAnVGhlIGVudHJ5IHBvaW50IHRvIHlvdXIgYXBwbGljYXRpb24gKFwicGFja2FnZUpTT04ubWFpblwiKSBtdXN0IGJlIGluIGEgc3ViZm9sZGVyIG5vdCBpbiB0aGUgdG9wIGxldmVsIGRpcmVjdG9yeSc7XG4gIH1cblxuICBjb25zdCBmb3JnZUNvbmZpZyA9IGF3YWl0IGdldEZvcmdlQ29uZmlnKGRpcik7XG4gIGNvbnN0IG91dERpciA9IHByb3ZpZGVkT3B0aW9ucy5vdXREaXIgfHwgZ2V0Q3VycmVudE91dERpcihkaXIsIGZvcmdlQ29uZmlnKTtcbiAgbGV0IHBhY2thZ2VyU3Bpbm5lcjtcblxuICBjb25zdCBwcnVuZUVuYWJsZWQgPSAhKCdwcnVuZScgaW4gZm9yZ2VDb25maWcucGFja2FnZXJDb25maWcpIHx8IGZvcmdlQ29uZmlnLnBhY2thZ2VyQ29uZmlnLnBydW5lO1xuXG4gIGNvbnN0IGFmdGVyQ29weUhvb2tzID0gW1xuICAgIGFzeW5jIChidWlsZFBhdGgsIGVsZWN0cm9uVmVyc2lvbiwgcFBsYXRmb3JtLCBwQXJjaCwgZG9uZSkgPT4ge1xuICAgICAgaWYgKHBhY2thZ2VyU3Bpbm5lcikge1xuICAgICAgICBwYWNrYWdlclNwaW5uZXIuc3VjY2VlZCgpO1xuICAgICAgICBwcmVwYXJlQ291bnRlciArPSAxO1xuICAgICAgICBwcmVwYXJlU3Bpbm5lciA9IG9yYShgUHJlcGFyaW5nIHRvIFBhY2thZ2UgQXBwbGljYXRpb24gZm9yIGFyY2g6ICR7KHByZXBhcmVDb3VudGVyID09PSAyID8gJ2FybXY3bCcgOiAneDY0JykuY3lhbn1gKS5zdGFydCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgYmlucyA9IGF3YWl0IHBpZnkoZ2xvYikocGF0aC5qb2luKGJ1aWxkUGF0aCwgJyoqLy5iaW4vKiovKicpKTtcbiAgICAgIGZvciAoY29uc3QgYmluIG9mIGJpbnMpIHtcbiAgICAgICAgYXdhaXQgZnMucmVtb3ZlKGJpbik7XG4gICAgICB9XG4gICAgICBkb25lKCk7XG4gICAgfSwgYXN5bmMgKGJ1aWxkUGF0aCwgZWxlY3Ryb25WZXJzaW9uLCBwUGxhdGZvcm0sIHBBcmNoLCBkb25lKSA9PiB7XG4gICAgICBwcmVwYXJlU3Bpbm5lci5zdWNjZWVkKCk7XG4gICAgICBhd2FpdCBydW5Ib29rKGZvcmdlQ29uZmlnLCAncGFja2FnZUFmdGVyQ29weScsIGJ1aWxkUGF0aCwgZWxlY3Ryb25WZXJzaW9uLCBwUGxhdGZvcm0sIHBBcmNoKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9LFxuICAgIGFzeW5jIChidWlsZFBhdGgsIGVsZWN0cm9uVmVyc2lvbiwgcFBsYXRmb3JtLCBwQXJjaCwgZG9uZSkgPT4ge1xuICAgICAgYXdhaXQgcmVidWlsZEhvb2soYnVpbGRQYXRoLCBlbGVjdHJvblZlcnNpb24sIHBQbGF0Zm9ybSwgcEFyY2gsIGZvcmdlQ29uZmlnLnJlYnVpbGRDb25maWcpO1xuICAgICAgcGFja2FnZXJTcGlubmVyID0gb3JhKCdQYWNrYWdpbmcgQXBwbGljYXRpb24nKS5zdGFydCgpO1xuICAgICAgZG9uZSgpO1xuICAgIH0sXG4gIF07XG5cbiAgYWZ0ZXJDb3B5SG9va3MucHVzaChhc3luYyAoYnVpbGRQYXRoLCBlbGVjdHJvblZlcnNpb24sIHBQbGF0Zm9ybSwgcEFyY2gsIGRvbmUpID0+IHtcbiAgICBjb25zdCBjb3BpZWRQYWNrYWdlSlNPTiA9IGF3YWl0IHJlYWRQYWNrYWdlSlNPTihidWlsZFBhdGgpO1xuICAgIGlmIChjb3BpZWRQYWNrYWdlSlNPTi5jb25maWcgJiYgY29waWVkUGFja2FnZUpTT04uY29uZmlnLmZvcmdlKSB7XG4gICAgICBkZWxldGUgY29waWVkUGFja2FnZUpTT04uY29uZmlnLmZvcmdlO1xuICAgIH1cbiAgICBhd2FpdCBmcy53cml0ZUpzb24ocGF0aC5yZXNvbHZlKGJ1aWxkUGF0aCwgJ3BhY2thZ2UuanNvbicpLCBjb3BpZWRQYWNrYWdlSlNPTiwgeyBzcGFjZXM6IDIgfSk7XG4gICAgZG9uZSgpO1xuICB9KTtcblxuICBhZnRlckNvcHlIb29rcy5wdXNoKC4uLnJlc29sdmVIb29rcyhmb3JnZUNvbmZpZy5wYWNrYWdlckNvbmZpZy5hZnRlckNvcHksIGRpcikpO1xuXG4gIGNvbnN0IGFmdGVyUHJ1bmVIb29rcyA9IFtdO1xuXG4gIGlmIChwcnVuZUVuYWJsZWQpIHtcbiAgICBhZnRlclBydW5lSG9va3MucHVzaCguLi5yZXNvbHZlSG9va3MoZm9yZ2VDb25maWcucGFja2FnZXJDb25maWcuYWZ0ZXJQcnVuZSwgZGlyKSk7XG4gIH1cblxuICBhZnRlclBydW5lSG9va3MucHVzaChhc3luYyAoYnVpbGRQYXRoLCBlbGVjdHJvblZlcnNpb24sIHBQbGF0Zm9ybSwgcEFyY2gsIGRvbmUpID0+IHtcbiAgICBhd2FpdCBydW5Ib29rKGZvcmdlQ29uZmlnLCAncGFja2FnZUFmdGVyUHJ1bmUnLCBidWlsZFBhdGgsIGVsZWN0cm9uVmVyc2lvbiwgcFBsYXRmb3JtLCBwQXJjaCk7XG4gICAgZG9uZSgpO1xuICB9KTtcblxuICBjb25zdCBwYWNrYWdlT3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGFzYXI6IGZhbHNlLFxuICAgIG92ZXJ3cml0ZTogdHJ1ZSxcbiAgfSwgZm9yZ2VDb25maWcucGFja2FnZXJDb25maWcsIHtcbiAgICBhZnRlckNvcHk6IHNlcXVlbnRpYWxIb29rcyhhZnRlckNvcHlIb29rcyksXG4gICAgYWZ0ZXJFeHRyYWN0OiBzZXF1ZW50aWFsSG9va3MocmVzb2x2ZUhvb2tzKGZvcmdlQ29uZmlnLnBhY2thZ2VyQ29uZmlnLmFmdGVyRXh0cmFjdCwgZGlyKSksXG4gICAgYWZ0ZXJQcnVuZTogc2VxdWVudGlhbEhvb2tzKGFmdGVyUHJ1bmVIb29rcyksXG4gICAgZGlyLFxuICAgIGFyY2gsXG4gICAgcGxhdGZvcm0sXG4gICAgb3V0OiBvdXREaXIsXG4gICAgZWxlY3Ryb25WZXJzaW9uOiBnZXRFbGVjdHJvblZlcnNpb24ocGFja2FnZUpTT04pLFxuICB9KTtcbiAgcGFja2FnZU9wdHMucXVpZXQgPSB0cnVlO1xuXG4gIGlmICghcGFja2FnZUpTT04udmVyc2lvbiAmJiAhcGFja2FnZU9wdHMuYXBwVmVyc2lvbikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgd2FybihpbnRlcmFjdGl2ZSwgXCJQbGVhc2Ugc2V0ICd2ZXJzaW9uJyBvciAnY29uZmlnLmZvcmdlLmVsZWN0cm9uUGFja2FnZXJDb25maWcuYXBwVmVyc2lvbicgaW4geW91ciBhcHBsaWNhdGlvbidzIHBhY2thZ2UuanNvbiBzbyBhdXRvLXVwZGF0ZXMgd29yayBwcm9wZXJseVwiLnllbGxvdyk7XG4gIH1cblxuICBhd2FpdCBydW5Ib29rKGZvcmdlQ29uZmlnLCAnZ2VuZXJhdGVBc3NldHMnKTtcbiAgYXdhaXQgcnVuSG9vayhmb3JnZUNvbmZpZywgJ3ByZVBhY2thZ2UnKTtcblxuICBkKCdwYWNrYWdpbmcgd2l0aCBvcHRpb25zJywgcGFja2FnZU9wdHMpO1xuXG4gIGF3YWl0IHBhY2thZ2VyKHBhY2thZ2VPcHRzKTtcblxuICBhd2FpdCBydW5Ib29rKGZvcmdlQ29uZmlnLCAncG9zdFBhY2thZ2UnKTtcblxuICBwYWNrYWdlclNwaW5uZXIuc3VjY2VlZCgpO1xufTtcbiJdfQ==
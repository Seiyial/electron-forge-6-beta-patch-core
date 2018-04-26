"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("colors");

var _asyncOra = require("@electron-forge/async-ora");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _targets = require("electron-packager/targets");

var _forgeConfig = _interopRequireDefault(require("../util/forge-config"));

var _hook = _interopRequireDefault(require("../util/hook"));

var _messages = require("../util/messages");

var _parseArchs = _interopRequireDefault(require("../util/parse-archs"));

var _readPackageJson = _interopRequireDefault(require("../util/read-package-json"));

var _resolveDir = _interopRequireDefault(require("../util/resolve-dir"));

var _outDir = _interopRequireDefault(require("../util/out-dir"));

var _electronVersion = _interopRequireDefault(require("../util/electron-version"));

var _package = _interopRequireDefault(require("./package"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    let _Object$assign = Object.assign({
      dir: process.cwd(),
      interactive: false,
      skipPackage: false,
      arch: (0, _targets.hostArch)(),
      platform: process.platform
    }, providedOptions),
        dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        skipPackage = _Object$assign.skipPackage,
        overrideTargets = _Object$assign.overrideTargets,
        arch = _Object$assign.arch,
        platform = _Object$assign.platform;

    _asyncOra.asyncOra.interactive = interactive;
    let forgeConfig;
    yield (0, _asyncOra.asyncOra)('Resolving Forge Config',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      dir = yield (0, _resolveDir.default)(dir);

      if (!dir) {
        throw 'Failed to locate makeable Electron application';
      }

      forgeConfig = yield (0, _forgeConfig.default)(dir);
    }));
    const outDir = providedOptions.outDir || (0, _outDir.default)(dir, forgeConfig);
    const actualTargetPlatform = platform;
    platform = platform === 'mas' ? 'darwin' : platform;

    if (!['darwin', 'win32', 'linux', 'mas'].includes(actualTargetPlatform)) {
      throw new Error(`'${actualTargetPlatform}' is an invalid platform. Choices are 'darwin', 'mas', 'win32' or 'linux'`);
    }

    const makers = {};
    const targets = (overrideTargets || forgeConfig.makers.filter(maker => maker.platforms ? maker.platforms.indexOf(platform) !== -1 : true)).map(target => {
      if (typeof target === 'string') {
        return {
          name: target
        };
      }

      return target;
    });
    let targetId = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const target = _step.value;
        let maker;

        if (target.__isElectronForgeMaker) {
          maker = target;
        } else {
          let makerModule;

          try {
            makerModule = require(target.name);
          } catch (err) {
            console.error(err);
            throw `Could not find module with name: ${target.name}`;
          }

          const MakerClass = makerModule.default || makerModule;
          maker = new MakerClass(target.config, target.platforms);
        }

        if (!maker.isSupportedOnCurrentPlatform) {
          throw new Error([`Maker for target ${maker.name} is incompatible with this version of `, 'electron-forge, please upgrade or contact the maintainer ', '(needs to implement \'isSupportedOnCurrentPlatform)\')'].join(''));
        }

        if (!(yield maker.isSupportedOnCurrentPlatform())) {
          throw new Error([`Cannot build for ${platform} and target ${maker.name}: the maker declared `, `that it cannot run on ${process.platform}`].join(''));
        }

        makers[targetId] = maker;
        targetId += 1;
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

    if (!skipPackage) {
      (0, _messages.info)(interactive, 'We need to package your application before we can make it'.green);
      yield (0, _package.default)({
        dir,
        interactive,
        arch,
        outDir,
        platform: actualTargetPlatform
      });
    } else {
      (0, _messages.warn)(interactive, 'WARNING: Skipping the packaging step, this could result in an out of date build'.red);
    }

    (0, _messages.info)(interactive, 'Making for the following targets:', `${targets.join(', ')}`.cyan);
    const packageJSON = yield (0, _readPackageJson.default)(dir);
    const appName = forgeConfig.packagerConfig.name || packageJSON.productName || packageJSON.name;
    let outputs = [];
    yield (0, _hook.default)(forgeConfig, 'preMake');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _parseArchs.default)(platform, arch, (0, _electronVersion.default)(packageJSON))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        const targetArch = _step2.value;

        const packageDir = _path.default.resolve(outDir, `${appName}-${actualTargetPlatform}-${targetArch}`);

        if (!(yield _fsExtra.default.pathExists(packageDir))) {
          throw new Error(`Couldn't find packaged app at: ${packageDir}`);
        }

        targetId = 0;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = targets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            const target = _step3.value;
            const maker = makers[targetId];
            targetId += 1; // eslint-disable-next-line no-loop-func

            yield (0, _asyncOra.asyncOra)(`Making for target: ${maker.name} - On platform: ${actualTargetPlatform.cyan} - For arch: ${targetArch.cyan}`,
            /*#__PURE__*/
            _asyncToGenerator(function* () {
              try {
                const artifacts = yield maker.make({
                  dir: packageDir,
                  makeDir: _path.default.resolve(outDir, 'make'),
                  appName,
                  targetPlatform: actualTargetPlatform,
                  targetArch,
                  forgeConfig,
                  packageJSON
                });
                outputs.push({
                  artifacts,
                  packageJSON,
                  platform: actualTargetPlatform,
                  arch: targetArch
                });
              } catch (err) {
                if (err) {
                  throw {
                    message: `An error occured while making for target: ${target.name}`,
                    stack: `${err.message}\n${err.stack}`
                  };
                } else {
                  throw new Error(`An unknown error occured while making for target: ${target}`);
                }
              }
            }));
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
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

    const result = yield (0, _hook.default)(forgeConfig, 'postMake', outputs); // If the postMake hooks modifies the locations / names of the outputs it must return
    // the new locations so that the publish step knows where to look

    if (Array.isArray(result)) {
      outputs = result;
    }

    return outputs;
  });

  return function () {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvbWFrZS5qcyJdLCJuYW1lcyI6WyJwcm92aWRlZE9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJkaXIiLCJwcm9jZXNzIiwiY3dkIiwiaW50ZXJhY3RpdmUiLCJza2lwUGFja2FnZSIsImFyY2giLCJwbGF0Zm9ybSIsIm92ZXJyaWRlVGFyZ2V0cyIsImZvcmdlQ29uZmlnIiwib3V0RGlyIiwiYWN0dWFsVGFyZ2V0UGxhdGZvcm0iLCJpbmNsdWRlcyIsIkVycm9yIiwibWFrZXJzIiwidGFyZ2V0cyIsImZpbHRlciIsIm1ha2VyIiwicGxhdGZvcm1zIiwiaW5kZXhPZiIsIm1hcCIsInRhcmdldCIsIm5hbWUiLCJ0YXJnZXRJZCIsIl9faXNFbGVjdHJvbkZvcmdlTWFrZXIiLCJtYWtlck1vZHVsZSIsInJlcXVpcmUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJNYWtlckNsYXNzIiwiZGVmYXVsdCIsImNvbmZpZyIsImlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0iLCJqb2luIiwiZ3JlZW4iLCJyZWQiLCJjeWFuIiwicGFja2FnZUpTT04iLCJhcHBOYW1lIiwicGFja2FnZXJDb25maWciLCJwcm9kdWN0TmFtZSIsIm91dHB1dHMiLCJ0YXJnZXRBcmNoIiwicGFja2FnZURpciIsInJlc29sdmUiLCJwYXRoRXhpc3RzIiwiYXJ0aWZhY3RzIiwibWFrZSIsIm1ha2VEaXIiLCJ0YXJnZXRQbGF0Zm9ybSIsInB1c2giLCJtZXNzYWdlIiwic3RhY2siLCJyZXN1bHQiLCJBcnJheSIsImlzQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7OytCQWtDZSxXQUFPQSxrQkFBa0IsRUFBekIsRUFBZ0M7QUFDN0M7QUFENkMseUJBRTRCQyxPQUFPQyxNQUFQLENBQWM7QUFDckZDLFdB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TTtBQUZoQyxtQkFBTjtBQUlELGlCQUxELE1BS087QUFDTCx3QkFBTSxJQUFJeEMsS0FBSixDQUFXLHFEQUFvRFEsTUFBTyxFQUF0RSxDQUFOO0FBQ0Q7QUFDRjtBQUNGLGFBNUJLLEVBQU47QUE2QkQ7QUF6Q21GO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwQ3JGO0FBOUk0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWdKN0MsVUFBTWlDLGVBQWUsbUJBQVE3QyxXQUFSLEVBQXFCLFVBQXJCLEVBQWlDaUMsT0FBakMsQ0FBckIsQ0FoSjZDLENBaUo3QztBQUNBOztBQUNBLFFBQUlhLE1BQU1DLE9BQU4sQ0FBY0YsTUFBZCxDQUFKLEVBQTJCO0FBQ3pCWixnQkFBVVksTUFBVjtBQUNEOztBQUVELFdBQU9aLE9BQVA7QUFDRCxHIiwiZmlsZSI6Im1ha2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XG5pbXBvcnQgeyBhc3luY09yYSB9IGZyb20gJ0BlbGVjdHJvbi1mb3JnZS9hc3luYy1vcmEnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgaG9zdEFyY2ggfSBmcm9tICdlbGVjdHJvbi1wYWNrYWdlci90YXJnZXRzJztcblxuaW1wb3J0IGdldEZvcmdlQ29uZmlnIGZyb20gJy4uL3V0aWwvZm9yZ2UtY29uZmlnJztcbmltcG9ydCBydW5Ib29rIGZyb20gJy4uL3V0aWwvaG9vayc7XG5pbXBvcnQgeyBpbmZvLCB3YXJuIH0gZnJvbSAnLi4vdXRpbC9tZXNzYWdlcyc7XG5pbXBvcnQgcGFyc2VBcmNocyBmcm9tICcuLi91dGlsL3BhcnNlLWFyY2hzJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi4vdXRpbC9yZWFkLXBhY2thZ2UtanNvbic7XG5pbXBvcnQgcmVzb2x2ZURpciBmcm9tICcuLi91dGlsL3Jlc29sdmUtZGlyJztcbmltcG9ydCBnZXRDdXJyZW50T3V0RGlyIGZyb20gJy4uL3V0aWwvb3V0LWRpcic7XG5pbXBvcnQgZ2V0RWxlY3Ryb25WZXJzaW9uIGZyb20gJy4uL3V0aWwvZWxlY3Ryb24tdmVyc2lvbic7XG5cbmltcG9ydCBwYWNrYWdlciBmcm9tICcuL3BhY2thZ2UnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1ha2VUYXJnZXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbmFtZV0gVGhlIG1vZHVsZSBuYW1lIHRoYXQgZXhwb3J0cyB0aGUgbWFrZXJcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gW3BsYXRmb3Jtcz1udWxsXSBUaGUgcGxhdGZvcm1zIHRoaXMgbWFrZSB0YXJnZXQgc2hvdWxkIHJ1biBvblxuICogQHByb3BlcnR5IHtPYmplY3R9IFtjb25maWddIFRoZSBhcmJpdHJhcnkgY29uZmlnIHRvIHBhc3MgdG8gdGhpcyBtYWtlIHRhcmdldFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTWFrZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGlyPXByb2Nlc3MuY3dkKCldIFRoZSBwYXRoIHRvIHRoZSBhcHAgZnJvbSB3aGljaCBkaXN0cmlidXRhYmxlcyBhcmUgZ2VuZXJhdGVkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtpbnRlcmFjdGl2ZT1mYWxzZV0gV2hldGhlciB0byB1c2Ugc2Vuc2libGUgZGVmYXVsdHMgb3IgcHJvbXB0IHRoZSB1c2VyIHZpc3VhbGx5XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtza2lwUGFja2FnZT1mYWxzZV0gV2hldGhlciB0byBza2lwIHRoZSBwcmUtbWFrZSBwYWNrYWdpbmcgc3RlcFxuICogQHByb3BlcnR5IHtBcnJheTxNYWtlVGFyZ2V0Pn0gW292ZXJyaWRlVGFyZ2V0c10gQW4gYXJyYXkgb2YgbWFrZSB0YXJnZXRzIHRvIG92ZXJyaWRlIHlvdXIgZm9yZ2UgY29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2FyY2g9aG9zdCBhcmNoaXRlY3R1cmVdIFRoZSB0YXJnZXQgYXJjaGl0ZWN0dXJlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3BsYXRmb3JtPXByb2Nlc3MucGxhdGZvcm1dIFRoZSB0YXJnZXQgcGxhdGZvcm0uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW291dERpcj1gJHtkaXJ9L291dGBdIFRoZSBwYXRoIHRvIHRoZSBkaXJlY3RvcnkgY29udGFpbmluZyBnZW5lcmF0ZWQgZGlzdHJpYnV0YWJsZXNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1ha2VSZXN1bHRcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gYXJ0aWZhY3RzIEFuIGFycmF5IG9mIHBhdGhzIHRvIGFydGlmYWN0cyBnZW5lcmF0ZWQgZm9yIHRoaXMgbWFrZSBydW5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBwYWNrYWdlSlNPTiBUaGUgc3RhdGUgb2YgdGhlIHBhY2thZ2UuanNvbiBmaWxlIHdoZW4gdGhlIG1ha2UgaGFwcGVuZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gdGhpcyBtYWtlIHJ1biB3YXMgZm9yXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXJjaCBUaGUgYXJjaCB0aGlzIG1ha2UgcnVuIHdhcyBmb3JcbiAqL1xuXG4vKipcbiAqIE1ha2UgZGlzdHJpYnV0YWJsZXMgZm9yIGFuIEVsZWN0cm9uIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBwYXJhbSB7TWFrZU9wdGlvbnN9IHByb3ZpZGVkT3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBtYWtlIG1ldGhvZFxuICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxNYWtlUmVzdWx0Pj59IFdpbGwgcmVzb2x2ZSB3aGVuIHRoZSBtYWtlIHByb2Nlc3MgaXMgY29tcGxldGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHByb3ZpZGVkT3B0aW9ucyA9IHt9KSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3QsIG5vLXVudXNlZC12YXJzXG4gIGxldCB7IGRpciwgaW50ZXJhY3RpdmUsIHNraXBQYWNrYWdlLCBvdmVycmlkZVRhcmdldHMsIGFyY2gsIHBsYXRmb3JtIH0gPSBPYmplY3QuYXNzaWduKHtcbiAgICBkaXI6IHByb2Nlc3MuY3dkKCksXG4gICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgIHNraXBQYWNrYWdlOiBmYWxzZSxcbiAgICBhcmNoOiBob3N0QXJjaCgpLFxuICAgIHBsYXRmb3JtOiBwcm9jZXNzLnBsYXRmb3JtLFxuICB9LCBwcm92aWRlZE9wdGlvbnMpO1xuXG4gIGFzeW5jT3JhLmludGVyYWN0aXZlID0gaW50ZXJhY3RpdmU7XG5cbiAgbGV0IGZvcmdlQ29uZmlnO1xuICBhd2FpdCBhc3luY09yYSgnUmVzb2x2aW5nIEZvcmdlIENvbmZpZycsIGFzeW5jICgpID0+IHtcbiAgICBkaXIgPSBhd2FpdCByZXNvbHZlRGlyKGRpcik7XG4gICAgaWYgKCFkaXIpIHtcbiAgICAgIHRocm93ICdGYWlsZWQgdG8gbG9jYXRlIG1ha2VhYmxlIEVsZWN0cm9uIGFwcGxpY2F0aW9uJztcbiAgICB9XG5cbiAgICBmb3JnZUNvbmZpZyA9IGF3YWl0IGdldEZvcmdlQ29uZmlnKGRpcik7XG4gIH0pO1xuXG4gIGNvbnN0IG91dERpciA9IHByb3ZpZGVkT3B0aW9ucy5vdXREaXIgfHwgZ2V0Q3VycmVudE91dERpcihkaXIsIGZvcmdlQ29uZmlnKTtcblxuICBjb25zdCBhY3R1YWxUYXJnZXRQbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICBwbGF0Zm9ybSA9IHBsYXRmb3JtID09PSAnbWFzJyA/ICdkYXJ3aW4nIDogcGxhdGZvcm07XG4gIGlmICghWydkYXJ3aW4nLCAnd2luMzInLCAnbGludXgnLCAnbWFzJ10uaW5jbHVkZXMoYWN0dWFsVGFyZ2V0UGxhdGZvcm0pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAnJHthY3R1YWxUYXJnZXRQbGF0Zm9ybX0nIGlzIGFuIGludmFsaWQgcGxhdGZvcm0uIENob2ljZXMgYXJlICdkYXJ3aW4nLCAnbWFzJywgJ3dpbjMyJyBvciAnbGludXgnYCk7XG4gIH1cblxuICBjb25zdCBtYWtlcnMgPSB7fTtcbiAgY29uc3QgdGFyZ2V0cyA9IChvdmVycmlkZVRhcmdldHMgfHwgZm9yZ2VDb25maWcubWFrZXJzLmZpbHRlcihcbiAgICBtYWtlciA9PiBtYWtlci5wbGF0Zm9ybXNcbiAgICAgID8gbWFrZXIucGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0pICE9PSAtMVxuICAgICAgOiB0cnVlXG4gICkpLm1hcCgodGFyZ2V0KSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4geyBuYW1lOiB0YXJnZXQgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSk7XG5cbiAgbGV0IHRhcmdldElkID0gMDtcbiAgZm9yIChjb25zdCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgIGxldCBtYWtlcjtcbiAgICBpZiAodGFyZ2V0Ll9faXNFbGVjdHJvbkZvcmdlTWFrZXIpIHtcbiAgICAgIG1ha2VyID0gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWFrZXJNb2R1bGU7XG4gICAgICB0cnkge1xuICAgICAgICBtYWtlck1vZHVsZSA9IHJlcXVpcmUodGFyZ2V0Lm5hbWUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgdGhyb3cgYENvdWxkIG5vdCBmaW5kIG1vZHVsZSB3aXRoIG5hbWU6ICR7dGFyZ2V0Lm5hbWV9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgTWFrZXJDbGFzcyA9IG1ha2VyTW9kdWxlLmRlZmF1bHQgfHwgbWFrZXJNb2R1bGU7XG4gICAgICBtYWtlciA9IG5ldyBNYWtlckNsYXNzKHRhcmdldC5jb25maWcsIHRhcmdldC5wbGF0Zm9ybXMpO1xuICAgIH1cblxuICAgIGlmICghbWFrZXIuaXNTdXBwb3J0ZWRPbkN1cnJlbnRQbGF0Zm9ybSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFtcbiAgICAgICAgYE1ha2VyIGZvciB0YXJnZXQgJHttYWtlci5uYW1lfSBpcyBpbmNvbXBhdGlibGUgd2l0aCB0aGlzIHZlcnNpb24gb2YgYCxcbiAgICAgICAgJ2VsZWN0cm9uLWZvcmdlLCBwbGVhc2UgdXBncmFkZSBvciBjb250YWN0IHRoZSBtYWludGFpbmVyICcsXG4gICAgICAgICcobmVlZHMgdG8gaW1wbGVtZW50IFxcJ2lzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0pXFwnKScsXG4gICAgICBdLmpvaW4oJycpKTtcbiAgICB9XG5cbiAgICBpZiAoIWF3YWl0IG1ha2VyLmlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0oKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFtcbiAgICAgICAgYENhbm5vdCBidWlsZCBmb3IgJHtwbGF0Zm9ybX0gYW5kIHRhcmdldCAke21ha2VyLm5hbWV9OiB0aGUgbWFrZXIgZGVjbGFyZWQgYCxcbiAgICAgICAgYHRoYXQgaXQgY2Fubm90IHJ1biBvbiAke3Byb2Nlc3MucGxhdGZvcm19YCxcbiAgICAgIF0uam9pbignJykpO1xuICAgIH1cblxuICAgIG1ha2Vyc1t0YXJnZXRJZF0gPSBtYWtlcjtcbiAgICB0YXJnZXRJZCArPSAxO1xuICB9XG5cbiAgaWYgKCFza2lwUGFja2FnZSkge1xuICAgIGluZm8oaW50ZXJhY3RpdmUsICdXZSBuZWVkIHRvIHBhY2thZ2UgeW91ciBhcHBsaWNhdGlvbiBiZWZvcmUgd2UgY2FuIG1ha2UgaXQnLmdyZWVuKTtcbiAgICBhd2FpdCBwYWNrYWdlcih7XG4gICAgICBkaXIsXG4gICAgICBpbnRlcmFjdGl2ZSxcbiAgICAgIGFyY2gsXG4gICAgICBvdXREaXIsXG4gICAgICBwbGF0Zm9ybTogYWN0dWFsVGFyZ2V0UGxhdGZvcm0sXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgd2FybihpbnRlcmFjdGl2ZSwgJ1dBUk5JTkc6IFNraXBwaW5nIHRoZSBwYWNrYWdpbmcgc3RlcCwgdGhpcyBjb3VsZCByZXN1bHQgaW4gYW4gb3V0IG9mIGRhdGUgYnVpbGQnLnJlZCk7XG4gIH1cblxuICBpbmZvKGludGVyYWN0aXZlLCAnTWFraW5nIGZvciB0aGUgZm9sbG93aW5nIHRhcmdldHM6JywgYCR7dGFyZ2V0cy5qb2luKCcsICcpfWAuY3lhbik7XG5cbiAgY29uc3QgcGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04oZGlyKTtcbiAgY29uc3QgYXBwTmFtZSA9IGZvcmdlQ29uZmlnLnBhY2thZ2VyQ29uZmlnLm5hbWUgfHwgcGFja2FnZUpTT04ucHJvZHVjdE5hbWUgfHwgcGFja2FnZUpTT04ubmFtZTtcbiAgbGV0IG91dHB1dHMgPSBbXTtcblxuICBhd2FpdCBydW5Ib29rKGZvcmdlQ29uZmlnLCAncHJlTWFrZScpO1xuXG4gIGZvciAoY29uc3QgdGFyZ2V0QXJjaCBvZiBwYXJzZUFyY2hzKHBsYXRmb3JtLCBhcmNoLCBnZXRFbGVjdHJvblZlcnNpb24ocGFja2FnZUpTT04pKSkge1xuICAgIGNvbnN0IHBhY2thZ2VEaXIgPSBwYXRoLnJlc29sdmUob3V0RGlyLCBgJHthcHBOYW1lfS0ke2FjdHVhbFRhcmdldFBsYXRmb3JtfS0ke3RhcmdldEFyY2h9YCk7XG4gICAgaWYgKCEoYXdhaXQgZnMucGF0aEV4aXN0cyhwYWNrYWdlRGlyKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGRuJ3QgZmluZCBwYWNrYWdlZCBhcHAgYXQ6ICR7cGFja2FnZURpcn1gKTtcbiAgICB9XG5cbiAgICB0YXJnZXRJZCA9IDA7XG4gICAgZm9yIChjb25zdCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgICAgY29uc3QgbWFrZXIgPSBtYWtlcnNbdGFyZ2V0SWRdO1xuICAgICAgdGFyZ2V0SWQgKz0gMTtcblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvb3AtZnVuY1xuICAgICAgYXdhaXQgYXN5bmNPcmEoYE1ha2luZyBmb3IgdGFyZ2V0OiAke21ha2VyLm5hbWV9IC0gT24gcGxhdGZvcm06ICR7YWN0dWFsVGFyZ2V0UGxhdGZvcm0uY3lhbn0gLSBGb3IgYXJjaDogJHt0YXJnZXRBcmNoLmN5YW59YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGFydGlmYWN0cyA9IGF3YWl0IG1ha2VyLm1ha2Uoe1xuICAgICAgICAgICAgZGlyOiBwYWNrYWdlRGlyLFxuICAgICAgICAgICAgbWFrZURpcjogcGF0aC5yZXNvbHZlKG91dERpciwgJ21ha2UnKSxcbiAgICAgICAgICAgIGFwcE5hbWUsXG4gICAgICAgICAgICB0YXJnZXRQbGF0Zm9ybTogYWN0dWFsVGFyZ2V0UGxhdGZvcm0sXG4gICAgICAgICAgICB0YXJnZXRBcmNoLFxuICAgICAgICAgICAgZm9yZ2VDb25maWcsXG4gICAgICAgICAgICBwYWNrYWdlSlNPTixcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG91dHB1dHMucHVzaCh7XG4gICAgICAgICAgICBhcnRpZmFjdHMsXG4gICAgICAgICAgICBwYWNrYWdlSlNPTixcbiAgICAgICAgICAgIHBsYXRmb3JtOiBhY3R1YWxUYXJnZXRQbGF0Zm9ybSxcbiAgICAgICAgICAgIGFyY2g6IHRhcmdldEFyY2gsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgbWFraW5nIGZvciB0YXJnZXQ6ICR7dGFyZ2V0Lm5hbWV9YCxcbiAgICAgICAgICAgICAgc3RhY2s6IGAke2Vyci5tZXNzYWdlfVxcbiR7ZXJyLnN0YWNrfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFuIHVua25vd24gZXJyb3Igb2NjdXJlZCB3aGlsZSBtYWtpbmcgZm9yIHRhcmdldDogJHt0YXJnZXR9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBydW5Ib29rKGZvcmdlQ29uZmlnLCAncG9zdE1ha2UnLCBvdXRwdXRzKTtcbiAgLy8gSWYgdGhlIHBvc3RNYWtlIGhvb2tzIG1vZGlmaWVzIHRoZSBsb2NhdGlvbnMgLyBuYW1lcyBvZiB0aGUgb3V0cHV0cyBpdCBtdXN0IHJldHVyblxuICAvLyB0aGUgbmV3IGxvY2F0aW9ucyBzbyB0aGF0IHRoZSBwdWJsaXNoIHN0ZXAga25vd3Mgd2hlcmUgdG8gbG9va1xuICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XG4gICAgb3V0cHV0cyA9IHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXRzO1xufTtcbiJdfQ==
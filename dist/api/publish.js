"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("colors");

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _forgeConfig = _interopRequireDefault(require("../util/forge-config"));

var _readPackageJson = _interopRequireDefault(require("../util/read-package-json"));

var _resolveDir = _interopRequireDefault(require("../util/resolve-dir"));

var _publishState = _interopRequireDefault(require("../util/publish-state"));

var _outDir = _interopRequireDefault(require("../util/out-dir"));

var _make = _interopRequireDefault(require("./make"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:publish');
/**
 * @typedef {Object} PublishTarget
 * @property {string} [name]
 * @property {Array<string>} [platforms=[process.platform]]
 * @property {Object} [config={}]
 */

/**
 * @typedef {Object} PublishOptions
 * @property {string} [dir=process.cwd()] The path to the app to be published
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {string} [tag=packageJSON.version] The string to tag this release with
 * @property {Array<PublishTarget>} [publishTargets=[]] The publish targets
 * @property {MakeOptions} [makeOptions] Options object to passed through to make()
 * @property {string} [outDir=`${dir}/out`] The path to the directory containing generated distributables
 * @property {boolean} [dryRun=false] Whether to generate dry run meta data but not actually publish
 * @property {boolean} [dryRunResume=false] Whether or not to attempt to resume a previously saved `dryRun` and publish
 * @property {MakeResult} [makeResults=null] Provide results from make so that the publish step doesn't run make itself
 */

/**
 * Publish an Electron application into the given target service.
 *
 * @param {PublishOptions} providedOptions - Options for the Publish method
 * @return {Promise} Will resolve when the publish process is complete
 */

const publish =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    let _Object$assign = Object.assign({
      dir: process.cwd(),
      interactive: false,
      tag: null,
      makeOptions: {},
      publishTargets: null,
      dryRun: false,
      dryRunResume: false,
      makeResults: null
    }, providedOptions),
        dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        authToken = _Object$assign.authToken,
        tag = _Object$assign.tag,
        publishTargets = _Object$assign.publishTargets,
        makeOptions = _Object$assign.makeOptions,
        dryRun = _Object$assign.dryRun,
        dryRunResume = _Object$assign.dryRunResume,
        makeResults = _Object$assign.makeResults;

    _asyncOra.asyncOra.interactive = interactive;

    if (dryRun && dryRunResume) {
      throw 'Can\'t dry run and resume a dry run at the same time';
    }

    if (dryRunResume && makeResults) {
      throw 'Can\'t resume a dry run and use the provided makeResults at the same time';
    }

    let packageJSON = yield (0, _readPackageJson.default)(dir);
    if (tag === null) tag = packageJSON.version;
    const forgeConfig = yield (0, _forgeConfig.default)(dir);
    const outDir = providedOptions.outDir || (0, _outDir.default)(dir, forgeConfig);

    const dryRunDir = _path.default.resolve(outDir, 'publish-dry-run');

    if (dryRunResume) {
      d('attempting to resume from dry run');
      const publishes = yield _publishState.default.loadFromDirectory(dryRunDir, dir);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = publishes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const publishStates = _step.value;
          d('publishing for given state set');
          yield publish({
            dir,
            interactive,
            authToken,
            tag,
            publishTargets,
            makeOptions,
            dryRun: false,
            dryRunResume: false,
            makeResults: publishStates.map(({
              state
            }) => state)
          });
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

      return;
    } else if (!makeResults) {
      d('triggering make');
      makeResults = yield (0, _make.default)(Object.assign({
        dir,
        interactive
      }, makeOptions));
    } else {
      // Restore values from dry run
      d('restoring publish settings from dry run');
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = makeResults[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          const makeResult = _step2.value;
          packageJSON = makeResult.packageJSON;
          makeOptions.platform = makeResult.platform;
          makeOptions.arch = makeResult.arch;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = makeResult.artifacts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              const makePath = _step3.value;

              if (!(yield _fsExtra.default.exists(makePath))) {
                throw `Attempted to resume a dry run but an artifact (${makePath}) could not be found`;
              }
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
    }

    if (dryRun) {
      d('saving results of make in dry run state', makeResults);
      yield _fsExtra.default.remove(dryRunDir);
      yield _publishState.default.saveToDirectory(dryRunDir, makeResults, dir);
      return;
    }

    dir = yield (0, _resolveDir.default)(dir);

    if (!dir) {
      throw 'Failed to locate publishable Electron application';
    }

    const testPlatform = makeOptions.platform || process.platform;

    if (publishTargets === null) {
      publishTargets = (forgeConfig.publishers || []).filter(publisher => publisher.platforms ? publisher.platforms.indexOf(testPlatform !== -1) : true);
    }

    publishTargets = publishTargets.map(target => {
      if (typeof target === 'string') return {
        name: target
      };
      return target;
    });
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = publishTargets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        const publishTarget = _step4.value;
        let publisher;

        if (publishTarget.__isElectronForgePublisher) {
          publisher = publishTarget;
        } else {
          let publisherModule;
          yield (0, _asyncOra.asyncOra)(`Resolving publish target: ${`${publishTarget.name}`.cyan}`,
          /*#__PURE__*/
          _asyncToGenerator(function* () {
            // eslint-disable-line no-loop-func
            try {
              publisherModule = require(publishTarget.name);
            } catch (err) {
              console.error(err);
              throw `Could not find a publish target with the name: ${publishTarget.name}`;
            }
          }));
          const PublisherClass = publisherModule.default || publisherModule;
          publisher = new PublisherClass(publishTarget.config || {}, publishTarget.platforms);
        }

        yield publisher.publish({
          dir,
          makeResults,
          packageJSON,
          forgeConfig,
          tag,
          platform: makeOptions.platform || process.platform,
          arch: makeOptions.arch || process.arch
        });
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  });

  return function publish() {
    return _ref.apply(this, arguments);
  };
}();

var _default = publish;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvcHVibGlzaC5qcyJdLCJuYW1lcyI6WyJkIiwicHVibGlzaCIsInByb3ZpZGVkT3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsImRpciIsInByb2Nlc3MiLCJjd2QiLCJpbnRlcmFjdGl2ZSIsInRhZyIsIm1ha2VPcHRpb25zIiwicHVibGlzaFRhcmdldHMiLCJkcnlSdW4iLCJkcnlSdW5SZXN1bWUiLCJtYWtlUmVzdWx0cyIsImF1dGhUb2tlbiIsInBhY2thZ2VKU09OIiwidmVyc2lvbiIsImZvcmdlQ29uZmlnIiwib3V0RGlyIiwiZHJ5UnVuRGlyIiwicmVzb2x2ZSIsInB1Ymxpc2hlcyIsImxvYWRGcm9tRGlyZWN0b3J5IiwicHVibGlzaFN0YXRlcyIsIm1hcCIsInN0YXRlIiwibWFrZVJlc3VsdCIsInBsYXRmb3JtIiwiYXJjaCIsImFydGlmYWN0cyIsIm1ha2VQYXRoIiwiZXhpc3RzIiwicmVtb3ZlIiwic2F2ZVRvRGlyZWN0b3J5IiwidGVzdFBsYXRmb3JtIiwicHVibGlzaGVycyIsImZpbHRlciIsInB1Ymxpc2hlciIsInBsYXRmb3JtcyIsImluZGV4T2YiLCJ0YXJnZXQiLCJuYW1lIiwicHVibGlzaFRhcmdldCIsIl9faXNFbGVjdHJvbkZvcmdlUHVibGlzaGVyIiwicHVibGlzaGVyTW9kdWxlIiwiY3lhbiIsInJlcXVpcmUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJQdWJsaXNoZXJDbGFzcyIsImRlZmF1bHQiLCJjb25maWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSx3QkFBTixDQUFWO0FBRUE7Ozs7Ozs7QUFPQTs7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7O0FBTUEsTUFBTUM7QUFBQTtBQUFBO0FBQUEsK0JBQVUsV0FBT0Msa0JBQWtCLEVBQXpCLEVBQWdD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Q29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XG5pbXBvcnQgeyBhc3luY09yYSB9IGZyb20gJ0BlbGVjdHJvbi1mb3JnZS9hc3luYy1vcmEnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IGdldEZvcmdlQ29uZmlnIGZyb20gJy4uL3V0aWwvZm9yZ2UtY29uZmlnJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi4vdXRpbC9yZWFkLXBhY2thZ2UtanNvbic7XG5pbXBvcnQgcmVzb2x2ZURpciBmcm9tICcuLi91dGlsL3Jlc29sdmUtZGlyJztcbmltcG9ydCBQdWJsaXNoU3RhdGUgZnJvbSAnLi4vdXRpbC9wdWJsaXNoLXN0YXRlJztcbmltcG9ydCBnZXRDdXJyZW50T3V0RGlyIGZyb20gJy4uL3V0aWwvb3V0LWRpcic7XG5cbmltcG9ydCBtYWtlIGZyb20gJy4vbWFrZSc7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6cHVibGlzaCcpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFB1Ymxpc2hUYXJnZXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbmFtZV1cbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gW3BsYXRmb3Jtcz1bcHJvY2Vzcy5wbGF0Zm9ybV1dXG4gKiBAcHJvcGVydHkge09iamVjdH0gW2NvbmZpZz17fV1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFB1Ymxpc2hPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Rpcj1wcm9jZXNzLmN3ZCgpXSBUaGUgcGF0aCB0byB0aGUgYXBwIHRvIGJlIHB1Ymxpc2hlZFxuICogQHByb3BlcnR5IHtib29sZWFufSBbaW50ZXJhY3RpdmU9ZmFsc2VdIFdoZXRoZXIgdG8gdXNlIHNlbnNpYmxlIGRlZmF1bHRzIG9yIHByb21wdCB0aGUgdXNlciB2aXN1YWxseVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0YWc9cGFja2FnZUpTT04udmVyc2lvbl0gVGhlIHN0cmluZyB0byB0YWcgdGhpcyByZWxlYXNlIHdpdGhcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8UHVibGlzaFRhcmdldD59IFtwdWJsaXNoVGFyZ2V0cz1bXV0gVGhlIHB1Ymxpc2ggdGFyZ2V0c1xuICogQHByb3BlcnR5IHtNYWtlT3B0aW9uc30gW21ha2VPcHRpb25zXSBPcHRpb25zIG9iamVjdCB0byBwYXNzZWQgdGhyb3VnaCB0byBtYWtlKClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbb3V0RGlyPWAke2Rpcn0vb3V0YF0gVGhlIHBhdGggdG8gdGhlIGRpcmVjdG9yeSBjb250YWluaW5nIGdlbmVyYXRlZCBkaXN0cmlidXRhYmxlc1xuICogQHByb3BlcnR5IHtib29sZWFufSBbZHJ5UnVuPWZhbHNlXSBXaGV0aGVyIHRvIGdlbmVyYXRlIGRyeSBydW4gbWV0YSBkYXRhIGJ1dCBub3QgYWN0dWFsbHkgcHVibGlzaFxuICogQHByb3BlcnR5IHtib29sZWFufSBbZHJ5UnVuUmVzdW1lPWZhbHNlXSBXaGV0aGVyIG9yIG5vdCB0byBhdHRlbXB0IHRvIHJlc3VtZSBhIHByZXZpb3VzbHkgc2F2ZWQgYGRyeVJ1bmAgYW5kIHB1Ymxpc2hcbiAqIEBwcm9wZXJ0eSB7TWFrZVJlc3VsdH0gW21ha2VSZXN1bHRzPW51bGxdIFByb3ZpZGUgcmVzdWx0cyBmcm9tIG1ha2Ugc28gdGhhdCB0aGUgcHVibGlzaCBzdGVwIGRvZXNuJ3QgcnVuIG1ha2UgaXRzZWxmXG4gKi9cblxuLyoqXG4gKiBQdWJsaXNoIGFuIEVsZWN0cm9uIGFwcGxpY2F0aW9uIGludG8gdGhlIGdpdmVuIHRhcmdldCBzZXJ2aWNlLlxuICpcbiAqIEBwYXJhbSB7UHVibGlzaE9wdGlvbnN9IHByb3ZpZGVkT3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBQdWJsaXNoIG1ldGhvZFxuICogQHJldHVybiB7UHJvbWlzZX0gV2lsbCByZXNvbHZlIHdoZW4gdGhlIHB1Ymxpc2ggcHJvY2VzcyBpcyBjb21wbGV0ZVxuICovXG5jb25zdCBwdWJsaXNoID0gYXN5bmMgKHByb3ZpZGVkT3B0aW9ucyA9IHt9KSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3QsIG5vLXVudXNlZC12YXJzXG4gIGxldCB7IGRpciwgaW50ZXJhY3RpdmUsIGF1dGhUb2tlbiwgdGFnLCBwdWJsaXNoVGFyZ2V0cywgbWFrZU9wdGlvbnMsIGRyeVJ1biwgZHJ5UnVuUmVzdW1lLCBtYWtlUmVzdWx0cyB9ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgZGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICB0YWc6IG51bGwsXG4gICAgbWFrZU9wdGlvbnM6IHt9LFxuICAgIHB1Ymxpc2hUYXJnZXRzOiBudWxsLFxuICAgIGRyeVJ1bjogZmFsc2UsXG4gICAgZHJ5UnVuUmVzdW1lOiBmYWxzZSxcbiAgICBtYWtlUmVzdWx0czogbnVsbCxcbiAgfSwgcHJvdmlkZWRPcHRpb25zKTtcbiAgYXN5bmNPcmEuaW50ZXJhY3RpdmUgPSBpbnRlcmFjdGl2ZTtcblxuICBpZiAoZHJ5UnVuICYmIGRyeVJ1blJlc3VtZSkge1xuICAgIHRocm93ICdDYW5cXCd0IGRyeSBydW4gYW5kIHJlc3VtZSBhIGRyeSBydW4gYXQgdGhlIHNhbWUgdGltZSc7XG4gIH1cbiAgaWYgKGRyeVJ1blJlc3VtZSAmJiBtYWtlUmVzdWx0cykge1xuICAgIHRocm93ICdDYW5cXCd0IHJlc3VtZSBhIGRyeSBydW4gYW5kIHVzZSB0aGUgcHJvdmlkZWQgbWFrZVJlc3VsdHMgYXQgdGhlIHNhbWUgdGltZSc7XG4gIH1cblxuICBsZXQgcGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04oZGlyKTtcbiAgaWYgKHRhZyA9PT0gbnVsbCkgdGFnID0gcGFja2FnZUpTT04udmVyc2lvbjtcblxuICBjb25zdCBmb3JnZUNvbmZpZyA9IGF3YWl0IGdldEZvcmdlQ29uZmlnKGRpcik7XG4gIGNvbnN0IG91dERpciA9IHByb3ZpZGVkT3B0aW9ucy5vdXREaXIgfHwgZ2V0Q3VycmVudE91dERpcihkaXIsIGZvcmdlQ29uZmlnKTtcbiAgY29uc3QgZHJ5UnVuRGlyID0gcGF0aC5yZXNvbHZlKG91dERpciwgJ3B1Ymxpc2gtZHJ5LXJ1bicpO1xuXG4gIGlmIChkcnlSdW5SZXN1bWUpIHtcbiAgICBkKCdhdHRlbXB0aW5nIHRvIHJlc3VtZSBmcm9tIGRyeSBydW4nKTtcbiAgICBjb25zdCBwdWJsaXNoZXMgPSBhd2FpdCBQdWJsaXNoU3RhdGUubG9hZEZyb21EaXJlY3RvcnkoZHJ5UnVuRGlyLCBkaXIpO1xuICAgIGZvciAoY29uc3QgcHVibGlzaFN0YXRlcyBvZiBwdWJsaXNoZXMpIHtcbiAgICAgIGQoJ3B1Ymxpc2hpbmcgZm9yIGdpdmVuIHN0YXRlIHNldCcpO1xuICAgICAgYXdhaXQgcHVibGlzaCh7XG4gICAgICAgIGRpcixcbiAgICAgICAgaW50ZXJhY3RpdmUsXG4gICAgICAgIGF1dGhUb2tlbixcbiAgICAgICAgdGFnLFxuICAgICAgICBwdWJsaXNoVGFyZ2V0cyxcbiAgICAgICAgbWFrZU9wdGlvbnMsXG4gICAgICAgIGRyeVJ1bjogZmFsc2UsXG4gICAgICAgIGRyeVJ1blJlc3VtZTogZmFsc2UsXG4gICAgICAgIG1ha2VSZXN1bHRzOiBwdWJsaXNoU3RhdGVzLm1hcCgoeyBzdGF0ZSB9KSA9PiBzdGF0ZSksXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKCFtYWtlUmVzdWx0cykge1xuICAgIGQoJ3RyaWdnZXJpbmcgbWFrZScpO1xuICAgIG1ha2VSZXN1bHRzID0gYXdhaXQgbWFrZShPYmplY3QuYXNzaWduKHtcbiAgICAgIGRpcixcbiAgICAgIGludGVyYWN0aXZlLFxuICAgIH0sIG1ha2VPcHRpb25zKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gUmVzdG9yZSB2YWx1ZXMgZnJvbSBkcnkgcnVuXG4gICAgZCgncmVzdG9yaW5nIHB1Ymxpc2ggc2V0dGluZ3MgZnJvbSBkcnkgcnVuJyk7XG5cbiAgICBmb3IgKGNvbnN0IG1ha2VSZXN1bHQgb2YgbWFrZVJlc3VsdHMpIHtcbiAgICAgIHBhY2thZ2VKU09OID0gbWFrZVJlc3VsdC5wYWNrYWdlSlNPTjtcbiAgICAgIG1ha2VPcHRpb25zLnBsYXRmb3JtID0gbWFrZVJlc3VsdC5wbGF0Zm9ybTtcbiAgICAgIG1ha2VPcHRpb25zLmFyY2ggPSBtYWtlUmVzdWx0LmFyY2g7XG5cbiAgICAgIGZvciAoY29uc3QgbWFrZVBhdGggb2YgbWFrZVJlc3VsdC5hcnRpZmFjdHMpIHtcbiAgICAgICAgaWYgKCFhd2FpdCBmcy5leGlzdHMobWFrZVBhdGgpKSB7XG4gICAgICAgICAgdGhyb3cgYEF0dGVtcHRlZCB0byByZXN1bWUgYSBkcnkgcnVuIGJ1dCBhbiBhcnRpZmFjdCAoJHttYWtlUGF0aH0pIGNvdWxkIG5vdCBiZSBmb3VuZGA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoZHJ5UnVuKSB7XG4gICAgZCgnc2F2aW5nIHJlc3VsdHMgb2YgbWFrZSBpbiBkcnkgcnVuIHN0YXRlJywgbWFrZVJlc3VsdHMpO1xuICAgIGF3YWl0IGZzLnJlbW92ZShkcnlSdW5EaXIpO1xuICAgIGF3YWl0IFB1Ymxpc2hTdGF0ZS5zYXZlVG9EaXJlY3RvcnkoZHJ5UnVuRGlyLCBtYWtlUmVzdWx0cywgZGlyKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBkaXIgPSBhd2FpdCByZXNvbHZlRGlyKGRpcik7XG4gIGlmICghZGlyKSB7XG4gICAgdGhyb3cgJ0ZhaWxlZCB0byBsb2NhdGUgcHVibGlzaGFibGUgRWxlY3Ryb24gYXBwbGljYXRpb24nO1xuICB9XG5cbiAgY29uc3QgdGVzdFBsYXRmb3JtID0gbWFrZU9wdGlvbnMucGxhdGZvcm0gfHwgcHJvY2Vzcy5wbGF0Zm9ybTtcbiAgaWYgKHB1Ymxpc2hUYXJnZXRzID09PSBudWxsKSB7XG4gICAgcHVibGlzaFRhcmdldHMgPSAoZm9yZ2VDb25maWcucHVibGlzaGVycyB8fCBbXSlcbiAgICAgIC5maWx0ZXIocHVibGlzaGVyID0+IHB1Ymxpc2hlci5wbGF0Zm9ybXMgPyBwdWJsaXNoZXIucGxhdGZvcm1zLmluZGV4T2YodGVzdFBsYXRmb3JtICE9PSAtMSkgOiB0cnVlKTtcbiAgfVxuICBwdWJsaXNoVGFyZ2V0cyA9IHB1Ymxpc2hUYXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSByZXR1cm4geyBuYW1lOiB0YXJnZXQgfTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9KTtcblxuICBmb3IgKGNvbnN0IHB1Ymxpc2hUYXJnZXQgb2YgcHVibGlzaFRhcmdldHMpIHtcbiAgICBsZXQgcHVibGlzaGVyO1xuICAgIGlmIChwdWJsaXNoVGFyZ2V0Ll9faXNFbGVjdHJvbkZvcmdlUHVibGlzaGVyKSB7XG4gICAgICBwdWJsaXNoZXIgPSBwdWJsaXNoVGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcHVibGlzaGVyTW9kdWxlO1xuICAgICAgYXdhaXQgYXN5bmNPcmEoYFJlc29sdmluZyBwdWJsaXNoIHRhcmdldDogJHtgJHtwdWJsaXNoVGFyZ2V0Lm5hbWV9YC5jeWFufWAsIGFzeW5jICgpID0+IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb29wLWZ1bmNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwdWJsaXNoZXJNb2R1bGUgPSByZXF1aXJlKHB1Ymxpc2hUYXJnZXQubmFtZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICB0aHJvdyBgQ291bGQgbm90IGZpbmQgYSBwdWJsaXNoIHRhcmdldCB3aXRoIHRoZSBuYW1lOiAke3B1Ymxpc2hUYXJnZXQubmFtZX1gO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgUHVibGlzaGVyQ2xhc3MgPSBwdWJsaXNoZXJNb2R1bGUuZGVmYXVsdCB8fCBwdWJsaXNoZXJNb2R1bGU7XG4gICAgICBwdWJsaXNoZXIgPSBuZXcgUHVibGlzaGVyQ2xhc3MocHVibGlzaFRhcmdldC5jb25maWcgfHwge30sIHB1Ymxpc2hUYXJnZXQucGxhdGZvcm1zKTtcbiAgICB9XG5cbiAgICBhd2FpdCBwdWJsaXNoZXIucHVibGlzaCh7XG4gICAgICBkaXIsXG4gICAgICBtYWtlUmVzdWx0cyxcbiAgICAgIHBhY2thZ2VKU09OLFxuICAgICAgZm9yZ2VDb25maWcsXG4gICAgICB0YWcsXG4gICAgICBwbGF0Zm9ybTogbWFrZU9wdGlvbnMucGxhdGZvcm0gfHwgcHJvY2Vzcy5wbGF0Zm9ybSxcbiAgICAgIGFyY2g6IG1ha2VPcHRpb25zLmFyY2ggfHwgcHJvY2Vzcy5hcmNoLFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwdWJsaXNoO1xuIl19
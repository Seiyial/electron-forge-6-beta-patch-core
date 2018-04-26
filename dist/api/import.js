"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _initGit = _interopRequireDefault(require("./init-scripts/init-git"));

var _initNpm = require("./init-scripts/init-npm");

var _forgeConfig = require("../util/forge-config");

var _messages = require("../util/messages");

var _installDependencies = _interopRequireDefault(require("../util/install-dependencies"));

var _readPackageJson = _interopRequireDefault(require("../util/read-package-json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:import');
/**
 * @typedef {Object} ImportOptions
 * @property {string} [dir=process.cwd()] The path to the app to be imported
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {function} [confirmImport] An async function that returns true or false in order to confirm the start of importing
 * @property {function} [shouldContinueOnExisting] An async function that returns whether the import should continue if it looks like a forge project already
 * @property {function} [shouldRemoveDependency] An async function that returns whether the given dependency should be removed
 * @property {function} [shouldUpdateScript] An async function that returns whether the given script should be overridden with a forge one
 * @property {string} [outDir=`${dir}/out`] The path to the directory containing generated distributables
 */

/**
 * Attempt to import a given module directory to the Electron Forge standard.
 *
 * - Sets up `git` and the correct NPM dependencies
 * - Adds a template forge config to `package.json`
 *
 * @param {ImportOptions} providedOptions - Options for the import method
 * @return {Promise} Will resolve when the import process is complete
 */

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (providedOptions = {}) {
    const _Object$assign = Object.assign({
      dir: process.cwd(),
      interactive: false
    }, providedOptions),
          dir = _Object$assign.dir,
          interactive = _Object$assign.interactive,
          confirmImport = _Object$assign.confirmImport,
          shouldContinueOnExisting = _Object$assign.shouldContinueOnExisting,
          shouldRemoveDependency = _Object$assign.shouldRemoveDependency,
          shouldUpdateScript = _Object$assign.shouldUpdateScript;

    const outDir = providedOptions.outDir || 'out';
    _asyncOra.asyncOra.interactive = interactive;
    d(`Attempting to import project in: ${dir}`);

    if (!(yield _fsExtra.default.pathExists(dir)) || !(yield _fsExtra.default.pathExists(_path.default.resolve(dir, 'package.json')))) {
      throw `We couldn't find a project in: ${dir}`;
    } // eslint-disable-next-line max-len


    if (typeof confirmImport === 'function') {
      if (!(yield confirmImport())) {
        process.exit(0);
      }
    }

    yield (0, _initGit.default)(dir);
    let packageJSON = yield (0, _readPackageJson.default)(dir);

    if (packageJSON.config && packageJSON.config.forge) {
      (0, _messages.warn)(interactive, 'It looks like this project is already configured for "electron-forge"'.green);

      if (typeof shouldContinueOnExisting === 'function') {
        if (!(yield shouldContinueOnExisting())) {
          process.exit(0);
        }
      }
    }

    packageJSON.dependencies = packageJSON.dependencies || {};
    packageJSON.devDependencies = packageJSON.devDependencies || {};
    const keys = Object.keys(packageJSON.dependencies).concat(Object.keys(packageJSON.devDependencies));
    const buildToolPackages = {
      'electron-builder': 'provides mostly equivalent functionality',
      'electron-download': 'already uses this module as a transitive dependency',
      'electron-installer-debian': 'already uses this module as a transitive dependency',
      'electron-installer-dmg': 'already uses this module as a transitive dependency',
      'electron-installer-flatpak': 'already uses this module as a transitive dependency',
      'electron-installer-redhat': 'already uses this module as a transitive dependency',
      'electron-osx-sign': 'already uses this module as a transitive dependency',
      'electron-packager': 'already uses this module as a transitive dependency',
      'electron-winstaller': 'already uses this module as a transitive dependency'
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const key = _step.value;

        if (buildToolPackages[key]) {
          const explanation = buildToolPackages[key]; // eslint-disable-next-line max-len

          let remove = true;

          if (typeof shouldRemoveDependency === 'function') {
            remove = yield shouldRemoveDependency(key, explanation);
          }

          if (remove) {
            delete packageJSON.dependencies[key];
            delete packageJSON.devDependencies[key];
          }
        }
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

    packageJSON.scripts = packageJSON.scripts || {};
    d('reading current scripts object:', packageJSON.scripts);

    const updatePackageScript =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (scriptName, newValue) {
        if (packageJSON.scripts[scriptName] !== newValue) {
          // eslint-disable-next-line max-len
          let update = true;

          if (typeof shouldUpdateScript === 'function') {
            update = yield shouldUpdateScript(scriptName, newValue);
          }

          if (update) {
            packageJSON.scripts[scriptName] = newValue;
          }
        }
      });

      return function updatePackageScript(_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    yield updatePackageScript('start', 'electron-forge start');
    yield updatePackageScript('package', 'electron-forge package');
    yield updatePackageScript('make', 'electron-forge make');
    d('forgified scripts object:', packageJSON.scripts);

    const writeChanges =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(function* () {
        yield (0, _asyncOra.asyncOra)('Writing modified package.json file',
        /*#__PURE__*/
        _asyncToGenerator(function* () {
          yield _fsExtra.default.writeJson(_path.default.resolve(dir, 'package.json'), packageJSON, {
            spaces: 2
          });
        }));
      });

      return function writeChanges() {
        return _ref3.apply(this, arguments);
      };
    }();

    yield writeChanges();
    yield (0, _asyncOra.asyncOra)('Installing dependencies',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      d('deleting old dependencies forcefully');
      yield _fsExtra.default.remove(_path.default.resolve(dir, 'node_modules/.bin/electron'));
      yield _fsExtra.default.remove(_path.default.resolve(dir, 'node_modules/.bin/electron.cmd'));
      d('installing dependencies');
      yield (0, _installDependencies.default)(dir, _initNpm.deps);
      d('installing devDependencies');
      yield (0, _installDependencies.default)(dir, _initNpm.devDeps, true);
      d('installing exactDevDependencies');
      yield (0, _installDependencies.default)(dir, _initNpm.exactDevDeps, true, true);
    }));
    packageJSON = yield (0, _readPackageJson.default)(dir);

    if (!packageJSON.version) {
      (0, _messages.warn)(interactive, "Please set the 'version' in your application's package.json".yellow);
    }

    packageJSON.config = packageJSON.config || {};
    const templatePackageJSON = yield (0, _readPackageJson.default)(_path.default.resolve(__dirname, '../../tmpl'));
    packageJSON.config.forge = templatePackageJSON.config.forge;
    (0, _forgeConfig.setInitialForgeConfig)(packageJSON);
    yield writeChanges();
    yield (0, _asyncOra.asyncOra)('Fixing .gitignore',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      if (yield _fsExtra.default.pathExists(_path.default.resolve(dir, '.gitignore'))) {
        const gitignore = yield _fsExtra.default.readFile(_path.default.resolve(dir, '.gitignore'));

        if (!gitignore.includes(outDir)) {
          yield _fsExtra.default.writeFile(_path.default.resolve(dir, '.gitignore'), `${gitignore}\n${outDir}/`);
        }
      }
    }));
    (0, _messages.info)(interactive, `

We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

Thanks for using ${'"electron-forge"'.green}!!!`);
  });

  return function () {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaW1wb3J0LmpzIl0sIm5hbWVzIjpbImQiLCJwcm92aWRlZE9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJkaXIiLCJwcm9jZXNzIiwiY3dkIiwiaW50ZXJhY3RpdmUiLCJjb25maXJtSW1wb3J0Iiwic2hvdWxkQ29udGludWVPbkV4aXN0aW5nIiwic2hvdWxkUmVtb3ZlRGVwZW5kZW5jeSIsInNob3VsZFVwZGF0ZVNjcmlwdCIsIm91dERpciIsInBhdGhFeGlzdHMiLCJyZXNvbHZlIiwiZXhpdCIsInBhY2thZ2VKU09OIiwiY29uZmlnIiwiZm9yZ2UiLCJncmVlbiIsImRlcGVuZGVuY2llcyIsImRldkRlcGVuZGVuY2llcyIsImtleXMiLCJjb25jYXQiLCJidWlsZFRvb2xQYWNrYWdlcyIsImtleSIsImV4cGxhbmF0aW9uIiwicmVtb3ZlIiwic2NyaXB0cyIsInVwZGF0ZVBhY2thZ2VTY3JpcHQiLCJzY3JpcHROYW1lIiwibmV3VmFsdWUiLCJ1cGRhdGUiLCJ3cml0ZUNoYW5nZXMiLCJ3cml0ZUpzb24iLCJzcGFjZXMiLCJ2ZXJzaW9uIiwieWVsbG93IiwidGVtcGxhdGVQYWNrYWdlSlNPTiIsIl9fZGlybmFtZSIsImdpdGlnbm9yZSIsInJlYWRGaWxlIiwiaW5jbHVkZXMiLCJ3cml0ZUZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSx1QkFBTixDQUFWO0FBRUE7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7Ozs7K0JBU2UsV0FBT0Msa0JBQWtCLEVBQXpCLEVBQWdDO0FBQUEsMkJBRTRCQyxPQUFPQyxNQUFQLENBQWM7QUFDckZDLFdBQUtDLFFBQVFDLEdBQVIsRUFEZ0Y7QUFFckZDLG1CQUFhO0FBRndFLEtBQWQsRUFHdEVOLGVBSHNFLENBRjVCO0FBQUEsVUFDckNHLEdBRHFD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QkFBTSxpQkFBRytCLFNBQUgsQ0FBYSxjQUFLN0IsT0FBTCxDQUFhVixHQUFiLEVBQWtCLFlBQWxCLENBQWIsRUFBK0MsR0FBRW9DLFNBQVUsS0FBSTVCLE1BQU8sR0FBdEUsQ0FBTjtBQUNEO0FBQ0Y7QUFDRixLQVBLLEVBQU47QUFTQSx3QkFBS0wsV0FBTCxFQUFtQjs7OzttQkFJRixtQkFBbUJZLEtBQU0sS0FKMUM7QUFLRCxHIiwiZmlsZSI6ImltcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFzeW5jT3JhIH0gZnJvbSAnQGVsZWN0cm9uLWZvcmdlL2FzeW5jLW9yYSc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgaW5pdEdpdCBmcm9tICcuL2luaXQtc2NyaXB0cy9pbml0LWdpdCc7XG5pbXBvcnQgeyBkZXBzLCBkZXZEZXBzLCBleGFjdERldkRlcHMgfSBmcm9tICcuL2luaXQtc2NyaXB0cy9pbml0LW5wbSc7XG5cbmltcG9ydCB7IHNldEluaXRpYWxGb3JnZUNvbmZpZyB9IGZyb20gJy4uL3V0aWwvZm9yZ2UtY29uZmlnJztcbmltcG9ydCB7IGluZm8sIHdhcm4gfSBmcm9tICcuLi91dGlsL21lc3NhZ2VzJztcbmltcG9ydCBpbnN0YWxsRGVwTGlzdCBmcm9tICcuLi91dGlsL2luc3RhbGwtZGVwZW5kZW5jaWVzJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi4vdXRpbC9yZWFkLXBhY2thZ2UtanNvbic7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6aW1wb3J0Jyk7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gSW1wb3J0T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkaXI9cHJvY2Vzcy5jd2QoKV0gVGhlIHBhdGggdG8gdGhlIGFwcCB0byBiZSBpbXBvcnRlZFxuICogQHByb3BlcnR5IHtib29sZWFufSBbaW50ZXJhY3RpdmU9ZmFsc2VdIFdoZXRoZXIgdG8gdXNlIHNlbnNpYmxlIGRlZmF1bHRzIG9yIHByb21wdCB0aGUgdXNlciB2aXN1YWxseVxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW2NvbmZpcm1JbXBvcnRdIEFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0cnVlIG9yIGZhbHNlIGluIG9yZGVyIHRvIGNvbmZpcm0gdGhlIHN0YXJ0IG9mIGltcG9ydGluZ1xuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW3Nob3VsZENvbnRpbnVlT25FeGlzdGluZ10gQW4gYXN5bmMgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHdoZXRoZXIgdGhlIGltcG9ydCBzaG91bGQgY29udGludWUgaWYgaXQgbG9va3MgbGlrZSBhIGZvcmdlIHByb2plY3QgYWxyZWFkeVxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW3Nob3VsZFJlbW92ZURlcGVuZGVuY3ldIEFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiBkZXBlbmRlbmN5IHNob3VsZCBiZSByZW1vdmVkXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBbc2hvdWxkVXBkYXRlU2NyaXB0XSBBbiBhc3luYyBmdW5jdGlvbiB0aGF0IHJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gc2NyaXB0IHNob3VsZCBiZSBvdmVycmlkZGVuIHdpdGggYSBmb3JnZSBvbmVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbb3V0RGlyPWAke2Rpcn0vb3V0YF0gVGhlIHBhdGggdG8gdGhlIGRpcmVjdG9yeSBjb250YWluaW5nIGdlbmVyYXRlZCBkaXN0cmlidXRhYmxlc1xuICovXG5cbi8qKlxuICogQXR0ZW1wdCB0byBpbXBvcnQgYSBnaXZlbiBtb2R1bGUgZGlyZWN0b3J5IHRvIHRoZSBFbGVjdHJvbiBGb3JnZSBzdGFuZGFyZC5cbiAqXG4gKiAtIFNldHMgdXAgYGdpdGAgYW5kIHRoZSBjb3JyZWN0IE5QTSBkZXBlbmRlbmNpZXNcbiAqIC0gQWRkcyBhIHRlbXBsYXRlIGZvcmdlIGNvbmZpZyB0byBgcGFja2FnZS5qc29uYFxuICpcbiAqIEBwYXJhbSB7SW1wb3J0T3B0aW9uc30gcHJvdmlkZWRPcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGltcG9ydCBtZXRob2RcbiAqIEByZXR1cm4ge1Byb21pc2V9IFdpbGwgcmVzb2x2ZSB3aGVuIHRoZSBpbXBvcnQgcHJvY2VzcyBpcyBjb21wbGV0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocHJvdmlkZWRPcHRpb25zID0ge30pID0+IHtcbiAgY29uc3QgeyBkaXIsIGludGVyYWN0aXZlLCBjb25maXJtSW1wb3J0LFxuICBzaG91bGRDb250aW51ZU9uRXhpc3RpbmcsIHNob3VsZFJlbW92ZURlcGVuZGVuY3ksIHNob3VsZFVwZGF0ZVNjcmlwdCB9ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgZGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgfSwgcHJvdmlkZWRPcHRpb25zKTtcblxuICBjb25zdCBvdXREaXIgPSBwcm92aWRlZE9wdGlvbnMub3V0RGlyIHx8ICdvdXQnO1xuICBhc3luY09yYS5pbnRlcmFjdGl2ZSA9IGludGVyYWN0aXZlO1xuXG4gIGQoYEF0dGVtcHRpbmcgdG8gaW1wb3J0IHByb2plY3QgaW46ICR7ZGlyfWApO1xuICBpZiAoIWF3YWl0IGZzLnBhdGhFeGlzdHMoZGlyKSB8fCAhYXdhaXQgZnMucGF0aEV4aXN0cyhwYXRoLnJlc29sdmUoZGlyLCAncGFja2FnZS5qc29uJykpKSB7XG4gICAgdGhyb3cgYFdlIGNvdWxkbid0IGZpbmQgYSBwcm9qZWN0IGluOiAke2Rpcn1gO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgaWYgKHR5cGVvZiBjb25maXJtSW1wb3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKCFhd2FpdCBjb25maXJtSW1wb3J0KCkpIHtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gIH1cblxuICBhd2FpdCBpbml0R2l0KGRpcik7XG5cbiAgbGV0IHBhY2thZ2VKU09OID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKGRpcik7XG4gIGlmIChwYWNrYWdlSlNPTi5jb25maWcgJiYgcGFja2FnZUpTT04uY29uZmlnLmZvcmdlKSB7XG4gICAgd2FybihpbnRlcmFjdGl2ZSwgJ0l0IGxvb2tzIGxpa2UgdGhpcyBwcm9qZWN0IGlzIGFscmVhZHkgY29uZmlndXJlZCBmb3IgXCJlbGVjdHJvbi1mb3JnZVwiJy5ncmVlbik7XG4gICAgaWYgKHR5cGVvZiBzaG91bGRDb250aW51ZU9uRXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmICghYXdhaXQgc2hvdWxkQ29udGludWVPbkV4aXN0aW5nKCkpIHtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhY2thZ2VKU09OLmRlcGVuZGVuY2llcyA9IHBhY2thZ2VKU09OLmRlcGVuZGVuY2llcyB8fCB7fTtcbiAgcGFja2FnZUpTT04uZGV2RGVwZW5kZW5jaWVzID0gcGFja2FnZUpTT04uZGV2RGVwZW5kZW5jaWVzIHx8IHt9O1xuXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwYWNrYWdlSlNPTi5kZXBlbmRlbmNpZXMpLmNvbmNhdChPYmplY3Qua2V5cyhwYWNrYWdlSlNPTi5kZXZEZXBlbmRlbmNpZXMpKTtcbiAgY29uc3QgYnVpbGRUb29sUGFja2FnZXMgPSB7XG4gICAgJ2VsZWN0cm9uLWJ1aWxkZXInOiAncHJvdmlkZXMgbW9zdGx5IGVxdWl2YWxlbnQgZnVuY3Rpb25hbGl0eScsXG4gICAgJ2VsZWN0cm9uLWRvd25sb2FkJzogJ2FscmVhZHkgdXNlcyB0aGlzIG1vZHVsZSBhcyBhIHRyYW5zaXRpdmUgZGVwZW5kZW5jeScsXG4gICAgJ2VsZWN0cm9uLWluc3RhbGxlci1kZWJpYW4nOiAnYWxyZWFkeSB1c2VzIHRoaXMgbW9kdWxlIGFzIGEgdHJhbnNpdGl2ZSBkZXBlbmRlbmN5JyxcbiAgICAnZWxlY3Ryb24taW5zdGFsbGVyLWRtZyc6ICdhbHJlYWR5IHVzZXMgdGhpcyBtb2R1bGUgYXMgYSB0cmFuc2l0aXZlIGRlcGVuZGVuY3knLFxuICAgICdlbGVjdHJvbi1pbnN0YWxsZXItZmxhdHBhayc6ICdhbHJlYWR5IHVzZXMgdGhpcyBtb2R1bGUgYXMgYSB0cmFuc2l0aXZlIGRlcGVuZGVuY3knLFxuICAgICdlbGVjdHJvbi1pbnN0YWxsZXItcmVkaGF0JzogJ2FscmVhZHkgdXNlcyB0aGlzIG1vZHVsZSBhcyBhIHRyYW5zaXRpdmUgZGVwZW5kZW5jeScsXG4gICAgJ2VsZWN0cm9uLW9zeC1zaWduJzogJ2FscmVhZHkgdXNlcyB0aGlzIG1vZHVsZSBhcyBhIHRyYW5zaXRpdmUgZGVwZW5kZW5jeScsXG4gICAgJ2VsZWN0cm9uLXBhY2thZ2VyJzogJ2FscmVhZHkgdXNlcyB0aGlzIG1vZHVsZSBhcyBhIHRyYW5zaXRpdmUgZGVwZW5kZW5jeScsXG4gICAgJ2VsZWN0cm9uLXdpbnN0YWxsZXInOiAnYWxyZWFkeSB1c2VzIHRoaXMgbW9kdWxlIGFzIGEgdHJhbnNpdGl2ZSBkZXBlbmRlbmN5JyxcbiAgfTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgaWYgKGJ1aWxkVG9vbFBhY2thZ2VzW2tleV0pIHtcbiAgICAgIGNvbnN0IGV4cGxhbmF0aW9uID0gYnVpbGRUb29sUGFja2FnZXNba2V5XTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICBsZXQgcmVtb3ZlID0gdHJ1ZTtcbiAgICAgIGlmICh0eXBlb2Ygc2hvdWxkUmVtb3ZlRGVwZW5kZW5jeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZW1vdmUgPSBhd2FpdCBzaG91bGRSZW1vdmVEZXBlbmRlbmN5KGtleSwgZXhwbGFuYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgIGRlbGV0ZSBwYWNrYWdlSlNPTi5kZXBlbmRlbmNpZXNba2V5XTtcbiAgICAgICAgZGVsZXRlIHBhY2thZ2VKU09OLmRldkRlcGVuZGVuY2llc1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhY2thZ2VKU09OLnNjcmlwdHMgPSBwYWNrYWdlSlNPTi5zY3JpcHRzIHx8IHt9O1xuICBkKCdyZWFkaW5nIGN1cnJlbnQgc2NyaXB0cyBvYmplY3Q6JywgcGFja2FnZUpTT04uc2NyaXB0cyk7XG5cbiAgY29uc3QgdXBkYXRlUGFja2FnZVNjcmlwdCA9IGFzeW5jIChzY3JpcHROYW1lLCBuZXdWYWx1ZSkgPT4ge1xuICAgIGlmIChwYWNrYWdlSlNPTi5zY3JpcHRzW3NjcmlwdE5hbWVdICE9PSBuZXdWYWx1ZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgIGxldCB1cGRhdGUgPSB0cnVlO1xuICAgICAgaWYgKHR5cGVvZiBzaG91bGRVcGRhdGVTY3JpcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdXBkYXRlID0gYXdhaXQgc2hvdWxkVXBkYXRlU2NyaXB0KHNjcmlwdE5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgcGFja2FnZUpTT04uc2NyaXB0c1tzY3JpcHROYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBhd2FpdCB1cGRhdGVQYWNrYWdlU2NyaXB0KCdzdGFydCcsICdlbGVjdHJvbi1mb3JnZSBzdGFydCcpO1xuICBhd2FpdCB1cGRhdGVQYWNrYWdlU2NyaXB0KCdwYWNrYWdlJywgJ2VsZWN0cm9uLWZvcmdlIHBhY2thZ2UnKTtcbiAgYXdhaXQgdXBkYXRlUGFja2FnZVNjcmlwdCgnbWFrZScsICdlbGVjdHJvbi1mb3JnZSBtYWtlJyk7XG5cbiAgZCgnZm9yZ2lmaWVkIHNjcmlwdHMgb2JqZWN0OicsIHBhY2thZ2VKU09OLnNjcmlwdHMpO1xuXG4gIGNvbnN0IHdyaXRlQ2hhbmdlcyA9IGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBhc3luY09yYSgnV3JpdGluZyBtb2RpZmllZCBwYWNrYWdlLmpzb24gZmlsZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGZzLndyaXRlSnNvbihwYXRoLnJlc29sdmUoZGlyLCAncGFja2FnZS5qc29uJyksIHBhY2thZ2VKU09OLCB7IHNwYWNlczogMiB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBhd2FpdCB3cml0ZUNoYW5nZXMoKTtcblxuICBhd2FpdCBhc3luY09yYSgnSW5zdGFsbGluZyBkZXBlbmRlbmNpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgZCgnZGVsZXRpbmcgb2xkIGRlcGVuZGVuY2llcyBmb3JjZWZ1bGx5Jyk7XG4gICAgYXdhaXQgZnMucmVtb3ZlKHBhdGgucmVzb2x2ZShkaXIsICdub2RlX21vZHVsZXMvLmJpbi9lbGVjdHJvbicpKTtcbiAgICBhd2FpdCBmcy5yZW1vdmUocGF0aC5yZXNvbHZlKGRpciwgJ25vZGVfbW9kdWxlcy8uYmluL2VsZWN0cm9uLmNtZCcpKTtcblxuICAgIGQoJ2luc3RhbGxpbmcgZGVwZW5kZW5jaWVzJyk7XG4gICAgYXdhaXQgaW5zdGFsbERlcExpc3QoZGlyLCBkZXBzKTtcblxuICAgIGQoJ2luc3RhbGxpbmcgZGV2RGVwZW5kZW5jaWVzJyk7XG4gICAgYXdhaXQgaW5zdGFsbERlcExpc3QoZGlyLCBkZXZEZXBzLCB0cnVlKTtcblxuICAgIGQoJ2luc3RhbGxpbmcgZXhhY3REZXZEZXBlbmRlbmNpZXMnKTtcbiAgICBhd2FpdCBpbnN0YWxsRGVwTGlzdChkaXIsIGV4YWN0RGV2RGVwcywgdHJ1ZSwgdHJ1ZSk7XG4gIH0pO1xuXG4gIHBhY2thZ2VKU09OID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKGRpcik7XG5cbiAgaWYgKCFwYWNrYWdlSlNPTi52ZXJzaW9uKSB7XG4gICAgd2FybihpbnRlcmFjdGl2ZSwgXCJQbGVhc2Ugc2V0IHRoZSAndmVyc2lvbicgaW4geW91ciBhcHBsaWNhdGlvbidzIHBhY2thZ2UuanNvblwiLnllbGxvdyk7XG4gIH1cblxuICBwYWNrYWdlSlNPTi5jb25maWcgPSBwYWNrYWdlSlNPTi5jb25maWcgfHwge307XG4gIGNvbnN0IHRlbXBsYXRlUGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04ocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3RtcGwnKSk7XG4gIHBhY2thZ2VKU09OLmNvbmZpZy5mb3JnZSA9IHRlbXBsYXRlUGFja2FnZUpTT04uY29uZmlnLmZvcmdlO1xuICBzZXRJbml0aWFsRm9yZ2VDb25maWcocGFja2FnZUpTT04pO1xuXG4gIGF3YWl0IHdyaXRlQ2hhbmdlcygpO1xuXG4gIGF3YWl0IGFzeW5jT3JhKCdGaXhpbmcgLmdpdGlnbm9yZScsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoYXdhaXQgZnMucGF0aEV4aXN0cyhwYXRoLnJlc29sdmUoZGlyLCAnLmdpdGlnbm9yZScpKSkge1xuICAgICAgY29uc3QgZ2l0aWdub3JlID0gYXdhaXQgZnMucmVhZEZpbGUocGF0aC5yZXNvbHZlKGRpciwgJy5naXRpZ25vcmUnKSk7XG4gICAgICBpZiAoIWdpdGlnbm9yZS5pbmNsdWRlcyhvdXREaXIpKSB7XG4gICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShwYXRoLnJlc29sdmUoZGlyLCAnLmdpdGlnbm9yZScpLCBgJHtnaXRpZ25vcmV9XFxuJHtvdXREaXJ9L2ApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaW5mbyhpbnRlcmFjdGl2ZSwgYFxuXG5XZSBoYXZlIEFUVEVNUFRFRCB0byBjb252ZXJ0IHlvdXIgYXBwIHRvIGJlIGluIGEgZm9ybWF0IHRoYXQgZWxlY3Ryb24tZm9yZ2UgdW5kZXJzdGFuZHMuXG5cblRoYW5rcyBmb3IgdXNpbmcgJHsnXCJlbGVjdHJvbi1mb3JnZVwiJy5ncmVlbn0hISFgKTtcbn07XG4iXX0=
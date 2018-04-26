"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("colors");

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _nugget = _interopRequireDefault(require("nugget"));

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var _pify = _interopRequireDefault(require("pify"));

var _semver = _interopRequireDefault(require("semver"));

var _installerDmg = _interopRequireDefault(require("@electron-forge/installer-dmg"));

var _installerZip = _interopRequireDefault(require("@electron-forge/installer-zip"));

var _installerDeb = _interopRequireDefault(require("@electron-forge/installer-deb"));

var _installerRpm = _interopRequireDefault(require("@electron-forge/installer-rpm"));

var _installerExe = _interopRequireDefault(require("@electron-forge/installer-exe"));

var _messages = require("../util/messages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:install');
const GITHUB_API = 'https://api.github.com';
/**
 * @typedef {Object} InstallOptions
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {boolean} [prerelease=false] Whether to install prerelease versions
 * @property {string} repo The GitHub repository to install from, in the format owner/name
 * @property {function} chooseAsset A function that must return the asset to use/install from a provided array of compatible GitHub assets
 */

/**
 * Install an Electron application from GitHub. If you leave interactive as `false`, you MUST provide a `chooseAsset` function.
 *
 * @param {InstallOptions} providedOptions - Options for the install method
 * @return {Promise} Will resolve when the install process is complete
 */

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    let _Object$assign = Object.assign({
      interactive: false,
      prerelease: false
    }, providedOptions),
        interactive = _Object$assign.interactive,
        prerelease = _Object$assign.prerelease,
        repo = _Object$assign.repo,
        chooseAsset = _Object$assign.chooseAsset;

    _asyncOra.asyncOra.interactive = interactive;

    if (typeof chooseAsset !== 'function') {
      throw 'Expected chooseAsset to be a function in install call';
    }

    let latestRelease;
    let possibleAssets = [];
    yield (0, _asyncOra.asyncOra)('Searching for Application',
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (searchSpinner) {
        if (!repo || repo.indexOf('/') === -1) {
          throw 'Invalid repository name, must be in the format owner/name';
        }

        d('searching for repo:', repo);
        let releases;

        try {
          releases = yield (yield (0, _nodeFetch.default)(`${GITHUB_API}/repos/${repo}/releases`)).json();
        } catch (err) {// Ignore error
        }

        if (!releases || releases.message === 'Not Found' || !Array.isArray(releases)) {
          throw `Failed to find releases for repository "${repo}".  Please check the name and try again.`;
        }

        releases = releases.filter(release => !release.prerelease || prerelease);
        const sortedReleases = releases.sort((releaseA, releaseB) => {
          let tagA = releaseA.tag_name;
          if (tagA.substr(0, 1) === 'v') tagA = tagA.substr(1);
          let tagB = releaseB.tag_name;
          if (tagB.substr(0, 1) === 'v') tagB = tagB.substr(1);
          return _semver.default.gt(tagB, tagA) ? 1 : -1;
        });
        latestRelease = sortedReleases[0];
        searchSpinner.text = 'Searching for Releases'; // eslint-disable-line

        const assets = latestRelease.assets;

        if (!assets || !Array.isArray(assets)) {
          throw 'Could not find any assets for the latest release';
        }

        const installTargets = {
          win32: [/\.exe$/],
          darwin: [/OSX.*\.zip$/, /darwin.*\.zip$/, /macOS.*\.zip$/, /mac.*\.zip$/, /\.dmg$/],
          linux: [/\.rpm$/, /\.deb$/]
        };
        possibleAssets = assets.filter(asset => {
          const targetSuffixes = installTargets[process.platform];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = targetSuffixes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              const suffix = _step.value;
              if (suffix.test(asset.name)) return true;
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

          return false;
        });

        if (possibleAssets.length === 0) {
          throw `Failed to find any installable assets for target platform: ${`${process.platform}`.cyan}`;
        }
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _messages.info)(interactive, `Found latest release${prerelease ? ' (including prereleases)' : ''}: ${latestRelease.tag_name.cyan}`);
    let targetAsset = possibleAssets[0];

    if (possibleAssets.length > 1) {
      targetAsset = yield Promise.resolve(chooseAsset(possibleAssets));
    }

    const tmpdir = _path.default.resolve(_os.default.tmpdir(), 'forge-install');

    const pathSafeRepo = repo.replace(/[/\\]/g, '-');
    const filename = `${pathSafeRepo}-${latestRelease.tag_name}-${targetAsset.name}`;

    const fullFilePath = _path.default.resolve(tmpdir, filename);

    if (!(yield _fsExtra.default.pathExists(fullFilePath)) || (yield _fsExtra.default.stat(fullFilePath)).size !== targetAsset.size) {
      yield _fsExtra.default.mkdirs(tmpdir);
      const nuggetOpts = {
        target: filename,
        dir: tmpdir,
        resume: true,
        strictSSL: true
      };
      yield (0, _pify.default)(_nugget.default)(targetAsset.browser_download_url, nuggetOpts);
    }

    yield (0, _asyncOra.asyncOra)('Installing Application',
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(function* (installSpinner) {
        const installActions = {
          win32: {
            '.exe': _installerExe.default
          },
          darwin: {
            '.zip': _installerZip.default,
            '.dmg': _installerDmg.default
          },
          linux: {
            '.deb': _installerDeb.default,
            '.rpm': _installerRpm.default
          }
        };
        const suffixFnIdent = Object.keys(installActions[process.platform]).find(suffix => targetAsset.name.endsWith(suffix));
        const InstallerClass = installActions[process.platform][suffixFnIdent];
        const installer = new InstallerClass();
        yield installer.install({
          filePath: fullFilePath,
          installSpinner
        });
      });

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
  });

  return function () {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaW5zdGFsbC5qcyJdLCJuYW1lcyI6WyJkIiwiR0lUSFVCX0FQSSIsInByb3ZpZGVkT3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsImludGVyYWN0aXZlIiwicHJlcmVsZWFzZSIsInJlcG8iLCJjaG9vc2VBc3NldCIsImxhdGVzdFJlbGVhc2UiLCJwb3NzaWJsZUFzc2V0cyIsInNlYXJjaFNwaW5uZXIiLCJpbmRleE9mIiwicmVsZWFzZXMiLCJqc29uIiwiZXJyIiwibWVzc2FnZSIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsInJlbGVhc2UiLCJzb3J0ZWRSZWxlYXNlcyIsInNvcnQiLCJyZWxlYXNlQSIsInJlbGVhc2VCIiwidGFnQSIsInRhZ19uYW1lIiwic3Vic3RyIiwidGFnQiIsImd0IiwidGV4dCIsImFzc2V0cyIsImluc3RhbGxUYXJnZXRzIiwid2luMzIiLCJkYXJ3aW4iLCJsaW51eCIsImFzc2V0IiwidGFyZ2V0U3VmZml4ZXMiLCJwcm9jZXNzIiwicGxhdGZvcm0iLCJzdWZmaXgiLCJ0ZXN0IiwibmFtZSIsImxlbmd0aCIsImN5YW4iLCJ0YXJnZXRBc3NldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidG1wZGlyIiwicGF0aFNhZmVSZXBvIiwicmVwbGFjZSIsImZpbGVuYW1lIiwiZnVsbEZpbGVQYXRoIiwicGF0aEV4aXN0cyIsInN0YXQiLCJzaXplIiwibWtkaXJzIiwibnVnZ2V0T3B0cyIsInRhcmdldCIsImRpciIsInJlc3VtZSIsInN0cmljdFNTTCIsImJyb3dzZXJfZG93bmxvYWRfdXJsIiwiaW5zdGFsbFNwaW5uZXIiLCJpbnN0YWxsQWN0aW9ucyIsInN1ZmZpeEZuSWRlbnQiLCJrZXlzIiwiZmluZCIsImVuZHNXaXRoIiwiSW5zdGFsbGVyQ2xhc3MiLCJpbnN0YWxsZXIiLCJpbnN0YWxsIiwiZmlsZVBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFD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QWxCLENBQU47QUFDRCxPQW5CSzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFOO0FBb0JELEciLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcbmltcG9ydCB7IGFzeW5jT3JhIH0gZnJvbSAnQGVsZWN0cm9uLWZvcmdlL2FzeW5jLW9yYSc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBudWdnZXQgZnJvbSAnbnVnZ2V0JztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuaW1wb3J0IHNlbXZlciBmcm9tICdzZW12ZXInO1xuXG5pbXBvcnQgRE1HSW5zdGFsbGVyIGZyb20gJ0BlbGVjdHJvbi1mb3JnZS9pbnN0YWxsZXItZG1nJztcbmltcG9ydCBaaXBJbnN0YWxsZXIgZnJvbSAnQGVsZWN0cm9uLWZvcmdlL2luc3RhbGxlci16aXAnO1xuaW1wb3J0IERlYkluc3RhbGxlciBmcm9tICdAZWxlY3Ryb24tZm9yZ2UvaW5zdGFsbGVyLWRlYic7XG5pbXBvcnQgUlBNSW5zdGFsbGVyIGZyb20gJ0BlbGVjdHJvbi1mb3JnZS9pbnN0YWxsZXItcnBtJztcbmltcG9ydCBFeGVJbnN0YWxsZXIgZnJvbSAnQGVsZWN0cm9uLWZvcmdlL2luc3RhbGxlci1leGUnO1xuXG5pbXBvcnQgeyBpbmZvIH0gZnJvbSAnLi4vdXRpbC9tZXNzYWdlcyc7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6aW5zdGFsbCcpO1xuXG5jb25zdCBHSVRIVUJfQVBJID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20nO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEluc3RhbGxPcHRpb25zXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtpbnRlcmFjdGl2ZT1mYWxzZV0gV2hldGhlciB0byB1c2Ugc2Vuc2libGUgZGVmYXVsdHMgb3IgcHJvbXB0IHRoZSB1c2VyIHZpc3VhbGx5XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtwcmVyZWxlYXNlPWZhbHNlXSBXaGV0aGVyIHRvIGluc3RhbGwgcHJlcmVsZWFzZSB2ZXJzaW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IHJlcG8gVGhlIEdpdEh1YiByZXBvc2l0b3J5IHRvIGluc3RhbGwgZnJvbSwgaW4gdGhlIGZvcm1hdCBvd25lci9uYW1lXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBjaG9vc2VBc3NldCBBIGZ1bmN0aW9uIHRoYXQgbXVzdCByZXR1cm4gdGhlIGFzc2V0IHRvIHVzZS9pbnN0YWxsIGZyb20gYSBwcm92aWRlZCBhcnJheSBvZiBjb21wYXRpYmxlIEdpdEh1YiBhc3NldHNcbiAqL1xuXG4vKipcbiAqIEluc3RhbGwgYW4gRWxlY3Ryb24gYXBwbGljYXRpb24gZnJvbSBHaXRIdWIuIElmIHlvdSBsZWF2ZSBpbnRlcmFjdGl2ZSBhcyBgZmFsc2VgLCB5b3UgTVVTVCBwcm92aWRlIGEgYGNob29zZUFzc2V0YCBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0luc3RhbGxPcHRpb25zfSBwcm92aWRlZE9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgaW5zdGFsbCBtZXRob2RcbiAqIEByZXR1cm4ge1Byb21pc2V9IFdpbGwgcmVzb2x2ZSB3aGVuIHRoZSBpbnN0YWxsIHByb2Nlc3MgaXMgY29tcGxldGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHByb3ZpZGVkT3B0aW9ucyA9IHt9KSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3QsIG5vLXVudXNlZC12YXJzXG4gIGxldCB7IGludGVyYWN0aXZlLCBwcmVyZWxlYXNlLCByZXBvLCBjaG9vc2VBc3NldCB9ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgIHByZXJlbGVhc2U6IGZhbHNlLFxuICB9LCBwcm92aWRlZE9wdGlvbnMpO1xuICBhc3luY09yYS5pbnRlcmFjdGl2ZSA9IGludGVyYWN0aXZlO1xuXG4gIGlmICh0eXBlb2YgY2hvb3NlQXNzZXQgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyAnRXhwZWN0ZWQgY2hvb3NlQXNzZXQgdG8gYmUgYSBmdW5jdGlvbiBpbiBpbnN0YWxsIGNhbGwnO1xuICB9XG5cbiAgbGV0IGxhdGVzdFJlbGVhc2U7XG4gIGxldCBwb3NzaWJsZUFzc2V0cyA9IFtdO1xuXG4gIGF3YWl0IGFzeW5jT3JhKCdTZWFyY2hpbmcgZm9yIEFwcGxpY2F0aW9uJywgYXN5bmMgKHNlYXJjaFNwaW5uZXIpID0+IHtcbiAgICBpZiAoIXJlcG8gfHwgcmVwby5pbmRleE9mKCcvJykgPT09IC0xKSB7XG4gICAgICB0aHJvdyAnSW52YWxpZCByZXBvc2l0b3J5IG5hbWUsIG11c3QgYmUgaW4gdGhlIGZvcm1hdCBvd25lci9uYW1lJztcbiAgICB9XG5cbiAgICBkKCdzZWFyY2hpbmcgZm9yIHJlcG86JywgcmVwbyk7XG4gICAgbGV0IHJlbGVhc2VzO1xuICAgIHRyeSB7XG4gICAgICByZWxlYXNlcyA9IGF3YWl0IChhd2FpdCBmZXRjaChgJHtHSVRIVUJfQVBJfS9yZXBvcy8ke3JlcG99L3JlbGVhc2VzYCkpLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIElnbm9yZSBlcnJvclxuICAgIH1cblxuICAgIGlmICghcmVsZWFzZXMgfHwgcmVsZWFzZXMubWVzc2FnZSA9PT0gJ05vdCBGb3VuZCcgfHwgIUFycmF5LmlzQXJyYXkocmVsZWFzZXMpKSB7XG4gICAgICB0aHJvdyBgRmFpbGVkIHRvIGZpbmQgcmVsZWFzZXMgZm9yIHJlcG9zaXRvcnkgXCIke3JlcG99XCIuICBQbGVhc2UgY2hlY2sgdGhlIG5hbWUgYW5kIHRyeSBhZ2Fpbi5gO1xuICAgIH1cblxuICAgIHJlbGVhc2VzID0gcmVsZWFzZXMuZmlsdGVyKHJlbGVhc2UgPT4gIXJlbGVhc2UucHJlcmVsZWFzZSB8fCBwcmVyZWxlYXNlKTtcblxuICAgIGNvbnN0IHNvcnRlZFJlbGVhc2VzID0gcmVsZWFzZXMuc29ydCgocmVsZWFzZUEsIHJlbGVhc2VCKSA9PiB7XG4gICAgICBsZXQgdGFnQSA9IHJlbGVhc2VBLnRhZ19uYW1lO1xuICAgICAgaWYgKHRhZ0Euc3Vic3RyKDAsIDEpID09PSAndicpIHRhZ0EgPSB0YWdBLnN1YnN0cigxKTtcbiAgICAgIGxldCB0YWdCID0gcmVsZWFzZUIudGFnX25hbWU7XG4gICAgICBpZiAodGFnQi5zdWJzdHIoMCwgMSkgPT09ICd2JykgdGFnQiA9IHRhZ0Iuc3Vic3RyKDEpO1xuICAgICAgcmV0dXJuIChzZW12ZXIuZ3QodGFnQiwgdGFnQSkgPyAxIDogLTEpO1xuICAgIH0pO1xuICAgIGxhdGVzdFJlbGVhc2UgPSBzb3J0ZWRSZWxlYXNlc1swXTtcblxuICAgIHNlYXJjaFNwaW5uZXIudGV4dCA9ICdTZWFyY2hpbmcgZm9yIFJlbGVhc2VzJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgY29uc3QgYXNzZXRzID0gbGF0ZXN0UmVsZWFzZS5hc3NldHM7XG4gICAgaWYgKCFhc3NldHMgfHwgIUFycmF5LmlzQXJyYXkoYXNzZXRzKSkge1xuICAgICAgdGhyb3cgJ0NvdWxkIG5vdCBmaW5kIGFueSBhc3NldHMgZm9yIHRoZSBsYXRlc3QgcmVsZWFzZSc7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFsbFRhcmdldHMgPSB7XG4gICAgICB3aW4zMjogWy9cXC5leGUkL10sXG4gICAgICBkYXJ3aW46IFsvT1NYLipcXC56aXAkLywgL2Rhcndpbi4qXFwuemlwJC8sIC9tYWNPUy4qXFwuemlwJC8sIC9tYWMuKlxcLnppcCQvLCAvXFwuZG1nJC9dLFxuICAgICAgbGludXg6IFsvXFwucnBtJC8sIC9cXC5kZWIkL10sXG4gICAgfTtcblxuICAgIHBvc3NpYmxlQXNzZXRzID0gYXNzZXRzLmZpbHRlcigoYXNzZXQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldFN1ZmZpeGVzID0gaW5zdGFsbFRhcmdldHNbcHJvY2Vzcy5wbGF0Zm9ybV07XG4gICAgICBmb3IgKGNvbnN0IHN1ZmZpeCBvZiB0YXJnZXRTdWZmaXhlcykge1xuICAgICAgICBpZiAoc3VmZml4LnRlc3QoYXNzZXQubmFtZSkpIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgaWYgKHBvc3NpYmxlQXNzZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgYEZhaWxlZCB0byBmaW5kIGFueSBpbnN0YWxsYWJsZSBhc3NldHMgZm9yIHRhcmdldCBwbGF0Zm9ybTogJHtgJHtwcm9jZXNzLnBsYXRmb3JtfWAuY3lhbn1gO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5mbyhpbnRlcmFjdGl2ZSwgYEZvdW5kIGxhdGVzdCByZWxlYXNlJHtwcmVyZWxlYXNlID8gJyAoaW5jbHVkaW5nIHByZXJlbGVhc2VzKScgOiAnJ306ICR7bGF0ZXN0UmVsZWFzZS50YWdfbmFtZS5jeWFufWApO1xuXG4gIGxldCB0YXJnZXRBc3NldCA9IHBvc3NpYmxlQXNzZXRzWzBdO1xuICBpZiAocG9zc2libGVBc3NldHMubGVuZ3RoID4gMSkge1xuICAgIHRhcmdldEFzc2V0ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGNob29zZUFzc2V0KHBvc3NpYmxlQXNzZXRzKSk7XG4gIH1cblxuICBjb25zdCB0bXBkaXIgPSBwYXRoLnJlc29sdmUob3MudG1wZGlyKCksICdmb3JnZS1pbnN0YWxsJyk7XG4gIGNvbnN0IHBhdGhTYWZlUmVwbyA9IHJlcG8ucmVwbGFjZSgvWy9cXFxcXS9nLCAnLScpO1xuICBjb25zdCBmaWxlbmFtZSA9IGAke3BhdGhTYWZlUmVwb30tJHtsYXRlc3RSZWxlYXNlLnRhZ19uYW1lfS0ke3RhcmdldEFzc2V0Lm5hbWV9YDtcblxuICBjb25zdCBmdWxsRmlsZVBhdGggPSBwYXRoLnJlc29sdmUodG1wZGlyLCBmaWxlbmFtZSk7XG4gIGlmICghYXdhaXQgZnMucGF0aEV4aXN0cyhmdWxsRmlsZVBhdGgpIHx8IChhd2FpdCBmcy5zdGF0KGZ1bGxGaWxlUGF0aCkpLnNpemUgIT09IHRhcmdldEFzc2V0LnNpemUpIHtcbiAgICBhd2FpdCBmcy5ta2RpcnModG1wZGlyKTtcblxuICAgIGNvbnN0IG51Z2dldE9wdHMgPSB7XG4gICAgICB0YXJnZXQ6IGZpbGVuYW1lLFxuICAgICAgZGlyOiB0bXBkaXIsXG4gICAgICByZXN1bWU6IHRydWUsXG4gICAgICBzdHJpY3RTU0w6IHRydWUsXG4gICAgfTtcbiAgICBhd2FpdCBwaWZ5KG51Z2dldCkodGFyZ2V0QXNzZXQuYnJvd3Nlcl9kb3dubG9hZF91cmwsIG51Z2dldE9wdHMpO1xuICB9XG5cbiAgYXdhaXQgYXN5bmNPcmEoJ0luc3RhbGxpbmcgQXBwbGljYXRpb24nLCBhc3luYyAoaW5zdGFsbFNwaW5uZXIpID0+IHtcbiAgICBjb25zdCBpbnN0YWxsQWN0aW9ucyA9IHtcbiAgICAgIHdpbjMyOiB7XG4gICAgICAgICcuZXhlJzogRXhlSW5zdGFsbGVyLFxuICAgICAgfSxcbiAgICAgIGRhcndpbjoge1xuICAgICAgICAnLnppcCc6IFppcEluc3RhbGxlcixcbiAgICAgICAgJy5kbWcnOiBETUdJbnN0YWxsZXIsXG4gICAgICB9LFxuICAgICAgbGludXg6IHtcbiAgICAgICAgJy5kZWInOiBEZWJJbnN0YWxsZXIsXG4gICAgICAgICcucnBtJzogUlBNSW5zdGFsbGVyLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3Qgc3VmZml4Rm5JZGVudCA9IE9iamVjdC5rZXlzKGluc3RhbGxBY3Rpb25zW3Byb2Nlc3MucGxhdGZvcm1dKS5maW5kKHN1ZmZpeCA9PiB0YXJnZXRBc3NldC5uYW1lLmVuZHNXaXRoKHN1ZmZpeCkpO1xuICAgIGNvbnN0IEluc3RhbGxlckNsYXNzID0gaW5zdGFsbEFjdGlvbnNbcHJvY2Vzcy5wbGF0Zm9ybV1bc3VmZml4Rm5JZGVudF07XG4gICAgY29uc3QgaW5zdGFsbGVyID0gbmV3IEluc3RhbGxlckNsYXNzKCk7XG4gICAgYXdhaXQgaW5zdGFsbGVyLmluc3RhbGwoeyBmaWxlUGF0aDogZnVsbEZpbGVQYXRoLCBpbnN0YWxsU3Bpbm5lciB9KTtcbiAgfSk7XG59O1xuIl19
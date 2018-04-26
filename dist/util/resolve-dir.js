"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _readPackageJson = _interopRequireDefault(require("./read-package-json"));

var _electronVersion = _interopRequireDefault(require("./electron-version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:project-resolver');

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (dir) {
    let mDir = dir;
    let prevDir;

    while (prevDir !== mDir) {
      prevDir = mDir;

      const testPath = _path.default.resolve(mDir, 'package.json');

      d('searching for project in:', mDir);

      if (yield _fsExtra.default.pathExists(testPath)) {
        const packageJSON = yield (0, _readPackageJson.default)(mDir);
        const electronVersion = (0, _electronVersion.default)(packageJSON);

        if (electronVersion) {
          if (!/[0-9]/.test(electronVersion[0])) {
            throw `You must depend on an EXACT version of electron not a range (${electronVersion})`;
          }
        } else {
          throw 'You must depend on "electron" in your devDependencies';
        }

        if (packageJSON.config && packageJSON.config.forge) {
          d('electron-forge compatible package.json found in', testPath);
          return mDir;
        }
      }

      mDir = _path.default.dirname(mDir);
    }

    return null;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3Jlc29sdmUtZGlyLmpzIl0sIm5hbWVzIjpbImQiLCJkaXIiLCJtRGlyIiwicHJldkRpciIsInRlc3RQYXRoIiwicmVzb2x2ZSIsInBhdGhFeGlzdHMiLCJwYWNrYWdlSlNPTiIsImVsZWN0cm9uVmVyc2lvbiIsInRlc3QiLCJjb25maWciLCJmb3JnZSIsImRpcm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSxpQ0FBTixDQUFWOzs7OzsrQkFFZSxXQUFPQyxHQUFQLEVBQWU7QUFDNUIsUUFBSUMsT0FBT0QsR0FBWDtBQUNBLFFBQUlFLE9BQUo7O0FBQ0EsV0FBT0EsWUFBWUQsSUFBbkIsRUFBeUI7QUFDdkJDLGdCQUFVRCxJQUFWOztBQUNBLFlBQU1FLFdBQVcsY0FBS0MsT0FBTCxDQUFhSCxJQUFiLEVBQW1CLGNBQW5CLENBQWpCOztBQUNBRixRQUFFLDJCQUFGLEVBQStCRSxJQUEvQjs7QUFDQSxnQkFBVSxpQkFBR0ksVUFBSCxDQUFjRixRQUFkLENBQVYsRUFBbUM7QUFDakMsY0FBTUcsb0JBQW9CLDhCQUFnQkwsSUFBaEIsQ0FBMUI7QUFFQSxjQUFNTSxrQkFBa0IsOEJBQW1CRCxXQUFuQixDQUF4Qjs7QUFDQSxZQUFJQyxlQUFKLEVBQXFCO0FBQ25CLGNBQUksQ0FBQyxRQUFRQyxJQUFSLENBQWFELGdCQUFnQixDQUFoQixDQUFiLENBQUwsRUFBdUM7QUFDckMsa0JBQU8sZ0VBQStEQSxlQUFnQixHQUF0RjtBQUNEO0FBQ0YsU0FKRCxNQUlPO0FBQ0wsZ0JBQU0sdURBQU47QUFDRDs7QUFFRCxZQUFJRCxZQUFZRyxNQUFaLElBQXNCSCxZQUFZRyxNQUFaLENBQW1CQyxLQUE3QyxFQUFvRDtBQUNsRFgsWUFBRSxpREFBRixFQUFxREksUUFBckQ7QUFDQSxpQkFBT0YsSUFBUDtBQUNEO0FBQ0Y7O0FBQ0RBLGFBQU8sY0FBS1UsT0FBTCxDQUFhVixJQUFiLENBQVA7QUFDRDs7QUFDRCxXQUFPLElBQVA7QUFDRCxHIiwiZmlsZSI6InJlc29sdmUtZGlyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi9yZWFkLXBhY2thZ2UtanNvbic7XG5pbXBvcnQgZ2V0RWxlY3Ryb25WZXJzaW9uIGZyb20gJy4vZWxlY3Ryb24tdmVyc2lvbic7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6cHJvamVjdC1yZXNvbHZlcicpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlyKSA9PiB7XG4gIGxldCBtRGlyID0gZGlyO1xuICBsZXQgcHJldkRpcjtcbiAgd2hpbGUgKHByZXZEaXIgIT09IG1EaXIpIHtcbiAgICBwcmV2RGlyID0gbURpcjtcbiAgICBjb25zdCB0ZXN0UGF0aCA9IHBhdGgucmVzb2x2ZShtRGlyLCAncGFja2FnZS5qc29uJyk7XG4gICAgZCgnc2VhcmNoaW5nIGZvciBwcm9qZWN0IGluOicsIG1EaXIpO1xuICAgIGlmIChhd2FpdCBmcy5wYXRoRXhpc3RzKHRlc3RQYXRoKSkge1xuICAgICAgY29uc3QgcGFja2FnZUpTT04gPSBhd2FpdCByZWFkUGFja2FnZUpTT04obURpcik7XG5cbiAgICAgIGNvbnN0IGVsZWN0cm9uVmVyc2lvbiA9IGdldEVsZWN0cm9uVmVyc2lvbihwYWNrYWdlSlNPTik7XG4gICAgICBpZiAoZWxlY3Ryb25WZXJzaW9uKSB7XG4gICAgICAgIGlmICghL1swLTldLy50ZXN0KGVsZWN0cm9uVmVyc2lvblswXSkpIHtcbiAgICAgICAgICB0aHJvdyBgWW91IG11c3QgZGVwZW5kIG9uIGFuIEVYQUNUIHZlcnNpb24gb2YgZWxlY3Ryb24gbm90IGEgcmFuZ2UgKCR7ZWxlY3Ryb25WZXJzaW9ufSlgO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnWW91IG11c3QgZGVwZW5kIG9uIFwiZWxlY3Ryb25cIiBpbiB5b3VyIGRldkRlcGVuZGVuY2llcyc7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYWNrYWdlSlNPTi5jb25maWcgJiYgcGFja2FnZUpTT04uY29uZmlnLmZvcmdlKSB7XG4gICAgICAgIGQoJ2VsZWN0cm9uLWZvcmdlIGNvbXBhdGlibGUgcGFja2FnZS5qc29uIGZvdW5kIGluJywgdGVzdFBhdGgpO1xuICAgICAgICByZXR1cm4gbURpcjtcbiAgICAgIH1cbiAgICB9XG4gICAgbURpciA9IHBhdGguZGlybmFtZShtRGlyKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG4iXX0=
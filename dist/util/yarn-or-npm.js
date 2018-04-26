"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasYarn = exports.yarnOrNpmSpawn = exports.default = void 0;

var _crossSpawnPromise = _interopRequireDefault(require("cross-spawn-promise"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _yarnOrNpm = _interopRequireDefault(require("yarn-or-npm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const safeYarnOrNpm = () => {
  const system = (0, _yarnOrNpm.default)();

  switch (process.env.NODE_INSTALLER) {
    case 'yarn':
    case 'npm':
      return process.env.NODE_INSTALLER;

    default:
      if (process.env.NODE_INSTALLER) {
        console.warn(`${_logSymbols.default.warning} Unknown NODE_INSTALLER, using detected installer ${system}`.yellow);
      }

      return system;
  }
};

var _default = safeYarnOrNpm;
exports.default = _default;

const yarnOrNpmSpawn = (...args) => (0, _crossSpawnPromise.default)(safeYarnOrNpm(), ...args);

exports.yarnOrNpmSpawn = yarnOrNpmSpawn;

const hasYarn = () => safeYarnOrNpm() === 'yarn';

exports.hasYarn = hasYarn;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3lhcm4tb3ItbnBtLmpzIl0sIm5hbWVzIjpbInNhZmVZYXJuT3JOcG0iLCJzeXN0ZW0iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9JTlNUQUxMRVIiLCJjb25zb2xlIiwid2FybiIsIndhcm5pbmciLCJ5ZWxsb3ciLCJ5YXJuT3JOcG1TcGF3biIsImFyZ3MiLCJoYXNZYXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxnQkFBZ0IsTUFBTTtBQUMxQixRQUFNQyxTQUFTLHlCQUFmOztBQUNBLFVBQVFDLFFBQVFDLEdBQVIsQ0FBWUMsY0FBcEI7QUFDRSxTQUFLLE1BQUw7QUFDQSxTQUFLLEtBQUw7QUFDRSxhQUFPRixRQUFRQyxHQUFSLENBQVlDLGNBQW5COztBQUNGO0FBQ0UsVUFBSUYsUUFBUUMsR0FBUixDQUFZQyxjQUFoQixFQUFnQztBQUM5QkMsZ0JBQVFDLElBQVIsQ0FBYyxHQUFFLG9CQUFXQyxPQUFRLHFEQUFvRE4sTUFBTyxFQUFqRixDQUFtRk8sTUFBaEc7QUFDRDs7QUFDRCxhQUFPUCxNQUFQO0FBUko7QUFVRCxDQVpEOztlQWNlRCxhOzs7QUFFUixNQUFNUyxpQkFBaUIsQ0FBQyxHQUFHQyxJQUFKLEtBQWEsZ0NBQWFWLGVBQWIsRUFBOEIsR0FBR1UsSUFBakMsQ0FBcEM7Ozs7QUFFQSxNQUFNQyxVQUFVLE1BQU1YLG9CQUFvQixNQUExQyIsImZpbGUiOiJ5YXJuLW9yLW5wbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzcGF3blByb21pc2UgZnJvbSAnY3Jvc3Mtc3Bhd24tcHJvbWlzZSc7XG5pbXBvcnQgbG9nU3ltYm9scyBmcm9tICdsb2ctc3ltYm9scyc7XG5pbXBvcnQgeWFybk9yTnBtIGZyb20gJ3lhcm4tb3ItbnBtJztcblxuY29uc3Qgc2FmZVlhcm5Pck5wbSA9ICgpID0+IHtcbiAgY29uc3Qgc3lzdGVtID0geWFybk9yTnBtKCk7XG4gIHN3aXRjaCAocHJvY2Vzcy5lbnYuTk9ERV9JTlNUQUxMRVIpIHtcbiAgICBjYXNlICd5YXJuJzpcbiAgICBjYXNlICducG0nOlxuICAgICAgcmV0dXJuIHByb2Nlc3MuZW52Lk5PREVfSU5TVEFMTEVSO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9JTlNUQUxMRVIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1N5bWJvbHMud2FybmluZ30gVW5rbm93biBOT0RFX0lOU1RBTExFUiwgdXNpbmcgZGV0ZWN0ZWQgaW5zdGFsbGVyICR7c3lzdGVtfWAueWVsbG93KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzeXN0ZW07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNhZmVZYXJuT3JOcG07XG5cbmV4cG9ydCBjb25zdCB5YXJuT3JOcG1TcGF3biA9ICguLi5hcmdzKSA9PiBzcGF3blByb21pc2Uoc2FmZVlhcm5Pck5wbSgpLCAuLi5hcmdzKTtcblxuZXhwb3J0IGNvbnN0IGhhc1lhcm4gPSAoKSA9PiBzYWZlWWFybk9yTnBtKCkgPT09ICd5YXJuJztcbiJdfQ==
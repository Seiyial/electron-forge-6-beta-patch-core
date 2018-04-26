"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _yarnOrNpm = require("./yarn-or-npm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:dependency-installer');

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (dir, deps, areDev = false, exact = false) {
    d('installing', JSON.stringify(deps), 'in:', dir, `dev=${areDev},exact=${exact},withYarn=${(0, _yarnOrNpm.hasYarn)()}`);

    if (deps.length === 0) {
      d('nothing to install, stopping immediately');
      return Promise.resolve();
    }

    let cmd = ['install'].concat(deps);

    if ((0, _yarnOrNpm.hasYarn)()) {
      cmd = ['add'].concat(deps);
      if (areDev) cmd.push('--dev');
      if (exact) cmd.push('--exact');
    } else {
      if (exact) cmd.push('--save-exact');
      if (areDev) cmd.push('--save-dev');
      if (!areDev) cmd.push('--save');
    }

    d('executing', JSON.stringify(cmd), 'in:', dir);

    try {
      yield (0, _yarnOrNpm.yarnOrNpmSpawn)(cmd, {
        cwd: dir,
        stdio: 'pipe'
      });
    } catch (err) {
      throw new Error(`Failed to install modules: ${JSON.stringify(deps)}\n\nWith output: ${err.message}`);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2luc3RhbGwtZGVwZW5kZW5jaWVzLmpzIl0sIm5hbWVzIjpbImQiLCJkaXIiLCJkZXBzIiwiYXJlRGV2IiwiZXhhY3QiLCJKU09OIiwic3RyaW5naWZ5IiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjbWQiLCJjb25jYXQiLCJwdXNoIiwiY3dkIiwic3RkaW8iLCJlcnIiLCJFcnJvciIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSxxQ0FBTixDQUFWOzs7OzsrQkFFZSxXQUFPQyxHQUFQLEVBQVlDLElBQVosRUFBa0JDLFNBQVMsS0FBM0IsRUFBa0NDLFFBQVEsS0FBMUMsRUFBb0Q7QUFDakVKLE1BQUUsWUFBRixFQUFnQkssS0FBS0MsU0FBTCxDQUFlSixJQUFmLENBQWhCLEVBQXNDLEtBQXRDLEVBQTZDRCxHQUE3QyxFQUFtRCxPQUFNRSxNQUFPLFVBQVNDLEtBQU0sYUFBWSx5QkFBVSxFQUFyRzs7QUFDQSxRQUFJRixLQUFLSyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCUCxRQUFFLDBDQUFGO0FBQ0EsYUFBT1EsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBQ0QsUUFBSUMsTUFBTSxDQUFDLFNBQUQsRUFBWUMsTUFBWixDQUFtQlQsSUFBbkIsQ0FBVjs7QUFDQSxRQUFJLHlCQUFKLEVBQWU7QUFDYlEsWUFBTSxDQUFDLEtBQUQsRUFBUUMsTUFBUixDQUFlVCxJQUFmLENBQU47QUFDQSxVQUFJQyxNQUFKLEVBQVlPLElBQUlFLElBQUosQ0FBUyxPQUFUO0FBQ1osVUFBSVIsS0FBSixFQUFXTSxJQUFJRSxJQUFKLENBQVMsU0FBVDtBQUNaLEtBSkQsTUFJTztBQUNMLFVBQUlSLEtBQUosRUFBV00sSUFBSUUsSUFBSixDQUFTLGNBQVQ7QUFDWCxVQUFJVCxNQUFKLEVBQVlPLElBQUlFLElBQUosQ0FBUyxZQUFUO0FBQ1osVUFBSSxDQUFDVCxNQUFMLEVBQWFPLElBQUlFLElBQUosQ0FBUyxRQUFUO0FBQ2Q7O0FBQ0RaLE1BQUUsV0FBRixFQUFlSyxLQUFLQyxTQUFMLENBQWVJLEdBQWYsQ0FBZixFQUFvQyxLQUFwQyxFQUEyQ1QsR0FBM0M7O0FBQ0EsUUFBSTtBQUNGLFlBQU0sK0JBQWVTLEdBQWYsRUFBb0I7QUFDeEJHLGFBQUtaLEdBRG1CO0FBRXhCYSxlQUFPO0FBRmlCLE9BQXBCLENBQU47QUFJRCxLQUxELENBS0UsT0FBT0MsR0FBUCxFQUFZO0FBQ1osWUFBTSxJQUFJQyxLQUFKLENBQVcsOEJBQTZCWCxLQUFLQyxTQUFMLENBQWVKLElBQWYsQ0FBcUIsb0JBQW1CYSxJQUFJRSxPQUFRLEVBQTVGLENBQU47QUFDRDtBQUNGLEciLCJmaWxlIjoiaW5zdGFsbC1kZXBlbmRlbmNpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHsgeWFybk9yTnBtU3Bhd24sIGhhc1lhcm4gfSBmcm9tICcuL3lhcm4tb3ItbnBtJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpkZXBlbmRlbmN5LWluc3RhbGxlcicpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlyLCBkZXBzLCBhcmVEZXYgPSBmYWxzZSwgZXhhY3QgPSBmYWxzZSkgPT4ge1xuICBkKCdpbnN0YWxsaW5nJywgSlNPTi5zdHJpbmdpZnkoZGVwcyksICdpbjonLCBkaXIsIGBkZXY9JHthcmVEZXZ9LGV4YWN0PSR7ZXhhY3R9LHdpdGhZYXJuPSR7aGFzWWFybigpfWApO1xuICBpZiAoZGVwcy5sZW5ndGggPT09IDApIHtcbiAgICBkKCdub3RoaW5nIHRvIGluc3RhbGwsIHN0b3BwaW5nIGltbWVkaWF0ZWx5Jyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIGxldCBjbWQgPSBbJ2luc3RhbGwnXS5jb25jYXQoZGVwcyk7XG4gIGlmIChoYXNZYXJuKCkpIHtcbiAgICBjbWQgPSBbJ2FkZCddLmNvbmNhdChkZXBzKTtcbiAgICBpZiAoYXJlRGV2KSBjbWQucHVzaCgnLS1kZXYnKTtcbiAgICBpZiAoZXhhY3QpIGNtZC5wdXNoKCctLWV4YWN0Jyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGV4YWN0KSBjbWQucHVzaCgnLS1zYXZlLWV4YWN0Jyk7XG4gICAgaWYgKGFyZURldikgY21kLnB1c2goJy0tc2F2ZS1kZXYnKTtcbiAgICBpZiAoIWFyZURldikgY21kLnB1c2goJy0tc2F2ZScpO1xuICB9XG4gIGQoJ2V4ZWN1dGluZycsIEpTT04uc3RyaW5naWZ5KGNtZCksICdpbjonLCBkaXIpO1xuICB0cnkge1xuICAgIGF3YWl0IHlhcm5Pck5wbVNwYXduKGNtZCwge1xuICAgICAgY3dkOiBkaXIsXG4gICAgICBzdGRpbzogJ3BpcGUnLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBpbnN0YWxsIG1vZHVsZXM6ICR7SlNPTi5zdHJpbmdpZnkoZGVwcyl9XFxuXFxuV2l0aCBvdXRwdXQ6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG4iXX0=
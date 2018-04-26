"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.copy = void 0;

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:init:starter-files');

const copy =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (source, target) {
    d(`copying "${source}" --> "${target}"`);
    yield _fsExtra.default.copy(source, target);
  });

  return function copy(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.copy = copy;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (dir, {
    copyCIFiles
  }) {
    yield (0, _asyncOra.asyncOra)('Copying Starter Files',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      const tmplPath = _path.default.resolve(__dirname, '../../../tmpl');

      d('creating directory:', _path.default.resolve(dir, 'src'));
      yield _fsExtra.default.mkdirs(_path.default.resolve(dir, 'src'));
      const rootFiles = ['_gitignore'];
      if (copyCIFiles) rootFiles.push(...['_travis.yml', '_appveyor.yml']);
      const srcFiles = ['index.js', 'index.html'];

      for (var _i = 0; _i < rootFiles.length; _i++) {
        const file = rootFiles[_i];
        yield copy(_path.default.resolve(tmplPath, file), _path.default.resolve(dir, file.replace(/^_/, '.')));
      }

      for (var _i2 = 0; _i2 < srcFiles.length; _i2++) {
        const file = srcFiles[_i2];
        yield copy(_path.default.resolve(tmplPath, file), _path.default.resolve(dir, 'src', file));
      }
    }));
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvaW5pdC1zY3JpcHRzL2luaXQtc3RhcnRlci1maWxlcy5qcyJdLCJuYW1lcyI6WyJkIiwiY29weSIsInNvdXJjZSIsInRhcmdldCIsImRpciIsImNvcHlDSUZpbGVzIiwidG1wbFBhdGgiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwibWtkaXJzIiwicm9vdEZpbGVzIiwicHVzaCIsInNyY0ZpbGVzIiwiZmlsZSIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSxtQ0FBTixDQUFWOztBQUVPLE1BQU1DO0FBQUE7QUFBQTtBQUFBLCtCQUFPLFdBQU9DLE1BQVAsRUFBZUMsTUFBZixFQUEwQjtBQUM1Q0gsTUFBRyxZQUFXRSxNQUFPLFVBQVNDLE1BQU8sR0FBckM7QUFDQSxVQUFNLGlCQUFHRixJQUFILENBQVFDLE1BQVIsRUFBZ0JDLE1BQWhCLENBQU47QUFDRCxHQUhZOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47Ozs7Ozs7Z0NBS1EsV0FBT0MsR0FBUCxFQUFZO0FBQUVDO0FBQUYsR0FBWixFQUFnQztBQUM3QyxVQUFNLHdCQUFTLHVCQUFUO0FBQUE7QUFBQSxzQkFBa0MsYUFBWTtBQUNsRCxZQUFNQyxXQUFXLGNBQUtDLE9BQUwsQ0FBYUMsU0FBYixFQUF3QixlQUF4QixDQUFqQjs7QUFFQVIsUUFBRSxxQkFBRixFQUF5QixjQUFLTyxPQUFMLENBQWFILEdBQWIsRUFBa0IsS0FBbEIsQ0FBekI7QUFDQSxZQUFNLGlCQUFHSyxNQUFILENBQVUsY0FBS0YsT0FBTCxDQUFhSCxHQUFiLEVBQWtCLEtBQWxCLENBQVYsQ0FBTjtBQUNBLFlBQU1NLFlBQVksQ0FBQyxZQUFELENBQWxCO0FBQ0EsVUFBSUwsV0FBSixFQUFpQkssVUFBVUMsSUFBVixDQUFlLEdBQUcsQ0FBQyxhQUFELEVBQWdCLGVBQWhCLENBQWxCO0FBQ2pCLFlBQU1DLFdBQVcsQ0FBQyxVQUFELEVBQWEsWUFBYixDQUFqQjs7QUFFQSw0QkFBbUJGLFNBQW5CLGVBQThCO0FBQXpCLGNBQU1HLE9BQVFILFNBQVIsSUFBTjtBQUNILGNBQU1ULEtBQUssY0FBS00sT0FBTCxDQUFhRCxRQUFiLEVBQXVCTyxJQUF2QixDQUFMLEVBQW1DLGNBQUtOLE9BQUwsQ0FBYUgsR0FBYixFQUFrQlMsS0FBS0MsT0FBTCxDQUFhLElBQWIsRUFBbUIsR0FBbkIsQ0FBbEIsQ0FBbkMsQ0FBTjtBQUNEOztBQUNELDhCQUFtQkYsUUFBbkIsZ0JBQTZCO0FBQXhCLGNBQU1DLE9BQVFELFFBQVIsS0FBTjtBQUNILGNBQU1YLEtBQUssY0FBS00sT0FBTCxDQUFhRCxRQUFiLEVBQXVCTyxJQUF2QixDQUFMLEVBQW1DLGNBQUtOLE9BQUwsQ0FBYUgsR0FBYixFQUFrQixLQUFsQixFQUF5QlMsSUFBekIsQ0FBbkMsQ0FBTjtBQUNEO0FBQ0YsS0FmSyxFQUFOO0FBZ0JELEciLCJmaWxlIjoiaW5pdC1zdGFydGVyLWZpbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXN5bmNPcmEgfSBmcm9tICdAZWxlY3Ryb24tZm9yZ2UvYXN5bmMtb3JhJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6aW5pdDpzdGFydGVyLWZpbGVzJyk7XG5cbmV4cG9ydCBjb25zdCBjb3B5ID0gYXN5bmMgKHNvdXJjZSwgdGFyZ2V0KSA9PiB7XG4gIGQoYGNvcHlpbmcgXCIke3NvdXJjZX1cIiAtLT4gXCIke3RhcmdldH1cImApO1xuICBhd2FpdCBmcy5jb3B5KHNvdXJjZSwgdGFyZ2V0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChkaXIsIHsgY29weUNJRmlsZXMgfSkgPT4ge1xuICBhd2FpdCBhc3luY09yYSgnQ29weWluZyBTdGFydGVyIEZpbGVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHRtcGxQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uL3RtcGwnKTtcblxuICAgIGQoJ2NyZWF0aW5nIGRpcmVjdG9yeTonLCBwYXRoLnJlc29sdmUoZGlyLCAnc3JjJykpO1xuICAgIGF3YWl0IGZzLm1rZGlycyhwYXRoLnJlc29sdmUoZGlyLCAnc3JjJykpO1xuICAgIGNvbnN0IHJvb3RGaWxlcyA9IFsnX2dpdGlnbm9yZSddO1xuICAgIGlmIChjb3B5Q0lGaWxlcykgcm9vdEZpbGVzLnB1c2goLi4uWydfdHJhdmlzLnltbCcsICdfYXBwdmV5b3IueW1sJ10pO1xuICAgIGNvbnN0IHNyY0ZpbGVzID0gWydpbmRleC5qcycsICdpbmRleC5odG1sJ107XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2Ygcm9vdEZpbGVzKSB7XG4gICAgICBhd2FpdCBjb3B5KHBhdGgucmVzb2x2ZSh0bXBsUGF0aCwgZmlsZSksIHBhdGgucmVzb2x2ZShkaXIsIGZpbGUucmVwbGFjZSgvXl8vLCAnLicpKSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBzcmNGaWxlcykge1xuICAgICAgYXdhaXQgY29weShwYXRoLnJlc29sdmUodG1wbFBhdGgsIGZpbGUpLCBwYXRoLnJlc29sdmUoZGlyLCAnc3JjJywgZmlsZSkpO1xuICAgIH1cbiAgfSk7XG59O1xuIl19
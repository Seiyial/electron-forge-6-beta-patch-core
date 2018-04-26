"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:init:directory');

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (dir) {
    yield (0, _asyncOra.asyncOra)('Initializing Project Directory',
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (initSpinner) {
        d('creating directory:', dir);
        yield _fsExtra.default.mkdirs(dir);
        const files = yield _fsExtra.default.readdir(dir);

        if (files.length !== 0) {
          d('found', files.length, 'files in the directory.  warning the user');
          initSpinner.stop(_logSymbols.default.warning);
          throw `The specified path: "${dir}" is not empty, do you wish to continue?`;
        }
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvaW5pdC1zY3JpcHRzL2luaXQtZGlyZWN0b3J5LmpzIl0sIm5hbWVzIjpbImQiLCJkaXIiLCJpbml0U3Bpbm5lciIsIm1rZGlycyIsImZpbGVzIiwicmVhZGRpciIsImxlbmd0aCIsInN0b3AiLCJ3YXJuaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLElBQUksb0JBQU0sK0JBQU4sQ0FBVjs7Ozs7K0JBRWUsV0FBT0MsR0FBUCxFQUFlO0FBQzVCLFVBQU0sd0JBQVMsZ0NBQVQ7QUFBQTtBQUFBO0FBQUEsb0NBQTJDLFdBQU9DLFdBQVAsRUFBdUI7QUFDdEVGLFVBQUUscUJBQUYsRUFBeUJDLEdBQXpCO0FBQ0EsY0FBTSxpQkFBR0UsTUFBSCxDQUFVRixHQUFWLENBQU47QUFFQSxjQUFNRyxjQUFjLGlCQUFHQyxPQUFILENBQVdKLEdBQVgsQ0FBcEI7O0FBQ0EsWUFBSUcsTUFBTUUsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0Qk4sWUFBRSxPQUFGLEVBQVdJLE1BQU1FLE1BQWpCLEVBQXlCLDJDQUF6QjtBQUNBSixzQkFBWUssSUFBWixDQUFpQixvQkFBV0MsT0FBNUI7QUFDQSxnQkFBTyx3QkFBdUJQLEdBQUksMENBQWxDO0FBQ0Q7QUFDRixPQVZLOztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQU47QUFXRCxHIiwiZmlsZSI6ImluaXQtZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXN5bmNPcmEgfSBmcm9tICdAZWxlY3Ryb24tZm9yZ2UvYXN5bmMtb3JhJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IGxvZ1N5bWJvbHMgZnJvbSAnbG9nLXN5bWJvbHMnO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOmluaXQ6ZGlyZWN0b3J5Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChkaXIpID0+IHtcbiAgYXdhaXQgYXN5bmNPcmEoJ0luaXRpYWxpemluZyBQcm9qZWN0IERpcmVjdG9yeScsIGFzeW5jIChpbml0U3Bpbm5lcikgPT4ge1xuICAgIGQoJ2NyZWF0aW5nIGRpcmVjdG9yeTonLCBkaXIpO1xuICAgIGF3YWl0IGZzLm1rZGlycyhkaXIpO1xuXG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCBmcy5yZWFkZGlyKGRpcik7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgZCgnZm91bmQnLCBmaWxlcy5sZW5ndGgsICdmaWxlcyBpbiB0aGUgZGlyZWN0b3J5LiAgd2FybmluZyB0aGUgdXNlcicpO1xuICAgICAgaW5pdFNwaW5uZXIuc3RvcChsb2dTeW1ib2xzLndhcm5pbmcpO1xuICAgICAgdGhyb3cgYFRoZSBzcGVjaWZpZWQgcGF0aDogXCIke2Rpcn1cIiBpcyBub3QgZW1wdHksIGRvIHlvdSB3aXNoIHRvIGNvbnRpbnVlP2A7XG4gICAgfVxuICB9KTtcbn07XG4iXX0=
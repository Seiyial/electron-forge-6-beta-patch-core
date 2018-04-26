"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncOra = require("@electron-forge/async-ora");

var _child_process = require("child_process");

var _debug = _interopRequireDefault(require("debug"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:init:git');

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (dir) {
    yield (0, _asyncOra.asyncOra)('Initializing Git Repository',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      yield new Promise(
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(function* (resolve, reject) {
          if (yield _fsExtra.default.pathExists(_path.default.resolve(dir, '.git'))) {
            d('.git directory already exists, skipping git initialization');
            return resolve();
          }

          d('executing "git init" in directory:', dir);
          (0, _child_process.exec)('git init', {
            cwd: dir
          }, err => {
            if (err) return reject(err);
            resolve();
          });
        });

        return function (_x2, _x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    }));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvaW5pdC1zY3JpcHRzL2luaXQtZ2l0LmpzIl0sIm5hbWVzIjpbImQiLCJkaXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInBhdGhFeGlzdHMiLCJjd2QiLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSx5QkFBTixDQUFWOzs7OzsrQkFFZSxXQUFPQyxHQUFQLEVBQWU7QUFDNUIsVUFBTSx3QkFBUyw2QkFBVDtBQUFBO0FBQUEsc0JBQXdDLGFBQVk7QUFDeEQsWUFBTSxJQUFJQyxPQUFKO0FBQUE7QUFBQTtBQUFBLHNDQUFZLFdBQU9DLE9BQVAsRUFBZ0JDLE1BQWhCLEVBQTJCO0FBQzNDLG9CQUFVLGlCQUFHQyxVQUFILENBQWMsY0FBS0YsT0FBTCxDQUFhRixHQUFiLEVBQWtCLE1BQWxCLENBQWQsQ0FBVixFQUFvRDtBQUNsREQsY0FBRSw0REFBRjtBQUNBLG1CQUFPRyxTQUFQO0FBQ0Q7O0FBQ0RILFlBQUUsb0NBQUYsRUFBd0NDLEdBQXhDO0FBQ0EsbUNBQUssVUFBTCxFQUFpQjtBQUNmSyxpQkFBS0w7QUFEVSxXQUFqQixFQUVJTSxHQUFELElBQVM7QUFDVixnQkFBSUEsR0FBSixFQUFTLE9BQU9ILE9BQU9HLEdBQVAsQ0FBUDtBQUNUSjtBQUNELFdBTEQ7QUFNRCxTQVpLOztBQUFBO0FBQUE7QUFBQTtBQUFBLFVBQU47QUFhRCxLQWRLLEVBQU47QUFlRCxHIiwiZmlsZSI6ImluaXQtZ2l0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXN5bmNPcmEgfSBmcm9tICdAZWxlY3Ryb24tZm9yZ2UvYXN5bmMtb3JhJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6aW5pdDpnaXQnKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGRpcikgPT4ge1xuICBhd2FpdCBhc3luY09yYSgnSW5pdGlhbGl6aW5nIEdpdCBSZXBvc2l0b3J5JywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChhd2FpdCBmcy5wYXRoRXhpc3RzKHBhdGgucmVzb2x2ZShkaXIsICcuZ2l0JykpKSB7XG4gICAgICAgIGQoJy5naXQgZGlyZWN0b3J5IGFscmVhZHkgZXhpc3RzLCBza2lwcGluZyBnaXQgaW5pdGlhbGl6YXRpb24nKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIGQoJ2V4ZWN1dGluZyBcImdpdCBpbml0XCIgaW4gZGlyZWN0b3J5OicsIGRpcik7XG4gICAgICBleGVjKCdnaXQgaW5pdCcsIHtcbiAgICAgICAgY3dkOiBkaXIsXG4gICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==
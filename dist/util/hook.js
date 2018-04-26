"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:hook');

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (forgeConfig, hookName, ...hookArgs) {
    const hooks = forgeConfig.hooks || {};
    d(`hook triggered: ${hookName}`);

    if (typeof hooks[hookName] === 'function') {
      d('calling hook:', hookName, 'with args:', hookArgs);
      yield hooks[hookName](forgeConfig, ...hookArgs);
    }

    yield forgeConfig.pluginInterface.triggerHook(hookName, hookArgs);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2hvb2suanMiXSwibmFtZXMiOlsiZCIsImZvcmdlQ29uZmlnIiwiaG9va05hbWUiLCJob29rQXJncyIsImhvb2tzIiwicGx1Z2luSW50ZXJmYWNlIiwidHJpZ2dlckhvb2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSxxQkFBTixDQUFWOzs7OzsrQkFFZSxXQUFPQyxXQUFQLEVBQW9CQyxRQUFwQixFQUE4QixHQUFHQyxRQUFqQyxFQUE4QztBQUMzRCxVQUFNQyxRQUFRSCxZQUFZRyxLQUFaLElBQXFCLEVBQW5DO0FBQ0FKLE1BQUcsbUJBQWtCRSxRQUFTLEVBQTlCOztBQUNBLFFBQUksT0FBT0UsTUFBTUYsUUFBTixDQUFQLEtBQTJCLFVBQS9CLEVBQTJDO0FBQ3pDRixRQUFFLGVBQUYsRUFBbUJFLFFBQW5CLEVBQTZCLFlBQTdCLEVBQTJDQyxRQUEzQztBQUNBLFlBQU1DLE1BQU1GLFFBQU4sRUFBZ0JELFdBQWhCLEVBQTZCLEdBQUdFLFFBQWhDLENBQU47QUFDRDs7QUFDRCxVQUFNRixZQUFZSSxlQUFaLENBQTRCQyxXQUE1QixDQUF3Q0osUUFBeEMsRUFBa0RDLFFBQWxELENBQU47QUFDRCxHIiwiZmlsZSI6Imhvb2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOmhvb2snKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGZvcmdlQ29uZmlnLCBob29rTmFtZSwgLi4uaG9va0FyZ3MpID0+IHtcbiAgY29uc3QgaG9va3MgPSBmb3JnZUNvbmZpZy5ob29rcyB8fCB7fTtcbiAgZChgaG9vayB0cmlnZ2VyZWQ6ICR7aG9va05hbWV9YCk7XG4gIGlmICh0eXBlb2YgaG9va3NbaG9va05hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZCgnY2FsbGluZyBob29rOicsIGhvb2tOYW1lLCAnd2l0aCBhcmdzOicsIGhvb2tBcmdzKTtcbiAgICBhd2FpdCBob29rc1tob29rTmFtZV0oZm9yZ2VDb25maWcsIC4uLmhvb2tBcmdzKTtcbiAgfVxuICBhd2FpdCBmb3JnZUNvbmZpZy5wbHVnaW5JbnRlcmZhY2UudHJpZ2dlckhvb2soaG9va05hbWUsIGhvb2tBcmdzKTtcbn07XG4iXX0=
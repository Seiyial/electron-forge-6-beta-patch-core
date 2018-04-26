"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.sudo = void 0;

var _child_process = require("child_process");

var _pify = _interopRequireDefault(require("pify"));

var _sudoPrompt = _interopRequireDefault(require("sudo-prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const which =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (type, prog, promise) {
    if ((0, _child_process.spawnSync)('which', [prog]).status === 0) {
      yield promise;
    } else {
      throw new Error(`${prog} is required to install ${type} packages`);
    }
  });

  return function which(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

const sudo = (type, prog, args) => which(type, prog, (0, _pify.default)(_sudoPrompt.default.exec)(`${prog} ${args}`, {
  name: 'Electron Forge'
}));

exports.sudo = sudo;
var _default = which;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2xpbnV4LWluc3RhbGxlci5qcyJdLCJuYW1lcyI6WyJ3aGljaCIsInR5cGUiLCJwcm9nIiwicHJvbWlzZSIsInN0YXR1cyIsIkVycm9yIiwic3VkbyIsImFyZ3MiLCJleGVjIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQTtBQUFBO0FBQUE7QUFBQSwrQkFBUSxXQUFPQyxJQUFQLEVBQWFDLElBQWIsRUFBbUJDLE9BQW5CLEVBQStCO0FBQzNDLFFBQUksOEJBQVUsT0FBVixFQUFtQixDQUFDRCxJQUFELENBQW5CLEVBQTJCRSxNQUEzQixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxZQUFNRCxPQUFOO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsWUFBTSxJQUFJRSxLQUFKLENBQVcsR0FBRUgsSUFBSywyQkFBMEJELElBQUssV0FBakQsQ0FBTjtBQUNEO0FBQ0YsR0FOSzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVFPLE1BQU1LLE9BQU8sQ0FBQ0wsSUFBRCxFQUFPQyxJQUFQLEVBQWFLLElBQWIsS0FDbEJQLE1BQU1DLElBQU4sRUFBWUMsSUFBWixFQUFrQixtQkFBSyxvQkFBV00sSUFBaEIsRUFBdUIsR0FBRU4sSUFBSyxJQUFHSyxJQUFLLEVBQXRDLEVBQXlDO0FBQUVFLFFBQU07QUFBUixDQUF6QyxDQUFsQixDQURLOzs7ZUFHUVQsSyIsImZpbGUiOiJsaW51eC1pbnN0YWxsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzcGF3blN5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuaW1wb3J0IHN1ZG9Qcm9tcHQgZnJvbSAnc3Vkby1wcm9tcHQnO1xuXG5jb25zdCB3aGljaCA9IGFzeW5jICh0eXBlLCBwcm9nLCBwcm9taXNlKSA9PiB7XG4gIGlmIChzcGF3blN5bmMoJ3doaWNoJywgW3Byb2ddKS5zdGF0dXMgPT09IDApIHtcbiAgICBhd2FpdCBwcm9taXNlO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtwcm9nfSBpcyByZXF1aXJlZCB0byBpbnN0YWxsICR7dHlwZX0gcGFja2FnZXNgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHN1ZG8gPSAodHlwZSwgcHJvZywgYXJncykgPT5cbiAgd2hpY2godHlwZSwgcHJvZywgcGlmeShzdWRvUHJvbXB0LmV4ZWMpKGAke3Byb2d9ICR7YXJnc31gLCB7IG5hbWU6ICdFbGVjdHJvbiBGb3JnZScgfSkpO1xuXG5leHBvcnQgZGVmYXVsdCB3aGljaDtcbiJdfQ==
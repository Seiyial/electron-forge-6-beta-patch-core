"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.exactDevDeps = exports.devDeps = exports.deps = void 0;

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _username = _interopRequireDefault(require("username"));

var _forgeConfig = require("../../util/forge-config");

var _installDependencies = _interopRequireDefault(require("../../util/install-dependencies"));

var _readPackageJson = _interopRequireDefault(require("../../util/read-package-json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:init:npm');
const deps = ['electron-squirrel-startup'];
exports.deps = deps;
const devDeps = ['@electron-forge/cli'];
exports.devDeps = devDeps;
const exactDevDeps = ['electron'];
exports.exactDevDeps = exactDevDeps;

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (dir) {
    yield (0, _asyncOra.asyncOra)('Initializing NPM Module',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      const packageJSON = yield (0, _readPackageJson.default)(_path.default.resolve(__dirname, '../../../tmpl'));
      packageJSON.productName = packageJSON.name = _path.default.basename(dir).toLowerCase();
      packageJSON.author = yield (0, _username.default)();
      (0, _forgeConfig.setInitialForgeConfig)(packageJSON);
      packageJSON.scripts.lint = 'echo "No linting configured"';
      d('writing package.json to:', dir);
      yield _fsExtra.default.writeJson(_path.default.resolve(dir, 'package.json'), packageJSON, {
        spaces: 2
      });
    }));
    yield (0, _asyncOra.asyncOra)('Installing NPM Dependencies',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      d('installing dependencies');
      yield (0, _installDependencies.default)(dir, deps);
      d('installing devDependencies');
      yield (0, _installDependencies.default)(dir, devDeps, true);
      d('installing exact dependencies');

      for (var _i = 0; _i < exactDevDeps.length; _i++) {
        const packageName = exactDevDeps[_i];
        yield (0, _installDependencies.default)(dir, [packageName], true, true);
      }
    }));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvaW5pdC1zY3JpcHRzL2luaXQtbnBtLmpzIl0sIm5hbWVzIjpbImQiLCJkZXBzIiwiZGV2RGVwcyIsImV4YWN0RGV2RGVwcyIsImRpciIsInBhY2thZ2VKU09OIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsInByb2R1Y3ROYW1lIiwibmFtZSIsImJhc2VuYW1lIiwidG9Mb3dlckNhc2UiLCJhdXRob3IiLCJzY3JpcHRzIiwibGludCIsIndyaXRlSnNvbiIsInNwYWNlcyIsInBhY2thZ2VOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLElBQUksb0JBQU0seUJBQU4sQ0FBVjtBQUVPLE1BQU1DLE9BQU8sQ0FBQywyQkFBRCxDQUFiOztBQUNBLE1BQU1DLFVBQVUsQ0FBQyxxQkFBRCxDQUFoQjs7QUFDQSxNQUFNQyxlQUFlLENBQUMsVUFBRCxDQUFyQjs7Ozs7OytCQUVRLFdBQU9DLEdBQVAsRUFBZTtBQUM1QixVQUFNLHdCQUFTLHlCQUFUO0FBQUE7QUFBQSxzQkFBb0MsYUFBWTtBQUNwRCxZQUFNQyxvQkFBb0IsOEJBQWdCLGNBQUtDLE9BQUwsQ0FBYUMsU0FBYixFQUF3QixlQUF4QixDQUFoQixDQUExQjtBQUNBRixrQkFBWUcsV0FBWixHQUEwQkgsWUFBWUksSUFBWixHQUFtQixjQUFLQyxRQUFMLENBQWNOLEdBQWQsRUFBbUJPLFdBQW5CLEVBQTdDO0FBQ0FOLGtCQUFZTyxNQUFaLFNBQTJCLHdCQUEzQjtBQUNBLDhDQUFzQlAsV0FBdEI7QUFFQUEsa0JBQVlRLE9BQVosQ0FBb0JDLElBQXBCLEdBQTJCLDhCQUEzQjtBQUVBZCxRQUFFLDBCQUFGLEVBQThCSSxHQUE5QjtBQUNBLFlBQU0saUJBQUdXLFNBQUgsQ0FBYSxjQUFLVCxPQUFMLENBQWFGLEdBQWIsRUFBa0IsY0FBbEIsQ0FBYixFQUFnREMsV0FBaEQsRUFBNkQ7QUFBRVcsZ0JBQVE7QUFBVixPQUE3RCxDQUFOO0FBQ0QsS0FWSyxFQUFOO0FBWUEsVUFBTSx3QkFBUyw2QkFBVDtBQUFBO0FBQUEsc0JBQXdDLGFBQVk7QUFDeERoQixRQUFFLHlCQUFGO0FBQ0EsWUFBTSxrQ0FBZUksR0FBZixFQUFvQkgsSUFBcEIsQ0FBTjtBQUVBRCxRQUFFLDRCQUFGO0FBQ0EsWUFBTSxrQ0FBZUksR0FBZixFQUFvQkYsT0FBcEIsRUFBNkIsSUFBN0IsQ0FBTjtBQUVBRixRQUFFLCtCQUFGOztBQUNBLDRCQUEwQkcsWUFBMUIsZUFBd0M7QUFBbkMsY0FBTWMsY0FBZWQsWUFBZixJQUFOO0FBQ0gsY0FBTSxrQ0FBZUMsR0FBZixFQUFvQixDQUFDYSxXQUFELENBQXBCLEVBQW1DLElBQW5DLEVBQXlDLElBQXpDLENBQU47QUFDRDtBQUNGLEtBWEssRUFBTjtBQVlELEciLCJmaWxlIjoiaW5pdC1ucG0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3luY09yYSB9IGZyb20gJ0BlbGVjdHJvbi1mb3JnZS9hc3luYy1vcmEnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB1c2VybmFtZSBmcm9tICd1c2VybmFtZSc7XG5cbmltcG9ydCB7IHNldEluaXRpYWxGb3JnZUNvbmZpZyB9IGZyb20gJy4uLy4uL3V0aWwvZm9yZ2UtY29uZmlnJztcbmltcG9ydCBpbnN0YWxsRGVwTGlzdCBmcm9tICcuLi8uLi91dGlsL2luc3RhbGwtZGVwZW5kZW5jaWVzJztcbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi4vLi4vdXRpbC9yZWFkLXBhY2thZ2UtanNvbic7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6aW5pdDpucG0nKTtcblxuZXhwb3J0IGNvbnN0IGRlcHMgPSBbJ2VsZWN0cm9uLXNxdWlycmVsLXN0YXJ0dXAnXTtcbmV4cG9ydCBjb25zdCBkZXZEZXBzID0gWydAZWxlY3Ryb24tZm9yZ2UvY2xpJ107XG5leHBvcnQgY29uc3QgZXhhY3REZXZEZXBzID0gWydlbGVjdHJvbiddO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlyKSA9PiB7XG4gIGF3YWl0IGFzeW5jT3JhKCdJbml0aWFsaXppbmcgTlBNIE1vZHVsZScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBwYWNrYWdlSlNPTiA9IGF3YWl0IHJlYWRQYWNrYWdlSlNPTihwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vdG1wbCcpKTtcbiAgICBwYWNrYWdlSlNPTi5wcm9kdWN0TmFtZSA9IHBhY2thZ2VKU09OLm5hbWUgPSBwYXRoLmJhc2VuYW1lKGRpcikudG9Mb3dlckNhc2UoKTtcbiAgICBwYWNrYWdlSlNPTi5hdXRob3IgPSBhd2FpdCB1c2VybmFtZSgpO1xuICAgIHNldEluaXRpYWxGb3JnZUNvbmZpZyhwYWNrYWdlSlNPTik7XG5cbiAgICBwYWNrYWdlSlNPTi5zY3JpcHRzLmxpbnQgPSAnZWNobyBcIk5vIGxpbnRpbmcgY29uZmlndXJlZFwiJztcblxuICAgIGQoJ3dyaXRpbmcgcGFja2FnZS5qc29uIHRvOicsIGRpcik7XG4gICAgYXdhaXQgZnMud3JpdGVKc29uKHBhdGgucmVzb2x2ZShkaXIsICdwYWNrYWdlLmpzb24nKSwgcGFja2FnZUpTT04sIHsgc3BhY2VzOiAyIH0pO1xuICB9KTtcblxuICBhd2FpdCBhc3luY09yYSgnSW5zdGFsbGluZyBOUE0gRGVwZW5kZW5jaWVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGQoJ2luc3RhbGxpbmcgZGVwZW5kZW5jaWVzJyk7XG4gICAgYXdhaXQgaW5zdGFsbERlcExpc3QoZGlyLCBkZXBzKTtcblxuICAgIGQoJ2luc3RhbGxpbmcgZGV2RGVwZW5kZW5jaWVzJyk7XG4gICAgYXdhaXQgaW5zdGFsbERlcExpc3QoZGlyLCBkZXZEZXBzLCB0cnVlKTtcblxuICAgIGQoJ2luc3RhbGxpbmcgZXhhY3QgZGVwZW5kZW5jaWVzJyk7XG4gICAgZm9yIChjb25zdCBwYWNrYWdlTmFtZSBvZiBleGFjdERldkRlcHMpIHtcbiAgICAgIGF3YWl0IGluc3RhbGxEZXBMaXN0KGRpciwgW3BhY2thZ2VOYW1lXSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9KTtcbn07XG4iXX0=
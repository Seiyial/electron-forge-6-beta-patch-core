"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _resolvePackage = _interopRequireDefault(require("resolve-package"));

var _path = _interopRequireDefault(require("path"));

var _initStarterFiles = require("./init-starter-files");

var _installDependencies = _interopRequireDefault(require("../../util/install-dependencies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:init:custom');

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (dir, template) {
    let templateModulePath;
    yield (0, _asyncOra.asyncOra)(`Locating custom template: "${template}"`,
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      try {
        templateModulePath = yield (0, _resolvePackage.default)(`electron-forge-template-${template}`);
        d('using global template');
      } catch (err) {
        try {
          templateModulePath = yield (0, _resolvePackage.default)(`@electron-forge/template-${template}`);
          d('using global template');
        } catch (err2) {
          try {
            templateModulePath = require.resolve(`electron-forge-template-${template}`);
            d('using local template');
          } catch (err3) {
            try {
              templateModulePath = require.resolve(`@electron-forge/template-${template}`);
              d('using local template');
            } catch (err4) {
              try {
                templateModulePath = require.resolve(template);
                d('using absolute template');
              } catch (err5) {
                throw `Failed to locate custom template: "${template}"\n\nTry \`npm install -g @electron-forge-template-${template}\``;
              }
            }
          }
        }
      }
    }));

    let templateModule = require(templateModulePath);

    templateModule = templateModule.default || templateModule;
    yield (0, _asyncOra.asyncOra)('Installing Template Dependencies',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      d('installing dependencies');
      yield (0, _installDependencies.default)(dir, templateModule.dependencies || []);
      d('installing devDependencies');
      yield (0, _installDependencies.default)(dir, templateModule.devDependencies || [], true);
    }));
    yield (0, _asyncOra.asyncOra)('Copying Template Files',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      const templateDirectory = templateModule.templateDirectory;

      if (templateDirectory) {
        const tmplPath = templateDirectory;

        if (!_path.default.isAbsolute(templateDirectory)) {
          throw `Custom template path needs to be absolute, this is an issue with "electron-forge-template-${template}"`;
        }

        const files = _glob.default.sync(_path.default.resolve(tmplPath, '**/*'));

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            const file = _step.value;

            if ((yield _fsExtra.default.stat(file)).isFile()) {
              yield (0, _initStarterFiles.copy)(file, _path.default.resolve(dir, _path.default.relative(tmplPath, file).replace(/^_/, '.')));
            }
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
      }
    }));

    if (typeof templateModule.postCopy === 'function') {
      yield Promise.resolve(templateModule.postCopy(dir, _asyncOra.ora));
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvaW5pdC1zY3JpcHRzL2luaXQtY3VzdG9tLmpzIl0sIm5hbWVzIjpbImQiLCJkaXIiLCJ0ZW1wbGF0ZSIsInRlbXBsYXRlTW9kdWxlUGF0aCIsImVyciIsImVycjIiLCJyZXF1aXJlIiwicmVzb2x2ZSIsImVycjMiLCJlcnI0IiwiZXJyNSIsInRlbXBsYXRlTW9kdWxlIiwiZGVmYXVsdCIsImRlcGVuZGVuY2llcyIsImRldkRlcGVuZGVuY2llcyIsInRlbXBsYXRlRGlyZWN0b3J5IiwidG1wbFBhdGgiLCJpc0Fic29sdXRlIiwiZmlsZXMiLCJzeW5jIiwiZmlsZSIsInN0YXQiLCJpc0ZpbGUiLCJyZWxhdGl2ZSIsInJlcGxhY2UiLCJwb3N0Q29weSIsIlByb21pc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSw0QkFBTixDQUFWOzs7OzsrQkFFZSxXQUFPQyxHQUFQLEVBQVlDLFFBQVosRUFBeUI7QUFDdEMsUUFBSUMsa0JBQUo7QUFDQSxVQUFNLHdCQUFVLDhCQUE2QkQsUUFBUyxHQUFoRDtBQUFBO0FBQUEsc0JBQW9ELGFBQVk7QUFDcEUsVUFBSTtBQUNGQyxtQ0FBMkIsNkJBQWdCLDJCQUEwQkQsUUFBUyxFQUFuRCxDQUEzQjtBQUNBRixVQUFFLHVCQUFGO0FBQ0QsT0FIRCxDQUdFLE9BQU9JLEdBQVAsRUFBWTtBQUNaLFlBQUk7QUFDRkQscUNBQTJCLDZCQUFnQiw0QkFBMkJELFFBQVMsRUFBcEQsQ0FBM0I7QUFDQUYsWUFBRSx1QkFBRjtBQUNELFNBSEQsQ0FHRSxPQUFPSyxJQUFQLEVBQWE7QUFDYixjQUFJO0FBQ0ZGLGlDQUFxQkcsUUFBUUMsT0FBUixDQUFpQiwyQkFBMEJMLFFBQVMsRUFBcEQsQ0FBckI7QUFDQUYsY0FBRSxzQkFBRjtBQUNELFdBSEQsQ0FHRSxPQUFPUSxJQUFQLEVBQWE7QUFDYixnQkFBSTtBQUNGTCxtQ0FBcUJHLFFBQVFDLE9BQVIsQ0FBaUIsNEJBQTJCTCxRQUFTLEVBQXJELENBQXJCO0FBQ0FGLGdCQUFFLHNCQUFGO0FBQ0QsYUFIRCxDQUdFLE9BQU9TLElBQVAsRUFBYTtBQUNiLGtCQUFJO0FBQ0ZOLHFDQUFxQkcsUUFBUUMsT0FBUixDQUFnQkwsUUFBaEIsQ0FBckI7QUFDQUYsa0JBQUUseUJBQUY7QUFDRCxlQUhELENBR0UsT0FBT1UsSUFBUCxFQUFhO0FBQ2Isc0JBQU8sc0NBQXFDUixRQUFTLHNEQUFxREEsUUFBUyxJQUFuSDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7QUFDRixLQTNCSyxFQUFOOztBQTZCQSxRQUFJUyxpQkFBaUJMLFFBQVFILGtCQUFSLENBQXJCOztBQUVBUSxxQkFBaUJBLGVBQWVDLE9BQWYsSUFBMEJELGNBQTNDO0FBRUEsVUFBTSx3QkFBUyxrQ0FBVDtBQUFBO0FBQUEsc0JBQTZDLGFBQVk7QUFDN0RYLFFBQUUseUJBQUY7QUFDQSxZQUFNLGtDQUFlQyxHQUFmLEVBQW9CVSxlQUFlRSxZQUFmLElBQStCLEVBQW5ELENBQU47QUFDQWIsUUFBRSw0QkFBRjtBQUNBLFlBQU0sa0NBQWVDLEdBQWYsRUFBb0JVLGVBQWVHLGVBQWYsSUFBa0MsRUFBdEQsRUFBMEQsSUFBMUQsQ0FBTjtBQUNELEtBTEssRUFBTjtBQU9BLFVBQU0sd0JBQVMsd0JBQVQ7QUFBQTtBQUFBLHNCQUFtQyxhQUFZO0FBQ25ELFlBQU1DLG9CQUFvQkosZUFBZUksaUJBQXpDOztBQUNBLFVBQUlBLGlCQUFKLEVBQXVCO0FBQ3JCLGNBQU1DLFdBQVdELGlCQUFqQjs7QUFDQSxZQUFJLENBQUMsY0FBS0UsVUFBTCxDQUFnQkYsaUJBQWhCLENBQUwsRUFBeUM7QUFDdkMsZ0JBQU8sNkZBQTRGYixRQUFTLEdBQTVHO0FBQ0Q7O0FBRUQsY0FBTWdCLFFBQVEsY0FBS0MsSUFBTCxDQUFVLGNBQUtaLE9BQUwsQ0FBYVMsUUFBYixFQUF1QixNQUF2QixDQUFWLENBQWQ7O0FBTnFCO0FBQUE7QUFBQTs7QUFBQTtBQVFyQiwrQkFBbUJFLEtBQW5CLDhIQUEwQjtBQUFBLGtCQUFmRSxJQUFlOztBQUN4QixnQkFBSSxPQUFPLGlCQUFHQyxJQUFILENBQVFELElBQVIsQ0FBUCxFQUFzQkUsTUFBdEIsRUFBSixFQUFvQztBQUNsQyxvQkFBTSw0QkFBS0YsSUFBTCxFQUFXLGNBQUtiLE9BQUwsQ0FBYU4sR0FBYixFQUFrQixjQUFLc0IsUUFBTCxDQUFjUCxRQUFkLEVBQXdCSSxJQUF4QixFQUE4QkksT0FBOUIsQ0FBc0MsSUFBdEMsRUFBNEMsR0FBNUMsQ0FBbEIsQ0FBWCxDQUFOO0FBQ0Q7QUFDRjtBQVpvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYXRCO0FBQ0YsS0FoQkssRUFBTjs7QUFrQkEsUUFBSSxPQUFPYixlQUFlYyxRQUF0QixLQUFtQyxVQUF2QyxFQUFtRDtBQUNqRCxZQUFNQyxRQUFRbkIsT0FBUixDQUFnQkksZUFBZWMsUUFBZixDQUF3QnhCLEdBQXhCLGdCQUFoQixDQUFOO0FBQ0Q7QUFDRixHIiwiZmlsZSI6ImluaXQtY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXN5bmNPcmEsIG9yYSB9IGZyb20gJ0BlbGVjdHJvbi1mb3JnZS9hc3luYy1vcmEnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJztcbmltcG9ydCByZXNvbHZlUGFja2FnZSBmcm9tICdyZXNvbHZlLXBhY2thZ2UnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IGNvcHkgfSBmcm9tICcuL2luaXQtc3RhcnRlci1maWxlcyc7XG5pbXBvcnQgaW5zdGFsbERlcExpc3QgZnJvbSAnLi4vLi4vdXRpbC9pbnN0YWxsLWRlcGVuZGVuY2llcyc7XG5cbmNvbnN0IGQgPSBkZWJ1ZygnZWxlY3Ryb24tZm9yZ2U6aW5pdDpjdXN0b20nKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGRpciwgdGVtcGxhdGUpID0+IHtcbiAgbGV0IHRlbXBsYXRlTW9kdWxlUGF0aDtcbiAgYXdhaXQgYXN5bmNPcmEoYExvY2F0aW5nIGN1c3RvbSB0ZW1wbGF0ZTogXCIke3RlbXBsYXRlfVwiYCwgYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICB0ZW1wbGF0ZU1vZHVsZVBhdGggPSBhd2FpdCByZXNvbHZlUGFja2FnZShgZWxlY3Ryb24tZm9yZ2UtdGVtcGxhdGUtJHt0ZW1wbGF0ZX1gKTtcbiAgICAgIGQoJ3VzaW5nIGdsb2JhbCB0ZW1wbGF0ZScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGVtcGxhdGVNb2R1bGVQYXRoID0gYXdhaXQgcmVzb2x2ZVBhY2thZ2UoYEBlbGVjdHJvbi1mb3JnZS90ZW1wbGF0ZS0ke3RlbXBsYXRlfWApO1xuICAgICAgICBkKCd1c2luZyBnbG9iYWwgdGVtcGxhdGUnKTtcbiAgICAgIH0gY2F0Y2ggKGVycjIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0ZW1wbGF0ZU1vZHVsZVBhdGggPSByZXF1aXJlLnJlc29sdmUoYGVsZWN0cm9uLWZvcmdlLXRlbXBsYXRlLSR7dGVtcGxhdGV9YCk7XG4gICAgICAgICAgZCgndXNpbmcgbG9jYWwgdGVtcGxhdGUnKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyMykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZU1vZHVsZVBhdGggPSByZXF1aXJlLnJlc29sdmUoYEBlbGVjdHJvbi1mb3JnZS90ZW1wbGF0ZS0ke3RlbXBsYXRlfWApO1xuICAgICAgICAgICAgZCgndXNpbmcgbG9jYWwgdGVtcGxhdGUnKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnI0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZU1vZHVsZVBhdGggPSByZXF1aXJlLnJlc29sdmUodGVtcGxhdGUpO1xuICAgICAgICAgICAgICBkKCd1c2luZyBhYnNvbHV0ZSB0ZW1wbGF0ZScpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyNSkge1xuICAgICAgICAgICAgICB0aHJvdyBgRmFpbGVkIHRvIGxvY2F0ZSBjdXN0b20gdGVtcGxhdGU6IFwiJHt0ZW1wbGF0ZX1cIlxcblxcblRyeSBcXGBucG0gaW5zdGFsbCAtZyBAZWxlY3Ryb24tZm9yZ2UtdGVtcGxhdGUtJHt0ZW1wbGF0ZX1cXGBgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbGV0IHRlbXBsYXRlTW9kdWxlID0gcmVxdWlyZSh0ZW1wbGF0ZU1vZHVsZVBhdGgpO1xuXG4gIHRlbXBsYXRlTW9kdWxlID0gdGVtcGxhdGVNb2R1bGUuZGVmYXVsdCB8fCB0ZW1wbGF0ZU1vZHVsZTtcblxuICBhd2FpdCBhc3luY09yYSgnSW5zdGFsbGluZyBUZW1wbGF0ZSBEZXBlbmRlbmNpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgZCgnaW5zdGFsbGluZyBkZXBlbmRlbmNpZXMnKTtcbiAgICBhd2FpdCBpbnN0YWxsRGVwTGlzdChkaXIsIHRlbXBsYXRlTW9kdWxlLmRlcGVuZGVuY2llcyB8fCBbXSk7XG4gICAgZCgnaW5zdGFsbGluZyBkZXZEZXBlbmRlbmNpZXMnKTtcbiAgICBhd2FpdCBpbnN0YWxsRGVwTGlzdChkaXIsIHRlbXBsYXRlTW9kdWxlLmRldkRlcGVuZGVuY2llcyB8fCBbXSwgdHJ1ZSk7XG4gIH0pO1xuXG4gIGF3YWl0IGFzeW5jT3JhKCdDb3B5aW5nIFRlbXBsYXRlIEZpbGVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlRGlyZWN0b3J5ID0gdGVtcGxhdGVNb2R1bGUudGVtcGxhdGVEaXJlY3Rvcnk7XG4gICAgaWYgKHRlbXBsYXRlRGlyZWN0b3J5KSB7XG4gICAgICBjb25zdCB0bXBsUGF0aCA9IHRlbXBsYXRlRGlyZWN0b3J5O1xuICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUodGVtcGxhdGVEaXJlY3RvcnkpKSB7XG4gICAgICAgIHRocm93IGBDdXN0b20gdGVtcGxhdGUgcGF0aCBuZWVkcyB0byBiZSBhYnNvbHV0ZSwgdGhpcyBpcyBhbiBpc3N1ZSB3aXRoIFwiZWxlY3Ryb24tZm9yZ2UtdGVtcGxhdGUtJHt0ZW1wbGF0ZX1cImA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGVzID0gZ2xvYi5zeW5jKHBhdGgucmVzb2x2ZSh0bXBsUGF0aCwgJyoqLyonKSk7XG5cbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICBpZiAoKGF3YWl0IGZzLnN0YXQoZmlsZSkpLmlzRmlsZSgpKSB7XG4gICAgICAgICAgYXdhaXQgY29weShmaWxlLCBwYXRoLnJlc29sdmUoZGlyLCBwYXRoLnJlbGF0aXZlKHRtcGxQYXRoLCBmaWxlKS5yZXBsYWNlKC9eXy8sICcuJykpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiB0ZW1wbGF0ZU1vZHVsZS5wb3N0Q29weSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSh0ZW1wbGF0ZU1vZHVsZS5wb3N0Q29weShkaXIsIG9yYSkpO1xuICB9XG59O1xuIl19
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _initCustom = _interopRequireDefault(require("./init-scripts/init-custom"));

var _initDirectory = _interopRequireDefault(require("./init-scripts/init-directory"));

var _initGit = _interopRequireDefault(require("./init-scripts/init-git"));

var _initNpm = _interopRequireDefault(require("./init-scripts/init-npm"));

var _initStarterFiles = _interopRequireDefault(require("./init-scripts/init-starter-files"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:init');
/**
 * @typedef {Object} InitOptions
 * @property {string} [dir=process.cwd()] The path to the app to be initialized
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 * @property {boolean} [copyCIFiles=false] Whether to copy Travis and AppVeyor CI files
 * @property {string} [template] The custom template to use. If left empty, the default template is used
 */

/**
 * Initialize a new Electron Forge template project in the given directory.
 *
 * @param {InitOptions} providedOptions - Options for the init method
 * @return {Promise} Will resolve when the initialization process is complete
 */

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    let _Object$assign = Object.assign({
      dir: process.cwd(),
      interactive: false,
      copyCIFiles: false,
      template: null
    }, providedOptions),
        dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        copyCIFiles = _Object$assign.copyCIFiles,
        template = _Object$assign.template;

    _asyncOra.asyncOra.interactive = interactive;
    d(`Initializing in: ${dir}`);
    yield (0, _initDirectory.default)(dir);
    yield (0, _initGit.default)(dir);
    yield (0, _initStarterFiles.default)(dir, {
      copyCIFiles
    });
    yield (0, _initNpm.default)(dir);

    if (template) {
      yield (0, _initCustom.default)(dir, template);
    }
  });

  return function () {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaW5pdC5qcyJdLCJuYW1lcyI6WyJkIiwicHJvdmlkZWRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiZGlyIiwicHJvY2VzcyIsImN3ZCIsImludGVyYWN0aXZlIiwiY29weUNJRmlsZXMiLCJ0ZW1wbGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLG9CQUFNLHFCQUFOLENBQVY7QUFFQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7OzsrQkFNZSxXQUFPQyxrQkFBa0IsRUFBekIsRUFBZ0M7QUFDN0M7QUFENkMseUJBRUtDLE9BQU9DLE1BQVAsQ0FBYztBQUM5REMsV0FBS0MsUUFBUUMsR0FBUixFQUR5RDtBQUU5REMsbUJBQWEsS0FGaUQ7QUFHOURDLG1CQUFhLEtBSGlEO0FBSTlEQyxnQkFBVTtBQUpvRCxLQUFkLEVBSy9DUixlQUwrQyxDQUZMO0FBQUEsUUFFdkNHLEdBRnVDLGtCQUV2Q0EsR0FGdUM7QUFBQSxRQUVsQ0csV0FGa0Msa0JBRWxDQSxXQUZrQztBQUFBLFFBRXJCQyxXQUZxQixrQkFFckJBLFdBRnFCO0FBQUEsUUFFUkMsUUFGUSxrQkFFUkEsUUFGUTs7QUFRN0MsdUJBQVNGLFdBQVQsR0FBdUJBLFdBQXZCO0FBRUFQLE1BQUcsb0JBQW1CSSxHQUFJLEVBQTFCO0FBRUEsVUFBTSw0QkFBY0EsR0FBZCxDQUFOO0FBQ0EsVUFBTSxzQkFBUUEsR0FBUixDQUFOO0FBQ0EsVUFBTSwrQkFBWUEsR0FBWixFQUFpQjtBQUFFSTtBQUFGLEtBQWpCLENBQU47QUFDQSxVQUFNLHNCQUFRSixHQUFSLENBQU47O0FBQ0EsUUFBSUssUUFBSixFQUFjO0FBQ1osWUFBTSx5QkFBV0wsR0FBWCxFQUFnQkssUUFBaEIsQ0FBTjtBQUNEO0FBQ0YsRyIsImZpbGUiOiJpbml0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXN5bmNPcmEgfSBmcm9tICdAZWxlY3Ryb24tZm9yZ2UvYXN5bmMtb3JhJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5cbmltcG9ydCBpbml0Q3VzdG9tIGZyb20gJy4vaW5pdC1zY3JpcHRzL2luaXQtY3VzdG9tJztcbmltcG9ydCBpbml0RGlyZWN0b3J5IGZyb20gJy4vaW5pdC1zY3JpcHRzL2luaXQtZGlyZWN0b3J5JztcbmltcG9ydCBpbml0R2l0IGZyb20gJy4vaW5pdC1zY3JpcHRzL2luaXQtZ2l0JztcbmltcG9ydCBpbml0TlBNIGZyb20gJy4vaW5pdC1zY3JpcHRzL2luaXQtbnBtJztcbmltcG9ydCBpbml0U3RhcnRlciBmcm9tICcuL2luaXQtc2NyaXB0cy9pbml0LXN0YXJ0ZXItZmlsZXMnO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOmluaXQnKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBJbml0T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkaXI9cHJvY2Vzcy5jd2QoKV0gVGhlIHBhdGggdG8gdGhlIGFwcCB0byBiZSBpbml0aWFsaXplZFxuICogQHByb3BlcnR5IHtib29sZWFufSBbaW50ZXJhY3RpdmU9ZmFsc2VdIFdoZXRoZXIgdG8gdXNlIHNlbnNpYmxlIGRlZmF1bHRzIG9yIHByb21wdCB0aGUgdXNlciB2aXN1YWxseVxuICogQHByb3BlcnR5IHtib29sZWFufSBbY29weUNJRmlsZXM9ZmFsc2VdIFdoZXRoZXIgdG8gY29weSBUcmF2aXMgYW5kIEFwcFZleW9yIENJIGZpbGVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3RlbXBsYXRlXSBUaGUgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZS4gSWYgbGVmdCBlbXB0eSwgdGhlIGRlZmF1bHQgdGVtcGxhdGUgaXMgdXNlZFxuICovXG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBFbGVjdHJvbiBGb3JnZSB0ZW1wbGF0ZSBwcm9qZWN0IGluIHRoZSBnaXZlbiBkaXJlY3RvcnkuXG4gKlxuICogQHBhcmFtIHtJbml0T3B0aW9uc30gcHJvdmlkZWRPcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGluaXQgbWV0aG9kXG4gKiBAcmV0dXJuIHtQcm9taXNlfSBXaWxsIHJlc29sdmUgd2hlbiB0aGUgaW5pdGlhbGl6YXRpb24gcHJvY2VzcyBpcyBjb21wbGV0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocHJvdmlkZWRPcHRpb25zID0ge30pID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdCwgbm8tdW51c2VkLXZhcnNcbiAgbGV0IHsgZGlyLCBpbnRlcmFjdGl2ZSwgY29weUNJRmlsZXMsIHRlbXBsYXRlIH0gPSBPYmplY3QuYXNzaWduKHtcbiAgICBkaXI6IHByb2Nlc3MuY3dkKCksXG4gICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgIGNvcHlDSUZpbGVzOiBmYWxzZSxcbiAgICB0ZW1wbGF0ZTogbnVsbCxcbiAgfSwgcHJvdmlkZWRPcHRpb25zKTtcbiAgYXN5bmNPcmEuaW50ZXJhY3RpdmUgPSBpbnRlcmFjdGl2ZTtcblxuICBkKGBJbml0aWFsaXppbmcgaW46ICR7ZGlyfWApO1xuXG4gIGF3YWl0IGluaXREaXJlY3RvcnkoZGlyKTtcbiAgYXdhaXQgaW5pdEdpdChkaXIpO1xuICBhd2FpdCBpbml0U3RhcnRlcihkaXIsIHsgY29weUNJRmlsZXMgfSk7XG4gIGF3YWl0IGluaXROUE0oZGlyKTtcbiAgaWYgKHRlbXBsYXRlKSB7XG4gICAgYXdhaXQgaW5pdEN1c3RvbShkaXIsIHRlbXBsYXRlKTtcbiAgfVxufTtcbiJdfQ==
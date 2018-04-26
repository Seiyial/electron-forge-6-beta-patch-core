"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncOra = require("@electron-forge/async-ora");

var _electronRebuild = _interopRequireDefault(require("electron-rebuild"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (buildPath, electronVersion, platform, arch, config = {}) {
    yield (0, _asyncOra.asyncOra)('Preparing native dependencies',
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (rebuildSpinner) {
        const rebuilder = (0, _electronRebuild.default)(Object.assign({}, config, {
          buildPath,
          electronVersion,
          arch
        }));
        const lifecycle = rebuilder.lifecycle;
        let found = 0;
        let done = 0;

        const redraw = () => {
          rebuildSpinner.text = `Preparing native dependencies: ${done} / ${found}`; // eslint-disable-line
        };

        lifecycle.on('module-found', () => {
          found += 1;
          redraw();
        });
        lifecycle.on('module-done', () => {
          done += 1;
          redraw();
        });
        yield rebuilder;
      });

      return function (_x5) {
        return _ref2.apply(this, arguments);
      };
    }());
  });

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3JlYnVpbGQuanMiXSwibmFtZXMiOlsiYnVpbGRQYXRoIiwiZWxlY3Ryb25WZXJzaW9uIiwicGxhdGZvcm0iLCJhcmNoIiwiY29uZmlnIiwicmVidWlsZFNwaW5uZXIiLCJyZWJ1aWxkZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJsaWZlY3ljbGUiLCJmb3VuZCIsImRvbmUiLCJyZWRyYXciLCJ0ZXh0Iiwib24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7OytCQUVlLFdBQU9BLFNBQVAsRUFBa0JDLGVBQWxCLEVBQW1DQyxRQUFuQyxFQUE2Q0MsSUFBN0MsRUFBbURDLFNBQVMsRUFBNUQsRUFBbUU7QUFDaEYsVUFBTSx3QkFBUywrQkFBVDtBQUFBO0FBQUE7QUFBQSxvQ0FBMEMsV0FBT0MsY0FBUCxFQUEwQjtBQUN4RSxjQUFNQyxZQUFZLDhCQUFRQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosTUFBbEIsRUFBMEI7QUFDbERKLG1CQURrRDtBQUVsREMseUJBRmtEO0FBR2xERTtBQUhrRCxTQUExQixDQUFSLENBQWxCO0FBRHdFLGNBTWhFTSxTQU5nRSxHQU1sREgsU0FOa0QsQ0FNaEVHLFNBTmdFO0FBUXhFLFlBQUlDLFFBQVEsQ0FBWjtBQUNBLFlBQUlDLE9BQU8sQ0FBWDs7QUFFQSxjQUFNQyxTQUFTLE1BQU07QUFDbkJQLHlCQUFlUSxJQUFmLEdBQXVCLGtDQUFpQ0YsSUFBSyxNQUFLRCxLQUFNLEVBQXhFLENBRG1CLENBQ3dEO0FBQzVFLFNBRkQ7O0FBSUFELGtCQUFVSyxFQUFWLENBQWEsY0FBYixFQUE2QixNQUFNO0FBQUVKLG1CQUFTLENBQVQ7QUFBWUU7QUFBVyxTQUE1RDtBQUNBSCxrQkFBVUssRUFBVixDQUFhLGFBQWIsRUFBNEIsTUFBTTtBQUFFSCxrQkFBUSxDQUFSO0FBQVdDO0FBQVcsU0FBMUQ7QUFFQSxjQUFNTixTQUFOO0FBQ0QsT0FuQks7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTjtBQW9CRCxHIiwiZmlsZSI6InJlYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3luY09yYSB9IGZyb20gJ0BlbGVjdHJvbi1mb3JnZS9hc3luYy1vcmEnO1xuaW1wb3J0IHJlYnVpbGQgZnJvbSAnZWxlY3Ryb24tcmVidWlsZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChidWlsZFBhdGgsIGVsZWN0cm9uVmVyc2lvbiwgcGxhdGZvcm0sIGFyY2gsIGNvbmZpZyA9IHt9KSA9PiB7XG4gIGF3YWl0IGFzeW5jT3JhKCdQcmVwYXJpbmcgbmF0aXZlIGRlcGVuZGVuY2llcycsIGFzeW5jIChyZWJ1aWxkU3Bpbm5lcikgPT4ge1xuICAgIGNvbnN0IHJlYnVpbGRlciA9IHJlYnVpbGQoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLCB7XG4gICAgICBidWlsZFBhdGgsXG4gICAgICBlbGVjdHJvblZlcnNpb24sXG4gICAgICBhcmNoLFxuICAgIH0pKTtcbiAgICBjb25zdCB7IGxpZmVjeWNsZSB9ID0gcmVidWlsZGVyO1xuXG4gICAgbGV0IGZvdW5kID0gMDtcbiAgICBsZXQgZG9uZSA9IDA7XG5cbiAgICBjb25zdCByZWRyYXcgPSAoKSA9PiB7XG4gICAgICByZWJ1aWxkU3Bpbm5lci50ZXh0ID0gYFByZXBhcmluZyBuYXRpdmUgZGVwZW5kZW5jaWVzOiAke2RvbmV9IC8gJHtmb3VuZH1gOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfTtcblxuICAgIGxpZmVjeWNsZS5vbignbW9kdWxlLWZvdW5kJywgKCkgPT4geyBmb3VuZCArPSAxOyByZWRyYXcoKTsgfSk7XG4gICAgbGlmZWN5Y2xlLm9uKCdtb2R1bGUtZG9uZScsICgpID0+IHsgZG9uZSArPSAxOyByZWRyYXcoKTsgfSk7XG5cbiAgICBhd2FpdCByZWJ1aWxkZXI7XG4gIH0pO1xufTtcbiJdfQ==
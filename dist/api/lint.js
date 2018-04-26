"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("colors");

var _asyncOra = require("@electron-forge/async-ora");

var _debug = _interopRequireDefault(require("debug"));

var _yarnOrNpm = require("../util/yarn-or-npm");

var _resolveDir = _interopRequireDefault(require("../util/resolve-dir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const d = (0, _debug.default)('electron-forge:lint');
/**
 * @typedef {Object} LintOptions
 * @property {string} [dir=process.cwd()] The path to the module to import
 * @property {boolean} [interactive=false] Whether to use sensible defaults or prompt the user visually
 */

/**
 * Lint a local Electron application.
 *
 * The promise will be rejected with the stdout+stderr of the linting process if linting fails or
 * will be resolved if it succeeds.
 *
 * @param {LintOptions} providedOptions - Options for the Lint method
 * @return {Promise<null, string>} Will resolve when the lint process is complete
 */

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    let _Object$assign = Object.assign({
      dir: process.cwd(),
      interactive: false
    }, providedOptions),
        dir = _Object$assign.dir,
        interactive = _Object$assign.interactive;

    _asyncOra.asyncOra.interactive = interactive;
    let success = true;
    let result = null;
    yield (0, _asyncOra.asyncOra)('Linting Application',
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (lintSpinner) {
        dir = yield (0, _resolveDir.default)(dir);

        if (!dir) {
          throw 'Failed to locate lintable Electron application';
        }

        d('executing "run lint" in dir:', dir);

        try {
          yield (0, _yarnOrNpm.yarnOrNpmSpawn)(['run', 'lint'], {
            stdio: process.platform === 'win32' ? 'inherit' : 'pipe',
            cwd: dir
          });
        } catch (err) {
          lintSpinner.fail();
          success = false;
          result = err;
        }
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    if (!success) {
      throw result;
    }
  });

  return function () {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvbGludC5qcyJdLCJuYW1lcyI6WyJkIiwicHJvdmlkZWRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiZGlyIiwicHJvY2VzcyIsImN3ZCIsImludGVyYWN0aXZlIiwic3VjY2VzcyIsInJlc3VsdCIsImxpbnRTcGlubmVyIiwic3RkaW8iLCJwbGF0Zm9ybSIsImVyciIsImZhaWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSxxQkFBTixDQUFWO0FBRUE7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7OytCQVNlLFdBQU9DLGtCQUFrQixFQUF6QixFQUFnQztBQUM3QztBQUQ2Qyx5QkFFbEJDLE9BQU9DLE1BQVAsQ0FBYztBQUN2Q0MsV0FBS0MsUUFBUUMsR0FBUixFQURrQztBQUV2Q0MsbUJBQWE7QUFGMEIsS0FBZCxFQUd4Qk4sZUFId0IsQ0FGa0I7QUFBQSxRQUV2Q0csR0FGdUMsa0JBRXZDQSxHQUZ1QztBQUFBLFFBRWxDRyxXQUZrQyxrQkFFbENBLFdBRmtDOztBQU03Qyx1QkFBU0EsV0FBVCxHQUF1QkEsV0FBdkI7QUFFQSxRQUFJQyxVQUFVLElBQWQ7QUFDQSxRQUFJQyxTQUFTLElBQWI7QUFFQSxVQUFNLHdCQUFTLHFCQUFUO0FBQUE7QUFBQTtBQUFBLG9DQUFnQyxXQUFPQyxXQUFQLEVBQXVCO0FBQzNETixvQkFBWSx5QkFBV0EsR0FBWCxDQUFaOztBQUNBLFlBQUksQ0FBQ0EsR0FBTCxFQUFVO0FBQ1IsZ0JBQU0sZ0RBQU47QUFDRDs7QUFFREosVUFBRSw4QkFBRixFQUFrQ0ksR0FBbEM7O0FBQ0EsWUFBSTtBQUNGLGdCQUFNLCtCQUFlLENBQUMsS0FBRCxFQUFRLE1BQVIsQ0FBZixFQUFnQztBQUNwQ08sbUJBQU9OLFFBQVFPLFFBQVIsS0FBcUIsT0FBckIsR0FBK0IsU0FBL0IsR0FBMkMsTUFEZDtBQUVwQ04saUJBQUtGO0FBRitCLFdBQWhDLENBQU47QUFJRCxTQUxELENBS0UsT0FBT1MsR0FBUCxFQUFZO0FBQ1pILHNCQUFZSSxJQUFaO0FBQ0FOLG9CQUFVLEtBQVY7QUFDQUMsbUJBQVNJLEdBQVQ7QUFDRDtBQUNGLE9BakJLOztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQU47O0FBbUJBLFFBQUksQ0FBQ0wsT0FBTCxFQUFjO0FBQ1osWUFBTUMsTUFBTjtBQUNEO0FBQ0YsRyIsImZpbGUiOiJsaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xuaW1wb3J0IHsgYXN5bmNPcmEgfSBmcm9tICdAZWxlY3Ryb24tZm9yZ2UvYXN5bmMtb3JhJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgeyB5YXJuT3JOcG1TcGF3biB9IGZyb20gJy4uL3V0aWwveWFybi1vci1ucG0nO1xuXG5pbXBvcnQgcmVzb2x2ZURpciBmcm9tICcuLi91dGlsL3Jlc29sdmUtZGlyJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpsaW50Jyk7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTGludE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGlyPXByb2Nlc3MuY3dkKCldIFRoZSBwYXRoIHRvIHRoZSBtb2R1bGUgdG8gaW1wb3J0XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtpbnRlcmFjdGl2ZT1mYWxzZV0gV2hldGhlciB0byB1c2Ugc2Vuc2libGUgZGVmYXVsdHMgb3IgcHJvbXB0IHRoZSB1c2VyIHZpc3VhbGx5XG4gKi9cblxuLyoqXG4gKiBMaW50IGEgbG9jYWwgRWxlY3Ryb24gYXBwbGljYXRpb24uXG4gKlxuICogVGhlIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzdGRvdXQrc3RkZXJyIG9mIHRoZSBsaW50aW5nIHByb2Nlc3MgaWYgbGludGluZyBmYWlscyBvclxuICogd2lsbCBiZSByZXNvbHZlZCBpZiBpdCBzdWNjZWVkcy5cbiAqXG4gKiBAcGFyYW0ge0xpbnRPcHRpb25zfSBwcm92aWRlZE9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgTGludCBtZXRob2RcbiAqIEByZXR1cm4ge1Byb21pc2U8bnVsbCwgc3RyaW5nPn0gV2lsbCByZXNvbHZlIHdoZW4gdGhlIGxpbnQgcHJvY2VzcyBpcyBjb21wbGV0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocHJvdmlkZWRPcHRpb25zID0ge30pID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdCwgbm8tdW51c2VkLXZhcnNcbiAgbGV0IHsgZGlyLCBpbnRlcmFjdGl2ZSB9ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgZGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgfSwgcHJvdmlkZWRPcHRpb25zKTtcbiAgYXN5bmNPcmEuaW50ZXJhY3RpdmUgPSBpbnRlcmFjdGl2ZTtcblxuICBsZXQgc3VjY2VzcyA9IHRydWU7XG4gIGxldCByZXN1bHQgPSBudWxsO1xuXG4gIGF3YWl0IGFzeW5jT3JhKCdMaW50aW5nIEFwcGxpY2F0aW9uJywgYXN5bmMgKGxpbnRTcGlubmVyKSA9PiB7XG4gICAgZGlyID0gYXdhaXQgcmVzb2x2ZURpcihkaXIpO1xuICAgIGlmICghZGlyKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGxvY2F0ZSBsaW50YWJsZSBFbGVjdHJvbiBhcHBsaWNhdGlvbic7XG4gICAgfVxuXG4gICAgZCgnZXhlY3V0aW5nIFwicnVuIGxpbnRcIiBpbiBkaXI6JywgZGlyKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgeWFybk9yTnBtU3Bhd24oWydydW4nLCAnbGludCddLCB7XG4gICAgICAgIHN0ZGlvOiBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInID8gJ2luaGVyaXQnIDogJ3BpcGUnLFxuICAgICAgICBjd2Q6IGRpcixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbGludFNwaW5uZXIuZmFpbCgpO1xuICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgcmVzdWx0ID0gZXJyO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCFzdWNjZXNzKSB7XG4gICAgdGhyb3cgcmVzdWx0O1xuICB9XG59O1xuIl19
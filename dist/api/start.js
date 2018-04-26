"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("colors");

var _asyncOra = require("@electron-forge/async-ora");

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

var _readPackageJson = _interopRequireDefault(require("../util/read-package-json"));

var _rebuild = _interopRequireDefault(require("../util/rebuild"));

var _resolveDir = _interopRequireDefault(require("../util/resolve-dir"));

var _forgeConfig = _interopRequireDefault(require("../util/forge-config"));

var _hook = _interopRequireDefault(require("../util/hook"));

var _electronVersion = _interopRequireDefault(require("../util/electron-version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (providedOptions = {}) {
    // eslint-disable-next-line prefer-const, no-unused-vars
    let _Object$assign = Object.assign({
      dir: process.cwd(),
      appPath: '.',
      interactive: false,
      enableLogging: false,
      args: [],
      runAsNode: false,
      inspect: false
    }, providedOptions),
        dir = _Object$assign.dir,
        interactive = _Object$assign.interactive,
        enableLogging = _Object$assign.enableLogging,
        appPath = _Object$assign.appPath,
        args = _Object$assign.args,
        runAsNode = _Object$assign.runAsNode,
        inspect = _Object$assign.inspect;

    _asyncOra.asyncOra.interactive = interactive;
    yield (0, _asyncOra.asyncOra)('Locating Application',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      dir = yield (0, _resolveDir.default)(dir);

      if (!dir) {
        throw 'Failed to locate startable Electron application';
      }
    }));
    const packageJSON = yield (0, _readPackageJson.default)(dir);

    if (!packageJSON.version) {
      throw `Please set your application's 'version' in '${dir}/package.json'.`;
    }

    const forgeConfig = yield (0, _forgeConfig.default)(dir);
    yield (0, _rebuild.default)(dir, (0, _electronVersion.default)(packageJSON), process.platform, process.arch, forgeConfig.electronRebuildConfig);
    yield (0, _hook.default)(forgeConfig, 'generateAssets'); // If a plugin has taken over the start command let's stop here

    const spawnedPluginChild = yield forgeConfig.pluginInterface.overrideStartLogic({
      dir,
      appPath,
      interactive,
      enableLogging,
      args,
      runAsNode,
      inspect
    });
    if (spawnedPluginChild) return spawnedPluginChild;
    const spawnOpts = {
      cwd: dir,
      stdio: 'inherit',
      env: Object.assign({}, process.env, enableLogging ? {
        ELECTRON_ENABLE_LOGGING: true,
        ELECTRON_ENABLE_STACK_DUMPING: true
      } : {})
    };

    if (runAsNode) {
      spawnOpts.env.ELECTRON_RUN_AS_NODE = true;
    } else {
      delete spawnOpts.env.ELECTRON_RUN_AS_NODE;
    }

    if (inspect) {
      args = ['--inspect'].concat(args);
    }

    let spawned;
    yield (0, _asyncOra.asyncOra)('Launching Application',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      spawned = (0, _child_process.spawn)(process.execPath, [_path.default.resolve(dir, 'node_modules/electron/cli'), appPath].concat(args), spawnOpts);
    }));
    return spawned;
  });

  return function () {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvc3RhcnQuanMiXSwibmFtZXMiOlsicHJvdmlkZWRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiZGlyIiwicHJvY2VzcyIsImN3ZCIsImFwcFBhdGgiLCJpbnRlcmFjdGl2ZSIsImVuYWJsZUxvZ2dpbmciLCJhcmdzIiwicnVuQXNOb2RlIiwiaW5zcGVjdCIsInBhY2thZ2VKU09OIiwidmVyc2lvbiIsImZvcmdlQ29uZmlnIiwicGxhdGZvcm0iLCJhcmNoIiwiZWxlY3Ryb25SZWJ1aWxkQ29uZmlnIiwic3Bhd25lZFBsdWdpbkNoaWxkIiwicGx1Z2luSW50ZXJmYWNlIiwib3ZlcnJpZGVTdGFydExvZ2ljIiwic3Bhd25PcHRzIiwic3RkaW8iLCJlbnYiLCJFTEVDVFJPTl9FTkFCTEVfTE9HR0lORyIsIkVMRUNUUk9OX0VOQUJMRV9TVEFDS19EVU1QSU5HIiwiRUxFQ1RST05fUlVOX0FTX05PREUiLCJjb25jYXQiLCJzcGF3bmVkIiwiZXhlY1BhdGgiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7OzsrQkFpQmUsV0FBT0Esa0JBQWtCLEVBQXpCLEVBQWdDO0FBQzdDO0FBRDZDLHlCQUVnQ0MsT0FBT0MsTUFBUCxDQUFjO0FBQ3pGQyxXQUFLQyxRQUFRQyxHQUFSLEVBRG9GO0FBRXpGQyxlQUFTLEdBRmdGO0FBR3pGQyxtQkFBYSxLQUg0RTtBQUl6RkMscUJBQWUsS0FKMEU7QUFLekZDLFlBQU0sRUFMbUY7QUFNekZDLGlCQUFXLEtBTjhFO0FBT3pGQyxlQUFTO0FBUGdGLEtBQWQsRUFRMUVYLGVBUjBFLENBRmhDO0FBQUEsUUFFdkNHLEdBRnVDLGtCQUV2Q0EsR0FGdUM7QUFBQSxRQUVsQ0ksV0FGa0Msa0JBRWxDQSxXQUZrQztBQUFBLFFBRXJCQyxhQUZxQixrQkFFckJBLGFBRnFCO0FBQUEsUUFFTkYsT0FGTSxrQkFFTkEsT0FGTTtBQUFBLFFBRUdHLElBRkgsa0JBRUdBLElBRkg7QUFBQSxRQUVTQyxTQUZULGtCQUVTQSxTQUZUO0FBQUEsUUFFb0JDLE9BRnBCLGtCQUVvQkEsT0FGcEI7O0FBVzdDLHVCQUFTSixXQUFULEdBQXVCQSxXQUF2QjtBQUVBLFVBQU0sd0JBQVMsc0JBQVQ7QUFBQTtBQUFBLHNCQUFpQyxhQUFZO0FBQ2pESixrQkFBWSx5QkFBV0EsR0FBWCxDQUFaOztBQUNBLFVBQUksQ0FBQ0EsR0FBTCxFQUFVO0FBQ1IsY0FBTSxpREFBTjtBQUNEO0FBQ0YsS0FMSyxFQUFOO0FBT0EsVUFBTVMsb0JBQW9CLDhCQUFnQlQsR0FBaEIsQ0FBMUI7O0FBRUEsUUFBSSxDQUFDUyxZQUFZQyxPQUFqQixFQUEwQjtBQUN4QixZQUFPLCtDQUE4Q1YsR0FBSSxpQkFBekQ7QUFDRDs7QUFFRCxVQUFNVyxvQkFBb0IsMEJBQWVYLEdBQWYsQ0FBMUI7QUFFQSxVQUFNLHNCQUFRQSxHQUFSLEVBQWEsOEJBQW1CUyxXQUFuQixDQUFiLEVBQThDUixRQUFRVyxRQUF0RCxFQUFnRVgsUUFBUVksSUFBeEUsRUFBOEVGLFlBQVlHLHFCQUExRixDQUFOO0FBRUEsVUFBTSxtQkFBUUgsV0FBUixFQUFxQixnQkFBckIsQ0FBTixDQTlCNkMsQ0FnQzdDOztBQUNBLFVBQU1JLDJCQUEyQkosWUFBWUssZUFBWixDQUE0QkMsa0JBQTVCLENBQStDO0FBQzlFakIsU0FEOEU7QUFFOUVHLGFBRjhFO0FBRzlFQyxpQkFIOEU7QUFJOUVDLG1CQUo4RTtBQUs5RUMsVUFMOEU7QUFNOUVDLGVBTjhFO0FBTzlFQztBQVA4RSxLQUEvQyxDQUFqQztBQVNBLFFBQUlPLGtCQUFKLEVBQXdCLE9BQU9BLGtCQUFQO0FBRXhCLFVBQU1HLFlBQVk7QUFDaEJoQixXQUFLRixHQURXO0FBRWhCbUIsYUFBTyxTQUZTO0FBR2hCQyxXQUFLdEIsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JFLFFBQVFtQixHQUExQixFQUErQmYsZ0JBQWdCO0FBQ2xEZ0IsaUNBQXlCLElBRHlCO0FBRWxEQyx1Q0FBK0I7QUFGbUIsT0FBaEIsR0FHaEMsRUFIQztBQUhXLEtBQWxCOztBQVNBLFFBQUlmLFNBQUosRUFBZTtBQUNiVyxnQkFBVUUsR0FBVixDQUFjRyxvQkFBZCxHQUFxQyxJQUFyQztBQUNELEtBRkQsTUFFTztBQUNMLGFBQU9MLFVBQVVFLEdBQVYsQ0FBY0csb0JBQXJCO0FBQ0Q7O0FBRUQsUUFBSWYsT0FBSixFQUFhO0FBQ1hGLGFBQU8sQ0FBQyxXQUFELEVBQWNrQixNQUFkLENBQXFCbEIsSUFBckIsQ0FBUDtBQUNEOztBQUVELFFBQUltQixPQUFKO0FBRUEsVUFBTSx3QkFBUyx1QkFBVDtBQUFBO0FBQUEsc0JBQWtDLGFBQVk7QUFDbERBLGdCQUFVLDBCQUFNeEIsUUFBUXlCLFFBQWQsRUFBd0IsQ0FBQyxjQUFLQyxPQUFMLENBQWEzQixHQUFiLEVBQWtCLDJCQUFsQixDQUFELEVBQWlERyxPQUFqRCxFQUEwRHFCLE1BQTFELENBQWlFbEIsSUFBakUsQ0FBeEIsRUFBZ0dZLFNBQWhHLENBQVY7QUFDRCxLQUZLLEVBQU47QUFJQSxXQUFPTyxPQUFQO0FBQ0QsRyIsImZpbGUiOiJzdGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcbmltcG9ydCB7IGFzeW5jT3JhIH0gZnJvbSAnQGVsZWN0cm9uLWZvcmdlL2FzeW5jLW9yYSc7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCByZWFkUGFja2FnZUpTT04gZnJvbSAnLi4vdXRpbC9yZWFkLXBhY2thZ2UtanNvbic7XG5pbXBvcnQgcmVidWlsZCBmcm9tICcuLi91dGlsL3JlYnVpbGQnO1xuaW1wb3J0IHJlc29sdmVEaXIgZnJvbSAnLi4vdXRpbC9yZXNvbHZlLWRpcic7XG5pbXBvcnQgZ2V0Rm9yZ2VDb25maWcgZnJvbSAnLi4vdXRpbC9mb3JnZS1jb25maWcnO1xuaW1wb3J0IHJ1bkhvb2sgZnJvbSAnLi4vdXRpbC9ob29rJztcbmltcG9ydCBnZXRFbGVjdHJvblZlcnNpb24gZnJvbSAnLi4vdXRpbC9lbGVjdHJvbi12ZXJzaW9uJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGFydE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGlyPXByb2Nlc3MuY3dkKCldIFRoZSBwYXRoIHRvIHRoZSBlbGVjdHJvbiBmb3JnZSBwcm9qZWN0IHRvIHJ1blxuICogQHByb3BlcnR5IHtzdHJpbmd9IFthcHBQYXRoPScuJ10gVGhlIHBhdGggKHJlbGF0aXZlIHRvIGRpcikgdG8gdGhlIGVsZWN0cm9uIGFwcCB0byBydW4gcmVsYXRpdmUgdG8gdGhlIHByb2plY3QgZGlyZWN0b3J5XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtpbnRlcmFjdGl2ZT1mYWxzZV0gV2hldGhlciB0byB1c2Ugc2Vuc2libGUgZGVmYXVsdHMgb3IgcHJvbXB0IHRoZSB1c2VyIHZpc3VhbGx5XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtlbmFibGVMb2dnaW5nPWZhbHNlXSBFbmFibGVzIGFkdmFuY2VkIGludGVybmFsIEVsZWN0cm9uIGRlYnVnIGNhbGxzXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZz59IFthcmdzXSBBcmd1bWVudHMgdG8gcGFzcyB0aHJvdWdoIHRvIHRoZSBsYXVuY2hlZCBFbGVjdHJvbiBhcHBsaWNhdGlvblxuICovXG5cbi8qKlxuICogU3RhcnQgYW4gRWxlY3Ryb24gYXBwbGljYXRpb24uXG4gKlxuICogQHBhcmFtIHtTdGFydE9wdGlvbnN9IHByb3ZpZGVkT3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBQdWJsaXNoIG1ldGhvZFxuICogQHJldHVybiB7UHJvbWlzZX0gV2lsbCByZXNvbHZlIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzIGxhdW5jaGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwcm92aWRlZE9wdGlvbnMgPSB7fSkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0LCBuby11bnVzZWQtdmFyc1xuICBsZXQgeyBkaXIsIGludGVyYWN0aXZlLCBlbmFibGVMb2dnaW5nLCBhcHBQYXRoLCBhcmdzLCBydW5Bc05vZGUsIGluc3BlY3QgfSA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGRpcjogcHJvY2Vzcy5jd2QoKSxcbiAgICBhcHBQYXRoOiAnLicsXG4gICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgIGVuYWJsZUxvZ2dpbmc6IGZhbHNlLFxuICAgIGFyZ3M6IFtdLFxuICAgIHJ1bkFzTm9kZTogZmFsc2UsXG4gICAgaW5zcGVjdDogZmFsc2UsXG4gIH0sIHByb3ZpZGVkT3B0aW9ucyk7XG4gIGFzeW5jT3JhLmludGVyYWN0aXZlID0gaW50ZXJhY3RpdmU7XG5cbiAgYXdhaXQgYXN5bmNPcmEoJ0xvY2F0aW5nIEFwcGxpY2F0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIGRpciA9IGF3YWl0IHJlc29sdmVEaXIoZGlyKTtcbiAgICBpZiAoIWRpcikge1xuICAgICAgdGhyb3cgJ0ZhaWxlZCB0byBsb2NhdGUgc3RhcnRhYmxlIEVsZWN0cm9uIGFwcGxpY2F0aW9uJztcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHBhY2thZ2VKU09OID0gYXdhaXQgcmVhZFBhY2thZ2VKU09OKGRpcik7XG5cbiAgaWYgKCFwYWNrYWdlSlNPTi52ZXJzaW9uKSB7XG4gICAgdGhyb3cgYFBsZWFzZSBzZXQgeW91ciBhcHBsaWNhdGlvbidzICd2ZXJzaW9uJyBpbiAnJHtkaXJ9L3BhY2thZ2UuanNvbicuYDtcbiAgfVxuXG4gIGNvbnN0IGZvcmdlQ29uZmlnID0gYXdhaXQgZ2V0Rm9yZ2VDb25maWcoZGlyKTtcblxuICBhd2FpdCByZWJ1aWxkKGRpciwgZ2V0RWxlY3Ryb25WZXJzaW9uKHBhY2thZ2VKU09OKSwgcHJvY2Vzcy5wbGF0Zm9ybSwgcHJvY2Vzcy5hcmNoLCBmb3JnZUNvbmZpZy5lbGVjdHJvblJlYnVpbGRDb25maWcpO1xuXG4gIGF3YWl0IHJ1bkhvb2soZm9yZ2VDb25maWcsICdnZW5lcmF0ZUFzc2V0cycpO1xuXG4gIC8vIElmIGEgcGx1Z2luIGhhcyB0YWtlbiBvdmVyIHRoZSBzdGFydCBjb21tYW5kIGxldCdzIHN0b3AgaGVyZVxuICBjb25zdCBzcGF3bmVkUGx1Z2luQ2hpbGQgPSBhd2FpdCBmb3JnZUNvbmZpZy5wbHVnaW5JbnRlcmZhY2Uub3ZlcnJpZGVTdGFydExvZ2ljKHtcbiAgICBkaXIsXG4gICAgYXBwUGF0aCxcbiAgICBpbnRlcmFjdGl2ZSxcbiAgICBlbmFibGVMb2dnaW5nLFxuICAgIGFyZ3MsXG4gICAgcnVuQXNOb2RlLFxuICAgIGluc3BlY3QsXG4gIH0pO1xuICBpZiAoc3Bhd25lZFBsdWdpbkNoaWxkKSByZXR1cm4gc3Bhd25lZFBsdWdpbkNoaWxkO1xuXG4gIGNvbnN0IHNwYXduT3B0cyA9IHtcbiAgICBjd2Q6IGRpcixcbiAgICBzdGRpbzogJ2luaGVyaXQnLFxuICAgIGVudjogT2JqZWN0LmFzc2lnbih7fSwgcHJvY2Vzcy5lbnYsIGVuYWJsZUxvZ2dpbmcgPyB7XG4gICAgICBFTEVDVFJPTl9FTkFCTEVfTE9HR0lORzogdHJ1ZSxcbiAgICAgIEVMRUNUUk9OX0VOQUJMRV9TVEFDS19EVU1QSU5HOiB0cnVlLFxuICAgIH0gOiB7fSksXG4gIH07XG5cbiAgaWYgKHJ1bkFzTm9kZSkge1xuICAgIHNwYXduT3B0cy5lbnYuRUxFQ1RST05fUlVOX0FTX05PREUgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSBzcGF3bk9wdHMuZW52LkVMRUNUUk9OX1JVTl9BU19OT0RFO1xuICB9XG5cbiAgaWYgKGluc3BlY3QpIHtcbiAgICBhcmdzID0gWyctLWluc3BlY3QnXS5jb25jYXQoYXJncyk7XG4gIH1cblxuICBsZXQgc3Bhd25lZDtcblxuICBhd2FpdCBhc3luY09yYSgnTGF1bmNoaW5nIEFwcGxpY2F0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIHNwYXduZWQgPSBzcGF3bihwcm9jZXNzLmV4ZWNQYXRoLCBbcGF0aC5yZXNvbHZlKGRpciwgJ25vZGVfbW9kdWxlcy9lbGVjdHJvbi9jbGknKSwgYXBwUGF0aF0uY29uY2F0KGFyZ3MpLCBzcGF3bk9wdHMpO1xuICB9KTtcblxuICByZXR1cm4gc3Bhd25lZDtcbn07XG4iXX0=
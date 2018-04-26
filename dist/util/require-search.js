"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireSearchRaw = requireSearchRaw;
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug.default)('electron-forge:require-search');

function requireSearchRaw(relativeTo, paths) {
  const testPaths = paths.concat(paths.map(mapPath => _path.default.resolve(relativeTo, mapPath))).concat(paths.map(mapPath => _path.default.resolve(relativeTo, 'node_modules', mapPath)));
  d('searching', testPaths, 'relative to', relativeTo);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = testPaths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const testPath = _step.value;

      try {
        d('testing', testPath);
        return require(testPath);
      } catch (err) {// Ignore the error
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

  d('failed to find a module in', testPaths);
}

var _default = (relativeTo, paths) => {
  const result = requireSearchRaw(relativeTo, paths);
  return typeof result === 'object' && result && result.default ? result.default : result;
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3JlcXVpcmUtc2VhcmNoLmpzIl0sIm5hbWVzIjpbImQiLCJyZXF1aXJlU2VhcmNoUmF3IiwicmVsYXRpdmVUbyIsInBhdGhzIiwidGVzdFBhdGhzIiwiY29uY2F0IiwibWFwIiwibWFwUGF0aCIsInJlc29sdmUiLCJ0ZXN0UGF0aCIsInJlcXVpcmUiLCJlcnIiLCJyZXN1bHQiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsTUFBTUEsSUFBSSxvQkFBTSwrQkFBTixDQUFWOztBQUVPLFNBQVNDLGdCQUFULENBQTBCQyxVQUExQixFQUFzQ0MsS0FBdEMsRUFBNkM7QUFDbEQsUUFBTUMsWUFBWUQsTUFDZkUsTUFEZSxDQUNSRixNQUFNRyxHQUFOLENBQVVDLFdBQVcsY0FBS0MsT0FBTCxDQUFhTixVQUFiLEVBQXlCSyxPQUF6QixDQUFyQixDQURRLEVBRWZGLE1BRmUsQ0FFUkYsTUFBTUcsR0FBTixDQUFVQyxXQUFXLGNBQUtDLE9BQUwsQ0FBYU4sVUFBYixFQUF5QixjQUF6QixFQUF5Q0ssT0FBekMsQ0FBckIsQ0FGUSxDQUFsQjtBQUdBUCxJQUFFLFdBQUYsRUFBZUksU0FBZixFQUEwQixhQUExQixFQUF5Q0YsVUFBekM7QUFKa0Q7QUFBQTtBQUFBOztBQUFBO0FBS2xELHlCQUF1QkUsU0FBdkIsOEhBQWtDO0FBQUEsWUFBdkJLLFFBQXVCOztBQUNoQyxVQUFJO0FBQ0ZULFVBQUUsU0FBRixFQUFhUyxRQUFiO0FBQ0EsZUFBT0MsUUFBUUQsUUFBUixDQUFQO0FBQ0QsT0FIRCxDQUdFLE9BQU9FLEdBQVAsRUFBWSxDQUNaO0FBQ0Q7QUFDRjtBQVppRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWFsRFgsSUFBRSw0QkFBRixFQUFnQ0ksU0FBaEM7QUFDRDs7ZUFFYyxDQUFDRixVQUFELEVBQWFDLEtBQWIsS0FBdUI7QUFDcEMsUUFBTVMsU0FBU1gsaUJBQWlCQyxVQUFqQixFQUE2QkMsS0FBN0IsQ0FBZjtBQUNBLFNBQU8sT0FBT1MsTUFBUCxLQUFrQixRQUFsQixJQUE4QkEsTUFBOUIsSUFBd0NBLE9BQU9DLE9BQS9DLEdBQXlERCxPQUFPQyxPQUFoRSxHQUEwRUQsTUFBakY7QUFDRCxDIiwiZmlsZSI6InJlcXVpcmUtc2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOnJlcXVpcmUtc2VhcmNoJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlU2VhcmNoUmF3KHJlbGF0aXZlVG8sIHBhdGhzKSB7XG4gIGNvbnN0IHRlc3RQYXRocyA9IHBhdGhzXG4gICAgLmNvbmNhdChwYXRocy5tYXAobWFwUGF0aCA9PiBwYXRoLnJlc29sdmUocmVsYXRpdmVUbywgbWFwUGF0aCkpKVxuICAgIC5jb25jYXQocGF0aHMubWFwKG1hcFBhdGggPT4gcGF0aC5yZXNvbHZlKHJlbGF0aXZlVG8sICdub2RlX21vZHVsZXMnLCBtYXBQYXRoKSkpO1xuICBkKCdzZWFyY2hpbmcnLCB0ZXN0UGF0aHMsICdyZWxhdGl2ZSB0bycsIHJlbGF0aXZlVG8pO1xuICBmb3IgKGNvbnN0IHRlc3RQYXRoIG9mIHRlc3RQYXRocykge1xuICAgIHRyeSB7XG4gICAgICBkKCd0ZXN0aW5nJywgdGVzdFBhdGgpO1xuICAgICAgcmV0dXJuIHJlcXVpcmUodGVzdFBhdGgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gSWdub3JlIHRoZSBlcnJvclxuICAgIH1cbiAgfVxuICBkKCdmYWlsZWQgdG8gZmluZCBhIG1vZHVsZSBpbicsIHRlc3RQYXRocyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IChyZWxhdGl2ZVRvLCBwYXRocykgPT4ge1xuICBjb25zdCByZXN1bHQgPSByZXF1aXJlU2VhcmNoUmF3KHJlbGF0aXZlVG8sIHBhdGhzKTtcbiAgcmV0dXJuIHR5cGVvZiByZXN1bHQgPT09ICdvYmplY3QnICYmIHJlc3VsdCAmJiByZXN1bHQuZGVmYXVsdCA/IHJlc3VsdC5kZWZhdWx0IDogcmVzdWx0O1xufTtcbiJdfQ==
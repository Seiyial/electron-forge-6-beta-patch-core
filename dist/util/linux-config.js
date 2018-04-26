"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateConfig = populateConfig;
exports.linuxConfig = linuxConfig;

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _path = _interopRequireDefault(require("path"));

var _configFn = _interopRequireDefault(require("./config-fn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function populateConfig({
  forgeConfig,
  configKey,
  targetArch
}) {
  const config = (0, _configFn.default)(forgeConfig[configKey] || {}, targetArch);
  config.options = config.options || {};
  return config;
}

function linuxConfig({
  config,
  pkgArch,
  dir,
  outPath
}) {
  return (0, _lodash.default)({}, config, {
    arch: pkgArch,
    dest: _path.default.dirname(outPath),
    src: dir
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2xpbnV4LWNvbmZpZy5qcyJdLCJuYW1lcyI6WyJwb3B1bGF0ZUNvbmZpZyIsImZvcmdlQ29uZmlnIiwiY29uZmlnS2V5IiwidGFyZ2V0QXJjaCIsImNvbmZpZyIsIm9wdGlvbnMiLCJsaW51eENvbmZpZyIsInBrZ0FyY2giLCJkaXIiLCJvdXRQYXRoIiwiYXJjaCIsImRlc3QiLCJkaXJuYW1lIiwic3JjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7O0FBRU8sU0FBU0EsY0FBVCxDQUF3QjtBQUFFQyxhQUFGO0FBQWVDLFdBQWY7QUFBMEJDO0FBQTFCLENBQXhCLEVBQWdFO0FBQ3JFLFFBQU1DLFNBQVMsdUJBQVNILFlBQVlDLFNBQVosS0FBMEIsRUFBbkMsRUFBdUNDLFVBQXZDLENBQWY7QUFDQUMsU0FBT0MsT0FBUCxHQUFpQkQsT0FBT0MsT0FBUCxJQUFrQixFQUFuQztBQUVBLFNBQU9ELE1BQVA7QUFDRDs7QUFFTSxTQUFTRSxXQUFULENBQXFCO0FBQUVGLFFBQUY7QUFBVUcsU0FBVjtBQUFtQkMsS0FBbkI7QUFBd0JDO0FBQXhCLENBQXJCLEVBQXdEO0FBQzdELFNBQU8scUJBQU0sRUFBTixFQUFVTCxNQUFWLEVBQWtCO0FBQ3ZCTSxVQUFNSCxPQURpQjtBQUV2QkksVUFBTSxjQUFLQyxPQUFMLENBQWFILE9BQWIsQ0FGaUI7QUFHdkJJLFNBQUtMO0FBSGtCLEdBQWxCLENBQVA7QUFLRCIsImZpbGUiOiJsaW51eC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoLm1lcmdlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgY29uZmlnRm4gZnJvbSAnLi9jb25maWctZm4nO1xuXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVDb25maWcoeyBmb3JnZUNvbmZpZywgY29uZmlnS2V5LCB0YXJnZXRBcmNoIH0pIHtcbiAgY29uc3QgY29uZmlnID0gY29uZmlnRm4oZm9yZ2VDb25maWdbY29uZmlnS2V5XSB8fCB7fSwgdGFyZ2V0QXJjaCk7XG4gIGNvbmZpZy5vcHRpb25zID0gY29uZmlnLm9wdGlvbnMgfHwge307XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbnV4Q29uZmlnKHsgY29uZmlnLCBwa2dBcmNoLCBkaXIsIG91dFBhdGggfSkge1xuICByZXR1cm4gbWVyZ2Uoe30sIGNvbmZpZywge1xuICAgIGFyY2g6IHBrZ0FyY2gsXG4gICAgZGVzdDogcGF0aC5kaXJuYW1lKG91dFBhdGgpLFxuICAgIHNyYzogZGlyLFxuICB9KTtcbn1cbiJdfQ==
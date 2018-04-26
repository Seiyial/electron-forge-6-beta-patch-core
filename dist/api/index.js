"use strict";

require("colors");

var _import2 = _interopRequireDefault(require("./import"));

var _init = _interopRequireDefault(require("./init"));

var _install = _interopRequireDefault(require("./install"));

var _lint = _interopRequireDefault(require("./lint"));

var _make = _interopRequireDefault(require("./make"));

var _package2 = _interopRequireDefault(require("./package"));

var _publish = _interopRequireDefault(require("./publish"));

var _start = _interopRequireDefault(require("./start"));

var _forgeConfig = _interopRequireDefault(require("../util/forge-config"));

var _readPackageJson = _interopRequireDefault(require("../util/read-package-json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  'import': _import2.default,
  // eslint-disable-line
  init: _init.default,
  install: _install.default,
  lint: _lint.default,
  make: _make.default,
  'package': _package2.default,
  // eslint-disable-line
  publish: _publish.default,
  start: _start.default,
  utils: {
    getForgeConfig: _forgeConfig.default,
    readPackageJSON: _readPackageJson.default
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImluaXQiLCJpbnN0YWxsIiwibGludCIsIm1ha2UiLCJwdWJsaXNoIiwic3RhcnQiLCJ1dGlscyIsImdldEZvcmdlQ29uZmlnIiwicmVhZFBhY2thZ2VKU09OIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZiw0QkFEZTtBQUNJO0FBQ25CQyxxQkFGZTtBQUdmQywyQkFIZTtBQUlmQyxxQkFKZTtBQUtmQyxxQkFMZTtBQU1mLDhCQU5lO0FBTU07QUFDckJDLDJCQVBlO0FBUWZDLHVCQVJlO0FBU2ZDLFNBQU87QUFDTEMsd0NBREs7QUFFTEM7QUFGSztBQVRRLENBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xuXG5pbXBvcnQgX2ltcG9ydCBmcm9tICcuL2ltcG9ydCc7XG5pbXBvcnQgaW5pdCBmcm9tICcuL2luaXQnO1xuaW1wb3J0IGluc3RhbGwgZnJvbSAnLi9pbnN0YWxsJztcbmltcG9ydCBsaW50IGZyb20gJy4vbGludCc7XG5pbXBvcnQgbWFrZSBmcm9tICcuL21ha2UnO1xuaW1wb3J0IF9wYWNrYWdlIGZyb20gJy4vcGFja2FnZSc7XG5pbXBvcnQgcHVibGlzaCBmcm9tICcuL3B1Ymxpc2gnO1xuaW1wb3J0IHN0YXJ0IGZyb20gJy4vc3RhcnQnO1xuXG5pbXBvcnQgZ2V0Rm9yZ2VDb25maWcgZnJvbSAnLi4vdXRpbC9mb3JnZS1jb25maWcnO1xuaW1wb3J0IHJlYWRQYWNrYWdlSlNPTiBmcm9tICcuLi91dGlsL3JlYWQtcGFja2FnZS1qc29uJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICdpbXBvcnQnOiBfaW1wb3J0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGluaXQsXG4gIGluc3RhbGwsXG4gIGxpbnQsXG4gIG1ha2UsXG4gICdwYWNrYWdlJzogX3BhY2thZ2UsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgcHVibGlzaCxcbiAgc3RhcnQsXG4gIHV0aWxzOiB7XG4gICAgZ2V0Rm9yZ2VDb25maWcsXG4gICAgcmVhZFBhY2thZ2VKU09OLFxuICB9LFxufTtcbiJdfQ==
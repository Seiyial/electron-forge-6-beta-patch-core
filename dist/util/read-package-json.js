"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (dir) {
    return yield _fsExtra.default.readJson(_path.default.resolve(dir, 'package.json'));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3JlYWQtcGFja2FnZS1qc29uLmpzIl0sIm5hbWVzIjpbImRpciIsInJlYWRKc29uIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7K0JBRWUsV0FBTUEsR0FBTjtBQUFBLGlCQUNQLGlCQUFHQyxRQUFILENBQVksY0FBS0MsT0FBTCxDQUFhRixHQUFiLEVBQWtCLGNBQWxCLENBQVosQ0FETztBQUFBLEciLCJmaWxlIjoicmVhZC1wYWNrYWdlLWpzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGRpciA9PlxuICBhd2FpdCBmcy5yZWFkSnNvbihwYXRoLnJlc29sdmUoZGlyLCAncGFja2FnZS5qc29uJykpO1xuIl19
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("colors");

var _logSymbols = _interopRequireDefault(require("log-symbols"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = what => ({
  replaceWith: replacement => {
    console.warn(_logSymbols.default.warning, `WARNING: ${what} is deprecated, please use ${replacement} instead`.yellow);
  }
});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2RlcHJlY2F0ZS5qcyJdLCJuYW1lcyI6WyJ3aGF0IiwicmVwbGFjZVdpdGgiLCJyZXBsYWNlbWVudCIsImNvbnNvbGUiLCJ3YXJuIiwid2FybmluZyIsInllbGxvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O2VBRWVBLFNBQVM7QUFDdEJDLGVBQWNDLFdBQUQsSUFBaUI7QUFDNUJDLFlBQVFDLElBQVIsQ0FBYSxvQkFBV0MsT0FBeEIsRUFBa0MsWUFBV0wsSUFBSyw4QkFBNkJFLFdBQVksVUFBMUQsQ0FBb0VJLE1BQXJHO0FBQ0Q7QUFIcUIsQ0FBVCxDIiwiZmlsZSI6ImRlcHJlY2F0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcbmltcG9ydCBsb2dTeW1ib2xzIGZyb20gJ2xvZy1zeW1ib2xzJztcblxuZXhwb3J0IGRlZmF1bHQgd2hhdCA9PiAoe1xuICByZXBsYWNlV2l0aDogKHJlcGxhY2VtZW50KSA9PiB7XG4gICAgY29uc29sZS53YXJuKGxvZ1N5bWJvbHMud2FybmluZywgYFdBUk5JTkc6ICR7d2hhdH0gaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAke3JlcGxhY2VtZW50fSBpbnN0ZWFkYC55ZWxsb3cpO1xuICB9LFxufSk7XG4iXX0=
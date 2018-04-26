"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInstalled;

function isInstalled(pkg) {
  try {
    require(pkg);

    return true;
  } catch (e) {
    // Package doesn't exist -- must not be installable on this platform
    return false;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2lzLWluc3RhbGxlZC5qcyJdLCJuYW1lcyI6WyJpc0luc3RhbGxlZCIsInBrZyIsInJlcXVpcmUiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWUsU0FBU0EsV0FBVCxDQUFxQkMsR0FBckIsRUFBMEI7QUFDdkMsTUFBSTtBQUNGQyxZQUFRRCxHQUFSOztBQUNBLFdBQU8sSUFBUDtBQUNELEdBSEQsQ0FHRSxPQUFPRSxDQUFQLEVBQVU7QUFDVjtBQUNBLFdBQU8sS0FBUDtBQUNEO0FBQ0YiLCJmaWxlIjoiaXMtaW5zdGFsbGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNJbnN0YWxsZWQocGtnKSB7XG4gIHRyeSB7XG4gICAgcmVxdWlyZShwa2cpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gUGFja2FnZSBkb2Vzbid0IGV4aXN0IC0tIG11c3Qgbm90IGJlIGluc3RhbGxhYmxlIG9uIHRoaXMgcGxhdGZvcm1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==
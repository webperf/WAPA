function localSum() {
  var local = 0;
  for (var i = 0; i < 100; i++) {
    local += i;
  }
  return local;
}
var sum = localSum();
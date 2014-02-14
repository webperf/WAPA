var global = 0;

function globalSum() {
  for (var i = 0; i < 100; i++) {
    global += i;
  }
}
globalSum();
var sum = global;
var global = 0;

var globalSum = function () {
  for (var i = 0; i < 100; i++) {
    global += i;
  }
};

globalSum();
var sum = global;
// Bài 1
var a = 4,
  b = 1;
var sum = a + b;

a = b;
b = sum - a;
console.log(a, b);
// Bài 2
var s = 10 + 20 + (5 ** 10 % 2);
console.log(s);

// Bài 3
var a = 1,
  b = 2,
  c = 3;

var max = a;
if (max < b) {
  max = b;
}
if (max < c) {
  max = c;
}
console.log(max);

// Bài 4
var a = 1,
  b = -1;
var c = a * b;
if (c > 0) {
  console.log("2 số cùng dấu");
} else {
  console.log("2 số khác dấu");
}
// Bài 5
var a = 1,
  b = 5,
  c = 2;
if (a > b) {
  temp = a;
  a = b;
  b = temp;
}
if (a > c) {
  temp = a;
  a = c;
  c = temp;
}
if (b > c) {
  temp = b;
  b = c;
  c = temp;
}
console.log(a, b, c);

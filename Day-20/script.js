// Bài 1
function sum(...numbers) {
  for (var num of numbers) {
    if (typeof num !== "number") {
      return "Dữ liệu truyền vào không hợp lệ";
    }
  }
  return numbers.reduce(function (sum, current) {
    return sum + current;
  });
}

console.log(sum(1, 2, 7));

// Bài 2
Object.prototype.getCurrency = function (currency) {
  return Number(this).toLocaleString("en") + " " + currency;
};
var price1 = 12000;
console.log(price1.getCurrency("đ"));

var price2 = "12000000";
console.log(price2.getCurrency("đ"));

// Bài 3: c
var arr = [
  { id: 1, name: "Chuyên mục 1", parent: 0 },
  { id: 2, name: "Chuyên mục 2", parent: 0 },
  { id: 3, name: "Chuyên mục 3", parent: 0 },
  { id: 4, name: "Chuyên mục 2.1", parent: 2 },
  { id: 5, name: "Chuyên mục 2.2", parent: 2 },
  { id: 6, name: "Chuyên mục 2.3", parent: 2 },
  { id: 7, name: "Chuyên mục 3.1", parent: 3 },
  { id: 8, name: "Chuyên mục 3.2", parent: 3 },
  { id: 9, name: "Chuyên mục 3.3", parent: 3 },
  { id: 10, name: "Chuyên mục 2.2.1", parent: 5 },
  { id: 11, name: "Chuyên mục 2.2.2", parent: 5 },
];

function newArr(item) {
  var map = {};
  var tree = [];

  item.forEach(function (item) {
    map[item.id] = { ...item, children: [] };
  });

  item.forEach(function (item) {
    if (item.parent === 0) {
      tree.push(map[item.id]);
    } else {
      map[item.parent].children.push(map[item.id]);
    }
  });

  return tree;
}

var obj = newArr(arr);
console.log(obj);

// Bài 4
var arr = [1, 2, 3, 4];

Array.prototype.reduce2 = function (item) {
  var a;
  var si;

  if (item !== undefined) {
    a = item;
    si = 0;
  } else {
    a = this[0];
    si = 1;
  }

  for (var i = si; i < this.length; i++) {
    a = a + this[i];
  }
  return a;
};

var result = arr.reduce2();
console.log(result);

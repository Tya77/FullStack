// Bài 1
var Arr1 = [6, 2, 3];
// var max = a;
// var min = a;
// if (max < b) {
//   max = b;
// }
// if (max < c) {
//   max = c;
// }
// if (min > b) {
//   min = b;
// }
// if (min > c) {
//   min = c;
// }
// console.log("Số lớn nhất là:" + max);
// console.log("Số nhỏ nhất là:" + min);

var MinMax = (arr) => {
  var max = arr[0];
  var min = arr[0];
  var indexMax = 0;
  var indexMin = 0;
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
      indexMax = i;
    }
    if (min > arr[i]) {
      min = arr[i];
      indexMin = i;
    }
  }
  console.log(`Max = ${max} tại index =  ${indexMax}`);
  console.log(`Min = ${min} tại index = ${indexMin}`);
};

MinMax(Arr1);

// Bài 2
var Arr2 = [-2, 3, 6, 16, 5, -9];
var average = function (arr) {
  let sum = 0;
  let all = 0;

  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];
    if (check(value)) {
      sum += value;
      all++;
    }
  }

  function check(value) {
    if (value < 2) {
      return false;
    }
    for (var j = 2; j < value; j++) {
      if (value % j === 0) {
        return false;
      }
    }
    return true;
  }

  if (all > 0) {
    return sum / all;
  } else {
    return "Không có số nguyên tố";
  }
};

// Ví dụ sử dụng
var Arr2 = [-2, 3, 6, 16, 5, -9];
console.log(average(Arr2));

// }

// Bài 3
var Arr3 = [1, 2, 3, 2];
// var newArr = Arr3.filter(function (num, i) {
// });
// console.log(newArr);

function newArr(arr) {
  return arr.filter(function (num, i) {
    return arr.indexOf(num) === i;
  });
}
console.log(newArr(Arr3));

// Bài 4
var Arr4 = [5, 1, 9, 8, 10];
var num = 4;
var newArr = [];
newArr[newArr.length] = num;
for (var index in Arr4) {
  newArr[newArr.length] = Arr4[index];
}
newArr.sort(function (a, b) {
  return a - b;
});
console.log(newArr);

// Bài 1
var distance = 250;
var price;

if (distance <= 1) {
  price = distance * 15000;
} else if (1 < distance <= 5) {
  price = 15000 + (distance - 1) * 13500;
} else if (distance > 5) {
  price = 15000 + 4 * 13500 + (distance - 5) * 11000;
} else if (distance > 120) {
  price = price * 0.9;
}
console.log(`Tổng tiền taxi: ${price}`);

// Bài 2
var sokWh = 52;
var price;
if (0 < sokWh <= 50) {
  price = sokWh * 1.678;
} else if (51 <= sokWh <= 100) {
  price = 50 * 1.678 + (sokWh - 50) * 1.734;
} else if (101 <= sokWh <= 200) {
  price = 50 * 1.678 + 50 * 1.734 + (sokWh - 100) * 2.014;
} else if (201 <= sokWh <= 300) {
  price = 50 * 1.678 + 50 * 1.734 + 100 * 2.014 + (sokWh - 100) * 2.536;
} else if (301 <= sokWh <= 400) {
  price =
    50 * 1.678 + 50 * 1.734 + 100 * 2.014 + 100 * 2.536 + (sokWh - 100) * 2.834;
} else if (sokWh >= 401) {
  price =
    50 * 1.678 +
    50 * 1.734 +
    100 * 2.014 +
    100 * 2.536 +
    100 * 2.834 +
    (sokWh - 100) * 2.927;
}
console.log(`Tổng tiền điện: ${price} vnđ`);

// Bài 3
// S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)
var n = 5;
var sum = 0;
for (let i = 1; i <= n; i++) {
  sum += i * (i + 1);
}

// Bài 4
function checkNumber(number) {
  if (number <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}
var soCanKiemTra = 1;

if (checkNumber(soCanKiemTra)) {
  console.log(soCanKiemTra + " là số nguyên tố");
} else {
  console.log(soCanKiemTra + " không phải là số nguyên tố");
}

//Bài 5
function TamGiacSo(N) {
  var so = 1;

  for (var i = 1; i <= N; i++) {
    var dong = "";

    for (var j = 1; j <= i; j++) {
      dong = dong + " " + so;
      so++;
    }

    console.log(dong);
  }
}

// Gọi hàm với N dòng
TamGiacSo(5);

//Bài 6
function BanCoVua() {
  var kichThuoc = 8;
  let bangCo = "";

  for (let i = 0; i < kichThuoc; i++) {
    for (let j = 0; j < kichThuoc; j++) {
      if ((i + j) % 2 === 0) {
        bangCo += "█";
      } else {
        bangCo += " ";
      }
    }
    bangCo += "\n";
  }

  console.log(bangCo);
}

BanCoVua();

//Bài 7
function BangCuuChuong() {
  for (let i = 1; i <= 9; i++) {
    console.log(`Bảng cửu chương ${i}:`);
    for (let j = 1; j <= 10; j++) {
      console.log(`${i} x ${j} = ${i * j}`);
    }
    // console.log("---------------------");
  }
}

BangCuuChuong();

// Bài 8
var num = 10;
var sum = (s) => {
  if (s === 1) {
    return 1;
  } else {
    return 1 / s + sum(s - 1);
  }
};

var S = sum(num);
console.log(`S = ${S}`);

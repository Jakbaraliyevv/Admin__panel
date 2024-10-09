let userName = document.getElementById("first__inpt"); // user kiritadigan ism
let userSurname = document.getElementById("first__inpt2"); // user kiritadigan familiya
let guruxTanlovi = document.getElementById("select2"); // gurux tanlash modal
let ishlashi = document.getElementById("checkk"); // ishlash ishlamasligi user input modal
let addBtn = document.getElementById("add-btn"); // malumot qoshadigan buttun
let outputData = document.querySelector(".col-bottom");
let del__btn = document.querySelector(".del-btn");

// **********  ishlashini tekshiradigan funksiya
const checkWork = (iswork) => (iswork.checked ? "ha" : "yoq");

// **********

// Foydalanuvchilarni jadvalda ko'rsatadigan funksiya
function displayUsers(users) {
  outputData.innerHTML = ""; // Jadvalni tozalash
  users.forEach((user, index) => {
    // if(user.name === "" && user.surname === ""){

    outputData.innerHTML += `<div class="table__bottom"> <div class="topText__left">
        <div class="text__num">
          <p style="min-width: 20px;">${index + 1}</p>
          <p style="min-width: 120px;">${user.name}</p>
        </div>
        <p style="min-width: 120px;">${user.surname}</p>
        <p style="min-width: 120px;">${user.group}</p>
        <p style="min-width: 120px;">${user.work}</p>
      </div>

      <div class="topText__right">
            <button class="del-btn">del</button>
      </div>    

      </div>`;
  });
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("del-btn")) {
    // O'chirish tugmachasiga bosilganda bajariladigan kod
    let index = [...document.querySelectorAll(".del-btn")].indexOf(e.target); // Hozirgi foydalanuvchini topish
    let data = JSON.parse(localStorage.getItem("users")) || [];
    data.splice(index, 1); // Ma'lumotlardan foydalanuvchini o'chirish
    localStorage.setItem("users", JSON.stringify(data)); // Yangilangan ma'lumotlarni localStorage'ga saqlash
    displayUsers(data); // Yangilangan foydalanuvchilarni ekranga chiqarish
  }
});

addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Local storage'dan ma'lumotlarni olish
  let data = JSON.parse(localStorage.getItem("users")) || [];

  // Yangi foydalanuvchi ma'lumotlarini qo'shish
  let newUser = {
    name: userName.value,
    surname: userSurname.value,
    group: guruxTanlovi.value,
    work: checkWork(ishlashi),
  };

  data.push(newUser); // Yangi foydalanuvchini massivga qo'shish

  // Local storage'ni yangilash
  localStorage.setItem("users", JSON.stringify(data));

  // Foydalanuvchilarni yangilangan holda ekranga chiqarish
  displayUsers(data);

  // Formani tozalash
  userName.value = "";
  userSurname.value = "";
  guruxTanlovi.value = "";
});

// Saqlangan foydalanuvchilarni sahifani yuklaganda ko'rsatish
window.addEventListener("load", function () {
  let data = JSON.parse(localStorage.getItem("users")) || [];
  displayUsers(data);
});

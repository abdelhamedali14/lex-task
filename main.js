//Fn to handel the dropDownq
let dropDownBtn = document.querySelector(".dropdown__btn");
dropDownBtn.addEventListener("click", dropDown);
function dropDown() {
  let dropDown = document.querySelector(".dropdown__option");
  dropDown.classList.toggle("toggle");
}
let usersWrapper = document.getElementById("users-wrapper");
let usersData;
//  all users images from the design
let images = [
  "./assets/Rectangle 85.png",
  "./assets/Rectangle 85 (1).png",
  "./assets/Rectangle 85 (2).png",
  "./assets/Rectangle 85 (3).png",
  "./assets/Rectangle 85 (4).png",
  "./assets/Rectangle 85 (5).png",
  "./assets/Rectangle 85 (6).png",
  "./assets/Rectangle 85 (7).png",
  "  ./assets/nicolas.png",
  "./assets/jieene.png",
];
// Fn to  add property of image and image to each user.
const addImageToObject = (data) => {
  return data.map((u, i) => {
    return (u.image = images[i]);
  });
};
const getUsersData = function (url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      usersData = data;
      console.log(usersData);
      addImageToObject(usersData);
      getRenderData(usersData);
    });
};
//Fn to concate the all address to one variable
const concateString = (obj) => {
  return Array(obj)
    .map((obj) => {
      return `${obj.address.street}, ${obj.address.suite},
         ${obj.address.city} ${obj.address.zipcode}-${obj.address.geo.lat},
          ${obj.address.geo.lng}`;
    })
    .join(";");
};
const getRenderData = function (data) {
  data.forEach((user) => {
    const {name,username,company,email,phone,website}=user
    const concatenatedAddresses = concateString(user);
    const userData = `
        <div class="user">
        <figure>
        <img src="${user.image}" alt="user img" class="user__img" />
        <figcaption>
          <h3 class="name">${name}</h3>
          <p class="userName">${`@`}${username}</p>
          <p class="catchPhrase">${company.catchPhrase}</p>
        </figcaption>
      </figure>
        <ul class="user__info">
          <li>
            <img src="./assets/mail.svg" alt="" class="icon " />
            <p class="email">${email}</p>
          </li>
          <li class="address">
            <img src="./assets/location.svg" alt="" />
             <p>${concatenatedAddresses}  </p>
          </li>
          <li>
            <img src="./assets/telephone.svg" alt="" />
            <p >${phone}</p>
          </li>
          <li>
            <img src="./assets/site.svg" alt="" />
            <p>${website}</p>
          </li>
          <li>
            <img src="./assets/mail.svg" alt="" />
            <p>${company.name}</p>
          </li>
          <li class="company">
              <img src="./assets/factory.svg" alt="" />
              <p >${company.bs}</p>
            </li>
        </ul>
      </div>
  `;
    usersWrapper.innerHTML += userData;
  });
};

let url = "https://jsonplaceholder.typicode.com/users";
getUsersData(url);

// handel the search field
const searchInput = document.getElementById("search_input");
const noResultsMessage = document.getElementById("noResultsMessage");
function searchUser(e) {
  const filteredResult = usersData.filter((user) =>
    user.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  if (filteredResult.length === 0) {
    noResultsMessage.style.display = "flex";
    usersWrapper.innerHTML = "";
  } else {
    noResultsMessage.style.display = "none";

    usersWrapper.innerHTML = "";
    getRenderData(filteredResult);
  }
}
searchInput.addEventListener("input", searchUser);

////////////////////////
// handel the sortig part
const sortingResult = document.querySelector(".sort");
const AZBtn = document.querySelector(".a-z");
const ZABtn = document.querySelector(".z-a");
//fn to sorting names depens on the choose
const sortUsersByName = (users, compareFunction) => {
  const sortedData = [...users].sort(compareFunction);
  usersWrapper.innerHTML = "";
  getRenderData(sortedData);
};
// fn to sort ascending
const sortingAtoZ = () => {
  const namesAscending = (a, b) => a.name.localeCompare(b.name);
  sortingResult.textContent = "Filter by Name (A-Z)";
  sortUsersByName(usersData, namesAscending);
};
AZBtn.addEventListener("click", sortingAtoZ);
// fn to sort descending
const sortingZtoA = () => {
  const namesDescending = (a, b) => b.name.localeCompare(a.name);
  sortingResult.textContent = "Filter by Name (Z-A)";
  sortUsersByName(usersData, namesDescending);
};
ZABtn.addEventListener("click", sortingZtoA);

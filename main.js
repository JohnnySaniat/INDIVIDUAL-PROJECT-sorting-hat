const students = [
  {
    id: 1,
    name: "Testy McTestface",
    house: "Gryffindor",
    imageUrl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-gryffindor-pattern-4-black-gryphon.jpg",
    enrolled: true,
  },
  
  {
    id: 2,
    name: "Dusty Dingus",
    house: "Hufflepuff",
    imageUrl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-hufflepuff-pattern-2-black-gryphon.jpg",
    enrolled: true,
  },

  {
    id: 3,
    name: "Greeby",
    house: "Ravenclaw",
    imageUrl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-ravenclaw-pattern-2-black-gryphon.jpg",
    enrolled: true,
  },

  {
    id: 4,
    name: "Mario",
    house: "Slytherin",
    imageUrl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-slytherin-pattern-4-black-gryphon.jpg",
    enrolled: true,
  }

];

const houses = {
  houseOne: "Gryffindor",
  houseTwo: "Hufflepuff",
  houseThree: "Ravenclaw",
  houseFour: "Slytherin",


};

function getRandomValue(obj) {
  const values = Object.values(obj);

  return values[Math.floor(Math.random() * values.length)];

}

function assignImage() {
  let image = "";
  if (Object.values(houses) === "Gryffindor") {
    image = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-gryffindor-pattern-4-black-gryphon.jpg"
  }
  else if (Object.values(houses) === "Hufflepuff") {
    image = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-hufflepuff-pattern-2-black-gryphon.jpg"
  }
  else if (Object.values(houses) === "Ravenclaw") {
    image = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-ravenclaw-pattern-2-black-gryphon.jpg"
  }
  else if (Object.values(houses) === "Slytherin") {
    image = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-slytherin-pattern-4-black-gryphon.jpg"
  }

  return image;

  console.log(assignImage(houses))
}

const targetingApp = document.querySelector("#app");
const voldsArmy = document.querySelector("#vold")

const renderToDom = (divId, html) => {
  const targetedDiv = document.querySelector(divId)
  targetedDiv.innerHTML = html
};

const cardsOnDom = (array) => {
  let domString = "";

  for (const sort of array) {
    domString += 
    `<div class="card" style="width: 18rem;">
  <img src=${sort.imageUrl} class="card-img-top" id="flag-image" alt="House Flag">
  <div class="card-body">
    <h5 class="card-title">${sort.name}</h5>
    <p class="card-text">${sort.house}</p>
    <a href="#" class="btn btn-primary" id="expel-btn--${sort.id}">EXPEL</a>
  </div>
</div>`

  }

  renderToDom("#app", domString);

};

cardsOnDom(students);



const filterContainer = document.querySelector("#buttonContainer")
const filterStudentsByHouse = (house) => {
  const filteredStudents = students.filter((students) => students.house === house);
  cardsOnDom(filteredStudents);
};

filterContainer.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "gryffindor-btn":
      filterStudentsByHouse("Gryffindor");
      break;
    case "hufflepuff-btn":
      filterStudentsByHouse("Hufflepuff");
      break;
    case "ravenclaw-btn":
      filterStudentsByHouse("Ravenclaw");
      break;
    case "slytherin-btn":
      filterStudentsByHouse("Slytherin");
      break;

    default:
      cardsOnDom(students)
      break;
  }
})

const sortForm = document.querySelector ("#containerOne")

sortForm.addEventListener("click", (e) => {
  console.log("Test")

});

const houseForm = () => {
  let domString = "";

  domString += 
  `<form>
  <div class="form-group">
    <label for="name">Enter a Name to be Sorted</label>
    <input type="text" class="form-control" id="name" aria-describedby="name entry" placeholder="Enter your name muggle">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`

renderToDom("#sortForm", domString)
};

const showForm = document.querySelector("#show-form-btn");

showForm.addEventListener("click", (e) => {
  houseForm();
})

const form = document.querySelector("form");

const createStudent = (e) => {
  e.preventDefault();

  const studentObj = {
    id: students.length + 1,
    name: document.querySelector("#name").value,
    house: getRandomValue(houses),
    imageUrl: "https://img.freepik.com/free-vector/neon-style-coming-soon-glowing-background-design_1017-25516.jpg",
    enrolled: true,
  }

  console.log(studentObj);
  students.push(studentObj);
  cardsOnDom(students);
  form.reset();
};

form.addEventListener("submit", createStudent);

const app = document.querySelector("#app");
const vold = document.querySelector("#vold")

app.addEventListener("click", (e) => {
  if (e.target.id.includes("expel-btn")) {
    const [, id] = e.target.id.split("--");
    const index = students.findIndex((student) => student.id === Number (id));
    students.splice(index, 1);
    cardsOnDom(students);
  }
  

});

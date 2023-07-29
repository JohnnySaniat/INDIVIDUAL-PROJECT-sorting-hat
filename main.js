const students = [
  {
    id: 1,
    name: "Testy McTestface",
    house: "Gryffindor",
    imageUrl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-gryffindor-pattern-4-black-gryphon.jpg"
  },
  
  {
    id: 2,
    name: "Dusty Dingus",
    house: "Hufflepuff",
    imageUrl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-hufflepuff-pattern-2-black-gryphon.jpg"
  },

  {
    id: 3,
    name: "Greeby",
    house: "Ravenclaw",
    imageUrl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-ravenclaw-pattern-2-black-gryphon.jpg"
  },

  {
    id: 4,
    name: "Mario",
    house: "Slytherin",
    imageUrl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hogwarts-slytherin-pattern-4-black-gryphon.jpg"
  }

]

const targetingApp = document.querySelector("#app");

const renderToDom = (divId, html) => {
  const targetedDiv = document.querySelector(divId)
  targetedDiv.innerHTML = html
};

const cardsOnDom = (array) => {
  let domString = "";

  for (const sort of array) {
    domString += 
    `<div class="card" style="width: 18rem;">
  <img src=${sort.imageUrl} class="card-img-top" alt="Gryffindor Flag">
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
    <label for="exampleInputEmail1">Enter a Name to be Sorted</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name muggle">
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
    name: "Kevin",
    house: "test",
    imageUrl: "https://i.etsystatic.com/30613184/r/il/e69e51/4128966168/il_fullxfull.4128966168_t3bo.jpg"
  }

  console.log(studentObj);
  students.push(studentObj);
  cardsOnDom(students);
  form.reset();
};

form.addEventListener("submit", createStudent);

const app = document.querySelector("#app");

app.addEventListener("click", (e) => {
  if (e.target.id.includes("expel-btn")) {
    const [, id] = e.target.id.split("--");
    const index = students.findIndex((student) => student.id === Number (id));
    students.splice(index, 1);
    cardsOnDom(students);
  }
});

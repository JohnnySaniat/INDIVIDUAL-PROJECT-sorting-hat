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
  },

];

//defining houses for randomization

const houses = {
  houseOne: "Gryffindor",
  houseTwo: "Hufflepuff",
  houseThree: "Ravenclaw",
  houseFour: "Slytherin",

};

//utilizing getRandomValue() and integrating Math.floor and Math.random multiplied by the values length to assign a random house 

function getRandomValue(obj) {
  const values = Object.values(obj);
  return values[Math.floor(Math.random() * values.length)];

};

//setting up my renderToDom function with the two parameters being the div that is targeted and the HTML

const renderToDom = (divId, html) => {
  const targetedDiv = document.querySelector(divId)
  targetedDiv.innerHTML = html
};

//creating a cardsOnDom function to iterate the students variable (an array of objects) utilizing a for loop

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

//building the cards for students who are expelled (targeting the noNose div within the third container)

  const banned = () => {
    let domString = ""; {
      domString += 
      `<div class="card" style="width: 18rem;">
    <img src="https://qph.cf2.quoracdn.net/main-qimg-2dde27ae8e8aa3b0b3eaafa8c55e05c3-pjlq" class="card-img-top" id="flag-image" alt="House Flag">
    <div class="card-body">
      <h5 class="card-title">Big Bad No Nose Gobbled up</h5>
      <p class="card-text">Boot</p>
    </div>
  </div>`
  
    }
  
    renderToDom("#noNose", domString);

};

cardsOnDom(students);

//creating my filters by targeting my button container and utilizing .filter and a switch

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

//creating my form variable and integrating the form into container one

const sortForm = document.querySelector ("#containerOne");

sortForm.addEventListener("click", (e) => {
  console.log("Test")

});

const houseForm = () => {
  let domString = "";

  domString += 
  `<form>
  <div class="form-group">
    <input type="text" class="form-control" id="name" aria-describedby="name entry" placeholder="Enter your name muggle">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`

renderToDom("#sortForm", domString)
};

//linking in the show form btn

const showForm = document.querySelector("#show-form-btn");

showForm.addEventListener("click", (e) => {
  houseForm();
})

//pushing a new student to the array and adding in preventDefault so that the form does not refresh and lose the cache

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

  console.log(studentObj);
};

form.addEventListener("submit", createStudent);

//targeting the expel button on the individual cards to splice the array and move the object to an empty array in my noNose div (accessing the banned cards I created)

const app = document.querySelector("#app");
const noNose = [];

app.addEventListener("click", (e) => {
  if (e.target.id.includes("expel-btn")) {
    const [, id] = e.target.id.split("--");
    const index = students.findIndex((student) => student.id === Number(id));
    let goodbye = students.splice(index, 1)[0];
    noNose.push(goodbye);
    cardsOnDom(students);
    banned(goodbye);
    
  }
  

});

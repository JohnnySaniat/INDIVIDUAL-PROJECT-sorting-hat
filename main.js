//defining an array of enrolled students

const students = [
  {
    id: 1,
    name: "Testy Testface",
    house: "Gryffindor",
    imageUrl:
      "https://www.seekpng.com/png/full/146-1467623_crest-transparent-gryffindor-house-harry-potter-house-logos.png",
    enrolled: true,
  },

  {
    id: 2,
    name: "Dusty Dingus",
    house: "Hufflepuff",
    imageUrl:
      "https://www.seekpng.com/png/full/146-1468194_harry-potter-hufflepuff-crest-kids-shirt-ages-sons.png",
    enrolled: true,
  },

  {
    id: 3,
    name: "Greeby",
    house: "Ravenclaw",
    imageUrl:
      "https://www.seekpng.com/png/full/184-1840811_ravenclaw-crest-harry-potter-harry-potter-ravenclaw-house.png",
    enrolled: true,
  },

  {
    id: 4,
    name: "Mario",
    house: "Slytherin",
    imageUrl:
      "https://www.seekpng.com/png/full/226-2269088_photo-harry-potter-mug-slytherin-crest.png",
    enrolled: true,
  },
];

//defining array for expelled students

const noNose = [];

//defining houses for randomization

const houses = [
  {
    id: "Gryffindor",
    imageUrl:
      "https://www.seekpng.com/png/full/146-1467623_crest-transparent-gryffindor-house-harry-potter-house-logos.png",
  },
  {
    id: "Hufflepuff",
    imageUrl:
      "https://www.seekpng.com/png/full/146-1468194_harry-potter-hufflepuff-crest-kids-shirt-ages-sons.png",
  },
  {
    id: "Ravenclaw",
    imageUrl:
      "https://www.seekpng.com/png/full/184-1840811_ravenclaw-crest-harry-potter-harry-potter-ravenclaw-house.png",
  },
  {
    id: "Slytherin",
    imageUrl:
      "https://www.seekpng.com/png/full/226-2269088_photo-harry-potter-mug-slytherin-crest.png",
  },
];

//setting up my renderToDom function with the two parameters being the div that is targeted and the HTML

const renderToDom = (divId, html) => {
  const targetedDiv = document.querySelector(divId);
  targetedDiv.innerHTML = html;
};

//creating a cardsOnDom function to iterate the students variable (an array of objects) utilizing a for loop

let cardsOnDom = (array) => {
  let domString = "";

  for (const sort of array) {
    domString += `<div class="card" style="width: 18rem;">
  <img src=${sort.imageUrl} class="card-img-top" id="flag-image" alt="House Flag">
  <div class="card-body">
    <h5 class="card-title">${sort.name}</h5>
    <p class="card-text"></p>
    <a href="#" class="btn btn-primary" id="expel-btn--${sort.id}">EXPEL</a>
  </div>
</div>`;
  }
  renderToDom("#app", domString);
};

cardsOnDom(students);

//creating a secondary cardsOnDom function called baddiesOnDom

let baddiesOnDom = (array) => {
  let domString = "";

  for (const sort of array) {
    domString += `<div class="card" style="width: 18rem;">
  <img src="https://www.seekpng.com/png/full/297-2970893_imgenes-para-photoscape-photoshop-y-gimp-de-mascara.png" class="card-img-top" id="flag-image" alt="voldy">
  <div class="card-body">
    <h5 class="card-title">${sort.name} but Evil</h5>
  </div>
</div>`;
  }
  renderToDom("#noNose", domString);
};

baddiesOnDom(noNose);

//creating my filters by targeting my button container and utilizing .filter and a switch (switch included in eventListeners function)

const filterContainer = document.querySelector("#buttonContainer");
const filterStudentsByHouse = (house) => {
  const filteredStudents = students.filter(
    (students) => students.house === house
  );
  cardsOnDom(filteredStudents);
};

//creating my form variable and integrating the form into container one

const sortForm = document.querySelector("#containerOne");

const houseForm = () => {
  let domString = "";

  domString += `<form>
  <div class="form-group">
    <input type="text" required="required" class="form-control" id="name" aria-describedby="name entry" 
    placeholder="Enter your name muggle">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`;

  renderToDom("#sortForm", domString);
};

//linking in the show form btn

const showForm = document.querySelector("#show-form-btn");

//pushing a new student to the array and adding in preventDefault so that the form does not refresh and lose the cache

const form = document.querySelector("form");

const createStudent = (e) => {
  e.preventDefault();

  let random = Math.floor(Math.random() * houses.length);

  const studentObj = {
    id: students.length + 1,
    name: document.querySelector("#name").value,
    house: houses[random].id,
    imageUrl: houses[random].imageUrl,
    enrolled: true,
  };

  console.log(studentObj);
  students.push(studentObj);
  cardsOnDom(students);
  form.reset();

  console.log(studentObj);
};

const app = document.querySelector("#app");

//event listeners function

const eventListeners = () => {
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
        cardsOnDom(students);
        break;
    }
  });

  sortForm.addEventListener("click", (e) => {
    console.log("Test");
  });

  showForm.addEventListener("click", (e) => {
    houseForm();
  });

  form.addEventListener("submit", createStudent);

  app.addEventListener("click", (e) => {
    if (e.target.id.includes("expel-btn")) {
      const [, id] = e.target.id.split("--");
      const index = students.findIndex((student) => student.id === Number(id));
      let goodbye = students.splice(index, 1)[0];
      noNose.push(goodbye);
      cardsOnDom(students);
      baddiesOnDom(noNose);
    }
  });
};

//startApp

const startApp = () => {
  cardsOnDom(students);
  baddiesOnDom(noNose);
  eventListeners();
};

startApp();

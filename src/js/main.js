const totalFloors = document.querySelector("#floor");
const noOfLifts = document.querySelector("#lift");
const generateBtn = document.querySelector("#generate");
const lift = document.querySelectorAll(".lift");
const mainSection = document.querySelector("main");

const pendingCalls = [];
let liftArray = [];
let floorArray = [];
let liftMap = new Map();
let floorMap = new Map();

generateBtn.addEventListener("click", () => {
  const floorCount = totalFloors.value;
  const liftCount = noOfLifts.value;

  mainSection.style.display = "None";
  generateFloors(floorCount);
  generateLift(liftCount);
  liftMovement(floorCount);
});

function generateFloors(floorCount) {
  const floorContainer = document.querySelector(".floor-container");
  for (let i = 0; i < floorCount - 1; i++) {
    const floor = document.createElement("section");
    floor.className = "floor";
    floor.classList.add(`floor-${floorCount - i}`);
    floor.id = floorCount - i;

    floor.innerHTML = `
        <section class="lift--buttons">
          <button id="${floorCount - i}" class="up">Up</button>
          <button id="${floorCount - i}" class="down">Down</button>
          <p>Floor-${floorCount - i}</p>
        </section>
        `;
    // floorContainer.querySelector("button").addEventListener("click",(e)=>liftBtns(e))
    floorMap.set(`floor-${floorCount - i}`);
    floorContainer.appendChild(floor);
  }
  topBtn = document.querySelector(`button[id="${floorCount}"].up`);
  topBtn.style.display = "none";
  // floorContainer.appendChild(groundFloor);
  const floor = document.createElement("section");
  a = `
      <section class="floor-1 ground floor" id="${1}">
        <section class="lift--buttons">
          <button id="1" class="up">Up</button>
          <p>Floor-1</p>
        </section>
      </section>
          `;
  floor.innerHTML = a;
  floorMap.set(`floor-1`);
  floorContainer.appendChild(floor);
  // const mainArea = document.querySelector(".floor-container");
  console.log(floorMap);

  // liftBtns(floorCount);
}

function generateLift(liftCount) {
  const groundFloor = document.querySelector(".ground");
  for (let i = 1; i <= liftCount; i++) {
    const lift = document.createElement("section");
    lift.id = `lift-${i}`;
    lift.className = "lift";
    lift.innerHTML = `
                    <div class="leftgate"></div>
                    <div class="rightgate"></div>
                    `;
    liftArray.push(`lift-${i}`);
    liftMap.set(`lift-${i}`, true);
    groundFloor.appendChild(lift);
  }
  // console.log(liftMap);
}

function liftMovement(floorCount) {
  const liftBtn = document.querySelectorAll("button");
  const mainArea = document.querySelector(".floor-container");

  let noOfFloors = floorCount;
  floorHeight = mainArea.offsetHeight / noOfFloors;
  // console.log(floorHeight);

  liftBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      // floorHeight = mainArea.offsetHeight / noOfFloors;
      console.log("click", e.target.id);

      e.target.setAttribute("disabled", "disabled");
      setTimeout(() => {
        e.target.removeAttribute("disabled");
      }, 2500 + 1000 * 4);

      let floorNumber = e.target.id;
      
      console.log(floorArray);

      if (floorMap.get(`floor-${floorNumber}`)) {
        doorMovement(floorMap.get(`floor-${floorNumber}`));
      } else {
        getFreeLift(floorNumber);
      }

      once = true;
    });
  });
}

function doorMovement(liftId) {
  const liftMove = document.querySelectorAll(".lift")[liftId[5] - 1];
  let liftLeftmove = liftMove.querySelector(".leftgate");
  let liftRightmove = liftMove.querySelector(".rightgate");

  setTimeout(() => {
    liftLeftmove.classList.add("left-door--animation");
    liftRightmove.classList.add("right-door--animation");

  }, 2000 + 1000);
  setTimeout(() => {
    liftLeftmove.classList.remove("left-door--animation");
    liftRightmove.classList.remove("right-door--animation");
    liftMap.set(`lift-${liftId[5]}`, true);
    console.log(liftMap);
    if (floorArray.length > 0) {
      for (const [key, value] of floorMap.entries()) {
        if (value === liftId) {
          floorMap.set(key, undefined);
        }
      }
      floorMap.set(`floor-${floorArray[0]}`, liftId);
      console.log(floorMap);
      liftMoving(liftId, floorArray[0]);
      floorArray.shift();
    }
  }, 2500 * 3);
}

function liftMoving(liftId, floorId) {
  const liftMove = document.querySelectorAll(".lift")

  liftMove[liftId[5]-1].style.transform = `translateY(-${floorHeight * (floorId-1)}px)`;
let singleFloorHeight=160;
  liftMove[liftId[5]-1].style.transition = `all  ${
    floorId * 2
  }s linear`;
  liftMove[liftId[5]-1].addEventListener("transitionend", () => doorMovement(liftId), {
    once: true,
  });
}

function getFreeLift(floorNumber) {
  let notFound = true;
  for (const liftId of liftArray) {
    if (liftMap.get(liftId) )
     {
      notFound = false;
      liftMap.set(liftId, false);
      for (const [key, value] of floorMap.entries()) {
        if (value == liftId) {
          floorMap.set(key, undefined);
        }
      }
      floorMap.set(`floor-${floorNumber}`, liftId);
      console.log(floorMap);
      console.log(liftMap);
      liftMoving(liftId, floorNumber)
      return;
    }
  }
  if(floorNumber in floorArray){
    return;
  }
  floorArray.push(floorNumber);
}

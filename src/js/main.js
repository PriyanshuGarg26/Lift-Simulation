const totalFloors = document.querySelector("#floor");
const noOfLifts = document.querySelector("#lift");
const generateBtn = document.querySelector("#generate");
const lift = document.querySelectorAll(".lift");
const mainSection = document.querySelector("main");

// const liftsAvailabilitiy = new Map();
// const liftAt = new Map();
// const floorLiftMap = new Map();
const pendingCalls = [];
let liftArray = [];
let floorArray = [];
let liftMap = new Map();
let floorMap = new Map();
// let obj = {};

// generateFloors();
// generateLift();
// generateLiftBtn();
// liftdoors();
// liftMovement();
// isLiftFree();
function liftMoving(floorNumber) {
  const lift = document.querySelectorAll(".lift");

  let liftId = 0;
  // console.log(lift);
  liftId = getFreeLift(floorNumber);
  if (liftId === null) {
    if (floorMap.get(`floor-${floorNumber + 1}`) !== undefined) {
      liftId = floorMap.get(`floor-${floorNumber + 1}`)[5];
      setTimeout(async () => {
        lift[liftId - 1]
          .querySelector(".leftgate")
          .classList.add("left-door--animation");
        lift[liftId - 1]
          .querySelector(".rightgate")
          .classList.add("right-door--animation");
        liftMap.set(`lift-${liftId}`, true);
        // floorMap.set(`floor-${floorNumber+1}`, undefined);
      }, 1000);
    } else {
      // liftId = getFreeLift(floorNumber);
      // pendingCalls.push(floorNumber);
    }
  } else {
    console.log(liftId);
    setTimeout(async () => {
      lift[liftId - 1].style.transform = `translateY(-${
        floorHeight * floorNumber
      }px)`;
      // liftMap.set(`lift-${liftId}`, false);
      // lift[liftId - 1].style.transition = `all ${2*floorNumber}s linear`;
    });
    // lift[0].classList.add('left-door--animation','right-door--animation')
    lift[liftId - 1].addEventListener(
      "transitionend",
      async () => {
        setTimeout(async () => {
          lift[liftId - 1]
            .querySelector(".leftgate")
            .classList.add("left-door--animation");
          lift[liftId - 1]
            .querySelector(".rightgate")
            .classList.add("right-door--animation");
          liftMap.set(`lift-${liftId}`, true);
        }, 1000);
      },
      { once: true }
    );
    lift[liftId - 1]
      .querySelector(".leftgate")
      .classList.remove("left-door--animation");
    lift[liftId - 1]
      .querySelector(".rightgate")
      .classList.remove("right-door--animation");
  }
  // if (floorArray.length > 0) {
  //   liftMoving(floorArray[0]);
  //   floorArray.shift();
  // }
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

      let floorNumber = e.target.id - 1;
      floorArray.push(floorNumber);
      console.log(floorArray);

      // let count = 0;
      // while (floorArray.length > 0) {
      //   count++;
      //   if (count > 10) {
      //     break;
      //   }
      //   floorNumber = floorArray.shift();
      //   console.log(floorNumber);
      //   console.log(floorArray);
      //   liftMoving(floorNumber);
      // }
      liftMoving(floorNumber);
    });
  });
}

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
  console.log(liftMap);
}

function getFreeLift(floorNumber) {
  let notFound = true;
  for (const liftId of liftArray) {
    if (
      liftMap.get(liftId) &
      (floorMap.get(`floor-${floorNumber + 1}`) === undefined)
    ) {
      notFound = false;
      liftMap.set(liftId, false);
      for (const [key, value] of floorMap.entries()) {
        if (value === liftId) {
          floorMap.set(key, undefined);
        }
      }
      floorMap.set(`floor-${floorNumber + 1}`, liftId);
      console.log(floorMap);
      console.log(liftMap);
      return liftId[5];
    }
  }
  pendingCalls.push(floorNumber + 1);
  floorArray.push(floorNumber);
  // to remove duplicate values in array
  // pendingCalls = [...new Set(pendingCalls)];
  floorArray = [...new Set(floorArray)];
  console.log(floorArray);
  // console.log(pendingCalls);
  if (notFound) {
    return null;
  }
}

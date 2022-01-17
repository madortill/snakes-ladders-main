const NUMBER_GROUP_MAX = 6;
var questionArr = [];
var newInfoArr = [];
var missionArr = [];
var SUBJECTS_TITLES;
var currentSubject;
var currentSubjectNumber;
var numberOfGroups = 0;
var switchChoice = "groups";
var currentPlayer = 0;
var namesArr = [];
var currentQuestion = 0;
var currentMission = 0;
var currentNewInfo = 0;
var currentAnswer = 0;
var alredyClicked = false;
var diceNumber = 0;
var currPlayersPlaces = [];
var blArr = [];
var playersPosMap = [];
var countRows = [];
var levels = [];


window.addEventListener("load", function () {
    initializeopeningPage();
    opening();
    posOfBlackHolesInMap();
});

function posOfBlackHolesInMap() {
    for (let i = 1; i <= 100; i++) {
        if (MAP[i] === "BH")
            blArr.push(i);
    }
}

// 
// 
// 
// 
// 
// opaning
// 
// 
// 
// 
// 

// the function initialize the opening page
function initializeopeningPage() {
    SUBJECTS_TITLES = Object.keys(SUBJECTS);
    currentSubjectNumber = 0;
    currentSubject = SUBJECTS[SUBJECTS_TITLES[currentSubjectNumber]];
    document.querySelector(".main").style.background = `var(${currentSubject["color-bg-opening"]})`;
    document.querySelector(".page.opening .right-btn").addEventListener("click", updateSubAndDot);
    document.querySelector(".page.opening .left-btn").addEventListener("click", updateSubAndDot);
    document.querySelector(".page.opening .start-btn").addEventListener("click", () => {
        chooseGroups(currentSubject);
    });
    document.querySelector(".page.opening .about-btn").addEventListener("click", aboutPage);
    changeSubject();
}

function opening() {
    document.querySelector(".main").style.background = `var(${currentSubject["color-bg-opening"]})`;
}

// the function change the images on the screen according to the next subject on the carrousel
function changeSubject() {
    document.querySelector(".page.opening .snakes-title").src = currentSubject["snakes-img"];
    document.querySelector(".page.opening .icon-sub").src = currentSubject["icon"];
    document.querySelector(".page.opening .title-sub").innerHTML = currentSubject["sub-name"];
    document.querySelector(".page.opening .curr-subject-img").src = currentSubject["img-sub"];
    document.querySelector(".page.opening .start-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".main").style.background = `var(${currentSubject["color-bg-opening"]})`;
    document.querySelector(".page.opening .gradient").style.background = `var(${currentSubject["gradient"]})`;
    document.querySelector(".page.opening .block").style.background = `var(${currentSubject["color-bg"]})`;
}

//the function updates the current subject according to the pressed arrow 
function updateSubAndDot(e) {
    document.querySelector(`.page.opening .dot-${currentSubjectNumber}`).classList.remove("active");
    // check if the pressed btn is the left one
    if (e.target.classList.contains("left-btn")) {
        currentSubjectNumber += 1;
        if (currentSubjectNumber === 3)
            currentSubjectNumber = 0;
    }
    else {
        currentSubjectNumber -= 1;
        if (currentSubjectNumber === -1)
            currentSubjectNumber = 2;
    }
    currentSubject = SUBJECTS[SUBJECTS_TITLES[currentSubjectNumber]];
    document.querySelector(`.page.opening .dot-${currentSubjectNumber}`).classList.add("active");
    changeSubject();
}

// 
// 
// 
// 
// 
// about
// 
// 
// 
// 
// 

function aboutPage() {
    document.querySelector(".page.opening").classList.remove("active");
    document.querySelector(".page.about").classList.add("active");
    document.querySelector(".page.about .back-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".main").style.background = `var(${currentSubject["gradient"]})`;

    document.querySelector(".page.about .back-btn").addEventListener("click", () => {
        opening();
        document.querySelector(".page.about").classList.remove("active");
        document.querySelector(".page.opening").classList.add("active");
    });
}

// 
// 
// 
// 
// 
// 
// chooseGroups
// 
// 
// 
// 
// 
// 

function chooseGroups() {
    document.querySelector(".page.chooseGroups").classList.add("active");
    document.querySelector(".page.opening").classList.remove("active");
    document.querySelector(".main").style.background = `var(${currentSubject["gradient"]})`;
    document.querySelector(".page.chooseGroups .back-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.chooseGroups .explanations-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.chooseGroups .start-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.chooseGroups .names-container").style.background = `var(${currentSubject["gradient"]})`;
    getSwitch();
    document.querySelector(".page.chooseGroups .back-btn").addEventListener("click", backBtnChooseGroup);
    document.querySelector(".page.chooseGroups .switch").addEventListener("click", switchDirection);
    getNumberOfGroups();
    document.querySelector(".page.chooseGroups .start-btn").addEventListener("click", checkIfAllComplete);
    document.querySelector(".page.chooseGroups .explanations-btn").addEventListener("click", instructions);
}

function backBtnChooseGroup() {
    opening();
    initializeChooseGroups();
    document.querySelector(".page.chooseGroups").classList.remove("active");
    document.querySelector(".page.opening").classList.add("active");
}

function switchDirection() {
    document.querySelector(".page.chooseGroups .switch").classList.toggle("right");
    getSwitch();
}

function getNumberOfGroups() {
    for (let i = 1; i <= NUMBER_GROUP_MAX; i++) {
        document.querySelector(`.page.chooseGroups .number-of-groups .num-${i}`).addEventListener("click", numGroups);
    }
}

function numGroups(e) {
    // if there is a pressed number 
    if (numberOfGroups !== 0) {
        document.querySelector(`.page.chooseGroups .number-of-groups .num-${numberOfGroups}`).classList.toggle("current");
    }
    numberOfGroups = e.target.innerHTML;
    e.target.classList.toggle("current");
    console.log(numberOfGroups);
    createPartners();
}

function getSwitch() {
    if (document.querySelector(".page.chooseGroups .switch").classList.contains("right"))
        switchChoice = "individuals";
    else
        switchChoice = "groups";

    // if the player pressed on how much participants will play
    if (numberOfGroups !== 0) {
        if (switchChoice === "individuals") {
            document.querySelectorAll(".page.chooseGroups .name-input").forEach((gName) => {
                gName.placeholder = "שם השחקן...";
            });
        }
        else {
            document.querySelectorAll(".page.chooseGroups .name-input").forEach((gName) => {
                gName.placeholder = "שם הקבוצה..."
            });
        }
    }
    console.log(switchChoice);
}

function initializeChooseGroups() {
    if (numberOfGroups !== 0)
        document.querySelector(`.page.chooseGroups .number-of-groups .num-${numberOfGroups}`).classList.toggle("current");
    numberOfGroups = 0;

    document.querySelector(".page.chooseGroups .back-btn").removeEventListener("click", backBtnChooseGroup);
    for (let i = 1; i <= NUMBER_GROUP_MAX; i++) {
        document.querySelector(".page.chooseGroups .num").removeEventListener("click", numGroups);
    }
    document.querySelector(".page.chooseGroups .names-container").innerHTML = "";
    document.querySelector(".page.chooseGroups .switch").classList.remove("right");
    document.querySelector(".page.chooseGroups .switch").removeEventListener("click", switchDirection);
    namesArr = [];
}

function createPartners() {
    document.querySelector(".page.chooseGroups .names-container").innerHTML = "";
    for (let i = 1; i <= numberOfGroups; i++) {
        let containerName = document.createElement("div");
        containerName.classList.add("name-container");

        let numberCont = document.createElement("div");
        let number = document.createElement("div");
        numberCont.classList.add("number");
        numberCont.appendChild(number);

        number.innerHTML = i;

        let iconAnimal = document.createElement("img");
        iconAnimal.src = `../assets/images/animalIcons/player${i}.svg`;
        iconAnimal.classList.add("icon-animal");
        iconAnimal.classList.add("shadow");

        let nameInput = document.createElement("input");
        nameInput.classList.add("name-input");
        if (switchChoice === "individuals")
            nameInput.placeholder = "שם השחקן..."

        else
            nameInput.placeholder = "שם הקבוצה..."

        containerName.appendChild(numberCont);
        containerName.appendChild(iconAnimal);
        containerName.appendChild(nameInput);
        document.querySelector(".page.chooseGroups .names-container").appendChild(containerName);
    }
}

function checkIfAllComplete() {
    let allNamesComplete = true;
    // checks if the number of groups isnt 0
    if (numberOfGroups !== 0) {
        document.querySelectorAll(".page.chooseGroups .name-input").forEach((name) => {
            if (name.value === "")
                allNamesComplete = false;
        });
        // checks if all the names are complete
        if (allNamesComplete) {
            // start game!
            document.querySelectorAll(".page.chooseGroups .name-input").forEach((name) => {
                // add name of groups to an arry
                namesArr.push(name.value);
            });
            document.querySelector(".page.chooseGroups").classList.remove("active");
            document.querySelector(".page.currentTurn").classList.add("active");
            initializeCurrentTurnPage();
        }
        // names isnt complete
        else {
            document.querySelectorAll(".page.chooseGroups .title")[2].classList.toggle("missing");
            setTimeout(() => {
                document.querySelectorAll(".page.chooseGroups .title")[2].classList.toggle("missing");
            }, 1000);
        }
    }
    // names and number of groups arent complete
    else {
        document.querySelectorAll(".page.chooseGroups .title")[1].classList.toggle("missing");
        setTimeout(() => {
            document.querySelectorAll(".page.chooseGroups .title")[1].classList.toggle("missing");
        }, 700);
        document.querySelectorAll(".page.chooseGroups .title")[2].classList.toggle("missing");
        setTimeout(() => {
            document.querySelectorAll(".page.chooseGroups .title")[2].classList.toggle("missing");
        }, 700);
    }
}

// 
// 
// 
// 
// 
// 
// instruction page
// 
// 
// 
// 
// 
// 
function instructions() {
    document.querySelector(".page.chooseGroups").classList.remove("active");
    document.querySelector(".page.instructions").classList.add("active");
    document.querySelector(".page.instructions .back-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.instructions .back-btn").addEventListener("click", backBtnChooseGroupFromIns);

}

// back to the page witch the players are choosing numbers of groups and names
function backBtnChooseGroupFromIns() {
    document.querySelector(".page.instructions .back-btn").removeEventListener("click", backBtnChooseGroupFromIns);
    document.querySelector(".page.chooseGroups").classList.add("active");
    document.querySelector(".page.instructions").classList.remove("active");
}

// 
// 
// 
// 
// 
// 
// current turn page
// 
// 
// 
// 
// 
// 
function initializeCurrentTurnPage() {
    questionArr = DATA[SUBJECTS_TITLES[currentSubjectNumber]].questions;
    missionArr = DATA[SUBJECTS_TITLES[currentSubjectNumber]].missions[`${switchChoice}`];
    newInfoArr = DATA[SUBJECTS_TITLES[currentSubjectNumber]].newInfo;
    currentQuestion = 0;
    currentMission = 0;
    currentNewInfo = 0;
    shuffle(questionArr);
    shuffle(missionArr);
    shuffle(newInfoArr);
    console.log(missionArr);
    console.log(newInfoArr);

    placePlayers();

    document.querySelector(".page.currentTurn .cubes").addEventListener("click", rollDice);
    document.querySelector(".page.currentTurn .map-icon").addEventListener("click", openMap);
    document.querySelector(".page.currentTurn .curr-subject-img").src = currentSubject["img-sub"];
    document.querySelector(".page.currentTurn .gradient").style.background = `var(${currentSubject["gradient"]})`;

    document.querySelector(".page.currentTurn .next-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.currentTurn .open-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelectorAll(".page.currentTurn .option>.btn").forEach((btn) => {
        btn.style.filter = currentSubject["filter-btn-color"];
    });
    currentPlayer = 1;
    currentPlayerTurn();
    document.querySelector(".page.currentTurn .mission-container .option.default").classList.add("active");
}

// initialize players places to zero 0
function placePlayers() {
    for (let i = 0; i < numberOfGroups; i++) {
        currPlayersPlaces[i] = 0;
    }
    console.log(currPlayersPlaces);
}

function currentPlayerTurn() {
    document.querySelector(".page.currentTurn .animal-img").src = `../assets/images/animals/player${currentPlayer}.svg`;
    document.querySelector(".page.currentTurn .current-group").innerHTML = `${namesArr[currentPlayer - 1]}`;
}

function rollDice() {
    let num = 0;
    num = Math.floor(Math.random() * 6) + 1;
    document.querySelectorAll(`.page.currentTurn .cube.active`).forEach((cube) => {
        cube.classList.remove("active");
    });
    document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");

    setTimeout(() => {
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
        num = Math.floor(Math.random() * 6) + 1;
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
    }, 100);
    setTimeout(() => {
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
        num = Math.floor(Math.random() * 6) + 1;
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
    }, 200);
    setTimeout(() => {
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
        num = Math.floor(Math.random() * 6) + 1;
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
    }, 300);
    setTimeout(() => {
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
        num = Math.floor(Math.random() * 6) + 1;
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
    }, 400);
    setTimeout(() => {
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
        num = Math.floor(Math.random() * 6) + 1;
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
    }, 500);
    setTimeout(() => {
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
        num = Math.floor(Math.random() * 6) + 1;
        document.querySelector(`.page.currentTurn .cube${num}`).classList.toggle("active");
        diceNumber = num;
        movePlayerInCode();
        message();
    }, 500);
    document.querySelector(".page.currentTurn .cubes").removeEventListener("click", rollDice);
}

function movePlayerInCode() {
    currPlayersPlaces[currentPlayer - 1] = currPlayersPlaces[currentPlayer - 1] + diceNumber;
}

function message() {
    let curr = MAP[currPlayersPlaces[currentPlayer - 1]].slice(0, 2);
    switch (curr) {
        // SH + number = snake head + his serial number (example: SH2)
        case "SH":
            document.querySelector(".page.currentTurn .mission-container .option.default").classList.remove("active");
            document.querySelector(".page.currentTurn .mission-container .option.question").classList.add("active");
            document.querySelector(".page.currentTurn .mission-container .option.question .btn").addEventListener("click", questionBtn);
            break;

        // LB + number = ladder bottom (example: LB4)
        case "LB":
            document.querySelector(".page.currentTurn .mission-container .option.default").classList.remove("active");
            document.querySelector(".page.currentTurn .mission-container .option.mission").classList.add("active");
            document.querySelector(".page.currentTurn .mission-container .option.mission .btn").addEventListener("click", missionBtn);
            break;

        // NI = new info 
        case "NI":
            document.querySelector(".page.currentTurn .mission-container .option.default").classList.remove("active");
            document.querySelector(".page.currentTurn .mission-container .option.new-info").classList.add("active");
            document.querySelector(".page.currentTurn .mission-container .option.new-info .btn").addEventListener("click", newInfoBtn);
            break;

        // BH = black hole
        case "BH":
            document.querySelector(".page.currentTurn .mission-container .option.default").classList.remove("active");
            document.querySelector(".page.currentTurn .mission-container .option.black-hole").classList.add("active");
            blackHole();
            break;

        // EN = END = the end of the map
        case "EN":
            endGame();
            break;

        // empty space
        default:
            document.querySelector(".page.currentTurn .mission-container .option.default").classList.remove("active");
            document.querySelector(".page.currentTurn .mission-container .option.empty").classList.add("active");
            document.querySelector(".page.currentTurn .mission-container .option.empty .next-btn").addEventListener("click", empty);
            break;
    }
    console.log(currPlayersPlaces);
}

// the current player's place is an empty place 
function empty() {
    document.querySelector(".page.currentTurn .mission-container .option.default").classList.add("active");
    document.querySelector(".page.currentTurn .mission-container .option.empty").classList.remove("active");
    currentPlayerNumber();
    currentPlayerTurn();
    document.querySelector(".page.currentTurn .cubes").addEventListener("click", rollDice);
}

// the current player's place is a question 
function questionBtn() {
    document.querySelector(".page.currentTurn .mission-container .option.default").classList.add("active");

    document.querySelector(".page.currentTurn").classList.remove("active");
    document.querySelector(".page.question").classList.add("active");
    newQuestion();
    document.querySelector(".page.currentTurn .cubes").addEventListener("click", rollDice);
}

// the current player's place is a mission 
function missionBtn() {
    document.querySelector(".page.currentTurn .mission-container .option.default").classList.add("active");

    document.querySelector(".page.currentTurn").classList.remove("active");
    document.querySelector(".page.mission").classList.add("active");
    newMission();
    document.querySelector(".page.currentTurn .cubes").addEventListener("click", rollDice);
}

// the current player's place is a new information  
function newInfoBtn() {
    document.querySelector(".page.currentTurn .mission-container .option.default").classList.add("active");

    document.querySelector(".page.currentTurn").classList.remove("active");
    document.querySelector(".page.new-info").classList.add("active");
    newInfo();
    document.querySelector(".page.currentTurn .cubes").addEventListener("click", rollDice);
}


// 
// 
// map
// 
// 

function openMap() {
    document.querySelector(".page.currentTurn ").classList.remove("active");
    document.querySelector(".page.map ").classList.add("active");

    document.querySelector(".page.map .dice-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.map .dice-btn").addEventListener("click", hideMap);

    initializeArrRows();
}
function hideMap() {
    document.querySelector(".page.currentTurn ").classList.add("active");
    document.querySelector(".page.map ").classList.remove("active");
}

function initializeArrRows() {
    for (let i = 0; i < currPlayersPlaces.length; i++) {
        countRows[i] = 3;
        levels[i] = 1;
    }
    updatePlayersPosInMap();
}

// the function places the players` icon on the map
function updatePlayersPosInMap() {
    document.querySelector(".page.map .level3").innerHTML = "";
    document.querySelector(".page.map .level2").innerHTML = "";
    document.querySelector(".page.map .level1").innerHTML = "";
    let posPlayers = currPlayersPlaces.slice();// משכפל את המערך ששומר את המקומות של השחקנים

    for (let i = 0; i < currPlayersPlaces.length; i++) { // עובר על כול השחקנים
        while (posPlayers[i] > 11) {
            countRows[i]--;
            if (countRows[i] === 0) {
                countRows[i] = 3;
                levels[i] += 1;
            }
            posPlayers[i] = posPlayers[i] - 11; //שמאל לימין
        }
        if (posPlayers[i] === 0) {
            countRows[i] = 3;
            posPlayers[i] = 1;
        }
        if (levels[i] === 2 && countRows[i] !== 2) {
            posPlayers[i] = 12 - posPlayers[i];// ימין לשמאל
        } else if (levels[i] !== 2 && countRows[i] === 2){
            posPlayers[i] = 12 - posPlayers[i];// ימין לשמאל
        }

        let ply = document.createElement("img");
        ply.classList.add("player");
        ply.src = `../assets/images/map-players-icons/player${i + 1}.svg`;
        ply.style.gridArea = `${countRows[i]}/${posPlayers[i]}`;
        console.log(ply.style.gridArea);
        document.querySelector(`.page.map .level${levels[i]}`).appendChild(ply);
    }
}







// 
// 
// question page
// 
// 

// add new question to the screen 
function newQuestion() {
    document.querySelector(".page.question .check-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.question .bg-question").style.filter = currentSubject["filter-bg-mission-and-questions"];

    document.querySelector(".page.question .question").innerHTML = questionArr[currentQuestion].question;
    document.querySelector(".page.question .ans1").innerHTML = questionArr[currentQuestion].ans1;
    document.querySelector(".page.question .ans2").innerHTML = questionArr[currentQuestion].ans2;
    document.querySelector(".page.question .ans3").innerHTML = questionArr[currentQuestion].ans3;
    document.querySelector(".page.question .ans4").innerHTML = questionArr[currentQuestion].ans4;

    // adds event listeners to the answers
    document.querySelectorAll(".page.question .ans").forEach((ans) => {
        ans.addEventListener("click", ansPressed);
    });
}

// show the pressed answer of the player 
function ansPressed(e) {
    // first clicked on any answer
    if (!alredyClicked) {
        alredyClicked = true;
        document.querySelector(".page.question .check-btn").addEventListener("click", checkAnswer);
        currentAnswer = e.target.classList[1];
        e.target.classList.add("checked");
    }
    // change answer
    else {
        document.querySelector(`.page.question .${currentAnswer}`).classList.remove("checked");
        e.target.classList.add("checked");
        currentAnswer = e.target.classList[1];
    }
}

// checks the pressed answers of the player
function checkAnswer() {
    document.querySelectorAll(".page.question .ans").forEach((ans) => {
        ans.removeEventListener("click", ansPressed);
    });
    document.querySelector(".page.question .check-btn").removeEventListener("click", checkAnswer);

    // checks if the current ans is correct
    if (currentAnswer === `ans${questionArr[currentQuestion].correctAns}`) {
        document.querySelector(".page.question .ans.checked").classList.add("correct");
        document.querySelector(".page.question .feedback").innerHTML = "כל הכבוד! רואים שאתם שולטים בחומר. התחמקתם בהצלחה מהנחש!";
    }
    else {
        document.querySelector(".page.question .ans.checked").classList.add("mistake");
        document.querySelector(`.page.question .ans${questionArr[currentQuestion].correctAns}`).classList.add("real-ans");
        document.querySelector(".page.question .feedback").innerHTML = "אוי.. כמעט שהצלחתם... החלקתם על הנחש לידכם ונפלתם אחורה...";
        wrongAnswer();
    }

    document.querySelector(".page.question .feedback").style.visibility = "visible";
    setTimeout(() => {
        document.querySelector(".page.question .feedback").style.bottom = "0";
    }, 100);

    document.querySelector(".page.question .check-btn").src = "../assets/images/buttons/next-btn.svg";
    document.querySelector(".page.question .check-btn").addEventListener("click", nextTurnAfterQuestion);
}

// next turn of player + initialize pages to their current mode
function nextTurnAfterQuestion() {
    initializeQuestion();
    document.querySelector(".page.question").classList.remove("active");
    document.querySelector(".page.currentTurn").classList.add("active");
    currentPlayerNumber();
    currentPlayerTurn();
}

// initialize the question page after every question
function initializeQuestion() {
    // initialize answers event listeners
    document.querySelectorAll(".page.question .ans").forEach((ans) => {
        ans.removeEventListener("click", ansPressed);
        ans.classList.remove("checked");
        ans.classList.remove("mistake");
        ans.classList.remove("correct");
        ans.classList.remove("real-ans");
    });
    document.querySelector(".page.question .check-btn").src = "../assets/images/buttons/check-btn.svg";
    document.querySelector(".page.question .check-btn").removeEventListener("click", nextTurnAfterQuestion);
    alredyClicked = false;

    document.querySelector(".page.question .feedback").style.visibility = "";
    document.querySelector(".page.question .feedback").style.bottom = "";

    currentQuestionNumber();

    document.querySelector(".page.currentTurn .mission-container .option.question").classList.remove("active");
}

// set the current number of players
function currentPlayerNumber() {
    currentPlayer++;
    if (currentPlayer > numberOfGroups)
        currentPlayer = 1;
    console.log("currentPlayer" + currentPlayer);
}

// set the current number of players
function currentQuestionNumber() {
    currentQuestion++;
    if (currentQuestion === questionArr.length)
        currentQuestion = 0;
}

function wrongAnswer() {
    console.log("המיקום הישן" + currPlayersPlaces[currentPlayer - 1]);
    let newPlace;
    let currPlcSign = MAP[currPlayersPlaces[currentPlayer - 1]];
    let currPlcNum = currPlcSign.slice(2);
    for (let i = 0; i < MAP.length; i++) {
        if (MAP[i] === `ST${currPlcNum}`)
            newPlace = i;
    }
    currPlayersPlaces[currentPlayer - 1] = newPlace;
    console.log("המיקום החדש" + newPlace);
}

// 
// 
// mission page
// 
// 

function newMission() {
    document.querySelector(".page.mission .success-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.mission .failure-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.mission .arrow-next-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.mission .bg-mission").style.filter = currentSubject["filter-bg-mission-and-questions"];

    document.querySelector(".page.mission .animal-img").src = `../assets/images/animals/player${currentPlayer}.svg`;
    document.querySelector(".page.mission .text").innerHTML = missionArr[currentMission];

    // adds event listeners to the btns
    document.querySelector(".page.mission .success-btn").addEventListener("click", successBtn);
    document.querySelector(".page.mission .failure-btn").addEventListener("click", failureBtn);
}

function successBtn() {
    successMission();
    document.querySelector(".page.mission .arrow-next-btn").style.display = "block";
    document.querySelector(".page.mission .success-btn").src = "../assets/images/buttons/success-clicked-btn.svg";
    document.querySelector(".page.mission .success-btn").removeEventListener("click", successBtn);
    document.querySelector(".page.mission .failure-btn").removeEventListener("click", failureBtn);
    document.querySelector(".page.mission .arrow-next-btn").addEventListener("click", nextTurnAfterMission);


    document.querySelector(".page.mission .feedback").style.visibility = "visible";
    setTimeout(() => {
        document.querySelector(".page.mission .feedback").style.bottom = "0";
    }, 100);
    document.querySelector(".page.mission .feedback").innerHTML = "כל הכבוד! רואים שאתם שולטים בחומר. עליתם בהצלחה בסולם!";
}

function failureBtn() {
    document.querySelector(".page.mission .failure-btn").src = "../assets/images/buttons/failure-clicked-btn.svg";
    document.querySelector(".page.mission .arrow-next-btn").style.display = "block";
    document.querySelector(".page.mission .success-btn").removeEventListener("click", successBtn);
    document.querySelector(".page.mission .failure-btn").removeEventListener("click", failureBtn);
    document.querySelector(".page.mission .arrow-next-btn").addEventListener("click", nextTurnAfterMission);

    document.querySelector(".page.mission .feedback").style.visibility = "visible";
    setTimeout(() => {
        document.querySelector(".page.mission .feedback").style.bottom = "0";
    }, 100);
    document.querySelector(".page.mission .feedback").innerHTML = "אוי.. כמעט שהצלחתם... נכשלתם במשימה ולא עליתם בסולם...";
}

function nextTurnAfterMission() {
    initializeMission();
    document.querySelector(".page.mission").classList.remove("active");
    document.querySelector(".page.currentTurn").classList.add("active");
    currentPlayerNumber();
    currentPlayerTurn();
}

function initializeMission() {
    currentMission++;
    if (currentMission === missionArr.length)
        currentMission = 0;
    document.querySelector(".page.mission .failure-btn").src = "../assets/images/buttons/failure-btn.svg";
    document.querySelector(".page.mission .success-btn").src = "../assets/images/buttons/success-btn.svg";

    document.querySelector(".page.mission .feedback").style.visibility = "";
    document.querySelector(".page.mission .feedback").style.bottom = "";

    document.querySelector(".page.mission .arrow-next-btn").removeEventListener("click", nextTurnAfterMission);
    document.querySelector(".page.mission .arrow-next-btn").style.display = "none";

    document.querySelector(".page.currentTurn .mission-container .option.mission").classList.remove("active");
}

// chance the position of the player to the top of the current ladder 
function successMission() {
    console.log("המיקום הישן" + currPlayersPlaces[currentPlayer - 1]);
    let newPlace;
    let currPlcSign = MAP[currPlayersPlaces[currentPlayer - 1]];
    let currPlcNum = currPlcSign.slice(2);
    for (let i = 0; i < MAP.length; i++) {
        if (MAP[i] === `LT${currPlcNum}`)
            newPlace = i;
    }
    currPlayersPlaces[currentPlayer - 1] = newPlace;
    console.log("המיקום החדש" + newPlace);
}


// 
// 
//  new information page
// 
// 

function newInfo() {
    document.querySelector(".page.new-info .next-btn").style.filter = currentSubject["filter-btn-color"];
    document.querySelector(".page.new-info .bg-mission").style.filter = currentSubject["filter-bg-mission-and-questions"];

    document.querySelector(".page.new-info .animal-img").src = `../assets/images/animals/player${currentPlayer}.svg`;
    document.querySelector(".page.new-info .text").innerHTML = newInfoArr[currentNewInfo];

    // adds event listeners to the btn
    document.querySelector(".page.new-info .next-btn").addEventListener("click", nextTurnAfterNewInfo);
}

function nextTurnAfterNewInfo() {
    currentNewInfo++;
    if (currentNewInfo === newInfoArr.length)
        currentNewInfo = 0;

    document.querySelector(".page.currentTurn").classList.add("active");
    document.querySelector(".page.new-info").classList.remove("active");

    document.querySelector(".page.currentTurn .mission-container .option.new-info").classList.remove("active");

    currentPlayerNumber();
    currentPlayerTurn();
}
//
//
//
//
//
// black hole
//
// 
// 
//
//
function blackHole() {
    let randomNum = Math.floor(Math.random() * blArr.length);
    let newPos = blArr[randomNum];
    while (newPos === currPlayersPlaces[currentPlayer - 1]) {
        randomNum = Math.floor(Math.random() * blArr.length);
        newPos = blArr[randomNum];
    }
    currPlayersPlaces[currentPlayer - 1] = blArr[randomNum];

    document.querySelector(".page.currentTurn .mission-container .option.black-hole .text b").innerHTML = newPos;
    document.querySelector(".page.currentTurn .mission-container .option.black-hole .btn").addEventListener("click", nextTurnAfterBlackHole);
}

function nextTurnAfterBlackHole() {
    document.querySelector(".page.currentTurn .mission-container .option.default").classList.add("active");
    document.querySelector(".page.currentTurn .mission-container .option.black-hole").classList.remove("active");
    currentPlayerNumber();
    currentPlayerTurn();
    document.querySelector(".page.currentTurn .cubes").addEventListener("click", rollDice);
}
//
//
//
//
//
// end game
//
// 
// 
//
//
function endGame() {
    document.querySelector(".page.currentTurn .cubes").remove();
    let btn = document.createElement("img");
    let btnContainer = document.createElement("div");

    btn.src = "../assets/images/buttons/restart.svg";
    btn.classList.add("restart-btn");
    btnContainer.classList.add("btn-container");
    document.querySelector(".page.currentTurn .mission-container").after(btnContainer);
    document.querySelector(".page.currentTurn .btn-container").appendChild(btn);
    document.querySelector(".page.currentTurn .btn-container .restart-btn").style.filter = currentSubject["filter-btn-color"];

    document.querySelector(".page.currentTurn .mission-container .option.default").classList.remove("active");
    document.querySelector(".page.currentTurn .mission-container .option.end").classList.add("active");

    document.querySelector(".page.currentTurn .mission-container ").style.height = "10rem";
    document.querySelector(".page.currentTurn .map-icon").removeEventListener("click", openMap);
    document.querySelector(".page.currentTurn .restart-btn").addEventListener("click", () => {
        location.reload();
    });
}



//
//
//
//
//
// auxiliary functions
//
//
//
//
//
//
// takes orgnaiz array and shuffle it
function shuffle(arr) {
    var tmp = arr.slice();
    for (var i = 0; i < arr.length; i++) {
        var index = Math.floor(Math.random() * tmp.length);
        arr[i] = tmp[index];
        tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}


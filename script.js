const speed = 50;
const echo = /echo/g;
var isDone = false;
var currentInput;
var currentDiv;
var answers = {
    USER: "Oliver",
    EDITOR: "VS Code",
    NAME: "Oliver Howe",
    GITHUB: "https://github.com/carelesshippo",
    SPIGOTMC: "https://spigotmc.org/members/ohowe12.915617",
    CONTACT: "Discord -> careless#1546",
    PROJECTS: "<a href=\"https://github.com/carelesshippo/SpectatorModeRewrite\">Spectator Mode</a>"
};
var folders = {
    "~": ["Desktop", "Documents", "Downloads", "Pictures", "Videos"],
    Downloads: [],
    Desktop: [],
    Documents: ["Programming"],
    Pictures: [],
    Videos: [],
    Programming: ["carelesshippo.github.io"],
    "carelesshippo.github.io": [],
};
var files = {
    "~": [],
    Desktop: ["'Visual Studio Code.lnk'", "Firefox.lnk"],
    Downloads: ["openme.exe"],
    Documents: [],
    Pictures: ["moon.jpg", "earth.jpg"],
    Videos: [],
    Programming: [],
    "carelesshippo.github.io": ["script.js", "index.html", "style.css"],
};

var currentDirectory = "~";
var currentDirectoryPretty = "~";

window.onload = async function () {
    let elements = document.body.getElementsByClassName("group");
    for (let i = 0; i < elements.length; i++) {
        let question = elements[i].getElementsByClassName("question")[0];
        let answer = elements[i].getElementsByClassName("response")[0];
        if (question.id == "404") {
            question.innerHTML += " " + window.location.href
        }
        let text = question.innerHTML;
        question.innerHTML =
            "<span class='header'>Oliver@CarelessHippo:" +
            currentDirectoryPretty +
            "$</span>  ";
        question.style.display = "block";
        for (let j = 0; j < text.length; j++) {
            question.innerHTML = question.innerHTML.slice(
                0,
                question.innerHTML.length - 1
            );
            question.innerHTML += text[j];
            question.innerHTML += "&#9646;";
            await sleep(speed);
        }
        await sleep(400);
        answer.style.display = "block";
        await sleep(100);
        question.innerHTML = question.innerHTML.slice(
            0,
            question.innerHTML.length - 1
        );
    }
    addNewInput();
    isDone = true;
};

document.onkeypress = function (e) {
    if (isDone) {
        if (e.keyCode == 13) {
            currentInput.innerHTML = currentInput.innerHTML.slice(
                0,
                currentInput.innerHTML.length - 1
            );
            addAnswer(
                computeAnswer(
                    currentInput.innerHTML
                        .slice(
                            (
                                "<span class='header'>Oliver@CarelessHippo:" +
                                currentDirectoryPretty +
                                "$ </span>"
                            ).length
                        )
                        .split(" ")
                        .filter(function (a) {
                            return a != "";
                        })
                )
            );
            addNewInput();
            return;
        }

        currentInput.innerHTML = currentInput.innerHTML.slice(
            0,
            currentInput.innerHTML.length - 1
        );
        currentInput.innerHTML += e.key;
        currentInput.innerHTML += "&#9646;";
    }
};

function key(e) {
    if (e.keyCode == 8) {
        currentInput.innerHTML = currentInput.innerHTML.slice(
            0,
            currentInput.innerHTML.length - 2
        );
        currentInput.innerHTML += "&#9646;";
    }
}

function addNewInput() {
    currentDiv = document.createElement("div");
    document.body.appendChild(currentDiv);
    currentInput = document.createElement("p");
    currentInput.className += "element ";
    currentInput.className += "question ";
    currentInput.className += "input ";
    currentInput.innerHTML =
        "<span class='header'>Oliver@CarelessHippo:" +
        currentDirectoryPretty +
        "$ </span>&#9646;";
    currentInput.style.display = "block";
    currentDiv.appendChild(currentInput);
}

function computeAnswer(elements) {
    if (elements.length == 0) {
        return "";
    }
    if (elements[0] == "echo") {
        if (elements.length == 1) {
            return "";
        }
        if (elements[1].startsWith('"$') && elements[1].endsWith('"')) {
            if (elements[1].slice(2, elements[1].length - 1) in answers) {
                return answers[elements[1].slice(2, elements[1].length - 1)];
            } else {
                return "";
            }
        } else {
            return elements.slice(1).join(" ");
        }
    } else if (elements[0] == "ls" || elements[0] == "dir") {
        return (
            folders[currentDirectory].join(" ") +
            " " +
            files[currentDirectory].join(" ")
        );
    } else if (elements[0] == "cd") {
        if (elements.length == 1) {
            return "";
        }
        if (elements[1] == ".") {
            return "";
        } else if (elements[1] == "..") {
            if (currentDirectory == "~") {
                return "";
            } else {
                let oldDir = currentDirectory;
                currentDirectory = currentDirectoryPretty.split("/")[
                    currentDirectoryPretty.split("/").length - 2
                ];
                currentDirectoryPretty = currentDirectoryPretty.slice(
                    0,
                    currentDirectoryPretty.length - oldDir.length - 1
                );
                return "";
            }
        }
        if (folders[currentDirectory].includes(elements[1])) {
            currentDirectoryPretty = currentDirectoryPretty + "/" + elements[1];
            currentDirectory = elements[1];
            return "";
        } else {
            if (files[currentDirectory].includes(elements[1])) {
                return "cd: " + elements[1] + ": Not a directory";
            }
            return "cd: " + elements[1] + ": No such file or directory";
        }
    } else if (elements[0] == "cls" || elements[0] == "clear") {
        document.body.innerHTML = "";
        return "";
    } else if (elements[0] == "exit") {
        return "<em>Pretend like this just closed your tab</em>";
    } else {
        return elements[0] + ": command not found";
    }
}

function addAnswer(answer) {
    let answerP = document.createElement("p");
    answerP.className += "response element";
    answerP.innerHTML = answer;
    currentDiv.appendChild(answerP);
}

document.addEventListener("keydown", key);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

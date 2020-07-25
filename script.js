const speed = 50;
var isDone = false;

window.onload = async function () {
    const input = document.getElementsByClassName("input")[document.getElementsByClassName("input").length - 1];
    let elements = document.body.getElementsByClassName("group");
    for (let i = 0; i < elements.length; i++) {
        let question = elements[i].getElementsByClassName("question")[0];
        let answer = elements[i].getElementsByClassName("response")[0];
        let text = question.innerHTML;
        question.innerHTML = "<span class='header'>Oliver@CarelessHippo:~$</span>  ";
        question.style.display = "block";
        for (let j = 0; j < text.length; j++) {
            question.innerHTML = question.innerHTML.slice(0, question.innerHTML.length - 1);
            question.innerHTML += text[j];
            question.innerHTML += "&#9646;"
            await sleep(speed);
        }
        await sleep(400);
        answer.style.display = "block";
        await sleep(100);
        question.innerHTML = question.innerHTML.slice(0, question.innerHTML.length - 1);
    }
    input.innerHTML = "<span class='header'>Oliver@CarelessHippo:~$</span> &#9646;";
    input.style.display = "block";
    isDone = true;
}

document.onkeypress = function (e) {
    const input = document.getElementsByClassName("input")[document.getElementsByClassName("input").length - 1];
    if (isDone) {
        if (e.keyCode == 13) {
            return;
        }
        if (e.keyCode == 8) {
            return;
        }

        input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length - 1);
        input.innerHTML += e.key;
        input.innerHTML += "&#9646;";
    }
}

function key(e) {
    const input = document.getElementsByClassName("input")[document.getElementsByClassName("input").length - 1];
    if (e.keyCode == 8) {
        input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length - 2)
        input.innerHTML += "&#9646;"
    }
}


document.addEventListener("keydown", key)



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

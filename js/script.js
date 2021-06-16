class TypedElement extends HTMLDivElement {
    constructor() {
        super();

        this.speed = this.hasAttribute("speed")
            ? this.getAttribute("speed")
            : 50;

        const print = (element, sentence, speed = 50) => {
            console.log(sentence)
            let index = 0;

            let timer = setInterval(function () {
                const char = sentence[index];

                if (char === "<") {
                    index = sentence.indexOf(">", index); // skip to greater-than
                }

                element.innerHTML = sentence.slice(0, index);

                if (++index > sentence.length) {
                    clearInterval(timer);
                }
            }, speed);
        };

        print(this, this.innerHTML, this.speed)
    }

    write() {
        console.log(this instanceof TypedElement);
        if (this.i < this.desired.length) {
            this.innerHTML += this.desired.charAt(this.i);
            this.i++;

            setTimeout(this.write, this.speed);
        }
    }
}

customElements.define("typed-p", TypedElement, { extends: "div" });

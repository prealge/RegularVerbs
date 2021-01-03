var slide = 0;
var slides = [
    ["Welcome!", "Today we are going to learn about present tense ER, AR, and IR verbs in spanish."],
    ["Conjugations", "Verbs in spanish have different forms based on who or what they are describing."],
    ["Verb Forms", "Different verb forms include the infinitive form as well as the yo, tú, él/ella/ustd, nosotros/as, vosotros/as, and ellos/ellas/ustds forms."],
    ["Verb endings", "Regular verbs have different endings for different verb forms depending on whether the verb is an ER, an AR, or an IR verb."],
    ["Identifying Verb Types", "You can tell whether a regular verb is an AR, ER, or IR verb based on the ending of the infinitive form. For example, 'correr' is an ER verb becsause the infinitive ends in 'ER'."],
    ["Example", "If you want to say 'I run,' you need to find the correct conjugation for 'correr,' an ER verb. In this case, that would be the 'yo' form."],
    ["Example", "The table below shows that the ending for regular ER verbs in the 'yo' form is 'o,' so if you replace the 'er' in correr with an 'o,' you'll get the conjugated form: 'yo corro.'"],
    ['Check in', "Study the table below. You can practice conjugations with the button at the bottom of the screen."]
];

function enable(btn) {
    btn.removeAttribute("disabled");
    componentHandler.upgradeElement(btn);
}

function disable(btn) {
    btn.setAttribute("disabled", "");
    componentHandler.upgradeElement(btn);
}

function loadSlide() {
    document.getElementById("title").innerHTML = slides[slide][0];
    document.getElementById("body").innerHTML = slides[slide][1];
    if (slide == 0) disable(document.getElementById("back"));
    else enable(document.getElementById("back"));
    if (slide == slides.length - 1) disable(document.getElementById("next"));
    else enable(document.getElementById("next"));
};

function next() {
    if (slide < slides.length - 1) slide++;
    loadSlide();
}

function back() {
    if (slide > 0) slide--;
    loadSlide();
}

var conjugations = {
    "ar": ["o", "as", "a", "a", "a", "amos", "amos", "aís", "aís", "an", "an", "an"],
    "er": ["o", "es", "e", "e", "e", "emos", "emos", "eís", "eís", "en", "en", "en"],
    "ir": ["o", "es", "e", "e", "e", "imos", "imos", "ís", "ís", "en", "en", "en"]
};

var pronouns = [
    "yo",
    "tú",
    "él",
    "ella",
    "usted",
    "nosotros",
    "nosotras",
    "vosotros",
    "vosotras",
    "ellos",
    "ellas",
    "ustedes"
];

var verbs = [
    ["corr", "er"],
    ["com", "er"],
    ["beb", "er"],
    ["aprend", "er"],
    ["le", "er"],
    ["habl", "ar"],
    ["cocin", "ar"],
    ["salt", "ar"],
    ["cant", "ar"],
    ["bail", "ar"],
    ["sub", "ir"],
    ["escrib", "ir"],
    ["abr", "ir"],
    ["viv", "ir"],
    ["descubr", "ir"]
];

async function practice() {
    document.querySelector("#verb-table").style.display = "none";
    document.querySelector("#practice-button").style.display = "none";

    let p = Math.floor(Math.random() * pronouns.length);
    let v = Math.floor(Math.random() * verbs.length);
    Swal.fire({
        title: pronouns[p] + " " + verbs[v][0] + verbs[v][1],
        html: `<input type="text" id="conjugation" class="swal2-input">`,
        confirmButtonText: 'Check Answer',
        focusConfirm: false,
        preConfirm: () => {
            const conjugation = Swal.getPopup().querySelector('#conjugation').value
            if (!conjugation) {
                Swal.showValidationMessage(`Please enter your best guess for the conjugated word`)
            }
            return { conjugation }
        }
    }).then((confirmedConjugation) => {
        if (confirmedConjugation.isConfirmed) {
            let correctConjugation = verbs[v][0] + conjugations[verbs[v][1]][p]
            let icon;
            if (confirmedConjugation.value.conjugation == correctConjugation) {
                icon = "success"
            } else {
                icon = "error"
            }
            Swal.fire({
                title: verbs[v][0] + conjugations[verbs[v][1]][p],
                text: confirmedConjugation.value.conjugation == correctConjugation ? "Good Job!" : "The correct answer was actually \"" + verbs[v][0] + conjugations[verbs[v][1]][p] + ".\" Keep practicing!",
                icon: icon,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continue'
            }).then((result) => {
                if (result.isConfirmed) {
                    practice()
                } else {
                    Swal.fire(
                        'Canceled',
                        'Practice session has been ended',
                        'error'
                    )
                    document.querySelector("#verb-table").style.display = "block";
                    document.querySelector("#practice-button").style.display = "block";
                    return 0;
                }
            })
        } else {
            document.querySelector("#verb-table").style.display = "block";
            document.querySelector("#practice-button").style.display = "block";
        }
    })
}

loadSlide();

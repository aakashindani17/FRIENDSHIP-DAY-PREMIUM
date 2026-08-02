
const intro =
    document.getElementById("intro");

const surprise =
    document.getElementById("surprise");

const friendNameInput =
    document.getElementById("friendName");

const startButton =
    document.getElementById("startButton");

const messageButton =
    document.getElementById("messageButton");

const message =
    document.getElementById("message");

const musicButton =
    document.getElementById("musicButton");

const music =
    document.getElementById("music");
startButton.addEventListener(
    "click",
    startSurprise
);


friendNameInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            startSurprise();

        }

    }
);


function startSurprise() {

    let name =
        friendNameInput.value.trim();

    if (name === "") {

        alert(
            "Please enter your friend's name 💙"
        );

        friendNameInput.focus();

        return;

    }
    document.getElementById(
        "friendName1"
    ).textContent = name;


    document.getElementById(
        "friendName2"
    ).textContent = name;


    document.getElementById(
        "friendName3"
    ).textContent = name;


    document.getElementById(
        "friendName4"
    ).textContent = name;
    intro.classList.add("hidden");
    surprise.classList.remove("hidden");

    createHearts(40);
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

messageButton.addEventListener(
    "click",
    function () {

        message.classList.remove(
            "hidden"
        );


        messageButton.innerHTML =
            "💙 Message Opened";


        createHearts(25);


        setTimeout(
            function () {

                message.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            },
            200
        );

    }
);
function createHeart() {

    const heart =
        document.createElement("div");


    heart.className =
        "floating-heart";


    const hearts = [
        "💙",
        "🤍",
        "💜",
        "✨",
        "🫶"
    ];


    heart.innerHTML =
        hearts[
        Math.floor(
            Math.random() *
            hearts.length
        )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (15 + Math.random() * 25)
        + "px";


    heart.style.animationDuration =
        (5 + Math.random() * 5)
        + "s";


    document.body.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        10000
    );

}

function createHearts(number) {

    for (
        let i = 0;
        i < number;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 70
        );

    }

}

setInterval(
    createHeart,
    1200
);

const photoInputs =
    document.querySelectorAll(
        ".photo-input"
    );


photoInputs.forEach(
    function (input) {

        input.addEventListener(
            "change",
            function (event) {

                const file =
                    event.target.files[0];


                if (!file) {

                    return;

                }


                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    alert(
                        "Please select an image."
                    );

                    return;

                }


                const card =
                    input.closest(
                        ".photo-card"
                    );


                const image =
                    card.querySelector(
                        ".photo"
                    );


                const placeholder =
                    card.querySelector(
                        ".photo-placeholder"
                    );


                const reader =
                    new FileReader();


                reader.onload =
                    function (e) {

                        image.src =
                            e.target.result;


                        image.classList.add(
                            "show"
                        );


                        placeholder.style.display =
                            "none";

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }
);

let musicPlaying = false;


musicButton.addEventListener(
    "click",
    function () {

        if (!musicPlaying) {

            music.play()
                .then(
                    function () {

                        musicPlaying = true;

                        musicButton.innerHTML =
                            "🔊 Music ON";

                    }
                )
                .catch(
                    function () {

                        alert(
                            "music.mp3 file same folder me rakho 🎵"
                        );

                    }
                );

        }

        else {

            music.pause();

            musicPlaying = false;

            musicButton.innerHTML =
                "🔇 Music";

        }

    }
);
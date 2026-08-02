/* =========================================
   FRIENDSHIP DAY PREMIUM WEBSITE
   FINAL VERSION
========================================= */


/* ================= ELEMENTS ================= */

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


/* ================= START SURPRISE ================= */

if (startButton) {

    startButton.addEventListener(
        "click",
        startSurprise
    );

}


if (friendNameInput) {

    friendNameInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                startSurprise();

            }

        }
    );

}


function startSurprise() {

    if (!friendNameInput) return;

    const name =
        friendNameInput.value.trim();


    if (name === "") {

        alert(
            "Please enter your friend's name ❤️"
        );

        friendNameInput.focus();

        return;

    }


    /* Put name everywhere */

    const name1 =
        document.getElementById("friendName1");

    const name2 =
        document.getElementById("friendName2");

    const name3 =
        document.getElementById("friendName3");

    const name4 =
        document.getElementById("friendName4");


    if (name1) name1.textContent = name;
    if (name2) name2.textContent = name;
    if (name3) name3.textContent = name;
    if (name4) name4.textContent = name;


    /* Save friend's name */

    localStorage.setItem(
        "friendshipFriendName",
        name
    );


    /* Hide intro */

    if (intro) {

        intro.classList.add("hidden");

    }


    /* Show surprise */

    if (surprise) {

        surprise.classList.remove("hidden");

    }


    /* Hearts */

    createHearts(40);


    /* Load saved photos */

    loadSavedPhotos();


    /* Scroll */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ================= LOAD SAVED DATA ================= */

window.addEventListener(
    "DOMContentLoaded",
    function () {

        /* Saved name */

        const savedName =
            localStorage.getItem(
                "friendshipFriendName"
            );


        if (
            savedName &&
            friendNameInput
        ) {

            friendNameInput.value =
                savedName;

        }


        /* Saved photos */

        loadSavedPhotos();

    }
);


/* ================= MESSAGE ================= */

if (messageButton) {

    messageButton.addEventListener(
        "click",
        function () {

            if (message) {

                message.classList.remove(
                    "hidden"
                );

            }


            messageButton.innerHTML =
                "❤️ Message Opened";


            createHearts(25);


            if (message) {

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

        }
    );

}


/* ================= HEARTS ================= */

function createHeart() {

    const heart =
        document.createElement("div");


    heart.className =
        "floating-heart";


    const hearts = [

        "❤️",
        "🤍",
        "💜",
        "💙",
        "💗",
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
        (15 + Math.random() * 25) + "px";


    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";


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


/* ================= MANY HEARTS ================= */

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


/* Continuous hearts */

setInterval(
    createHeart,
    1200
);


/* =====================================================
   PHOTO SYSTEM
   Photos saved in Local Storage
===================================================== */


/* ================= PHOTO INPUTS ================= */

const photoInputs =
    document.querySelectorAll(
        ".photo-input"
    );


/* ================= PHOTO UPLOAD ================= */

photoInputs.forEach(
    function (input, index) {

        input.addEventListener(
            "change",
            function (event) {

                const file =
                    event.target.files[0];


                if (!file) {

                    return;

                }


                /* Check image */

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


                /* Maximum 5 MB */

                if (
                    file.size >
                    5 * 1024 * 1024
                ) {

                    alert(
                        "Please select a photo smaller than 5 MB."
                    );

                    return;

                }


                const card =
                    input.closest(
                        ".photo-card"
                    );


                if (!card) return;


                const image =
                    card.querySelector(
                        ".photo"
                    );


                const placeholder =
                    card.querySelector(
                        ".photo-placeholder"
                    );


                if (!image) return;


                const reader =
                    new FileReader();


                reader.onload =
                    function (e) {

                        const imageData =
                            e.target.result;


                        /* Show image */

                        image.src =
                            imageData;


                        image.classList.add(
                            "show"
                        );


                        if (placeholder) {

                            placeholder.style.display =
                                "none";

                        }


                        /* Save photo */

                        savePhoto(
                            index,
                            imageData
                        );


                        /* Message */

                        showPhotoMessage();

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }
);


/* ================= SAVE PHOTO ================= */

function savePhoto(
    index,
    imageData
) {

    try {

        localStorage.setItem(
            "friendshipPhoto_" + index,
            imageData
        );

    }

    catch (error) {

        console.error(
            "Photo could not be saved:",
            error
        );


        alert(
            "Photo save nahi ho paayi. Please smaller photo try karein."
        );

    }

}


/* ================= LOAD SAVED PHOTOS ================= */

function loadSavedPhotos() {

    const inputs =
        document.querySelectorAll(
            ".photo-input"
        );


    inputs.forEach(
        function (input, index) {

            const savedPhoto =
                localStorage.getItem(
                    "friendshipPhoto_" + index
                );


            if (!savedPhoto) {

                return;

            }


            const card =
                input.closest(
                    ".photo-card"
                );


            if (!card) return;


            const image =
                card.querySelector(
                    ".photo"
                );


            const placeholder =
                card.querySelector(
                    ".photo-placeholder"
                );


            if (!image) return;


            image.src =
                savedPhoto;


            image.classList.add(
                "show"
            );


            if (placeholder) {

                placeholder.style.display =
                    "none";

            }

        }
    );

}


/* ================= PHOTO SAVED MESSAGE ================= */

function showPhotoMessage() {

    let messageBox =
        document.getElementById(
            "photoSavedMessage"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );


        messageBox.id =
            "photoSavedMessage";


        messageBox.style.position =
            "fixed";


        messageBox.style.bottom =
            "25px";


        messageBox.style.left =
            "50%";


        messageBox.style.transform =
            "translateX(-50%)";


        messageBox.style.background =
            "#111827";


        messageBox.style.color =
            "white";


        messageBox.style.padding =
            "12px 20px";


        messageBox.style.borderRadius =
            "50px";


        messageBox.style.border =
            "1px solid rgba(255,255,255,0.15)";


        messageBox.style.zIndex =
            "9999";


        messageBox.style.fontSize =
            "14px";


        messageBox.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.3)";


        document.body.appendChild(
            messageBox
        );

    }


    messageBox.innerHTML =
        "❤️ Photo saved! It will stay after reload.";


    messageBox.style.display =
        "block";


    clearTimeout(
        window.photoMessageTimer
    );


    window.photoMessageTimer =
        setTimeout(
            function () {

                messageBox.style.display =
                    "none";

            },
            3000
        );

}


/* =====================================================
   CUSTOM MUSIC SYSTEM
===================================================== */


/* Music elements */

const musicFile =
    document.getElementById(
        "musicFile"
    );

const music =
    document.getElementById(
        "music"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

const pauseMusic =
    document.getElementById(
        "pauseMusic"
    );

const stopMusic =
    document.getElementById(
        "stopMusic"
    );

const musicName =
    document.getElementById(
        "musicName"
    );


let selectedMusicURL = null;


/* ================= CHOOSE MUSIC ================= */

if (musicFile) {

    musicFile.addEventListener(
        "change",
        function (event) {

            const file =
                event.target.files[0];


            if (!file) {

                return;

            }


            if (
                !file.type.startsWith(
                    "audio/"
                )
            ) {

                alert(
                    "Please select an audio file 🎵"
                );

                return;

            }


            /* Remove old URL */

            if (selectedMusicURL) {

                URL.revokeObjectURL(
                    selectedMusicURL
                );

            }


            /* Create audio URL */

            selectedMusicURL =
                URL.createObjectURL(
                    file
                );


            if (music) {

                music.src =
                    selectedMusicURL;

                music.load();

            }


            /* Song name */

            if (musicName) {

                musicName.textContent =
                    "🎵 " + file.name;

            }


            createHearts(10);

        }
    );

}


/* ================= PLAY ================= */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        function () {

            if (!music || !music.src) {

                alert(
                    "Pehle koi song select karo 🎵"
                );

                return;

            }


            music.play()
                .then(
                    function () {

                        musicButton.innerHTML =
                            "🔊 Music Playing";

                    }
                )
                .catch(
                    function (error) {

                        console.log(
                            "Music error:",
                            error
                        );

                    }
                );

        }
    );

}


/* ================= PAUSE ================= */

if (pauseMusic) {

    pauseMusic.addEventListener(
        "click",
        function () {

            if (!music) return;


            music.pause();


            if (musicButton) {

                musicButton.innerHTML =
                    "▶️ Play Music";

            }

        }
    );

}


/* ================= STOP ================= */

if (stopMusic) {

    stopMusic.addEventListener(
        "click",
        function () {

            if (!music) return;


            music.pause();


            music.currentTime =
                0;


            if (musicButton) {

                musicButton.innerHTML =
                    "▶️ Play Music";

            }

        }
    );

}


/* ================= MUSIC ENDED ================= */

if (music) {

    music.addEventListener(
        "ended",
        function () {

            if (musicButton) {

                musicButton.innerHTML =
                    "▶️ Play Music";

            }

        }
    );

}
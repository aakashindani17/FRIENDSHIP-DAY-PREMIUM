/* =========================================
   FRIENDSHIP DAY PREMIUM WEBSITE
   Updated version with saved photos
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

const musicButton =
    document.getElementById("musicButton");

const music =
    document.getElementById("music");


/* ================= START SURPRISE ================= */

startButton.addEventListener(
    "click",
    startSurprise
);


friendNameInput.addEventListener(
    "keydown",
    function(event) {

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
            "Please enter your friend's name ❤️"
        );

        friendNameInput.focus();

        return;

    }


    /*
       Put name everywhere
    */

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


    /*
       Save friend's name
    */

    localStorage.setItem(
        "friendshipFriendName",
        name
    );


    /*
       Hide intro
    */

    intro.classList.add("hidden");


    /*
       Show surprise
    */

    surprise.classList.remove("hidden");


    /*
       Create hearts
    */

    createHearts(40);


    /*
       Load saved photos
    */

    loadSavedPhotos();


    /*
       Scroll top
    */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ================= LOAD SAVED NAME ================= */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        const savedName =
            localStorage.getItem(
                "friendshipFriendName"
            );


        if (savedName) {

            friendNameInput.value =
                savedName;

        }


        /*
           Load saved photos
        */

        loadSavedPhotos();

    }
);


/* ================= MESSAGE ================= */

messageButton.addEventListener(
    "click",
    function() {

        message.classList.remove(
            "hidden"
        );


        messageButton.innerHTML =
            "❤️ Message Opened";


        createHearts(25);


        setTimeout(
            function() {

                message.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            },
            200
        );

    }
);


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
        function() {

            heart.remove();

        },
        10000
    );

}


/* ================= CREATE MANY HEARTS ================= */

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


/*
   Continuous hearts
*/

setInterval(
    createHeart,
    1200
);


/* =====================================================
   PHOTO SYSTEM
   Photos are saved in browser Local Storage
===================================================== */


/* ================= PHOTO INPUTS ================= */

const photoInputs =
    document.querySelectorAll(
        ".photo-input"
    );


/* ================= PHOTO UPLOAD ================= */

photoInputs.forEach(
    function(input, index) {

        input.addEventListener(
            "change",
            function(event) {

                const file =
                    event.target.files[0];


                if (!file) {

                    return;

                }


                /*
                   Check image
                */

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


                /*
                   Maximum file size
                   5 MB
                */

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


                const image =
                    card.querySelector(
                        ".photo"
                    );


                const placeholder =
                    card.querySelector(
                        ".photo-placeholder"
                    );


                /*
                   Read image
                */

                const reader =
                    new FileReader();


                reader.onload =
                    function(e) {

                        const imageData =
                            e.target.result;


                        /*
                           Show image
                        */

                        image.src =
                            imageData;


                        image.classList.add(
                            "show"
                        );


                        placeholder.style.display =
                            "none";


                        /*
                           SAVE PHOTO
                        */

                        savePhoto(
                            index,
                            imageData
                        );


                        /*
                           Success message
                        */

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

    photoInputs.forEach(
        function(input, index) {

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


            const image =
                card.querySelector(
                    ".photo"
                );


            const placeholder =
                card.querySelector(
                    ".photo-placeholder"
                );


            /*
               Restore photo
            */

            image.src =
                savedPhoto;


            image.classList.add(
                "show"
            );


            placeholder.style.display =
                "none";

        }
    );

}


/* ================= PHOTO MESSAGE ================= */

function showPhotoMessage() {

    let messageBox =
        document.getElementById(
            "photoSavedMessage"
        );


    /*
       Create message if it doesn't exist
    */

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
            function() {

                messageBox.style.display =
                    "none";

            },
            3000
        );

}


/* ================= MUSIC ================= */

let musicPlaying =
    false;


musicButton.addEventListener(
    "click",
    function() {

        if (!musicPlaying) {

            music.play()
                .then(
                    function() {

                        musicPlaying =
                            true;


                        musicButton.innerHTML =
                            "🔊 Music ON";

                    }
                )
                .catch(
                    function() {

                        alert(
                            "music.mp3 file same folder me rakho 🎵"
                        );

                    }
                );

        }

        else {

            music.pause();


            musicPlaying =
                false;


            musicButton.innerHTML =
                "🎵 Music";

        }

    }
);
// JavaScript function that wraps everything
$(document).ready(function() {



    // Create characters
    var harryPotter = {
        name: "Happy Potter",
        hp: 100,
        damage: 5,
    }

    var hermioneGranger = {
        name: "Hermione Granger",
        hp: 120,
        damage: 8,
    }

    var bellatrixLestrange = {
        name: "Bellatrix Lestrange",
        hp: 150,
        damage: 20,
    }

    var lordVoldemort = {
        name: "Lord Voldemort",
        hp: 180,
        damage: 25,
    }

    // Get elements for later use
    var cardHarry = $('#harry-potter')
    var cardHermione = $('#hermione-granger')
    var cardBellatrix = $('#bellatrix-lestrange')
    var cardVoldemort = $('#lord-voldemort')

    var hpHarryPotter = $('#hp-harry-potter')
    var hpHermione = $('#hp-hermione')
    var hpBellatrix = $('#hp-bellatrix')
    var hpVoldemort = $('#hp-voldemort')

    // Add event listener 'Click' to character cards
    cardHarry.on('click', function() {
       alert("Harry"); 
    });
    cardHermione.on('click', function() {
        alert("Hermione"); 
    });
    cardBellatrix.on('click', function() {
        alert("Bellatrix"); 
    });
    cardVoldemort.on('click', function() {
        alert("Voldemort");
    });





    // Gets Link for Theme Song
    var audioElement = document.createElement("AUDIO");
    audioElement.setAttribute("src", "assets/audio/audio-harrypotter-thequidditchmatch.mp3");

    // Theme Button
    $(".theme-button").on("click", function () {
        audioElement.play();
    });
    $(".pause-button").on("click", function () {
        audioElement.pause();
    })

});
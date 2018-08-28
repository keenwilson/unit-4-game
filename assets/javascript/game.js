// JavaScript function that wraps everything
$(document).ready(function() {
    var gameStart = true;
    var isMainCharacterChosen = false;
    var isDefenderChosen = false;
    var mainCharacter = null;
    var currentDefender = null;
    var previouslyFought = [];
    var yourCurrentAttackPower = null;
    var attackOccurred = false;
    var winOccurred = false;
    var lossOccurred = false;
    var gameOver = false;
    var characterClicked;
    var gameStatusUpdate;
      
    var gameObject = {
        charactersArray: [
            // Create an array of all characters
            {
                name: "Harry Potter",
                visual: "assets/images/img-harrypotter.jpg",
                hitPoints: 110,
                attackPower: 7,
                counterAttackPower: 14               
            },
            {
                name: "Hermione Granger",
                visual: "assets/images/img-hermionegranger.jpg",
                hitPoints: 120,
                attackPower: 8,
                counterAttackPower: 16       
            },
            {
                name: "Bellatrix Lestrange",
                visual: "assets/images/img-BellatrixLestrange.jpg",
                hitPoints: 150,
                attackPower: 10,
                counterAttackPower: 20    
            },
            {
                name: "Lord Voldemort",
                visual: "assets/images/img-voldemort.jpg",
                hitPoints: 180,
                attackPower: 15,
                counterAttackPower: 30   
            }
        ]
    }   

    // Get elements for later use
    var characterCard = $('.character-card')
    var cardHarry = $('#harry-potter')
    var cardHermione = $('#hermione-granger')
    var cardBellatrix = $('#bellatrix-lestrange')
    var cardVoldemort = $('#lord-voldemort')

    var hpHarryPotterDisplay = $('#hp-harry-potter')
    var hpHermioneDisplay = $('#hp-hermione')
    var hpBellatrixDisplay = $('#hp-bellatrix')
    var hpVoldemortDisplay = $('#hp-voldemort')

    var mainCharacterDisplay = $('#main-character-card');
    var mainCharacterTitle = $('#main-character-title');
    var mainCharacterVisual = $('#main-character-visual');
    var mainCharacterHP = $('#main-character-hp');

    var defenderCharacterDisplay = $('#defender-character-card');
    var defenderCharacterTitle = $('#defender-character-title');
    var defenderCharacterVisual = $('#defender-character-visual');
    var defenderCharacterHP = $('#defender-character-hp');

    var objectHarryPotter = gameObject.charactersArray[0]
    var objectHermione = gameObject.charactersArray[1]
    var objectBellatrix = gameObject.charactersArray[2]
    var objectVoldemort = gameObject.charactersArray[3]
    console.log(objectHarryPotter, objectHermione, objectBellatrix, objectVoldemort)

    var titleMessageDisplay = $('#title-message');
    var gameMessageDisplay = $('#game-message');

    // render Main Character card
    function renderMainCharacter(i) {
        mainCharacterDisplay.removeClass("collapse");
        mainCharacterTitle.text(gameObject.charactersArray[i].name);
        mainCharacterVisual.attr("src", gameObject.charactersArray[i].visual);
        mainCharacterHP.text(gameObject.charactersArray[i].hitPoints); 
        isMainCharacterChosen = true;     
        mainCharacter = gameObject.charactersArray[i];
        console.log(mainCharacterTitle, mainCharacterHP, mainCharacterVisual)
    };

    // render Defender Character card
    function renderDefenderCharacter(i) {
        defenderCharacterDisplay.removeClass("collapse");
        defenderCharacterTitle.text(gameObject.charactersArray[i].name);
        defenderCharacterTitle.attr("value", gameObject.charactersArray[i].name)
        defenderCharacterVisual.attr("src", gameObject.charactersArray[i].visual);
        defenderCharacterHP.text(gameObject.charactersArray[i].hitPoints);      
        isDefenderChosen =true;
        currentDefender = gameObject.charactersArray[i];
        console.log(defenderCharacterTitle, defenderCharacterVisual, defenderCharacterHP)
    };
    
    function AddPreviouslyFought(i) {
        previouslyFought.push(gameObject.charactersArray[i]);
    }

    function activeAttackButton() {
        if (isMainCharacterChosen === true) {
            attackOccurred = true;
        } else {
            attackOccurred = false;
        }
    }

    window.onload = createCharacterCard();
    
    function createCharacterCard() {
    $('.character-button').click(function(){
        var i;
        characterClicked = $(this).val()
        switch (characterClicked) {
            case "Harry Potter": i = 0; break;
            case "Hermione Granger": i = 1; break;
            case "Bellatrix Lestrange": i = 2; break;
            case "Lord Voldemort": i = 3; break;           
        }
        console.log(i, "i")
        console.log(attackOccurred, "check if attack occurred")
        if (attackOccurred) {
            if (isDefenderChosen === true) {
                return false;
            } else {
            renderDefenderCharacter(i);
            isDefenderChosen = true;
            $('#attack-button').removeClass("collapse");
            $(this).addClass("collapse");
            }
        } else {
            renderMainCharacter(i);
            $('#title-message').text("Enemies Available To Attack");
            isMainCharacterChosen = true;
            activeAttackButton();
            $(this).addClass("collapse");
        }    
    })//End Character Button
    } // End Create Character Card
    
    // You can fight by clicking the attack button.
    $('#attack-button').on('click', function() {
        audioAttack.play();
        mainCharacter.hitPoints -= currentDefender.counterAttackPower;
        currentDefender.hitPoints -= mainCharacter.attackPower;
        // Every time you attack, it slowly increases your attack power.
        mainCharacter.attackPower += mainCharacter.attackPower;
        mainCharacterHP.text(mainCharacter.hitPoints);
        defenderCharacterHP.text(currentDefender.hitPoints);
        checkIfWin();
    });

    // define winner for each round
    function checkIfWin() {
        if (mainCharacter.hitPoints <= 0) {
            $('#title-message').text("You have been defeated. Game Over!")
            $('#restart-button').removeClass("collapse")
        } else if (currentDefender.hitPoints <= 0) {
            $('#title-message').text(currentDefender.name + "is defeated. Pick the next enemy to fight!");
            attackOccurred = true; 
            isDefenderChosen = false;
            createCharacterCard();  
        } else {
            gameStatusUpdate = "You attacked "+ currentDefender.name + "for " + mainCharacter.attackPower + " damage. " + currentDefender.name + " attacked you back for " + currentDefender.counterAttackPower  +" damage."
            $('#title-message').text(gameStatusUpdate);
        }
    };






    // Audio //
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
    // Gets link for attack!
    var audioAttack = document.createElement("AUDIO");
    audioAttack.setAttribute("src", "assets/audio/audio-magic_wand_whoosh.mp3");
    



}); // End Document.ready
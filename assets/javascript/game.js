// JavaScript function that wraps everything
$(document).ready(function () {
    var isGameRoundStart, isMainCharacterChosen, isDefenderChosen, 
        characterClicked, mainCharacter, currentDefender, yourCurrentAttackPower, 
        isLastDefender, numberOfWins, isGameOver, attackStatusUpdate, gameObject;

    // add jQuery / get elements for later use
    var mainCharacterDisplay = $('#main-character-card');
    var mainCharacterTitle = $('#main-character-title');
    var mainCharacterVisual = $('#main-character-visual');
    var mainCharacterHP = $('#main-character-hp');

    var defenderCharacterDisplay = $('#defender-character-card');
    var defenderCharacterTitle = $('#defender-character-title');
    var defenderCharacterVisual = $('#defender-character-visual');
    var defenderCharacterHP = $('#defender-character-hp');

    var titleMessageDisplay = $('#title-message');

    function gameSetUp() {
        // Setup config options
        isGameOver = false;
        isGameRoundStart = false;
        isMainCharacterChosen = false;
        isDefenderChosen = false;
        numberOfWins = 0;
        isRoundWin = false;
        isLastDefender = false;
        characterClicked = null;
        mainCharacter = null;
        currentDefender = null;
        yourCurrentAttackPower = null;   

        gameObject = {
            charactersArray: [
                // Create an array of all characters
                {
                    name: "Harry Potter",
                    visual: "assets/images/img-harrypotter.jpg",
                    hitPoints: 120,
                    attackPower: 17,
                    counterAttackPower: 15
                },
                {
                    name: "Hermione Granger",
                    visual: "assets/images/img-hermionegranger.jpg",
                    hitPoints: 110,
                    attackPower: 25,
                    counterAttackPower: 17
                },
                {
                    name: "Bellatrix Lestrange",
                    visual: "assets/images/img-BellatrixLestrange.jpg",
                    hitPoints: 125,
                    attackPower: 27,
                    counterAttackPower: 19
                },
                {
                    name: "Lord Voldemort",
                    visual: "assets/images/img-voldemort.jpg",
                    hitPoints: 175,
                    attackPower: 18,
                    counterAttackPower: 21
                }],
            messages: {
                // Create messages for varios situations
                youWon: "Hooray! You won all the battles.",
                youLose: "You have been defeated. Game Over!",
                readyToFight: "Keep Your Wand At The Ready!",
                gameHasStarted: "The battle has started. Fight! Fight! Fight!",
                findDefender: "Select The Enemy To Fight Against.",
                nextDefender: "Well Done! Select The Next Enemy To Fight.",
                noRepeatAttack: "The Battle Was Over! You’re Just As Sane As I Am!",
                isHarryPotterKilled: "Oh my God, you've killed Harry Potter!",
                restartGame: "It's A New Round. Pick Your Main Character."
            }
        };
    
    };

    window.onload = gameSetUp();

    // render Main Character card
    function renderMainCharacter(i) {
        mainCharacterDisplay.removeClass("collapse");
        mainCharacterTitle.text(gameObject.charactersArray[i].name);
        mainCharacterVisual.attr("src", gameObject.charactersArray[i].visual);
        mainCharacterHP.text(gameObject.charactersArray[i].hitPoints);
        isMainCharacterChosen = true;
        mainCharacter = gameObject.charactersArray[i];
    };

    // render Defender Character card
    function renderDefenderCharacter(i) {
        defenderCharacterDisplay.removeClass("collapse");
        defenderCharacterTitle.text(gameObject.charactersArray[i].name);
        defenderCharacterTitle.attr("value", gameObject.charactersArray[i].name)
        defenderCharacterVisual.attr("src", gameObject.charactersArray[i].visual);
        defenderCharacterHP.text(gameObject.charactersArray[i].hitPoints);
        isDefenderChosen = true;
        currentDefender = gameObject.charactersArray[i];
    };

    // add event listener to 'Character' buttons
    $('.character-button').click(function () {    
        if (isGameRoundStart === true) {
             // check us game round has been started. If yes, tell a user to keep fighting.
            titleMessageDisplay.text(gameObject.messages.gameHasStarted);
        } else {
            // if not, create fighting character cards
            characterClicked = $(this).val();
            createCharacterCard();
            // remove the selected character out of the character list on the screen
            $(this).addClass("collapse");
        };        
    })//End Character Button

    function createCharacterCard() {
        var i;
        switch (characterClicked) {
            case "Harry Potter": i = 0; break;
            case "Hermione Granger": i = 1; break;
            case "Bellatrix Lestrange": i = 2; break;
            case "Lord Voldemort": i = 3; break;
            // if you have more character, add more cases here
        }
        if (isMainCharacterChosen === false) {
            // create our main character card and display on the browser
            renderMainCharacter(i);
            $('#main-character-card').removeClass("collapse");
            isMainCharacterChosen = true;
            titleMessageDisplay.text(gameObject.messages.findDefender);
            // set yourCurrentAttackPower equal to the base attack power of the selected character
            yourCurrentAttackPower = mainCharacter.attackPower;
        } else {
            // create a defender character and display on the screen
            renderDefenderCharacter(i);
            $('#defender-character-card').removeClass("collapse");
            isDefenderChosen = true;
            isRoundWin = false;
            isGameRoundStart = true;
            // display attack button
            $('#attack-button').removeClass("collapse");
            titleMessageDisplay.text(gameObject.messages.readyToFight);
        }
    } // End Create Character Card

    // Add event listener 'click' to attack button
    $('#attack-button').on('click', function () {
        checkIfDefenderIsChosen();
        checkIfAttackWhenGameOver();
        checkIfAttackWhenRoundwin();
    });

    function checkIfDefenderIsChosen() {
        if (isDefenderChosen === true) {
            return false;
            console.log(isDefenderChosen, "isDefenderChosen");
        } else {
            titleMessageDisplay.text(gameObject.messages.findDefender);
        }
    };
    

    function checkIfAttackWhenGameOver() {
        if (isGameOver === true) {
            // tell users not to click 'attack' once game is over
            titleMessageDisplay.text(gameObject.messages.noRepeatAttack);
            $('#restart-button').removeClass("collapse");
        } else {
            return false;
            console.log(isGameOver, "isGameOver");
        }
    };

    function checkIfAttackWhenRoundwin() {
        if (isRoundWin === true) {
            titleMessageDisplay.text(gameObject.messages.nextDefender);
            console.log(isRoundWin, "isRoundWin", gameObject.messages.nextDefender);
        } else {
            console.log(isRoundWin, "isRoundWin");
            audioAttack.play();
            calculateDamage();
            displayDamage();
            checkLastDefender();
            reviewAttackResult();
        }
    };

    function calculateDamage() {
        mainCharacter.hitPoints -= currentDefender.counterAttackPower;
        currentDefender.hitPoints -= yourCurrentAttackPower;
        // Every time you attack, it slowly increases your attack power.
        yourCurrentAttackPower += mainCharacter.attackPower;
    };

    function displayDamage() {
        mainCharacterHP.text(mainCharacter.hitPoints);
        defenderCharacterHP.text(currentDefender.hitPoints);
        attackStatusUpdate = "You attacked " + currentDefender.name + "for " + yourCurrentAttackPower + " damage. " + currentDefender.name + " attacked you back for " + currentDefender.counterAttackPower + " damage.";
        titleMessageDisplay.text(attackStatusUpdate);
    };

    function checkLastDefender() {
        if (numberOfWins === gameObject.charactersArray.length - 2) {
            isLastDefender = true;

        } else {
            isLastDefender = false;
        }
    };

    function reviewAttackResult() {

        console.log(mainCharacter.hitPoints, "main HP");
        console.log(currentDefender.hitPoints, "defender hp");
        console.log(isLastDefender, "if last defender");

        if (mainCharacter.hitPoints >= 0) {
            // You still have some HPs.
            if (currentDefender.hitPoints <= 0) {
                // You beat this current defender.
                // Is this the last defender?
                if (isLastDefender === true) {
                    // game over. you won!
                    titleMessageDisplay.text(gameObject.messages.youWon);
                    $("#attack-button").addClass("collapse");
                    $('#restart-button').removeClass("collapse")
                    isGameOver = true;
                } else {
                    // pick new defender
                    titleMessageDisplay.text(currentDefender.name + "is defeated. Pick the next enemy to fight!");
                    numberOfWins++; 
                    isDefenderChosen = false;
                    isRoundWin = true;
                    isGameRoundStart = false;
                    isGameOver = false;
                }
            } 
        } else {
            // Your HP is reduced to 0 or below.
            // You are defeated!
            titleMessageDisplay.text(gameObject.messages.youLose);
            isGameOver = true;
            $("#attack-button").addClass("collapse");
            // show restart button
            $('#restart-button').removeClass("collapse");
        };
    }   



   // Add an event listener 'click' to 'restart' button
    $('#restart-button').on('click', function () {
        gameSetUp();
        $('.character-button').removeClass("collapse");
        $('#main-character-card').addClass("collapse");
        $('#defender-character-card').addClass("collapse");
        $("#attack-button").addClass("collapse");
        $('#restart-button').addClass("collapse");
        titleMessageDisplay.text(gameObject.messages.restartGame);
    });





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
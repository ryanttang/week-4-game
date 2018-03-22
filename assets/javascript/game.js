// Variables for Game
var charSelected = false;
var yourChar; 

var enemySelected = false;
var yourEnemy;
var enemyName;
var readytoAttack = false;

var defeatedCount = 0;

//Global Variables for Character Attributes
var yourHealth;
var enemyHealth;

// Enemy Moves
var enemyAttack;
var yodaCountAttack = 17
var maceCountAttack = 15
var quigonCountAttack = 13
var childishCountAttack = 11


// Player Attacks
var yourAttack = 0;
var yourBaseAttack;
var yodaBaseAttack = 20
var maceBaseAttack = 18
var quigonBaseAttack = 16
var childishBaseAttack = 14

// --- Game Functions -- 
$(document).ready(function() {

    // After Player Selects Character, Move Rest to Enemy Div
    $(".stats_card").on("click", function() {
        if(charSelected == false){

            // Remove Old Battle Commentary
            $('.commented').remove()

            // Move Characters to Enemy
            $("#yoda").appendTo("#enemy_list").addClass("enemy_stats_card");
            $("#mace").appendTo("#enemy_list").addClass("enemy_stats_card");
            $("#quigon").appendTo("#enemy_list").addClass("enemy_stats_card");
            $("#childish").appendTo("#enemy_list").addClass("enemy_stats_card");

            // Move Chosen Character to Div
            $(this).removeClass("enemy_stats_card").addClass("your_stats_card").appendTo("#char_list");

            // Set ID and Attributes
            yourChar = this.id;
            yourHealth = $(this).attr('value');

            // Set Your Base Attack
            if(yourChar == 'yoda'){
                yourBaseAttack = yodaBaseAttack;
            }
            if(yourChar == 'mace'){
                yourBaseAttack = maceBaseAttack;
            }
            if(yourChar == "quigon"){
                yourBaseAttack = quigonBaseAttack;
            }
            if(yourChar == "childish"){
                yourBaseAttack = childishBaseAttack;
            }

            charSelected = true;
            return;
        }
    });

    	// Move Selected Enemy to Defender Div
	$(".stats_card").on("click", function(){
		if(this.id != yourChar && enemySelected == false){

			// Move Enemy to Defend area
			$(this).appendTo("#defend_list").removeClass('enemy_stats_card').addClass('defender_stats_card');

			// Collect ID of Enemy and Attributes
			yourEnemy = this.id;
			enemyHealth = $(this).attr('value');

			// Remove Old Battle Commentary
			$('.commented').remove();

			// Change variable and return
			enemySelected = true;
			readyToAttack = true;
			return;	
		}
			
	});

    // Begin Battle
    $("#attack").on("click", function() {

        if(readyToAttack){

            // If Both Player and Eme
            if(yourHealth > 0 && enemyHealth >0) {

                // Remove Old Battle Commentary
                $('.commented').remove();

                // Increment Player Attack
                yourAttack += yourBaseAttack;

                // Determine Enemy Counter
                if(yourEnemy == 'yoda'){
                    enemyAttack = yodaCountAttack;
                }
                if(yourEnemy == 'mace'){
                    enemyAttack = maceCountAttack;
                }
                if(yourEnemy == 'quigon'){
                    enemyAttack = quigonCountAttack;
                }
                if(yourEnemy == 'childish'){
                    enemyAttack = childishCountAttack;
                }

                // Battle Logic
                yourHealth = yourHealth - enemyAttack;
                enemyHealth = enemyHealth - yourAttack;

                // Change Enemy Stats on Screen
                if(yourEnemy == 'yoda'){
                    $('#yoda_hp').html(enemyHealth);
                    enemyName = "Master Yoda";
                }
                if(yourEnemy == 'mace'){
                    $('#mace_hp').html(enemyHealth);
                    enemyName = "Samuel L. Jackson";
                }
                if(yourEnemy == 'quigon'){
                    $('#quigon_hp').html(enemyHealth);
                    enemyName = "Qui-Gon Jinn";
                }
                if(yourEnemy == 'childish'){
                    $('#childish_hp').html(enemyHealth);
                    enemyName = "Childish Gambino";
                }

                // Change Your Stats on Screen
                if(yourChar == 'yoda'){
                    $('#yoda_hp').html(yourHealth);
                }
                if(yourChar == 'mace'){
                    $('#mace_hp').html(yourHealth);
                }
                if(yourChar == 'quigon'){
                    $('#quigon_hp').html(yourHealth);
                }
                if(yourChar == 'childish'){
                    $('#childish_hp').html(yourHealth);
                }

                // Battle Commentary
                $('#battle_comments').append("<p class = 'commented'>You attacked " + "<span class = inline_bold>" + enemyName + "</span>" + " for " + "<span class = inline_bold>" + yourAttack + "</span>" + " damage.</p>");
				$('#battle_comments').append("<p class = 'commented'>" + enemyName + " attacked <span class = inline_bold>you</span> back for " + "<span class = inline_bold>" + enemyAttack + "</span>" + " damage.</p>");

            }

            // If Player Has 0 Health
            if(yourHealth <= 0){
            
                // Remove Old Battle Commentary
                $('.commented').remove();

            //Display Loser Message
            $("#battle_comments").append("<p>You Lose!</p>");
            $("#battle_comments").append("<button id = 'restart'>Try Again!</button>");

                //Restart Page
                $("restart").on("click", function() {
                    location.reload();
                });

            // Change Variable and Return
            readyToAttack = false;
            return;
        }
    
    // If Player Wins
    if(enemyHealth <= 0){

        // Increment the Defeated Count
        defeatedCount += 1;

        // Remove Old Battle Commentary
        $('.commented').remove();

        // Hide the Defeated Enemies
        if(yourEnemy == 'yoda'){
            $('#yoda').addClass('hide_dead_enemy');
            enemyName = "Master Yoda";
        }
        if(yourEnemy == 'mace'){
            $('#mace').addClass('hide_dead_enemy');
            enemyName = "Samuel L. Jackson";
        }
        if(yourEnemy == 'quigon'){
            $('#quigon').addClass('hide_dead_enemy');
            enemyName = "Qui-Gon Jinn";
        }
        if(yourEnemy == 'childish'){
            $('#childish').addClass('hide_dead_enemy');
            enemyName = "Childish Gambino";
        }    
        
        
        // Check to see if all enemies are dead
		if(defeatedCount < 3){

		// Ask Player to Pick Another Opponent
		$('#battle_comments').append("<p class = 'commented'>You have defeated " + "<span class = inline_bold>" + enemyName + "</span>" + ", attack the next enemy!</p>");

		// Change Variable and Return
		readyToAttack = false;
		enemySelected = false;
		return;
			}
			else{

			    // Remove Old Battle Commentary
				$('.commented').remove();
					
				$('#battle_comments').append("<p class = 'commented'>You Win!</p>");
				$('#battle_comments').append("<button id = 'replay'>Play Again?</button>");

					// Restart the Page for Loss
					$("#replay").on("click", function(){
						location.reload();
					});

					// Change Variable and Return
					readyToAttack = false;
					return;	
				}

			}

		}
		// No Character Selected
		else if (charSelected == false){

			// Remove Old Battle commentary
			$('.commented').remove();
			$('#replay').remove();

			// Display Message
			$('#battle_comments').append("<p class = commented>No player selected! Please select your character!</p>");
		}
		// If No Enemy to Atttack
		else if (enemySelected == false){

			// Remove Old Battle Commentary
			$('.commented').remove();
			$('#replay').remove();

			// Display Message
			$('#battle_comments').append("<p class = commented>No enemies! Please select your opponent!</p>");
		}

	});
});	



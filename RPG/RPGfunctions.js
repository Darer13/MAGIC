var fight = function(xp){    if (Math.random() < .45){        game.state.xp += 10;        game.displayXP();        game.print("You won. Yay for you and you gained 10 xp. You are at the " + new_place);        game.wait_for_text(_.union(map[new_place]["connects_to"], ["inventory"])).then(go_to_place_or_inventory);    }    else {        game.state.xp += 1;        game.displayXP();        game.print("You lost but you gained 1 xp. You are at the " + new_place);        game.wait_for_text(_.union(map[new_place]["connects_to"], ["inventory"])).then(go_to_place_or_inventory);    }}var other = function(input){    // otherwise, the input must be a location. Update game.state.location.    game.state.location = input;    new_place = input;    game.print("You are at the " + new_place);    if (new_place === "forest") {        if (Math.random() < 0.45){            game.print("You see a blood thirsty boar");            game.wait_for_text(_.union(["fight", "run"])).then(go_to_place_or_inventory);        } else {            game.wait_for_text(_.union(map[new_place]["connects_to"], ["inventory"])).then(go_to_place_or_inventory);        }    } else if (new_place === "farm" && game.state.meetFarm === false){        game.print("[Farmer]: Hello fellow adventurer. Could you please go to the mountains and retrieve a cow for me?");        game.print("[You]: I'd love to");        game.print("[Farmer]: Thank you very much. I knew I could count on you.");        game.state.questList.push("getCow");        game.state.meetFarm = true;        game.wait_for_text(_.union(map[new_place]["connects_to"], ["inventory"])).then(go_to_place_or_inventory);    } else if (new_place === "mountains" && _.contains(game.state.questList, "getCow")){        game.print("You see many cows. You remember the farmer's quest to you. You grab a cow.");        game.wait_for_text(_.union(map[new_place]["connects_to"], ["inventory"])).then(go_to_place_or_inventory);        debugger;        game.state.inventory.push("cow");    } else if (new_place === "farm" && _.contains(game.state.inventory, "cow") && _.contains(game.state.questList, "getCow")){        game.print("[Farmer]: Thank you soo much for the cow");        game.print("You gained 5 xp for helping the farmer");        game.wait_for_text(_.union(map[new_place]["connects_to"], ["inventory"])).then(go_to_place_or_inventory);        game.state.inventory = _.without(game.state.inventory, "cow");        game.state.questList = _.without(game.state.questList, "getCow");        game.state.xp += 5;        game.displayXP();    } else {        game.wait_for_text(_.union(map[new_place]["connects_to"], ["inventory"])).then(go_to_place_or_inventory);    }}
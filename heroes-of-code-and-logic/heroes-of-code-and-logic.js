function solve(inputArr) {

    let heroesCount = Number(inputArr.shift());
    let heroes = {};

    let commandParser = {
        'CastSpell': castSpell,
        'TakeDamage': takeDamage,
        'Recharge': recharge,
        'Heal': heal
    }

    for (let i = 0; i < heroesCount; i++) {
        let [hero, hitPoints, manaPoints] = inputArr.shift().split(' ');
        let hp = Number(hitPoints);
        let mp = Number(manaPoints);
        heroes[hero] = { hp, mp };
    }

    let line = inputArr.shift();

    while (line !== 'End') {
        let [command, hero,...tokens] = line.split(' - ');
        
        commandParser[command](hero,...tokens);

        line = inputArr.shift();
    }

    for (let key in heroes) {
        console.log(key);
        console.log(`HP: ${heroes[key].hp}`);
        console.log(`MP: ${heroes[key].mp}`);
    }

    function castSpell(hero, mpNeeded, spellName) {
        if (heroes[hero].mp >= Number(mpNeeded)) {
            heroes[hero]. mp -= Number(mpNeeded);
            console.log(`${hero} has successfully cast ${spellName} and now has ${heroes[hero].mp} MP!`);
        } else {
            console.log(`${hero} does not have enough MP to cast ${spellName}!`);
        }
    }

    function takeDamage(hero, damage, attacker) {
        heroes[hero].hp -= Number(damage);
        if (heroes[hero].hp > 0) {
            console.log(`${hero} was hit for ${damage} HP by ${attacker} and now has ${heroes[hero].hp} HP left!`);
        } else {
            delete heroes[hero];
            console.log(`${hero} has been killed by ${attacker}!`);
        }
    }

    function recharge(hero, amount) {
        let currentMp = heroes[hero].mp;
       heroes[hero].mp += Number(amount);
        if (heroes[hero].mp>= 200) {
            heroes[hero].mp = 200;
            console.log(`${hero} recharged for ${200 - currentMp} MP!`);
        } else {
            console.log(`${hero} recharged for ${amount} MP!`);
        }
    }

    function heal(hero, amount) {
        let currentHp = heroes[hero].hp;
        heroes[hero].hp += Number(amount);
        if (heroes[hero].hp >= 100) {
            heroes[hero].hp = 100;
            console.log(`${hero} healed for ${100 - currentHp} HP!`);
        } else {
            console.log(`${hero} healed for ${amount} HP!`);
        }
    }
}

solve(["2",
"Solmyr 85 120",
"Kyrre 99 50",
"Heal - Solmyr - 10",
"Recharge - Solmyr - 50",
"TakeDamage - Kyrre - 66 - Orc",
"CastSpell - Kyrre - 15 - ViewEarth",
"End"]);
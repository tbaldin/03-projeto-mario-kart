const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}; 

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}; 

async function rollDice() {
    return Math.floor(
        Math.random() * 6
    ) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${attribute + diceResult}`)
}

async function playRaceEngine(character1, character2){
    for(let round=1; round <= 5; round++){
        console.log(`Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`)

        //rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
        
        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME,
                "VELOCIDADE",
                diceResult1,
                character1.VELOCIDADE
            );

            await logRollResult(
                character2.NOME,
                "VELOCIDADE",
                diceResult2,
                character2.VELOCIDADE
            );
        }

        if(block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME,
                "MANOBRABILIDADE",
                diceResult1,
                character1.MANOBRABILIDADE
            );

            await logRollResult(
                character2.NOME,
                "MANOBRABILIDADE",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        }
        if(block === "CONFRONTO"){
            let powerResul1 = diceResult1 + character1.PODER;
            let powerResul2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou ${character2.NOME}!`);

            await logRollResult(
                character1.NOME,
                "PODER",
                diceResult1,
                character1.PODER
            );

            await logRollResult(
                character2.NOME,
                "PODER",
                diceResult2,
                character2.PODER
            );

            //condição dupla
            if(powerResul1 > powerResul2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto!`)
                character2.PONTOS--;
            }
            
            /*//IF Ternário
            character1.PONTOS -= powerResul2 > powerResul1 && character1.PONTOS > 0 ? 1: 0;*/
            if(powerResul2 > powerResul1 && character2.PONTOS > 0){
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto!`)
                character1.PONTOS--;
            }

            //IF Ternário
            console.log(
                powerResul1 === powerResul2
                ? "Confronto empatado. Nenhum ponto foi perdido!"
                : ""
            );
        }

        //verificando o vencedor
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou 1 ponto!`);
            character1.PONTOS++;
        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou 1 ponto!`);
            character2.PONTOS++;
        }
        console.log(`----------------------------------------`)
    }    
}

async function declareWinner(character1, character2){
    console.log("Resultado final:");
    console.log(`${character1.NOME} : ${character1.PONTOS}`);
    console.log(`${character2.NOME} : ${character2.PONTOS}`);

    if(character1.PONTOS > character2.PONTOS)
        console.log(`\n ${character1.NOME} venceu a corrida! Parabéns!`);
    else if(character1.PONTOS < character2.PONTOS)
        console.log(`\n ${character2.NOME} venceu a corrida! Parabéns!`);
    else console.log("A corrida terminou em empate");
}

async function main() {
    console.log(`Corrida entre os jogadores ${player1.NOME} e ${player2.NOME} começando... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
}
main();
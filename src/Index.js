//Index.js es el archivo base en el que se ejecuta la aplicación, en este se importan los apartados 
//principales y se ejecutan en el servidor, teniendo claro el puerto donde se ejecutara.
//Se importan los datos principales de combate, personajes y mounstros.
import { carlos } from "../src/Datos/Personajes.js";
import { enemigos } from "../src/Datos/Mounstros.js";
import { executeAttack } from "./sistema/combate.js";
import { getTurnOrder } from "./sistema/combate.js";

//se trae de enemigos el id que identifica a cada uno de estos.
const id = process.argv[2]?.toLowerCase();
//Se define una variable que toma los ids de cada enemigo y lo trae a el programa principal.
//Se usa structureClone para evitar que el daño se guarde despues de acabar el combate, evitando que el
//daño perdure para el siguiente combate.
const enemigo = structuredClone(enemigos[id]);

//Si se pone un enemigo que no pertenece a los que se encuentran en la lista de ids se muestra cuales estan disponibles.
if (!enemigo) {
  console.log("Enemigo no encontrado. Disponibles: " + Object.keys(enemigos).join(", "));
  process.exit(1);
}

//Se muestran las estadisticas de los personajes y el enemigo.
console.log(`${carlos.name}: CA ${carlos.armorClass}, PG ${carlos.currentHp}/${carlos.maxHp}`);
console.log(`${enemigo.name}: CA ${enemigo.armorClass}, PG ${enemigo.currentHp}/${enemigo.maxHp}`);
//Se crea la variablle Heroe que representa el personaje actual.
const heroe = structuredClone(carlos);
//Se crea la funcion mostrarAtaque que muestra el resultado del ataque en ese turno.
function mostrarAtaque(atacante, objetivo, turno) {
  //Se toma como base arma, ataque y daño para definir un turno.
  const { weapon, attack, damage } = turno;
 //Se muestra la descripcion de el atacante y la descripcion de su turno. 
  console.log(`${atacante.name} ataca con ${weapon.name}: d20 = ${attack.roll} + ${attack.bonus} = ${attack.total} contra CA ${objetivo.armorClass}`);

  //Ciclo if en caso de golpe critico
  if (attack.critical) {
    console.log(`¡Golpe crítico de ${atacante.name}!`);
  } else if (attack.fumble) {
    console.log(`${atacante.name} pifia el ataque.`);
  } else if (attack.hit) {
    console.log(`${atacante.name} impacta.`);
  } else {
    console.log(`${atacante.name} falla el ataque.`);
  }

  //ciclo if que se define en caso de que el golpe se ejecute.
  if (attack.hit) {
    //Se digitan las descripciones de el atacante y el objetivo
    console.log(`${atacante.name} hace ${damage} de daño ${weapon.damageType.toLowerCase()} a ${objetivo.name}.`);
    console.log(`${objetivo.name} tiene ${objetivo.currentHp}/${objetivo.maxHp} PG.`);

    //si el ojbetivo actual tiene un puntaje de vida igual a sera significa que ha caido.
    if (objetivo.currentHp === 0) {
    console.log(`${objetivo.name} ha caído.`);
  }
}
}
//Se define la variable orden que se encarga de poner el orden de ataque de el heroe y el enemigo.
const orden = getTurnOrder([heroe, enemigo]);

//Se usa un ciclo for utilizando combatiente e iniciativa para elegir el orden
for (const { combatant, initiative } of orden) {
  //Se usa un soncole.log para digitar el nombre del combatiente y su iniciativa.
  console.log(`${combatant.name}: iniciativa ${initiative}`);
}

//Se define la variable ronda, comenzando por 1, el valor aumenta con el avanze de turnos.
let ronda = 1;

//Se usa uno cilo while que es mientras el heroe y el enemigo tengan puntos de vida mayor a 0
while (heroe.currentHp > 0 && enemigo.currentHp > 0) {
  //Se usa console.log para mostrar la ronda y el contenido de la ronda.
  console.log(`--- Ronda ${ronda} ---`);
// Se usa un ciclo for para nombrar el orden de cada combatiente
for (const { combatant } of orden) {
  //Se define la variable objetivo que es igual al combatiente, este puede ser el heroe o el enemigo,
  //uno de estos dos es elejido como objetivo.
  const objetivo = combatant === heroe ? enemigo : heroe;
  //Si el objetivo o el compatiente tiene puntos de vida igual a 0 el ciclo se rompe.
  if (combatant.currentHp === 0 || objetivo.currentHp === 0) {
    break;
  }
  //Se define turno como la ejecucion de ataques entre combatiente y objetivo.
  const turno = executeAttack(combatant, objetivo);
  //Se define mostrarAtaque como el resultado del combatiente, el objetivo y el turno.
  mostrarAtaque(combatant, objetivo, turno);
}
  //se define el estado de los personajes al final de la ronda
  console.log(`Fin de la ronda ${ronda}: ${heroe.name} ${heroe.currentHp}/${heroe.maxHp} PG | ${enemigo.name} ${enemigo.currentHp}/${enemigo.maxHp} PG`);
  ronda++
}
//Se definen las variables de ronas t el texto de eestas que definen en que ronda se encuentran en el momento
const rondas = ronda - 1;
const textoRondas = rondas === 1 ? "ronda" : "rondas";
//Cilo if que define que si los puntos de combate de heroe son mayor que o al final, gana el combate.
if (heroe.currentHp > 0) {
  console.log(`${heroe.name} gana el combate en ${rondas} ${textoRondas}.`);
  //Si no es el caso el enemigo gana el compate y se reinician las rondas.
} else {
  console.log(`${enemigo.name} gana el combate en ${rondas} ${textoRondas}.`);
}
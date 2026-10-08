//En este archivo se pruebas principales de el sistema de combate.
//Se importan las librerias de vitest para realizar las pruebas de funcionamiento.
import { describe, it, expect } from "vitest";
//Se importa la funcion getAttackBonus que es la que calcula el bonificador de ataque.
import { getAttackBonus } from "../src/sistema/combate.js";
//Se importan las funciones del apartado de personajes y del apartado de enemigos
import { carlos, krouds, mirrir } from "../src/Datos/Personajes.js";
import { enemigos } from "../src/Datos/Mounstros.js";

//se crea un modelo de prueba para la funcion getAttackBonus
describe ("getAttackBonus", () =>{
   it("Calcula el bonificador de los personajes con su primer arma", () =>{
    expect(getAttackBonus(carlos,carlos.weapons[0])).toBe(5);
    expect(getAttackBonus(krouds,krouds.weapons[0])).toBe(4);
    expect(getAttackBonus(mirrir,mirrir.weapons[0])).toBe(3);
   });

   it("Calcula el bonificador de los personajes con cada arma", () =>{
    expect(getAttackBonus(carlos,carlos.weapons[1])).toBe(5);
    expect(getAttackBonus(mirrir,mirrir.weapons[1])).toBe(4);
   });

   it("Calcula el bonificador de los mounstros", () =>{
    expect(getAttackBonus(enemigos.goblin,enemigos.goblin.weapons[0])).toBe(4);
    expect(getAttackBonus(enemigos.orco,enemigos.orco.weapons[0])).toBe(5);
   });
})

//Se crea un modelo de prueba para la funcion resolveAttack
//se importa la funcion resolveAttack que es la que calcula si el ataque acierta.
import { resolveAttack } from "../src/sistema/combate.js";

describe("resolveAttack", () =>{
    it("impacta cuando el total iguala la clase de Armadura", () =>{
        expect(resolveAttack(10,5,15)).toEqual({
            total:15, critical: false, fumble: false, hit:true,
        })
    })

    it("no impacta cuando el total no iguala o es menor a la clase de Armadura", () =>{
        expect(resolveAttack(9,5,15)).toEqual({
            total:14, critical: false, fumble: false, hit:false,
        })
    })

    it("un 20 es critico inmediato e impacta aunque el total no llegue a la clase de armadura", () =>{
        expect(resolveAttack(20,0,30)).toEqual({
            total:20, critical: true, fumble: false, hit:true,
        })
    })
    
    it("un 1 es pifia inmediata y fallo crtico aunque el total supere a la clase de armadura", () =>{
        expect(resolveAttack(1,10,5)).toEqual({
            total:11, critical: false, fumble: true, hit:false,
        })
    })
})

//Se importa la funcion rollDamage de el apartado de combate.
import {rollDamage} from "../src/sistema/combate.js"
//se crea un modelo de prueba para la funcion rollDamage 
describe("rollDamage", () => {
  it("la hoz sin crítico hace de 4 a 7", () => {
    for (let i = 0; i < 1000; i++) {
      const damage = rollDamage(carlos, carlos.weapons[1], false);
      expect(damage).toBeGreaterThanOrEqual(4);
      expect(damage).toBeLessThanOrEqual(7);
    }
  });

  it("la hoz con crítico hace de 5 a 11", () => {
    for (let i = 0; i < 1000; i++) {
      const damage = rollDamage(carlos, carlos.weapons[1], true);
      expect(damage).toBeGreaterThanOrEqual(5);
      expect(damage).toBeLessThanOrEqual(11);
    }
  });

  it("la ballesta sin crítico hace de 4 a 11", () => {
    for (let i = 0; i < 1000; i++) {
      const damage = rollDamage(carlos, carlos.weapons[0], false);
      expect(damage).toBeGreaterThanOrEqual(4);
      expect(damage).toBeLessThanOrEqual(11);
    }
  });
});

//Se importa la funcion ApplyDamage de el apartado de combate.
import { applyDamage } from "../src/sistema/combate.js";
//Se crea el modelo de prueba para la funcion applyDamage
describe("applyDamage", () => {
  it("resta el daño a los PG actuales", () => {
    const objetivo = { currentHp: 7 };
    applyDamage(objetivo, 4);
    expect(objetivo.currentHp).toBe(3);
  });

  it("no deja los PG por debajo de 0", () => {
    const objetivo = { currentHp: 7 };
    applyDamage(objetivo, 8);
    expect(objetivo.currentHp).toBe(0);
  });

  it("no altera el catálogo original", () => {
  const copia = structuredClone(enemigos.goblin);
  applyDamage(copia, 4);
  expect(copia.currentHp).toBe(3);
  expect(enemigos.goblin.currentHp).toBe(7);
});
});

//Se importa la funcion executeAttack de el modulo de combate.
import { executeAttack } from "../src/sistema/combate.js";
//Se crea el modelo de pruebas de la funcion executeAttack.
describe("executeAttack", () => {
  it("resta PG solo cuando el ataque impacta", () => {
    for (let i = 0; i < 1000; i++) {
      const atacante = structuredClone(carlos);
      const objetivo = structuredClone(enemigos.goblin);
      const antes = objetivo.currentHp;

      const { attack, damage } = executeAttack(atacante, objetivo);

      if (attack.hit) {
        expect(objetivo.currentHp).toBe(Math.max(0, antes - damage));
      } else {
        expect(damage).toBe(0);
        expect(objetivo.currentHp).toBe(antes);
      }
    }
  });
});

//Se importa la funcion rollIniciative de el modulo de combate
import { rollInitiative } from "../src/sistema/combate.js";

//Se crea el modelo de pruebas de la funcion rollIniciative
describe("rollInitiative", () => {
  it("Carlos tira iniciativa entre 4 y 23", () => {
    for (let i = 0; i < 1000; i++) {
      const initiative = rollInitiative(carlos);
      expect(initiative).toBeGreaterThanOrEqual(4);
      expect(initiative).toBeLessThanOrEqual(23);
    }
  });

  it("Goblin tira iniciativa entre 3 y 22", () => {
    for (let i = 0; i < 1000; i++) {
      const initiative = rollInitiative(enemigos.goblin);
      expect(initiative).toBeGreaterThanOrEqual(3);
      expect(initiative).toBeLessThanOrEqual(22);
    }
  });
});

//Se importa la funcion getTurnOrden de el modelo de combate
import { getTurnOrder } from "../src/sistema/combate.js";

//Se crea el modelo de pruebas de la funcion getTurnOrder.
describe("getTurnOrder", () => {
  it("devuelve a todos los combatientes de mayor a menor iniciativa", () => {
    for (let i = 0; i < 1000; i++) {
      const orden = getTurnOrder([carlos, enemigos.goblin]);
      expect(orden).toHaveLength(2);
      expect(orden[0].initiative).toBeGreaterThanOrEqual(orden[1].initiative);
    }
  });
});
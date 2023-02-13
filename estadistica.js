const Estadistica={}

Estadistica.calcularPromedio =function calcularPromedio(lista) {
  Estadistica.sumarTodosElementos= function sumarTodosElementos(valorAcumulado, nuevoValor) {
    return valorAcumulado + nuevoValor;
  }

  // const ejemplo = (a, b) => a + b;

  // const sumarTodosElementos =
  //(valorAcumulado, nuevoValor) => valorAcumulado + nuevoValor; (return IMPLICITAMENTE);

  // const sumaLista = lista.reduce((a, b) => a + b);
  const sumaLista = lista.reduce(sumarTodosElementos);
  const promedio = sumaLista / lista.length;
  return promedio;
}

Estadistica.ordenar_lista=function ordenar_lista(lista) {
  return lista.sort((a, b) => a - b);
}

Estadistica.ordenar_lista_bidimensional=function ordenar_lista_bidimensional(lista) {
  //[ [ '3', 2 ], 2 arrays elements
  //  [ '4', 1 ],
  //  [ '6', 3 ],
  //  [ '9', 1 ],
  //  [ '15', 1 ] ]
  //console.log(listaArray[1]); //[4,1]

  return lista.sort((a, b) => a[1] - b[1]); //a=[ '3', 2 ], b=[ '4', 1 ] => a[1]=[ 2 ] - b[1]=[ 1 ]
}

//MEDIANA PAR E IMPAR
Estadistica.isPar=function isPar(lista) {
  ///////////////////EXPLICACION ESPAR()

  // function esPar(lista) {
  // //(lista.length % 2)=0, js es FALSE -> NEGAMOS ! = TRUE, para que tenga sentido esPar(TRUE)
  //   return !(lista.length % 2);
  // }
  // function esImpar(lista) {
  //   return lista.length % 2;
  // }

  if (lista.length % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

Estadistica.calcular_mediana=function calcular_mediana(lista) {
  Estadistica.ordenar_lista(lista);
  let mediana;
  let numero_medios;
  const lista_par = Estadistica.isPar(lista);

  if (lista_par) {
    numero_medios = lista[lista.length / 2] + lista[lista.length / 2 - 1];
    mediana = numero_medios / 2;
  } else {
    mediana = lista[Math.floor(lista.length / 2)];
  }
  return mediana;
}

////////////////

Estadistica.calcular_moda=function calcular_moda(lista) {
  const contador = {};
  lista.forEach((element) => {
    const index = element;

    if (contador[index]) {
      // la clave dentro del CONTADOR{},haría referencia a cada uno de los números(INDEX) diferentes de tu array.
      //SI EXISTE EN {} +1 ->TRUE
      contador[index] += 1;
    } else {
      //SI NO EXISTE, UNDEFINED=FALSE
      //INICIALIZAMOS TODOS EN 1
      //CREAMOS { llave : valor }
      contador[index] = 1;
    }
  });

  const listaArray = Object.entries(contador);

  const orden_lista = Estadistica.ordenar_lista_bidimensional(listaArray);

  const arr_ultimo = orden_lista[orden_lista.length - 1];
  const arr_penultimo = orden_lista[orden_lista.length - 2];

  if (arr_ultimo[1] === arr_penultimo[1]) {
    return "no hay moda";
  } else {
    const moda = arr_ultimo[0];
    return "la moda es: " + moda + " con " + arr_ultimo[1] + " repeticiones";
  }
}

const lista = [3, 4, 6, 9, 15, 6, 3, 6];
// console.log(Estadistica.ordenar_lista(lista));

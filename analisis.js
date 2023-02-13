console.log(salarios);

const persona = "Juanita";

function encontrar_persona(persona) {
  //find() retorna primer elemento
  return salarios.find((item) => item.name == persona);
}

function medianaPersona(persona) {
  //for(let i = 0; i < trabajos.length; i++){
  //    salarioArr.push(trabajos[i].salario) }
  const trabajos = encontrar_persona(persona).trabajos;
  const salarios = trabajos.map((item) => item.salario);
  const mediana_salario = Estadistica.calcular_mediana(salarios);
  return mediana_salario;
}

function proyeccionPersona(nombrePersona) {
  const trabajos = encontrar_persona(nombrePersona).trabajos;
  const porcentajesCrecimiento = [];
  //se iniciara en 1, yaque se compara el año mayor > año menor
  for (let i = 1; i < trabajos.length; i++) {
    //PARA HALLAR EL NUEVO SALARIO, se compara la diferencia del salario 2019-2018,2020-2019
    const salarioActual = trabajos[i].salario;
    const salarioPadado = trabajos[i - 1].salario;
    const diferencia = salarioActual - salarioPadado;
    const crecimiento = diferencia / salarioPadado;
    porcentajesCrecimiento.push(crecimiento);
  }
  const medianaPorcentajeCrecimiento = Estadistica.calcular_mediana(
    porcentajesCrecimiento
  );
  const ultimo_salario = trabajos[trabajos.length - 1].salario;
  const aumento = ultimo_salario * medianaPorcentajeCrecimiento;
  const nuevo_salario = trabajos[trabajos.length - 1].salario + aumento;

  return nuevo_salario;
}

//----------------------DESTRUCTURACION------------
const empresas = {};
//al usar MAP ANIDADO, el primer TRABAJOS[0] pasa al segundo MAP donde accede a TRABAJOS[0][0]
const trabajo_empresa = salarios.map(
  (
    persona //ARRAY SALARIOS, persona OBJECT
  ) =>
    //map, accede a cada elemento{object} del ARRAY trabajos[0..1..2..]
    persona.trabajos.map((trabajo) => {
      //ACCEDER A LA KEY persona.trabajos, TRABAJOS ES ARRAY(1/20), POR ESO MAP
      //TRABAJO{} ES ELEMENT DE TRABAJOS[] = {year: 2018, empresa: "Freelance", salario: 250 }

      //este return, DEVUELVE MEDIANTE UN OBJETO{}, por eso (empresas: ----)
      //si eliminanos return, POR DEFAULT devuelve ARRAY[]. Tambien OMITIMOS (empresas:--)

      //DENTRO DE cada TRABAJO{0}

      if (!empresas[trabajo.empresa]) {
        //SI LA KEY (trabajo{0}.empresa{0}==Freelance) NO EXISTE EN EMPRESAS{}, se agrega como KEY
        //OTRA FORMA DE ACCEDER AL VALUE ES MEDIANTE OBJECT['key']
        empresas[trabajo.empresa] = {};
      }
      if (!empresas[trabajo.empresa][trabajo.year]) {
        //SI en propiedad 'FREELANCE' NO tiene la propiedad YEAR=2018,
        //CREAREMOS YEAR=2018 dentro de FREELANCE como array []
        empresas[trabajo.empresa][trabajo.year] = [];
      }
      empresas[trabajo.empresa][trabajo.year].push(trabajo.salario); //trabajo{0..1..2..3}
    })
);
console.log(empresas);
//---------------------------------------------------
function mediana_company_year(company, year) {
  if (!empresas[company]) {
    return console.warn("empresa no existe"); //RETURN, para ejecucion si cumple condicion
  }
  if (!empresas[company][year]) {
    return console.warn("empresa no dio salarios este año");
  }
  if (empresas[company][year]) {
    return Estadistica.calcular_mediana(empresas[company][year]);
  }
}

function proyection_company_year(company) {
  if (!empresas[company]) {
    console.warn("La empresa no existe");
  } else {
    const empresaAnual = Object.values(empresas[company]);
    console.log(empresaAnual);

    const mediana_year = empresaAnual.map((year) =>
      Estadistica.calcular_mediana(year)
    );
    console.log(mediana_year);

    const sueldosCrecimiento = [];
    for (let i = 1; i < mediana_year.length; i++) {
      //PARA HALLAR EL NUEVO SALARIO, se compara la diferencia del salario 2019-2018,2020-2019
      const yearActual = mediana_year[i];
      const yearPadado = mediana_year[i - 1];
      const diferencia = yearActual - yearPadado;
      const crecimiento = diferencia / yearPadado;
      sueldosCrecimiento.push(crecimiento);
    }
    const medianaPorcentajeCrecimiento =
      Estadistica.calcular_mediana(sueldosCrecimiento);
    const ultimo_year = mediana_year[mediana_year.length - 1];
    const aumento = ultimo_year * medianaPorcentajeCrecimiento;
    const nuevo_year = mediana_year[mediana_year.length - 1] + aumento;

    return nuevo_year;
  }
}

function medianaGeneral() {
  const personas = salarios.map((persona) => persona.name);
  console.log(personas);
  const mediana_salarios = personas.map((persona) => medianaPersona(persona));
  const salarios_ordenados=Estadistica.ordenar_lista(mediana_salarios)
  const cantidad=salarios_ordenados.length*(10/100)
  const top10=salarios_ordenados.slice((salarios_ordenados.length-cantidad),(salarios_ordenados.length))
  const medianaTop10=Estadistica.calcular_mediana(top10)
  return medianaTop10
}

// for (const trabajo of trabajos) {
//   for (const trabajito of trabajo) {
//     console.log(trabajito.empresa)
//   }
// }

// for (let i = 0; i < trabajos.length; i++) {
//   for (let j = 0; j < trabajos[i].length; j++) {
//     console.log(trabajos[i][j].empresa)
//   }
// }

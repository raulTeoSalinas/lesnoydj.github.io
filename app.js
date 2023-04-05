let modelo = document.querySelectorAll("input");
var numVaria;
var numRest;
var valuesVar;
var valuesRest;
var valuesResu;
var maxOrmin;

function crearModelo() {
    modelo = document.querySelectorAll("input");
    numVaria = parseInt(modelo[0].value);
    numRest = parseInt(modelo[1].value);
    maxOrmin = document.querySelector("select").value;
    let mainContent = document.querySelector(".main-content")
    console.log(maxOrmin);
    let html = '<div class="col-12 cuadro-blanco"><h2>Función Canónica</h2><div class="d-flex justify-content-center align-items-center flex-wrap"><p>Z =</p> <input type="number" class= "variables" required> <p>X<sub>1</sub></p>'

    for (let i = 0; i < numVaria - 1; i++) {
        html += `<p> +</p> <input type="number" class= "variables" required> <p>X<sub>${i + 2} </sub></p>`
    }
    html += '</div></div><div class="col-12 cuadro-blanco "><h2>Restricciones</h2><div class= "rest">'

    for (let j = 0; j < numRest; j++) {
        html += `<div class="d-flex justify-content-center align-items-center flex-wrap restriccion"><input type="number" class='restricciones'>
        <p>X<sub>1</sub></p>`
        for (let i = 0; i < numVaria - 1; i++) {
            html += `<p class="signos"> +</p> <input type="number" class='restricciones'>
        <p>X<sub>${i + 2}</sub></p>
        `
        }
        html += `<select name="signos" id="signos" class= "menMay">
        <option value="menorIgual">≤</option>
        <option value="mayorIgual">≥</option>
        <option value="igual">=</option>
        </select>
      <input type="number" class='resultados'>
    <i class="fa-solid fa-trash" title="Borrar restricción"
                        onclick="eliminarRestriccion(event)"></i>
                </div>

               `
    }
    html += `</div>`


    // html += `</div><div class="d-flex justify-content-center align-items-center">
    // <button class="mas-res" title="Añadir nueva restricción" onclick="agregarRestriccion()">+</button>
    // </div>`

    html += `<p class="text-center">X<sub>1</sub>`

    for (let i = 0; i < numVaria - 1; i++) {
        html += `, X<sub>${i + 2} </sub>`
    }
    html += `≥ 0</p></div >`

    html += `<div class="tabla">

    </div>
    <div class="resultadoFinal d-flex flex-row justify-content-center align-items-center"></div>
    <div class="d-flex flex-row justify-content-center botones align-items-center">
        <button class="calcular" title="Calcular por método simplex" onclick="calcular()">Calcular</button>
    </div>`

    mainContent.innerHTML = html;



}




function calcular() {


    //Obtiene todos los elementos inputs
    var inputsVar = document.getElementsByClassName("variables");
    valuesVar = Array.from(inputsVar).map(inputVar => inputVar.value);

    var inputsRest = document.getElementsByClassName("restricciones");
    valuesRest = Array.from(inputsRest).map(inputRest => inputRest.value);

    var inputsResu = document.getElementsByClassName("resultados");
    valuesResu = Array.from(inputsResu).map(inputResu => inputResu.value);

    var inputsMenMay = document.getElementsByClassName("menMay");
    var valuesMenMay = Array.from(inputsMenMay).map(inputMenMay => inputMenMay.value);



    let inputs = document.querySelectorAll("input");
    let valores = Array.from(inputs).map(input => input.value); //Obiene los valores de los elementos inputs



    const tieneVacios = valores.some(valor => valor === '' || valor === null); //Verifico que ningun valor tenga vacios


    if (tieneVacios) {
        var alertas = document.querySelector(".alertas");
        alertas.innerHTML += '<div class="alert alert-danger alert-dismissible fade show" role="alert">No dejes ninguna entrada vacía, si alguna restricción es igual a zero, colocar el zero (0).<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    } else {

        //Eliminamos todo en el contenedor
        let cuadroBlanco = document.querySelectorAll(".cuadro-blanco");
        let botones = document.querySelector(".botones");
        botones.innerHTML = "";
        // cuadroBlanco[0].remove();
        cuadroBlanco[1].remove();


        cuadroBlanco[0].innerHTML = "";
        // cuadroBlanco[1].innerHTML = "";

        let fC = document.createElement("h2");
        fC.innerText = "Forma Canónica";
        cuadroBlanco[0].appendChild(fC);

        let fE = document.createElement("h2");
        fE.innerText = "Forma Estándar";
        cuadroBlanco[1].appendChild(fE);

        let canonica = document.createElement("p");
        canonica.innerHTML = `Z = ${valuesVar[0]} X<sub>1</sub>`
        for (let i = 1; i < numVaria; i++) {
            canonica.innerHTML += `+ ${valuesVar[i]}X<sub>${i + 1}</sub>`
        }




        canonica.innerHTML += ` <br> <h3>Sujeto a:</h3>`


        let contadorRest = 0;
        let contadorRes = 0;
        for (let i = 0; i < numRest; i++) {
            canonica.innerHTML += `${valuesRest[contadorRest]}X<sub>1</sub>`
            contadorRest++;
            for (let j = 0; j < numVaria - 1; j++) {
                canonica.innerHTML += ` + ${valuesRest[contadorRest]} X<sub>${j + 2}</sub>`
                contadorRest++;
            }
            canonica.innerHTML += `= ${valuesResu[contadorRes]} <br>`
            contadorRes++;
        }


        canonica.innerHTML += `X<sub>1</sub>`
        for (let i = 0; i < numVaria - 1; i++) {
            canonica.innerHTML += `, X<sub>${i + 2} </sub>`
        }
        canonica.innerHTML += `≥ 0`



        canonica.classList.add("text-center");

        cuadroBlanco[0].appendChild(canonica);

        // let estandar = document.createElement("p");
        // estandar.innerHTML += `Z - ${valores[0]}X<sub>1</sub> - ${valores[1]}X<sub>2</sub> = 0 <br>`

        // let conteoVariables = 1;
        // for (let i = 2; i < valores.length; i++) {
        //     estandar.innerHTML += `${valores[i]}X<sub>1</sub> + `
        //     i++;
        //     estandar.innerHTML += `${valores[i]}X<sub>2</sub> + `
        //     i++;

        //     estandar.innerHTML += `H<sub>${conteoVariables}</sub> = `
        //     conteoVariables++;
        //     estandar.innerHTML += `${valores[i]}  `
        //     estandar.innerHTML += `<br>`
        // }
        // estandar.classList.add("text-center");

        // cuadroBlanco[1].appendChild(estandar);





        //Obtenemos los indices Mayor Igual asi como iguales
        let indicesIgual = [];
        let indicesMayIgual = [];
        for (let i = 0; i < valuesMenMay.length; i++) {
            if (valuesMenMay[i] === "mayorIgual") {
                indicesMayIgual.push(i);
            }
            if (valuesMenMay[i] === "igual") {
                indicesIgual.push(i);
                indicesMayIgual.push(valuesResu.length); 
                numRest = numRest + 1;
                let k = (i + 1) * numVaria-numVaria;
                for (let j = 0; j < numVaria; j++) {
                    valuesRest.push(valuesRest[k]);
                    k++;
                }
                console.log(valuesRest);
                valuesResu.push(valuesResu[i])
                

            }
        }





        //Multiplicamos por -1 si sólo hay un mayor igual y estamos maximizando
        if (indicesMayIgual.length > 0 && indicesMayIgual.length != valuesMenMay.length && maxOrmin == 'max') {
            for (let j = 0; j < indicesMayIgual.length + 1; j++) {
                for (let i = indicesMayIgual[j] * numVaria; i < (indicesMayIgual[j] * numVaria) + numVaria; i++) {
                    valuesRest[i] = -1 * valuesRest[i];
                }
                valuesResu[indicesMayIgual[j]] = -1 * valuesResu[indicesMayIgual[j]]
            }

        }




        let columnas = 2 + numRest + numVaria; //4 porque son 3 variables y una constante = 4.
        let filas = 1 + numRest; //dividimos la cantidad de valores sobre el numero de columnas para saber la cantidad de filas



        //Creamos la matriz bidimensional
        let matriz = new Array(filas);
        for (let i = 0; i < filas; i++) {
            matriz[i] = new Array(columnas);
        }


        matriz[0][0] = 1;

        for (let j = 0; j < numVaria; j++) {
            matriz[0][j + 1] = -(valuesVar[j]);
        }

        for (let j = numVaria + 1; j < columnas; j++) {
            matriz[0][j] = 0;
        }





        //Llenamos los valores de las variables en la matriz
        let k = 0;
        for (let i = 1; i < filas; i++) {
            for (let j = 0; j < numVaria + 1; j++) {
                if (j == 0) {
                    matriz[i][j] = 0;
                } else {
                    matriz[i][j] = valuesRest[k];
                    k++;
                }


            }

        }




        //Llenamos la matriz identidad
        for (let i = 1; i < filas; i++) {
            for (let j = numVaria + 1; j < columnas - 1; j++) {
                if (j - i == numVaria) {
                    matriz[i][j] = 1;
                } else {
                    matriz[i][j] = 0;
                }
            }
        }


        //llenamos los resultados

        for (let i = 1; i < valuesResu.length + 1; i++) {
            matriz[i][columnas - 1] = valuesResu[i - 1]
        }


        //CONVERSION DE MATRIZ A DUAL MATRIZ
        if (maxOrmin == "max" && indicesMayIgual.length == valuesMenMay.length || maxOrmin == 'min' && indicesMayIgual.length != valuesMenMay.length) {
            const matrizAuxiliar = new Array(matriz.length);
            for (let i = 0; i < matriz.length; i++) {
                matrizAuxiliar[i] = new Array(matriz[i].length);
            }

            // Copiar los elementos de la matriz original a la nueva matriz
            for (let i = 0; i < matriz.length; i++) {
                for (let j = 0; j < matriz[i].length; j++) {
                    matrizAuxiliar[i][j] = matriz[i][j];
                }
            }

            //Implantacion de los valores de matriz auxiliar a la matriz para resolver el algoritmo

            if (numRest == numVaria) {
                for (let i = 1; i < numRest + 1; i++) {
                    matriz[0][i] = (-1) * (matrizAuxiliar[i][numRest + numVaria + 1]);
                }
                for (let i = 1; i < numRest + 1; i++) {
                    matriz[i][numRest + numVaria + 1] = (-1) * (matrizAuxiliar[0][i]);
                }

                for (let i = 1; i < numRest + 1; i++) {
                    for (let j = 1; j < numRest + 1; j++) {
                        matriz[i][j] = matrizAuxiliar[j][i];

                    }
                }
            } else {
                //Tendremos que reasignar el tamaño de la matriz si numVaria !== numRest
                let restVariaAux = [parseInt(numRest), parseInt(numVaria)];
                numVaria = restVariaAux[0];
                numRest = restVariaAux[1];


                columnas = 2 + numRest + numVaria;
                filas = 1 + numRest;
                //Creamos la matriz bidimensional
                matriz = new Array(filas);
                for (let i = 0; i < filas; i++) {
                    matriz[i] = new Array(columnas);
                }
                matriz[0][0] = 1;
                console.log(matriz);
                for (let i = 1; i < restVariaAux[0] + 1; i++) {
                    matriz[0][i] = (-1) * (matrizAuxiliar[i][restVariaAux[0] + restVariaAux[1] + 1]);
                }
                for (let i = 1; i < restVariaAux[1] + 1; i++) {
                    matriz[i][numRest + numVaria + 1] = (-1) * (matrizAuxiliar[0][i]);
                }

                for (let i = 1; i < restVariaAux[1] + 1; i++) {
                    for (let j = 1; j < restVariaAux[0] + 1; j++) {
                        matriz[i][j] = matrizAuxiliar[j][i];

                    }
                }
                //Identidad
                for (let i = 1; i < filas; i++) {
                    for (let j = numVaria + 1; j < columnas - 1; j++) {
                        if (j - i == numVaria) {
                            matriz[i][j] = 1;
                        } else {
                            matriz[i][j] = 0;
                        }
                    }
                }

                for (let j = numVaria + 1; j < columnas; j++) {
                    matriz[0][j] = 0;
                }
                for (let i = 1; i < filas; i++) {
                    matriz[i][0] = 0;
                }



            }

            console.log(matriz);
            console.log(matrizAuxiliar);
        }



        //Creamos la primer tabla
        let contenedorTabla = document.querySelector(".tabla");
        var table = document.createElement('table');
        let flexTabla = document.createElement('div');
        let titulo = document.createElement('tr');
        let z = document.createElement('th');
        z.textContent = 'Z'
        titulo.appendChild(z);
        for (let i = 0; i < numVaria; i++) {
            let tituloX = document.createElement('th');
            tituloX.innerHTML = `X<sub>${i + 1}</sub>`;
            titulo.appendChild(tituloX);
        }
        for (let i = 0; i < numRest; i++) {
            let tituloH = document.createElement('th');
            tituloH.innerHTML = `H<sub>${i + 1}</sub>`;
            titulo.appendChild(tituloH);
        }
        let constante = document.createElement('th');
        constante.textContent = 'Constante'
        titulo.appendChild(constante);
        table.appendChild(titulo);

        flexTabla.classList.add("d-flex", "justify-content-center", "align-items-center")
        for (var i = 0; i < filas; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < columnas; j++) {
                var cell = document.createElement('td');
                cell.textContent = matriz[i][j];
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        flexTabla.appendChild(table);
        contenedorTabla.appendChild(flexTabla);
        flexTabla.style.display = 'none';
        flexTabla.style.display = 'flex';





        /* ****AQUI COMENZARA EL BUCLE WHILE PARA REPETIR EL PROCESO */
        let contadorCollapse = 1;
        let sonPositivos = true;
        while (sonPositivos) {
            //Obtenemos el valor mós negativo para obtener la columna pivote
            contadorCollapse = contadorCollapse + 1;
            if (contadorCollapse > 20) {
                break;
            }
            var indiceColumna = 0;
            // var valorMasNeg = matriz[0][0];
            // for (let j = 1; j < columnas-1; j++) {
            //     if (matriz[0][j] < valorMasNeg) {
            //         valorMasNeg = [0][j]
            //         indiceColumna = j;
            //     }
            // }
            for (let j = 1; j < columnas - 1; j++) {

                if (indiceColumna == -1 || matriz[0][j] < matriz[0][indiceColumna]) {
                    indiceColumna = j;
                }

            }







            //Dividimos la constante de restricion entre la variable de la columna pivote, el menor resultado sera la fila pivote
            var menorResultado = Number.MAX_VALUE;
            var indiceFila = -1;
            for (let i = 1; i < filas; i++) {
                if (matriz[i][indiceColumna] != 0) {
                    var resultado = matriz[i][columnas - 1] / matriz[i][indiceColumna];
                    if (resultado < menorResultado && resultado > 0) {
                        menorResultado = resultado;
                        indiceFila = i;
                    }
                }
            }

            console.log(indiceColumna);
            console.log(indiceFila);
            //Obtenemos elemento pivote
            // if (indiceFila == -1) {
            //     let tablas = document.querySelectorAll('table');

            //     // Si se encontró al menos una tabla
            //     if (tablas.length > 0) {
            //         // Selecciona la última tabla en la página
            //         let ultimaTabla = tablas[tablas.length - 1];
            //         // Elimina la tabla
            //         ultimaTabla.remove();
            //         break;
            //     }
            // } else {
            var elementoPivote = matriz[indiceFila][indiceColumna];

            //Creamos la segunda matriz

            var matriz2 = new Array(matriz.length);
            for (let i = 0; i < matriz.length; i++) {
                matriz2[i] = new Array(matriz[i].length);
                for (let j = 0; j < matriz[i].length; j++) {
                    matriz2[i][j] = matriz[i][j];
                }
            }

            for (let j = 0; j < columnas; j++) {
                matriz2[indiceFila][j] = matriz2[indiceFila][j] / elementoPivote;
            }


            for (let i = 0; i < filas; i++) {
                for (let j = 0; j < columnas; j++) {
                    if (i !== indiceFila) {
                        matriz2[i][j] = matriz[i][j] - (matriz[i][indiceColumna] * matriz2[indiceFila][j]);
                    }
                }
            }


            //Evalua si matriz es igual a matriz2
            let iguales = true;
            for (let i = 0; i < matriz.length; i++) {
                for (let j = 0; j < matriz[i].length; j++) {
                    if (matriz[i][j] !== matriz2[i][j]) {
                        iguales = false;
                        break;
                    }
                }
                if (!iguales) {
                    break;
                }
            }

            if (iguales) {
                break;
            }





            var sonPositivos2 = true;
            for (let j = 0; j < columnas; j++) {
                if (matriz2[0][j] < 0) {
                    sonPositivos2 = false; // Si encuentra un número negativo, retorna falso

                }
            }



            /*AQUI COMIENZA EL TERROR MUAHAHAHA */
            let isMatrixValid = true; // Assume the matrix is valid until proven otherwise

            // Iterate through each row of the matrix
            for (let i = 0; i < matriz2.length; i++) {
                let countOnes = 0;
                let countZeros = 0;

                // Iterate through each column of the row
                for (let j = 0; j < numVaria + 1; j++) {
                    if (matriz2[i][j] === 1) {
                        countOnes++;
                    } else if (matriz2[i][j] === 0) {
                        countZeros++;
                    } else {
                        // If a value other than 0 or 1 is found, set the flag to false and break out of the loop
                        isMatrixValid = false;
                        break;
                    }
                }

                // If the count of ones is not 1 or the count of zeros is not numVaria-1, set the flag to false
                if (countOnes !== 1 || countZeros !== numVaria) {
                    isMatrixValid = false;
                }

                // Break out of the loop if the flag is false
                if (!isMatrixValid) {
                    break;
                }
            }

            if (!isMatrixValid) {
                sonPositivos2 = false;
                console.log(matriz2);
            }









            var table = document.createElement('table');
            let flexTabla = document.createElement('div');
            flexTabla.classList.add("d-flex", "justify-content-center", "align-items-center")
            let titulo = document.createElement('tr');
            let z = document.createElement('th');
            z.textContent = 'Z'
            titulo.appendChild(z);
            for (let i = 0; i < numVaria; i++) {
                let tituloX = document.createElement('th');
                tituloX.innerHTML = `X<sub>${i + 1}</sub>`;
                titulo.appendChild(tituloX);
            }
            for (let i = 0; i < numRest; i++) {
                let tituloH = document.createElement('th');
                tituloH.innerHTML = `H<sub>${i + 1}</sub>`;
                titulo.appendChild(tituloH);
            }
            let constante = document.createElement('th');
            constante.textContent = 'Constante'
            titulo.appendChild(constante);
            table.appendChild(titulo);
            for (var i = 0; i < filas; i++) {
                var row = document.createElement('tr');
                for (var j = 0; j < columnas; j++) {
                    var cell = document.createElement('td');
                    cell.textContent = matriz2[i][j];
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
            flexTabla.appendChild(table);
            contenedorTabla.appendChild(flexTabla);
            flexTabla.style.display = 'none';
            flexTabla.style.display = 'flex';


            if (sonPositivos2 == true) {
                sonPositivos = false;
            } else {
                for (let i = 0; i < filas; i++) {
                    for (let j = 0; j < columnas; j++) {
                        matriz[i][j] = matriz2[i][j];
                    }
                }

            }


            // }

        }

        let resultadoFinalC = document.querySelector(".resultadoFinal");

        let resultadoFinalP = document.createElement("p");
        resultadoFinalP.innerHTML = `Z = ${matriz2[0][matriz2[0].length - 1]}`
        if (maxOrmin == 'min' && indicesMayIgual.length != valuesMenMay.length) {
            for (let i = 1; i < numRest + 1; i++) {
                resultadoFinalP.innerHTML += `<br> H<sub>${i}</sub> = ${matriz2[0][numVaria + i]}`
            }
        } else {
            let todoSonUno = true;
            
            for (let i = 1; i < numRest + 1 -indicesIgual.length; i++) {
                resultadoFinalP.innerHTML += `<br> X<sub>${i}</sub> = ${matriz2[i][numRest + numVaria + 1]} `
                if (matriz2[i][numRest + numVaria + 1] != 1) {
                    todoSonUno = false;
                }

            }
            if (todoSonUno) {
                resultadoFinalP.innerHTML += `<br> No hay una solución óptima`
            }


        }
        resultadoFinalC.classList.add("cuadro-blanco");
        resultadoFinalC.appendChild(resultadoFinalP);

        let botonReiniciar = document.createElement("button");
        let botonEditar = document.createElement("button");

        botonReiniciar.classList.add("reiniciarbtn");

        // Asignarle el texto del botón
        botonReiniciar.textContent = "Reiniciar";

        // Asignarle el evento onclick
        botonReiniciar.onclick = reiniciar;

        // Obtener el contenedor de botones

        // Agregar el botón como un hijo del contenedor
        botones.appendChild(botonReiniciar);



        botonEditar.classList.add("editarbtn");

        // Asignarle el texto del botón
        botonEditar.textContent = "Editar";

        // Asignarle el evento onclick
        botonEditar.onclick = editar;

        // Obtener el contenedor de botones

        // Agregar el botón como un hijo del contenedor
        botones.appendChild(botonEditar);



    }
}





//Agrega elementos html para las restricciones
// function agregarRestriccion() {
//     var rest = document.querySelector(".rest")

//     let contenedor = document.createElement("div")
//     contenedor.classList.add("d-flex", "justify-content-center", "align-items-center", "restriccion")

//     let fInput = document.createElement("input");
//     fInput.type = "number";
//     contenedor.appendChild(fInput);

//     let x1 = document.createElement("p");
//     x1.innerText = "x";


//     let uno = document.createElement("sub");
//     uno.innerText = "1";
//     x1.appendChild(uno);

//     contenedor.appendChild(x1);

//     let mas = document.createElement("p");
//     mas.innerText = "+";
//     mas.classList.add("signos")
//     contenedor.appendChild(mas);


//     let sInput = document.createElement("input");
//     sInput.type = "number";
//     contenedor.appendChild(sInput);

//     let x2 = document.createElement("p");
//     x2.innerText = "x";
//     let dos = document.createElement("sub");
//     dos.innerText = "2";
//     x2.appendChild(dos);
//     contenedor.appendChild(x2);

//     let menorIgual = document.createElement("p");
//     menorIgual.innerText = "  ≤";
//     menorIgual.classList.add("signos")
//     contenedor.appendChild(menorIgual);

//     let tInput = document.createElement("input");
//     tInput.type = "number";
//     contenedor.appendChild(tInput);

//     let borrar = document.createElement("i");
//     borrar.classList.add("fa-solid", "fa-trash");
//     borrar.title = "Borrar restricción";
//     borrar.onclick = eliminarRestriccion;
//     contenedor.appendChild(borrar);

//     rest.appendChild(contenedor);


// }

//Elimina elementos html de las restricciones
function eliminarRestriccion(event) {
    let inputs = document.querySelectorAll("input");
    let target = event.target;
    let padre = target.parentNode;
    numRest = numRest - 1;

    padre.remove()


}

function reiniciar() {
    location.reload();
}

function editar() {

    let mainContent = document.querySelector(".main-content")

    let html = '<div class="col-12 cuadro-blanco"><h2>Función Canónica</h2><div class="d-flex justify-content-center flex-wrap align-items-center"><p>Z =</p> <input type="number" class= "variables" required> <p>X<sub>1</sub></p>'

    for (let i = 0; i < numVaria - 1; i++) {
        html += `<p>+</p> <input type="number" class= "variables" required> <p>X<sub>${i + 2} </sub></p>`
    }
    html += '</div></div><div class="col-12 cuadro-blanco "><h2>Restricciones</h2><div class= "rest">'

    for (let j = 0; j < numRest; j++) {
        html += `<div class="d-flex justify-content-center align-items-center flex-wrap restriccion"><input type="number" class='restricciones'>
        <p>X<sub>1</sub></p>`
        for (let i = 0; i < numVaria - 1; i++) {
            html += `<p class="signos"> +</p> <input type="number" class='restricciones'>
        <p>X<sub>${i + 2}</sub></p>
        `
        }
        html += `<select name="signos" id="signos" class= "menMay">
        <option value="menorIgual">≤</option>
        <option value="mayorIgual">≥</option>
        </select>
      <input type="number" class='resultados'>
    <i class="fa-solid fa-trash" title="Borrar restricción"
                        onclick="eliminarRestriccion(event)"></i>
                </div>

               `
    }
    html += `</div>`


    // html += `</div><div class="d-flex justify-content-center align-items-center">
    // <button class="mas-res" title="Añadir nueva restricción" onclick="agregarRestriccion()">+</button>
    // </div>`

    html += `<p class="text-center">X<sub>1</sub>`

    for (let i = 0; i < numVaria - 1; i++) {
        html += `, X<sub>${i + 2} </sub>`
    }
    html += `≥ 0</p></div >`

    html += `<div class="tabla">

    </div>
    <div class="d-flex flex-row justify-content-center botones align-items-center">
        <button class="calcular" title="Calcular por método simplex" onclick="calcular()">Calcular</button>
    </div>`

    mainContent.innerHTML = html;

    var inputsVar = document.getElementsByClassName("variables");
    for (let i = 0; i < inputsVar.length; i++) {
        inputsVar[i].value = valuesVar[i];
    }


    var inputsRest = document.getElementsByClassName("restricciones");
    for (let i = 0; i < inputsRest.length; i++) {
        inputsRest[i].value = valuesRest[i];
    }

    var inputsResu = document.getElementsByClassName("resultados");
    for (let i = 0; i < inputsResu.length; i++) {
        inputsResu[i].value = valuesResu[i];
    }

}
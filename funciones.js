let arrgloTareas =new Array();
let elementosGuardados=0;

let done= new Audio('mp3/pop.mp3');
let undone = new Audio('mp3/camera.mp3');

function init() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('sw.js').then(function(registration) {
			// Si es exitoso
			console.log('SW registrado correctamente');
		}, function(err) {
			// Si falla
			console.log('SW fallo', err);
		});
	} else {
		console.log("ERROR");
	}
}

let fecha = new Date();
let mesNumero = fecha.getMonth();
let mes ="";

//Si ya exiten tareas guardadas en el LS, las vamos a obtiene en la interfaz

if(localStorage.getItem('tareas')){
    tareas = JSON.parse(localStorage.getItem('tareas'));
    for(i=0; i<tareas.length; i++){
        arrgloTareas.push(tareas[i]);
    }
    //Funcion que nos cargue las tareas en la interfaz
    loadTareas();
}else{
    //Si no haytareas crear el espaci de meoria en LS
    //Crear el objeto vacio
    jsonTarea={};
    localStorage.setItem('tareas', JSON.stringify(
        jsonTarea));
}

function iniciar(){
    let fecha=new Date();
    let mesNumero =fecha.getMonth();
    let mes ="";
    
    switch(mesNumero){
    case 0:
        mes="Enero";
    break;
    case 1:
        mes="Febrero";
        break;
    case 2:
        mes="Marzo";
        break;
    case 3:
        mes="Abril";
        break;
    case 4:
        mes="Mayo";
        break;
    case 5:
        mes="Junio";
        break;
    case 6:
        mes="Julio";
        break;
    case 7:
        mes="Agosto";
        break;
    case 8:
        mes="Septiembre";
        break;
    case 9:
        mes="Octubre";
        break;
    case 10:
        mes="Noviembre";
        break;
    case 11:
        mes="Diciembre";
        break;

    }
    document.getElementById('fecha').innerHTML=fecha.getDate()+" de "+mes;


}

function loadTareas() {

    //Antes de cargar las tareas limpiamos la interfaz
    document.querySelector('.CONT_PORHACER').innerHTML="";
    document.querySelector('.CONT_Terminado').innerHTML="";

    for(i=0 ; i<tareas.length ; i++) {
        //Crear los elemetos en el HTML
        elemento="<label><input type='checkbox' class='tarea' id='"+i+"' onclick='cambiarEstado(this.id)' value='checkbox' />"+tareas[i].valor+"</label>";

        if (tareas[i].estatus == "pendiente") {
            document.querySelector('.CONT_PORHACER').innerHTML += elemento;
        }else if (tareas[i].estatus == "terminado") {
            document.querySelector('.CONT_Terminado').innerHTML += elemento;
        }
    }
    elementosGuardados=tareas.length;
}

function agregar(){
    //Capturar el elemento de la entrada de texto
    tareaTexto = document.getElementById('nuevaTarea');

    //Nuevo objeto JS
    jsonTarea={
        'valor': tareaTexto.value,
        'estatus': 'pendiente'
    };
    //Crear nuevo elemento de la Interfaz de Usuario
    elemento="<label><input type='checkbox' class='tarea' id="+elementosGuardados+"onclick='cambiarEstado(this.id)' value='checkbox' />"+jsonTarea.valor+"</label>";
    //Lo agrego de la interfaz
    document.querySelector('.CONT_PORHACER').innerHTML +=elemento;

    //Agregar  al arrglo de JSON la nueva tarea

    arrgloTareas.push(jsonTarea);

    //Agregar al LS el arreglo de JSON en formato de Texto

    localStorage.setItem('tareas', JSON.stringify(arrgloTareas));

    //Limpiar cuadro de texto(input)

    tareaTexto.value="";

    //Incrementados los elementos guardados

    elementosGuardados++;
}

function cambiarEstado(id) {

    tareas=JSON.parse(localStorage.getItem('tareas'));
    if(tareas[id].estatus == 'terminado'){
        tareas[id].estatus='pendiente';
        //Ejecutar sonido
        undone.play()
    }else{
        //Ejecutar sonido
        done.play()
        tareas[id].estatus='terminado';

        }

    //Guarlo nuevamente en LS
        localStorage.setItem('tareas',JSON.stringify(tareas));

    //Recargar
        loadTareas();

}

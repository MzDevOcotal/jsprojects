const tasks = []; //Almacenará las tareas
let time = 0; //Controlará la cuenta regresiva
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');

//Creando evento al presionar el botón submit
form.addEventListener('submit', e => {
    e.preventDefault();
    if(itTask.value != ''){
        createTask(itTask.value);
        itTask.value = '';
        renderTask();
    }
});

//Fución para Crear una nueva tarea.
function createTask(value){
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3), //Genera un id dinámico.
        title: value,
        completed: false 
    }

    tasks.unshift(newTask);
}

//Creando Función para renderizar la vista de tareas.
function renderTask(){
    const html = tasks.map(task =>{
        return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class='done'>Listo</span>`: `<button class="star-button" data-id="${task.id}">Iniciar</button>`}</div>
                <div class="title">${task.title}</div>
            </div>
        `
    });

    const taskContainer = document.querySelector("#tasks");
    taskContainer.innerHTML = html.join('')//map regresa un arreglo de sring, se usa join para transformar ese arreglo en un solo string unidos con un espacio vacío
}
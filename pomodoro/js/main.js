const tasks = []; //Almacenará las tareas
let time = 0; //Controlará la cuenta regresiva
let timer = null;
let timerBreak = null;
let current = null;


const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskname'); // Seleccionando el nombre de la tarea

renderTime();
renderTask();


//Creando evento al presionar el botón submit
form.addEventListener('submit', e => {
    e.preventDefault();
    if(itTask.value != ''){
        createTask(itTask.value);
        itTask.value = '';
        renderTask();
    }
/*     console.log(tasks); */

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
                <div class="completed">${task.completed ? `<span class='done'>Listo</span>`:`<button class="start-button" data-id="${task.id}">Iniciar</button>`}</div>
                <div class="title">${task.title}</div>
            </div>
        `
    });

    const taskContainer = document.querySelector("#tasks");
    taskContainer.innerHTML = html.join('')//map regresa un arreglo de sring, se usa join para transformar ese arreglo en un solo string unidos con un espacio vacío

    const startButtons = document.querySelectorAll('.task .start-button'); //Seleccionando todos los botones con la clase ".start-button"





    startButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if(!timer){
                const id = button.getAttribute('data-id');
                startButtonHandler(id);
                button.textContent = 'En Progreso...'
            }
        })
    })

}

function startButtonHandler(id){
    time = 5; //Conversión a segundos
    current = id; //Almacenando el id actual
    const taskIndex = tasks.findIndex((task) => task.id === id); //Encontraando la trea actual a través del index
    taskName.textContent = tasks[taskIndex].title;//Sustituyendo el nombre por la tarea actual

    /* DANDOLE FORMATO AL TIEMPO */
    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);
}

function timeHandler(id){
    time--;
    renderTime();

    //Detener el tiempo cuando llegue a cero.
    if(time === 0){
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTask();
        startBreak();
    }
}

function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutos = parseInt(time/60);
    const segundos = parseInt(time%60);

    timeDiv.textContent = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`
}

function markCompleted(id){
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completed = true;
}

function startBreak(){
    time = 3;
    taskName.textContent = 'Break';
    timerBreak = setInterval(() => {
        timerBreakHandler();
    }, 1000);
}

function timerBreakHandler(){
    time--;
    renderTime();

    //Detener el tiempo cuando llegue a cero.
    if(time === 0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = '';
        renderTask();
    }
}

window.onload = function() {
    loadTasks();
}

document.querySelector('#push').onclick = function () {
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Please add a new task")
    }
    else{
        addTask(document.querySelector('#newtask input').value);
        document.querySelector('#newtask input').value = "";
        saveTasks();
    }
}

function addTask(taskText, isCompleted = false) {
    const taskHTML = `
        <div class="task ${isCompleted ? 'completed' : ''}">
            <span class="taskname">
                ${taskText}
            </span>
            <button class="delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    document.querySelector('#tasks').innerHTML += taskHTML;
    attachEventListeners();
}

function attachEventListeners() {
    var current_tasks = document.querySelectorAll(".delete");
    for(var i=0; i<current_tasks.length; i++){
        current_tasks[i].onclick = function(){
            this.parentNode.remove();
            saveTasks();
        }
    }

    var tasks = document.querySelectorAll(".task");
    for(var i=0; i<tasks.length; i++){
        tasks[i].onclick = function(e){
            if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I') {
                this.classList.toggle('completed');
                saveTasks();
            }
        }
    }
}

function saveTasks() {
    const tasks = [];
    const taskElements = document.querySelectorAll('.task');
    
    taskElements.forEach(function(task) {
        const taskText = task.querySelector('.taskname').textContent.trim();
        const isCompleted = task.classList.contains('completed');
        tasks.push({
            text: taskText,
            completed: isCompleted
        });
    });
    
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    
    if(savedTasks) {
        const tasks = JSON.parse(savedTasks);
        document.querySelector('#tasks').innerHTML = '';
        
        tasks.forEach(function(task) {
            addTask(task.text, task.completed);
        });
    }
}

function clearAllTasks() {
    localStorage.removeItem('todoTasks');
    document.querySelector('#tasks').innerHTML = '';
}

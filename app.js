document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const completedList = document.getElementById('completed-list');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(text) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete-button';
        completeButton.textContent = 'Complete';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';

        const timerInput = document.createElement('input');
        timerInput.type = 'number';
        timerInput.className = 'timer-input';
        timerInput.placeholder = 'Set Timer (minutes)';

        const timerDisplay = document.createElement('div');
        timerDisplay.className = 'timer';
        timerDisplay.textContent = '00:00'; // Initial timer display

        let countdown;
        let timerStarted = false; // Flag to track if timer has been started

        completeButton.addEventListener('click', () => {
            taskItem.classList.toggle('completed');

            if (taskItem.classList.contains('completed')) {
                taskList.removeChild(taskItem);
                completedList.appendChild(taskItem);
                clearInterval(countdown);
            }
        });

        deleteButton.addEventListener('click', () => {
            if (taskItem.classList.contains('completed')) {
                completedList.removeChild(taskItem);
            } else {
                taskList.removeChild(taskItem);
            }
            clearInterval(countdown);
        });

        timerInput.addEventListener('change', () => {
            if (!timerStarted) {
                const timerMinutes = parseInt(timerInput.value, 10);
                if (!isNaN(timerMinutes) && timerMinutes > 0) {
                    timerInput.disabled = true; // Disable the input field
                    let secondsRemaining = timerMinutes * 60;
                    timerStarted = true; // Set the flag to true

                    countdown = setInterval(() => {
                        const minutes = Math.floor(secondsRemaining / 60);
                        const seconds = secondsRemaining % 60;
                        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                        if (secondsRemaining <= 0) {
                            clearInterval(countdown);
                            alert(`Task "${text}" is completed!`);
                            taskItem.classList.add('completed');
                            taskList.removeChild(taskItem);
                            completedList.appendChild(taskItem);
                        } else {
                            secondsRemaining--;
                        }
                    }, 1000);
                }
            }
        });

        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(deleteButton);

        taskItem.appendChild(taskText);
        taskItem.appendChild(taskButtons);
        taskItem.appendChild(timerInput);
        taskItem.appendChild(timerDisplay);

        taskList.appendChild(taskItem);
    }
});

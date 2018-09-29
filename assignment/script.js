async function registerServiceWorker() {
    if('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('./service-worker.js');
        console.log('Service worker registered');
    }
}
registerServiceWorker();

window.onload = function () {

    var tasklist = document.querySelector('#taskList');
    
    var url = 'http://127.0.0.1:8888/data.json';
    fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(tasksJson) {
        render(tasksJson);
    })
    .catch(function(err) {
        console.log(err);
    });
}
function render(jsondata){
    tasklist.innerHTML = '';
    jsondata.forEach(function(taskItem) {
            var listItem = document.createElement('li');
            var div = document.createElement('div');
            var div1 = document.createElement('div');
            var div2 = document.createElement('div');
            var clearfix = document.createElement('div');
            var br=document.createElement('br');

            listItem.classList.add('list-group-item');
            div.className = 'col-md-12';
            div1.className = 'col-md-8';
            div1.style.float = "left";
            div2.className = 'col-md-4 pull-right';
            clearfix.classList.add('clearfix');

            div.innerText = taskItem.title;
            div1.innerText =taskItem.time;
            div2.innerText =taskItem.status;
            listItem.appendChild(div);
            listItem.appendChild(div1);
            listItem.appendChild(div2);
            listItem.appendChild(clearfix);

            tasklist.appendChild(listItem);
            tasklist.appendChild(br);
        });
    
}
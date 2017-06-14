
var todo_element = 'location.WEB_STORAGE_TODO_TASK.todo';    //Web browser 'TODO' local Database storage for duration equale to life of web browser.
function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem(todo_element);
    if (todos_str !== null)
    {
        todos = JSON.parse(todos_str);
    }
   return todos;
}

function add() {
    var task = document.getElementById('task');
    var todo_null = '{"TodoId":"1","Todo":"' + task.value + '","IsChecked":"0","IsDeleted":"0"}';
    var todos = get_todos();
    if (task.value !== "")
    {
        if (todos.length === 0)
        {
            todos.push(JSON.parse(todo_null));
            localStorage.setItem(todo_element, JSON.stringify(todos));
        }
        else
        {
            var todoId = parseInt(todos[todos.length - 1].TodoId) + 1;
            var todo_not_null = '{"TodoId":"' + todoId + '","Todo":"' + task.value + '","IsChecked":"0","IsDeleted":"0"}';
            todos.push(JSON.parse(todo_not_null));
            localStorage.setItem(todo_element, JSON.stringify(todos));
        }
    }
    else
        alert("Please Enter the Task!");
    show();
    task.value = "";
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem(todo_element, JSON.stringify(todos));
    show();
    return false;
}
 
function show() {
    var todos = get_todos();
    var html = '<ul>';
    for (var i = 0; i < todos.length; i++) {
        
        if (todos[i].IsChecked === "0")
            html += '<li id="'+ todos[i].TodoId +'">' + todos[i].Todo + '<button class="remove" id="' + i + '">x</button></li>';
        else
            html += '<li id="' + todos[i].TodoId + '" class="checked"> ' + todos[i].Todo + '<button class="remove" id="' + i + '">x</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);

    };
}
 
// checked and line through on string
var task=document.querySelector('todos');
todos.addEventListener('click', function (ev) {
    var todos = get_todos();
    if (ev.target.tagName === 'LI')
    {
        for(i=0; i<todos.length; i++)
        {
            if (todos[i].TodoId === ev.target.id)
            {
                if (todos[i].IsChecked === "0")
                    todos[i].IsChecked = "1";
                else
                    todos[i].IsChecked = "0";
            }
        }
        localStorage.setItem(todo_element, JSON.stringify(todos));
    }
    show();
});

document.getElementById('add').addEventListener('click', add);
show();

var ToDoItem = /** @class */ (function () {
    function ToDoItem(date, description) {
        this.id = 0;
        this.date = date;
        this.description = description;
    }
    ToDoItem.prototype.setId = function (id) {
        this.id = id;
    };
    ToDoItem.prototype.getId = function () {
        return this.id;
    };
    ToDoItem.prototype.getDate = function () {
        return this.date;
    };
    ToDoItem.prototype.getDescription = function () {
        return this.description;
    };
    ToDoItem.prototype.update = function (date, description) {
        this.date = date;
        this.description = description;
    };
    return ToDoItem;
}());
var ToDoItemsManager = /** @class */ (function () {
    function ToDoItemsManager() {
        this.toDoItems = [];
        this.toDoItemsId = 0;
    }
    ToDoItemsManager.prototype.addNew = function (toDoItem) {
        this.toDoItemsId++;
        toDoItem.setId(this.toDoItemsId);
        this.toDoItems.push(toDoItem);
    };
    ToDoItemsManager.prototype.getAll = function () {
        return this.toDoItems;
    };
    ToDoItemsManager.prototype.deleteById = function (id) {
        var index = this.toDoItems.findIndex(function (toDoItem) {
            return toDoItem.getId() == id;
        });
        this.toDoItems.splice(index, 1);
    };
    ToDoItemsManager.prototype.updateById = function (id, date, description) {
        var index = this.toDoItems.findIndex(function (todoItem) {
            return todoItem.getId() === id;
        });
        this.toDoItems[index].update(date, description);
    };
    return ToDoItemsManager;
}());
function clearInputFields() {
    var inputDateField = document.getElementById("input-date-field");
    var inputTaskField = document.getElementById("inpit-task-field");
    inputDateField.valueAsDate = new Date();
    inputTaskField.innerText = "";
}
function showToDoItems() {
    var tableHtml = "";
    tableHtml += "<table class \"table mb-4\">";
    tableHtml += "\n      <thead>\n      <tr>\n      <th scope=\"col\">\u2116</th>\n      <th scope=\"col\">\u0414\u0430\u0442\u0430</th>\n      <th scope=\"col\">\u0417\u0430\u0434\u0430\u0447\u0430</th>\n      <th scope=\"col\">\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435</th>\n      </tr>\n      </thead>";
    tableHtml += "<tbody>";
    toDoItemsManager.getAll().forEach(function (toDoItem, index) {
        tableHtml += "\n          <tr>\n          <th scope=\"row\">".concat(index + 1, "</th>\n          <td>").concat(toDoItem.getDate(), "</td>\n          <td>").concat(toDoItem.getDescription(), "</td>\n          <td><button type=\"submit\" class=\"btn btn-danger\"\n          onclick=\"buttonDeleteToDoItemById_Click(").concat(toDoItem.getId(), ")\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button></td>\n          <td><button type=\"submit\" class=\"btn btn-warning\"\n          onclick=\"buttonGetToDoItem_Click(").concat(toDoItem.getId(), ")\">\u0412\u044B\u0431\u0440\u0430\u0442\u044C</button></td>\n          </tr>\n          ");
    });
    tableHtml += "</tbody>";
    tableHtml += "</table>";
    var tableDiv;
    tableDiv.innerHTML = tableHtml;
}
function buttonAddToDoItem_Click() {
    var inputDateField = document.getElementById("input-date-field");
    var inputTaskField = document.getElementById("inpit-task-field");
    if (inputTaskField.innerText === "") {
        alert("Не все поля заполнены");
        return;
    }
    toDoItemsManager.addNew(new ToDoItem(new Date(inputDateField.innerText), inputTaskField.innerText));
    clearInputFields();
    showToDoItems();
}
function buttonDeleteToDoItemById_Click(id) {
    toDoItemsManager.deleteById(id);
    showToDoItems();
}
function buttonGetToDoItem_Click(id) {
    var labelId = document.getElementById("label_id");
    selectedItemId = id;
    labelId.innerText = "id =".concat(id);
}
function buttonUpdateToDoItem_Click(id) {
    var inputDateField = document.getElementById("input-date-field");
    var inputTaskField = document.getElementById("inpit-task-field");
    if (inputTaskField.innerText === "") {
        alert("Не все поля заполнены");
        return;
    }
    toDoItemsManager.updateById(selectedItemId, new Date(inputDateField.value), inputTaskField.value);
    clearInputFields();
    showToDoItems();
}
var toDoItemsManager = new ToDoItemsManager();
var selectedItemId;
clearInputFields();

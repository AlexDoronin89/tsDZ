class ToDoItem {
  id;
  #date;
  #description;

  constructor(date, description) {
    this.id = 0;
    this.#date = date;
    this.#description = description;
  }

  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
  getDate() {
    return this.#date;
  }
  getDescription() {
    return this.#description;
  }

  update(date, description) {
    this.#date = date;
    this.#description = description;
  }
}

class ToDoItemsManager {
  #toDoItems;
  #toDoItemsId;

  constructor() {
    this.#toDoItems = [];
    this.#toDoItemsId = 0;
  }

  addNew(toDoItem) {
    this.#toDoItemsId++;
    toDoItem.setId(this.#toDoItemsId);

    this.#toDoItems.push(toDoItem);
  }

  getAll() {
    return this.#toDoItems;
  }

updateById(id,date,description){
  let index = this.#toDoItems.findIndex((toDoItem) => {
    return toDoItem.getId() == id;
  });


}

  deleteById(id) {
    let index = this.#toDoItems.findIndex((toDoItem) => {
      return toDoItem.getId() == id;
    });
    this.#toDoItems.splice(index, 1);
  }
}

function clearInputFields() {
  let inputDateField = document.getElementById("input-date-field");
  let inputTaskField = document.getElementById("input-task-field");

  inputDateField.valueAsDate = new Date();
  inputTaskField.value = "";
}

function showToDoItems() {
  let tableHtml = "";
  tableHtml += `<table class "table mb-4">`;
  tableHtml += `
    <thead>
    <tr>
    <th scope="col">№</th>
    <th scope="col">Дата</th>
    <th scope="col">Задача</th>
    <th scope="col">Действие</th>
    </tr>
    </thead>`;

  tableHtml += `<tbody>`;

  toDoItemsManager.getAll().forEach((toDoItem, index) => {
    tableHtml += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${toDoItem.getDate()}</td>
        <td>${toDoItem.getDescription()}</td>
        <td><button type="submit" class="btn btn-danger"
        onclick="buttonDeleteToDoItemById_Click(${toDoItem.getId()})">Удалить</button></td>
        <td><button type="submit" class="btn btn-warning"
        onclick="buttonGetToDoItem_Click(${toDoItem.getId()})">Выбрать</button></td>
        </tr>
        `;
  });

  tableHtml += `</tbody>`;
  tableHtml += `</table>`;

  let tableDiv = document.getElementById("table-tasks-div");
  tableDiv.innerHTML = tableHtml;
}

function buttonAddToDoItem_Click() {
  let inputDateField = document.getElementById("input-date-field");
  let inputTaskField = document.getElementById("input-task-field");

  if (inputTaskField === "") {
    alert("Не все поля заполнены");
    return;
  }

  toDoItemsManager.addNew(
    new ToDoItem(new Date(inputDateField.value), inputTaskField.value)
  );
  clearInputFields();
  showToDoItems();
}

function buttonDeleteToDoItemById_Click(id) {
  toDoItemsManager.deleteById(id);

  showToDoItems();
}

function buttonGetToDoItem_Click(id){
  let labelId=document.getElementById("label_id");

  labelId.innerText=`id =${id}`;
}

let toDoItemsManager = new ToDoItemsManager();
clearInputFields();

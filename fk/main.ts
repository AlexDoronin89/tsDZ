class ToDoItem {
  id: number;
  date: Date;
  description: string;

  constructor(date: Date, description: string) {
    this.id = 0;
    this.date = date;
    this.description = description;
  }

  setId(id: number) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
  getDate() {
    return this.date;
  }
  getDescription() {
    return this.description;
  }

  update(date: Date, description: string) {
    this.date = date;
    this.description = description;
  }
}

class ToDoItemsManager {
  toDoItems: Array<any>;
  toDoItemsId: number;

  constructor() {
    this.toDoItems = [];
    this.toDoItemsId = 0;
  }

  addNew(toDoItem: any) {
    this.toDoItemsId++;
    toDoItem.setId(this.toDoItemsId);

    this.toDoItems.push(toDoItem);
  }

  getAll() {
    return this.toDoItems;
  }

  deleteById(id: number) {
    let index: any = this.toDoItems.findIndex((toDoItem) => {
      return toDoItem.getId() == id;
    });
    this.toDoItems.splice(index, 1);
  }

  updateById(id: number, date: Date, description: string) {
    let index: any = this.toDoItems.findIndex((todoItem) => {
      return todoItem.getId() === id;
    });

    this.toDoItems[index].update(date, description);
  }
}

function clearInputFields() {
  let inputDateField: any = document.getElementById("input-date-field")!;
  let inputTaskField: any = document.getElementById("inpit-task-field")!;

  inputDateField.valueAsDate = new Date();
  inputTaskField.innerText = "";
}

function showToDoItems() {
  let tableHtml: any = "";
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

  toDoItemsManager.getAll().forEach((toDoItem: any, index: any) => {
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

  let tableDiv: any;
  tableDiv.innerHTML = tableHtml;
}

function buttonAddToDoItem_Click() {
  let inputDateField: any = document.getElementById("input-date-field")!;
  let inputTaskField: any = document.getElementById("inpit-task-field")!;

  if (inputTaskField.innerText === "") {
    alert("Не все поля заполнены");
    return;
  }

  toDoItemsManager.addNew(
    new ToDoItem(new Date(inputDateField.innerText), inputTaskField.innerText)
  );
  clearInputFields();
  showToDoItems();
}

function buttonDeleteToDoItemById_Click(id: number) {
  toDoItemsManager.deleteById(id);

  showToDoItems();
}

function buttonGetToDoItem_Click(id: number) {
  let labelId: any = document.getElementById("label_id")!;
  selectedItemId = id;
  labelId.innerText = `id =${id}`;
}

function buttonUpdateToDoItem_Click(id: number) {
  let inputDateField: any = document.getElementById("input-date-field")!;
  let inputTaskField: any = document.getElementById("inpit-task-field")!;

  if (inputTaskField.innerText === "") {
    alert("Не все поля заполнены");
    return;
  }

  toDoItemsManager.updateById(selectedItemId, new Date(inputDateField.value), inputTaskField.value);

  clearInputFields();
  showToDoItems();
}

let toDoItemsManager: ToDoItemsManager = new ToDoItemsManager();
let selectedItemId: number;
clearInputFields();

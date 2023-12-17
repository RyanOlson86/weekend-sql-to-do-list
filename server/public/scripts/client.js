console.log("JS is sourced!");

// initial page start
getItems();

// ! Events
// getItems is called in all axios functions to render the DOM
function getItems() {
  console.log("in getItems");

  axios
    .get("/todos")
    .then((response) => {
      // console.log(response.data);
      renderList(response.data);
    })
    .catch((error) => {
      console.log("Error in getItems", error);
    });
}

function submitTask(event) {
  event.preventDefault();
  // console.log("in submitTask");
  let newText = document.getElementById("textInput").value;

  axios
    .post("/todos", { text: newText })
    .then((response) => {
      getItems();
    })
    .catch((error) => {
      console.log("Error in submitTask", error);
    });
}

function deleteTask(targetId) {
  // console.log("in deleteTask");

  axios
    .delete(`/todos/${targetId}`)
    .then((response) => {
      getItems();
    })
    .catch((error) => {
      console.log("Error in deleteTask", error);
    });
}

function completeTask(targetId) {
  // console.log("in completeTask");
  // let listItem = event.target.closest("li");
  // listItem.classList.add("completed");

  axios
    .put(`/todos/${targetId}`)
    .then((response) => {
      getItems();
    })
    .catch((error) => {
      console.log("Error in completeTask", error);
    });
}

// ! Render

function renderList(array) {
  let listBody = document.getElementById("itemList");
  listBody.innerHTML = "";
  for (const item of array) {
    if (item.isComplete === true) {
      listBody.innerHTML += `
        <li data-testid="toDoItem" class="completed">${item.text}
            <button data-testid="completeButton" onclick="completeTask(${item.id})">Complete</button>
            <button data-testid="deleteButton" onclick="deleteTask(${item.id})">❌</button>
        </li>
        `;
    } else {
      listBody.innerHTML += `
        <li data-testid="toDoItem">${item.text}
            <button data-testid="completeButton" onclick="completeTask(${item.id})">Complete</button>
            <button data-testid="deleteButton" onclick="deleteTask(${item.id})">❌</button>
        </li>
        `;
    }
  }
}

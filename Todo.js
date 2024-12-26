// its my first todo in javascript

document.addEventListener("DOMContentLoaded", () => {
  const btnuserField = document.getElementById("Adduser");
  const input = document.getElementById("name");
  const btnText = btnuserField.innerText;
  const records = document.getElementById("dynamicRecords");
  let userArray = [];
  let edit_di = null;

  const existingUser = localStorage.getItem("user");
  if (existingUser != null) {
    userArray = JSON.parse(existingUser);
  }

  Display();

  btnuserField.onclick = () => {
    const name = input.value.trim();
    if (!name) {
      alert("Please enter a name!");
      return;
    }
    if (edit_di != null) {
      userArray.splice(edit_di, 1, { name });
      edit_di = null;
    } else {
      userArray.push({ name });
    }
    AddUser(userArray);
    input.value = "";
    btnuserField.innerText = btnText;
  };

  function AddUser(userArray) {
    const str = JSON.stringify(userArray);
    localStorage.setItem("user", str);
    Display();
  }

  function Display() {
    let statement = "";
    userArray.forEach((user, i) => {
      statement += `
        <tr>
          <th>${i + 1}</th>
          <td>${user.name}</td>
          <td>
            <i class="btn text-white fa fa-edit btn-info mx-3" onclick="EditUser(${i})"></i>
            <i class="btn btn-danger text-white fa fa-trash" onclick="RemoveUser(${i})"></i>
          </td>
        </tr>`;
    });
    records.innerHTML = statement;
  }

  window.EditUser = function (id) {
    edit_di = id;
    input.value = userArray[id].name;
    btnuserField.innerText = "Save changes";
  };

  window.RemoveUser = function (id) {
    userArray.splice(id, 1);
    AddUser(userArray);
  };
});

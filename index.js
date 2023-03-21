// LISTA DE USUARIOS REGISTRADOS

let user = [
    { name: "Guilherme", pass: 123456 },
    { name: "Fernando", pass: 123456 },
    { name: "Gabriella", pass: 123456 },
    { name: "Matheus", pass: 123456 },
    { name: "Augusto", pass: 123456 },
    { name: "Eduardo", pass: 123456 },
    { name: "Beatriz", pass: 123456 },
    { name: "Albert", pass: 123456 },
    { name: "Lucas", pass: 123456 },
    { name: "Jimin", pass: 123456 },
    { name: "Hugo", pass: 123456 },
    { name: "Luiza", pass: 123456 },
    { name: "Karla", pass: 123456 },
    { name: "João", pass: 123456 },
    { name: "Italo", pass: 123456 },
  ];
  
  //CRIA UM ITEM (NOME DE USUARIO) NA MEMORIA DO NAVEGADOR DO USUARIO
  let namepag2 = localStorage.getItem("userlog");
  if (namepag2 != undefined) {
    window.addEventListener("beforeunload", function (e) {
      localStorage.removeItem("userlog");
    });
  
    const titlename = document.querySelector("h1.bemvindo");
    titlename.innerHTML += ` ${namepag2}`;
  
    //   EVENTO PARA A FUNÇÃO DE RETORNO A PÁGINA INICIAL
    const backToPrincipalPage = document.querySelector("#back");
    backToPrincipalPage.addEventListener("click", backToPrincipaPage);
  
    // EVENTO PARA A FUNÇÃO QUE MOSTRA USUARIOS CADASTRADOS
    const showUsers = document.querySelector("#list");
    showUsers.addEventListener("click", showUser);
  
    // EVENTO PARA A FUNÇÃO QUE LIMPA USUARIOS REGISTRADOS
    const clearUsersList = document.querySelector("#clean");
    clearUsersList.addEventListener("click", clearUserList);
  
    // EVENTO PARA A FUNÇÃO QUE MOSTRA USUARIOS E BOTÃO PARA DELETAR
    const deleteUsers = document.querySelector("#delete");
    deleteUsers.addEventListener("click", deleteUser);
  
    //EVENTO PARA A FUNÇÃO QUE CRIA NOVOS USUARIOS
    const createUsers = document.querySelector("#create");
    createUsers.addEventListener("click", createUser);
  
    //EVENTO PARA FUNÇÃO DE ATUALIZAR OS USUARIOS
    const changeUser = document.querySelector("#change");
    changeUser.addEventListener("click", changeUsers);
  
    //EVENTO PARA FUNÇÃO DE VALIDAR USUARIO
    const confirmUser = document.querySelector("#confirm");
    confirmUser.addEventListener("click", confirmUserLogin);
  
    //   FUNÇÃO DE RETORNO A PÁGINA INICIAL
    function backToPrincipaPage() {
      window.location.assign("./index.html");
      localStorage.removeItem("userlog");
    }
  
    // FUNÇÃO QUE MOSTRA USUARIOS CADASTRADOS
    function showUser() {
      const listOfUsers = document.querySelector("section.listOfUsers");
      listOfUsers.innerHTML = "";
      listOfUsers.innerHTML += `<strong>Conheça nossos artistas</strong><br><br>`;
  
      for (let i = 0; i < user.length; i++) {
        listOfUsers.innerHTML += `<li>${user[i].name}</li>`;
      }
    }
  
    // FUNÇÃO QUE LIMPA USUARIOS REGISTRADOS
    function clearUserList() {
      const listOfUsers = document.querySelector("section.listOfUsers");
      listOfUsers.innerHTML = "";
    }
  
    //FUNÇÃO QUE MOSTRA USUARIOS E BOTÃO PARA DELETAR
    function deleteUser() {
      const listOfUsersForDelete = document.querySelector("section.listOfUsers");
      listOfUsersForDelete.innerHTML = "";
  
      for (let i = 0; i < user.length; i++) {
        listOfUsersForDelete.innerHTML += `<form class ="usersForDel"><input type= "checkbox" id="${i}"/><label> ${user[i].name}</label><br></form>`;
      }
      listOfUsersForDelete.innerHTML += `<input type = "button" id = "buttonDelete" class ="buttons" value = "Deletar Usuarios"></input>`;
  
      //FUNÇÃO PARA DELETAR USUARIOS REGISTRADOS
  
      const inputDeleteUser = document.querySelector("#buttonDelete");
      inputDeleteUser.addEventListener("click", deleteUserIfChecked);
    }
  
    function deleteUserIfChecked() {
      let userDeleted = [""];
      for (let i = 0; i < user.length; i++) {
        let checkbox = document.getElementById(`${i}`);
        if (checkbox.checked == true) {
          userDeleted[i] = 1;
        } else {
          userDeleted[i] = 0;
        }
      }
      for (let i = userDeleted.length - 1; i >= 0; i--) {
        if (userDeleted[i] == 1) {
          user.splice(i, 1);
        }
      }
      deleteUser();
    }
  
    //FUNÇÃO QUE CRIA NOVOS USUARIOS
    function createUser() {
      let create = document.querySelector("section.listOfUsers");
      create.innerHTML = "";
  
      create.innerHTML = `<strong>Adicionar Usuario </strong><br><br>`;
      create.innerHTML += ` <form>
      <label for="name">Nome:</label>
      <input type="text" id="inputName" class="input-text" placeholder="Nome" required>
      <label for="pass">Senha:</label>
      <input type="password" id="inputPass" class="input-text" placeholder="Senha" required>
      <label for="confirmPass">Confirme sua senha:</label>
      <input type="password" id="inputPassConfirm" class="input-text" placeholder="Confirme a Senha" required>
      <input type="button" class="buttons" id="buttonForSend" value="Criar Usuario">
    </form>`;
  
      const createUser = document.querySelector("#buttonForSend");
      createUser.addEventListener("click", createNewUser);
    }
    //FUNÇÃO PARA LOGICA PARA CRIAR USUARIOS
    function createNewUser() {
      let newUser = {
        name: document.querySelector("#inputName").value,
        pass: Number(document.querySelector("#inputPass").value),
      };
      let confirmPass = document.querySelector("#inputPassConfirm").value;
  
      let repeat = 0;
  
      for (let i = 0; i < user.length; i++) {
        if (user[i].name == newUser.name) {
          repeat = 1;
          alert("Usuario existente!");
          i = user.length;
        }
      }
  
      if (newUser.name == "" || newUser.pass == "") {
        alert("Todos os campos devem ser preenchidos!");
        repeat = 2;
      }
      if (newUser.pass != confirmPass) {
        alert("As senhas não batem!");
        repeat = 3;
      }
  
      if (repeat == 0) {
        user.push(newUser);
        alert("Usuario cadastrado com sucesso!");
      }
  
      createUser();
    }
    //FUNÇÃO PARA ATUALIZAR USUARIOS
    function changeUsers() {
      let changeOfUser = document.querySelector("section.listOfUsers");
      changeOfUser.innerHTML = "";
  
      changeOfUser.innerHTML = `<strong>Atualizar dados de usuario</strong> <br><br>`;
      changeOfUser.innerHTML += ` <form>
      <label for="name">Nome de usuario atual:</label>
      <input type="text" id="inputNameToChange" class="input-text" placeholder="Nome de usuario atual">
      <label for="pass">Senha:</label>
      <input type="password" id="inputPassToChange" class="input-text" placeholder="Senha">
  
      <label for="name">Novo nome de usuario:</label>
      <input type="text" id="inputNameOfChange" class="input-text" placeholder="Novo nome de usuario">
      <label for="pass">Senha:</label>
      <input type="password" id="inputPassOfChange" class="input-text" placeholder="Senha">
      <label for="confirmPass">Confirme sua senha:</label>
      <input type="password" id="inputPassToConfirm" class="input-text" placeholder="Confirme a Senha">
      <input type="button" class="buttons" id="buttonForSendNewInformations" value="Atualizar Usuario">
    </form>`;
  
      const createUser = document.querySelector("#buttonForSendNewInformations");
      createUser.addEventListener("click", chageDataOfUser);
    }
  
    function chageDataOfUser() {
      let oldUser = {
        name: document.getElementById("inputNameToChange").value,
        pass: Number(document.getElementById("inputPassToChange").value),
      };
      let newNameOfUser = {
        name: document.getElementById("inputNameOfChange").value,
        pass: Number(document.getElementById("inputPassOfChange").value),
      };
  
      let confirmPass = document.getElementById("inputPassToConfirm").value;
  
      let control = 0;
      for (let i = 0; i < user.length; i++) {
         if (oldUser.name == user[i].name && oldUser.pass == user[i].pass) {
          if (confirmPass == newNameOfUser.pass) {
            control = 1;}
            if (confirmPass == "" && newNameOfUser.pass == "") {
              alert(`Todos os campos devem ser preenchidos!!!`);
              control = 2;
          }   if (control == 1) {
            alert(`Usuario ${newNameOfUser.name} adicionado com sucesso`);
            user[i] = newNameOfUser;
            showUser()
          }
           else {
            alert("As senhas não batem, tente novamente!");
          }
        } else if (oldUser.name == user[i].name && oldUser.pass != user[i].pass) {
          alert(`Senha incorreta, tente novamente!!!`);
        }
      
  
      }
      
  
     
    }
  
    function confirmUserLogin() {
      let confirmUserLog = document.querySelector("section.listOfUsers");
      confirmUserLog.innerHTML = "";
  
      confirmUserLog.innerHTML = `<strong>Validar Usuario </strong><br><br>`;
      confirmUserLog.innerHTML += ` <form>
      <label for="name">Nome:</label>
      <input type="text" id="inputNameLog" class="input-text" placeholder="Nome">
      <label for="pass">Senha:</label>
      <input type="password" id="inputPassLog" class="input-text" placeholder="Senha">
      <input type="button" class="buttons" id="buttonForSendConfirm" value="Confirmar Usuario">
    </form>`;
  
      const createUser = document.querySelector("#buttonForSendConfirm");
      createUser.addEventListener("click", checkUserLog);
    }
  
    function checkUserLog() {
      let checkUserLog = {
        name: document.querySelector("input#inputNameLog").value,
        pass: Number(document.querySelector("input#inputPassLog").value),
      };
  
      let control = 0;
  
      for (let i = 0; i < user.length; i++) {
  
        if (
          checkUserLog.name == user[i].name &&
          checkUserLog.pass == user[i].pass
        ) {
          alert(
            `Tudo certo por aqui! O usuario ${checkUserLog.name} está cadastrado`
          );
          control = 1;
          i = user.length;
          confirmUserLogin();
        } else if (
          checkUserLog.name == user[i].name &&
          checkUserLog.pass != user[i].pass
        ) {
          alert(
            `Usuario ${checkUserLog.name} foi encontrado mas a senha está incorreta, tente novamente!!!`
          );
          control = 2;
        }
      }
  
      if (control == 0) {
        alert(`Usuario ${checkUserLog.name} invalido`);
      }
    }
  } else {
    //  EVENTO PARA FUNÇÃO QUE CHECA SE O USUARIO REALMENTE ESTÁ CADASTRADO
    const checkUsers = document.querySelector("#send");
    checkUsers.addEventListener("click", checkUser);
  
    //   FUNÇÃO QUE CHECA SE O USUARIO REALMENTE ESTÁ CADASTRADO
    function checkUser() {
      let userName = document.querySelector("input#userName").value;
      let pass = Number(document.querySelector("input#pass").value);
      let control = 0;
  
      for (let i = 0; i < user.length; i++) {
        if (userName === user[i].name && pass === user[i].pass) {
          window.location.assign(`./segundapag.html`);
          alert(`Seja bem vindo(a) ${userName}`);
          control = 1;
          localStorage.setItem("userlog", user[i].name);
          i = user.length;
        } else if (userName === user[i].name && pass != user[i].pass) {
          alert(
            `Usuario ${userName} foi encontrado mas a senha está incorreta, tente novamente!!!`
          );
          control = 2;
        }
      }
  
      if (control === 0) {
        alert(`Usuario ${userName} invalido`);
      }
    }
  }
  
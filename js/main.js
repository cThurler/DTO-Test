const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const allInputs = document.querySelectorAll(".form-input");

let nome = document.querySelector("#nome");
let email = document.querySelector("#email");
let tel = document.querySelector("#telefone");

let errorP = document.querySelector("#error");

validaCampos();

form.addEventListener("submit", (formSubmit) => {
    formSubmit.preventDefault();

    allInputs.forEach((e) => {
      if (e.value == "" || e.value == null) {
        e.classList.add("invalido");
      }
    });

  const formData = new FormData(form);


  fetch("php/main.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      try {
        errorP.innerText = "";
        if (data.status === "error") {
          data.errors.forEach((error) => {
            errorP.innerText += `${error}\n`;
          });
        } else if (data.status === "success") {
          errorP.innerText = "Formulário enviado com sucesso!";
        }
      } catch (e) {
        errorP.innerText = "Erro na resposta do servidor.";
      }
    })
    .catch((error) => console.log(`Erro no lado do servidor: ${error}`));
});

function validaCampos() {


  allInputs.forEach((e) => {
    e.addEventListener("blur", () => {
      if (e.value == "" || e.value == null) {
        e.classList.add("invalido");
      }
    });
    e.addEventListener("focus", () => [e.classList.remove("invalido")]);
  });

  nome.addEventListener("blur", () => {
    if (!validaNumero(nome.value)) {
      nome.classList.add("invalido");
    }
  });
}

function validaNumero(str) {
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i]) && str[i] !== " ") {
      return false;
    }
  }
  return true;
}

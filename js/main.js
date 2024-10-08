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

  //pinta vermelho se invalido
  allInputs.forEach((e) => {
    if (e.value == "" || e.value == null) {
      e.classList.add("invalido");
    }
  });

  //simplifica a formatacao para o servidor
  let formTel = form.querySelector("#telefone");
  formTel.value.replace(/\D/g, "").substring(0, 11)


  const formData = new FormData(form);

  //fetch que retorna outras validacoes do servidor
  fetch("php/main.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      try {
        //acumula os erros respondidos pelo server
        errorP.innerText = "";
        if (data.status === "error") {
          data.errors.forEach((error) => {
            errorP.innerText += `${error}\n`;
          });
        } else if (data.status === "success") {
          //success
          errorP.innerText = "Formulário enviado com sucesso!";
        }
      } catch (e) {
        errorP.innerText = "Erro na resposta do servidor.";
      }
    })
    .catch(() => console.log(`Erro na resposta do servidor.`));
});

function validaCampos() {
  allInputs.forEach((e) => {
    e.addEventListener("focus", () => e.classList.remove("invalido"));
  });

  //pinta vermelho se invalido
  nome.addEventListener("blur", () => {
    if (!validaNumero(nome.value) || nome.value == "" || nome.value == null) {
      nome.classList.add("invalido");
    } else {
      nome.classList.remove("invalido");
    }
  });

  //pinta vermelho se invalido
  email.addEventListener("blur", () => {
    if (!validaEmail(email.value) || email.value == "" || email.value == null) {
      email.classList.add("invalido");
    } else {
      email.classList.remove("invalido");
    }
  });

  //formata mascara
  tel.addEventListener("input", () => {
    //elimina nao-digitos
    let limparValor = tel.value.replace(/\D/g, "").substring(0, 11);
    //formata o input
    let numsArr = limparValor.split("");
    let numFormatado = "";

    if (numsArr.length > 0) {
      numFormatado += `(${numsArr.slice(0, 2).join("")})`;
    }
    if (numsArr.length > 2) {
      numFormatado += ` ${numsArr.slice(2, 7).join("")}`;
    }
    if (numsArr.length > 7) {
      numFormatado += `-${numsArr.slice(7, 11).join("")}`;
    }
    tel.value = numFormatado;
  });

  //pinta vermelho se invalido
  tel.addEventListener("blur", () => {
    if (
      tel.value.length != 14 &&
      tel.value.length != 15 || 
      tel.value == "" ||
      tel.value == null
    ) {
      tel.classList.add("invalido");
    } else {
      tel.classList.remove("invalido");
    }
  });
  
  //mask do telefone
  tel.addEventListener("input", () => {
    //elimina nao-digitos
    let limparValor = tel.value.replace(/\D/g, "").substring(0, 11);
    //formata o input
    let numsArr = limparValor.split("");
    let numFormatado = "";

  if (numsArr.length <= 10) {
    if (numsArr.length > 0) {
      numFormatado += `(${numsArr.slice(0, 2).join("")})`;
    }
    if (numsArr.length > 2) {
      numFormatado += ` ${numsArr.slice(2, 6).join("")}`;
    }
    if (numsArr.length > 6) {
      numFormatado += `-${numsArr.slice(6, 10).join("")}`;
    }
  } else {
    if (numsArr.length > 0) {
      numFormatado += `(${numsArr.slice(0, 2).join("")})`;
    }
    if (numsArr.length > 2) {
      numFormatado += ` ${numsArr.slice(2, 7).join("")}`;
    }
    if (numsArr.length > 7) {
      numFormatado += `-${numsArr.slice(7, 11).join("")}`;
    }
  }

  tel.value = numFormatado;
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

//verifica se eh email
function validaEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

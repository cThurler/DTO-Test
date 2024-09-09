<?php

require_once "RepositorioUsuario.php";
require_once "Usuario.php";



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = processarForm();

    header('Content-Type: application/json');
    $json = json_encode($response);
    echo $json;
    exit;
}


function processarForm(){
    
    $errors = [];

    
    if (empty($_POST['Nome'])) {
        $errors[] = "O campo 'Nome' é obrigatório.";
    } elseif (preg_match('/\d/', $_POST['Nome'])) {
        $errors[] = "O nome não pode conter números.";
    } else $nome = $_POST['Nome'];
    
    if (empty($_POST['Email'])) {
        $errors[] = "O campo 'E-mail' é obrigatório.";
    } elseif (!filter_var($_POST['Email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "O email fornecido é inválido.";
    } else $email = $_POST['Email'];
    
    //valida o tamanho do num tel depois de convertar para somente numeros
    $telLength = strlen(preg_replace('/\D/', '', $_POST['Telefone']));
    if ($telLength === 11 ||$telLength === 10 ) {
        $tel = $_POST['Telefone'];
    } else {
        $errors[] = "Telefone inválido";
    };
    
    if (!empty($errors)) {
        return [
            'status' => 'error',
            'errors' => $errors 
        ];
    } else {
        pushUsuario($nome, $email, $tel);
        return [
            'status' => 'success',
            'message' => 'Formulário enviado com sucesso!'
        ];
    }

}

function pushUsuario($nome, $email, $tel){
    $repo = new RepositorioUsuario();
        $u = new Usuario($nome, $email, $tel);
        $repo->adicionar($u);
    };





<?php

require_once "Usuario.php";

class RepositorioUsuario
{
    public function adicionar(Usuario $u)
    {
        try {
            $pdo = new PDO("mysql:dbname=dto-teste;host=localhost;charset=utf8", "root", "", [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
            $ps = $pdo->prepare("INSERT INTO usuario(nome,email,tel) VALUES (:nome,:email,:tel)");
            $ps->execute(['nome' => $u->nome, 'email' => $u->email, 'tel' => $u->telefone]);
        } catch (PDOException $e) {
            die("Erro interno do servidor.");
        }
    }
}

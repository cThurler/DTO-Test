<?php

require_once "Usuario.php";

class RepositorioUsuario
{
    public function adicionar(Usuario $u)
    {
        try {
            $pdo = new PDO("mysql:dbname=dto_teste_caio;host=localhost;charset=utf8", "root", "", [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
            $ps = $pdo->prepare("INSERT INTO usuario(nome,email,tel) VALUES (:nome,:email,:tel)");
            $ps->execute(['nome' => $u->getNome(), 'email' => $u->getEmail(), 'tel' => $u->getTelefone()]);
        } catch (PDOException $e) {
            die("Erro interno do servidor.");
        }
    }
}

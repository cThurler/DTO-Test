<?php

class Usuario
{
    private string $nome;
    private string $email;
    private string $telefone;

    public function __construct(string $nome, string $email, string $telefone)
    {
        $this->setNome($nome);
        $this->setEmail($email);
        $this->setTelefone($telefone);
    }

    public function setNome(string $nome): void
    {
        $this->nome = $nome;
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setTelefone(string $telefone): void
    {
        $this->telefone = $telefone;
    }

    public function getTelefone(): string
    {
        return $this->telefone;
    }
}

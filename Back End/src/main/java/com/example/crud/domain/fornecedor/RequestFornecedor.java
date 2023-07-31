package com.example.crud.domain.fornecedor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record RequestFornecedor (String id, @NotBlank String nome, @NotBlank String cnpj_cpf, @NotBlank String email, @NotBlank String cep, String rg, Date data_nascimento){
}

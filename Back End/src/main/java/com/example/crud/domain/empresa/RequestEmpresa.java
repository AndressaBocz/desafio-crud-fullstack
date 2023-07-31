package com.example.crud.domain.empresa;

import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public record RequestEmpresa (String id, @NotBlank String nome_fantasia, @NotBlank String cnpj, @NotBlank String cep, @NotBlank String uf){
}

package com.example.crud.domain.fornecedor;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "fornecedor")
@Entity(name = "fornecedor")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")

public class Fornecedor {
    @Id @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;

    private String cnpj_cpf;

    private String email;

    private String cep;

    private String rg;

    private Date data_nascimento;

    private Boolean active;

    public Fornecedor(RequestFornecedor requestFornecedor){
        this.nome = requestFornecedor.nome();
        this.cnpj_cpf = requestFornecedor.cnpj_cpf();
        this.email = requestFornecedor.email();
        this.cep = requestFornecedor.cep();
        this.rg = requestFornecedor.rg();
        this.data_nascimento = requestFornecedor.data_nascimento();
        this.active = true;

    }

}

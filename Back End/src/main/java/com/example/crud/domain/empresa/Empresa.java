package com.example.crud.domain.empresa;

import com.example.crud.domain.empresa.RequestEmpresa;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "empresa")
@Entity(name = "empresa")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")

public class Empresa {
    @Id @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;

    private String cnpj;

    private String nome_fantasia;

    private String cep;

    private Boolean active;

    private String uf;

    public Empresa(RequestEmpresa requestEmpresa){
        this.cnpj = requestEmpresa.cnpj();
        this.nome_fantasia = requestEmpresa.nome_fantasia();
        this.cep = requestEmpresa.cep();
        this.active = true;
        this.uf = requestEmpresa.uf();

    }

}

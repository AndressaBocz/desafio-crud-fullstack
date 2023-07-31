package com.example.crud.controllers;


import com.example.crud.domain.empresa.EmpresaRepository;
import com.example.crud.domain.empresa.Empresa;
import com.example.crud.domain.empresa.RequestEmpresa;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/empresa")

public class EmpresaController {
    @Autowired
    private EmpresaRepository repository;

    @GetMapping
    public ResponseEntity getAllEmpresas() {
        var allEmpresas = repository.findAllByActiveTrue();
        return ResponseEntity.ok(allEmpresas);
    }

    @PostMapping
    public ResponseEntity registerEmpresas(@RequestBody @Valid RequestEmpresa data) {
        Empresa newEmpresa = new Empresa(data);
        repository.save(newEmpresa);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity updateEmpresa(@RequestBody @Valid RequestEmpresa data) {
        Integer empresaId = null;
        try {
            empresaId = Integer.parseInt(data.id());
        } catch (NumberFormatException e) {
             return ResponseEntity.badRequest().body("ID da Empresa inválido.");
        }
        if (empresaId == null) {
            return ResponseEntity.badRequest().body("ID da Empresa não pode ser nulo.");
        }

        Optional<Empresa> optionalEmpresa = repository.findById(String.valueOf(empresaId));
        if (optionalEmpresa.isPresent()) {
            Empresa empresa = optionalEmpresa.get();
            empresa.setNome_fantasia(data.nome_fantasia());
            empresa.setCnpj(data.cnpj());
            empresa.setCep(data.cep());
            return ResponseEntity.ok(empresa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deleteEmpresa(@PathVariable Integer id){
        Optional<Empresa> optionalEmpresa = repository.findById(String.valueOf(id));
        if (optionalEmpresa.isPresent()) {
            Empresa empresa = optionalEmpresa.get();
            empresa.setActive(false);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }

}


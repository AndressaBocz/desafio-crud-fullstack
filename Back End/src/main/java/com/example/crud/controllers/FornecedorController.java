package com.example.crud.controllers;

import com.example.crud.domain.empresa.EmpresaRepository;
import com.example.crud.domain.fornecedor.Fornecedor;
import com.example.crud.domain.fornecedor.FornecedorRepository;
import com.example.crud.domain.fornecedor.RequestFornecedor;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/fornecedor")

public class FornecedorController {
    @Autowired
    private FornecedorRepository repository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @GetMapping
    public ResponseEntity getAllFornecedores() {
        var allFornecedores = repository.findAllByActiveTrue();
        return ResponseEntity.ok(allFornecedores);
    }

    @PostMapping
    public ResponseEntity registerFornecedores(@RequestBody @Valid RequestFornecedor data) {
        Fornecedor newFornecedor = new Fornecedor(data);
        repository.save(newFornecedor);
        return ResponseEntity.ok().build();

    }

    @PutMapping
    @Transactional

    public ResponseEntity updateFornecedor(@RequestBody @Valid RequestFornecedor data) {
        Integer fornecedorId = null;
        try {
            fornecedorId = Integer.parseInt(data.id());
        } catch (NumberFormatException e) {
            // Trata o caso em que o ID não é um número válido (pode ser nulo ou ter um formato inválido)
            return ResponseEntity.badRequest().body("ID do fornecedor inválido.");
        }
        // Verifica se o ID é nulo antes de prosseguir com a atualização.
        if (fornecedorId == null) {
            return ResponseEntity.badRequest().body("ID do fornecedor não pode ser nulo.");
        }

            Optional<Fornecedor> optionalFornecedor = repository.findById(fornecedorId);
            if (optionalFornecedor.isPresent()) {
                Fornecedor fornecedor = optionalFornecedor.get();
                fornecedor.setNome(data.nome());
                fornecedor.setCnpj_cpf(data.cnpj_cpf());
                fornecedor.setEmail(data.email());
                fornecedor.setCep(data.cep());
                fornecedor.setRg(data.rg());
                fornecedor.setData_nascimento(data.data_nascimento());
                return ResponseEntity.ok(fornecedor);
            } else {
                return ResponseEntity.notFound().build();
            }
        }


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deleteFornecedor(@PathVariable Integer id){
        Optional<Fornecedor> optionalFornecedor = repository.findById(String.valueOf(id));
        if (optionalFornecedor.isPresent()) {
            Fornecedor fornecedor = optionalFornecedor.get();
            fornecedor.setActive(false);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }



}


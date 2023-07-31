package com.example.crud.domain.fornecedor;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface FornecedorRepository extends JpaRepository<Fornecedor, String> {
    List<Fornecedor> findAllByActiveTrue();

    Optional<Fornecedor> findById(Integer fornecedorId);
}

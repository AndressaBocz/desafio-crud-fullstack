CREATE TABLE empresa (
                         id SERIAL PRIMARY KEY,
                         cnpj VARCHAR(14) NOT NULL UNIQUE,
                         nome_fantasia VARCHAR(100) NOT NULL,
                         cep VARCHAR(8) NOT NULL
);

CREATE TABLE fornecedor (
                            id SERIAL PRIMARY KEY,
                            cnpj_cpf VARCHAR(14) NOT NULL UNIQUE,
                            nome VARCHAR(100) NOT NULL,
                            email VARCHAR(100) NOT NULL,
                            cep VARCHAR(8) NOT NULL,
                            rg VARCHAR(20),
                            data_nascimento DATE
);

-- Tabela de relacionamento Empresa_Fornecedor
CREATE TABLE empresa_fornecedor (
                                    id SERIAL PRIMARY KEY,
                                    empresa_id INT NOT NULL REFERENCES empresa(id),
                                    fornecedor_id INT NOT NULL REFERENCES fornecedor(id),
                                    UNIQUE (empresa_id, fornecedor_id) -- Garante que um fornecedor não possa ser associado à mesma empresa mais de uma vez
);

ALTER TABLE fornecedor ADD active BOOLEAN;
UPDATE fornecedor SET active = true;

ALTER TABLE empresa ADD active BOOLEAN;
UPDATE empresa SET active = true;



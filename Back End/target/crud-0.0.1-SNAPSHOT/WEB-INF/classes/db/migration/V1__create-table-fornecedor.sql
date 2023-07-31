CREATE TABLE fornecedor (
                            id SERIAL PRIMARY KEY,
                            cnpj_cpf VARCHAR(14) NOT NULL UNIQUE,
                            nome VARCHAR(100) NOT NULL,
                            email VARCHAR(100) NOT NULL,
                            cep VARCHAR(8) NOT NULL,
                            rg VARCHAR(20),
                            data_nascimento DATE
);

-- Criar o trigger para a tabela "empresa"
CREATE OR REPLACE FUNCTION after_insert_empresa()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO empresa_fornecedor (empresa_id, fornecedor_id)
SELECT NEW.id, id FROM fornecedor WHERE active = true; -- Inserindo o novo registro da empresa para cada fornecedor ativo

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_after_insert_empresa
    AFTER INSERT ON empresa
    FOR EACH ROW
    EXECUTE FUNCTION after_insert_empresa();

-- Criar o trigger para a tabela "fornecedor"
CREATE OR REPLACE FUNCTION after_insert_fornecedor()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO empresa_fornecedor (empresa_id, fornecedor_id)
SELECT id, NEW.id FROM empresa WHERE active = true; -- Inserindo o novo registro do fornecedor para cada empresa ativa

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_after_insert_fornecedor
    AFTER INSERT ON fornecedor
    FOR EACH ROW
    EXECUTE FUNCTION after_insert_fornecedor();


-- Inserir dados na tabela `usuario`
INSERT INTO usuario (nome, email, senha, status, tipo) VALUES
('João', 'joao@example.com', 'senha123', 'active', 'CLIENTE'),
('Maria', 'maria@example.com', 'senha456', 'active', 'CLIENTE'),
('Pedro', 'pedro@example.com', 'senha789', 'active', 'CLIENTE');

-- Inserir dados na tabela `cliente`
INSERT INTO cliente (idUsuario, cpf, dataNascimento, endereco, telefone) VALUES
(LAST_INSERT_ID(), '12345678901', '1990-01-01', 'Rua A, 123', '1234-5678'),
(LAST_INSERT_ID(), '98765432109', '1985-05-15', 'Rua B, 456', '9876-5432'),
(LAST_INSERT_ID(), '23456789012', '1988-10-20', 'Rua C, 789', '5555-5555');

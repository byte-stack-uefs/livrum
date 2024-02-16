  -- Script de inserção com 7 registros na tabela cliente
INSERT INTO cliente (idUsuario, cpf, dataNascimento, endereco, telefone)
VALUES
    (10, '11111111111', '1990-01-01', 'Rua A, 123', '123456789'),
    (2, '22222222222', '1991-02-02', 'Rua B, 456', '987654321'),
    (3, '33333333333', '1992-03-03', 'Rua C, 789', '456789123'),
    (4, '44444444444', '1993-04-04', 'Rua D, 101', '789123456'),
    (8, '55555555555', '1994-05-05', 'Rua E, 112', '321654987'),
    (6, '66666666666', '1995-06-06', 'Rua F, 113', '654987321'),
    (7, '77777777777', '1996-07-07', 'Rua G, 114', '987321654');

  
-- Script de inserção com 50 registros na tabela pedido
INSERT INTO pedido (meioPagamento, data, status, idCliente)
VALUES
    ('pix', '2022-01-01', 'approved', 10),
    ('credito', '2022-01-02', 'pending', 2),
    ('pix', '2022-01-03', 'approved', 3),
    ('credito', '2022-01-04', 'pending', 4),
    ('pix', '2022-01-05', 'approved', 8),
    ('credito', '2022-01-06', 'pending', 6),
    ('pix', '2022-01-07', 'approved', 7),
    ('credito', '2022-01-08', 'pending', 10),
    ('pix', '2022-01-09', 'approved', 2),
    ('credito', '2022-01-10', 'pending', 3),
    ('pix', '2022-01-11', 'approved', 4),
    ('credito', '2022-01-12', 'pending', 8),
    ('pix', '2022-01-13', 'approved', 6),
    ('credito', '2022-01-14', 'pending', 7),
    ('pix', '2022-01-15', 'approved', 10),
    ('credito', '2022-01-16', 'pending', 2),
    ('pix', '2022-01-17', 'approved', 3),
    ('credito', '2022-01-18', 'pending', 4),
    ('pix', '2022-01-19', 'approved', 8),
    ('credito', '2022-01-20', 'pending', 6),
    ('pix', '2022-01-21', 'approved', 7),
    ('credito', '2022-01-22', 'pending', 10),
    ('pix', '2022-01-23', 'approved', 2),
    ('credito', '2022-01-24', 'pending', 3),
    ('pix', '2022-01-25', 'approved', 4),
    ('credito', '2022-01-26', 'pending', 8),
    ('pix', '2022-01-27', 'approved', 6),
    ('credito', '2022-01-28', 'pending', 7),
    ('pix', '2022-01-29', 'approved', 10),
    ('credito', '2022-01-30', 'pending', 2),
    ('pix', '2022-01-31', 'approved', 3),
    ('credito', '2022-02-01', 'pending', 4),
    ('pix', '2022-02-02', 'approved', 8),
    ('credito', '2022-02-03', 'pending', 6),
    ('pix', '2022-02-04', 'approved', 7),
    ('credito', '2022-02-05', 'pending', 10),
    ('pix', '2022-02-06', 'approved', 2),
    ('credito', '2022-02-07', 'pending', 3),
    ('pix', '2022-02-08', 'approved', 4),
    ('credito', '2022-02-09', 'pending', 8),
    ('pix', '2022-02-10', 'approved', 6),
    ('credito', '2022-02-11', 'pending', 7),
    ('pix', '2022-02-12', 'approved', 10),
    ('credito', '2022-02-13', 'pending', 2),
    ('pix', '2022-02-14', 'approved', 3),
    ('credito', '2022-02-15', 'pending', 4),
    ('pix', '2022-02-16', 'approved', 8),
    ('credito', '2022-02-17', 'pending', 6),
    ('pix', '2022-02-18', 'approved', 7),
    ('credito', '2022-02-19', 'pending', 10),
    ('pix', '2022-02-20', 'approved', 2);

-- Script de inserção com 100 registros na tabela cupom
INSERT INTO cupom (idUsuario, nome, status, porcentagem, dataExpiracao, criadoEm, modificadoEM)
SELECT 
    -- Gera valores aleatórios entre 1 e 20 para idUsuario (presumindo a existência de registros em autor com idUsuario entre 1 e 20)
    ROUND(RAND() * 19 + 1),
    CONCAT('cupom', ROUND(RAND() * 100000)), -- Gera um nome de cupom único
    -- Gera um status aleatório entre active, inactive e expired
    CASE WHEN RAND() < 0.7 THEN 'active' WHEN RAND() < 0.9 THEN 'inactive' ELSE 'expired' END,
    ROUND(RAND() * 30, 2), -- Gera uma porcentagem aleatória entre 0 e 30
    -- Gera uma data de expiração aleatória nos próximos 30 dias
    DATE_ADD(CURDATE(), INTERVAL ROUND(RAND() * 30) DAY),
    CURRENT_TIMESTAMP,
    NULL
FROM
    -- Este bloco FROM é apenas um truque para repetir a instrução SELECT 100 vezes
    (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) AS counter
LIMIT 100;


-- Script de inserção com 100 registros na tabela itempedido
INSERT INTO itempedido (idCupom, idEBook, idPedido, valorUnitario, valorTotal)
SELECT 
    NULL, -- Coluna idCupom
    ROUND(RAND() * 19 + 1), -- Gera valores aleatórios entre 1 e 20 para idEBook
    ROUND(RAND() * 45 + 105), -- Gera valores aleatórios entre 105 e 150 para idPedido
    ROUND(RAND() * 100, 2), -- Valor Unitário aleatório entre 0 e 100
    ROUND(RAND() * 100, 2) -- Valor Total aleatório entre 0 e 100
FROM
    -- Este bloco FROM é apenas um truque para repetir a instrução SELECT 100 vezes
    (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) AS counter
LIMIT 100;

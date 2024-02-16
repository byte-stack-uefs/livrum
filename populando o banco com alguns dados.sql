INSERT INTO usuario (nome, email, senha, status, tipo)
VALUES
    ('João Silva', 'joao.silva@email.com', 'senha123', 'active', 'CLIENTE'),
    ('Maria Oliveira', 'maria.oliveira@email.com', 'senha456', 'active', 'CLIENTE'),
    ('Pedro Santos', 'pedro.santos@email.com', 'senha789', 'pending', 'CLIENTE'),
    ('Ana Pereira', 'ana.pereira@email.com', 'senhaabc', 'active', 'AUTOR'),
    ('Carlos Lima', 'carlos.lima@email.com', 'senhadef', 'active', 'CLIENTE'),
    ('Fernanda Souza', 'fernanda.souza@email.com', 'senha123', 'inactive', 'CLIENTE'),
    ('Ricardo Martins', 'ricardo.martins@email.com', 'senha456', 'active', 'CLIENTE'),
    ('Camila Almeida', 'camila.almeida@email.com', 'senha789', 'active', 'AUTOR'),
    ('Gustavo Costa', 'gustavo.costa@email.com', 'senhaabc', 'blocked', 'CLIENTE'),
    ('Luciana Oliveira', 'luciana.oliveira@email.com', 'senhadef', 'active', 'ADM');

INSERT INTO autor (idUsuario, cpf, dataNascimento, endereço, numeroAgencia, numeroConta, numeroOperacao)
VALUES
    (11, '12345678901', '1990-05-15', 'Rua A, 123', '0123456789', '9876543210', '2412'),
    (2, '98765432101', '1985-08-22', 'Avenida B, 456', '9876543210', '0123456789', '1234'),
    (3, '45678901201', '1982-03-10', 'Rua C, 789', '0123456789', '9876543210', '3421'),
    (4, '78901234501', '1995-11-05', 'Avenida D, 234', '9876543210', '0123456789', '3421'),
    (5, '23456789001', '1978-09-17', 'Rua E, 567', '0123456789', '9876543210', '3421'),
    (6, '56789012301', '1989-12-03', 'Avenida F, 890', '9876543210', '0123456789', '3421'),
    (7, '34567890101', '1980-06-28', 'Rua G, 123', '0123456789', '9876543210', '3421'),
    (8, '90123456701', '1992-02-14', 'Avenida H, 456', '9876543210', '0123456789', '3421'),
    (9, '12345098701', '1987-07-09', 'Rua I, 789', '0123456789', '9876543210', '3421'),
    (10, '67890123401', '1998-04-25', 'Avenida J, 234', '9876543210', '0123456789', '3421');


INSERT INTO ebook (idAutor, nome, status, preco, sinopse, capa, qtdPaginas, idioma, formato, tamanhoEmMB, anoLancamento, motivoRejeicao, outrosAutores, visto)
VALUES
    (1, 'Aventuras no Espaço', 'active', 12.99, 'Uma emocionante jornada intergaláctica.', 'https://cdn.pixabay.com/photo/2023/11/13/12/46/ai-generated-8385433_640.jpg', 300, 'Português', 'PDF', 5, '2022', NULL, 'Autor2, Autor3', 100),
    (2, 'O Segredo do Passado', 'active', 9.99, 'Um mistério envolvendo segredos familiares.', 'https://m.media-amazon.com/images/I/91jad2ZB-YL._AC_UF1000,1000_QL80_.jpg', 250, 'Inglês', 'EPUB', 3, '2021', NULL, 'Autor1, Autor3', 50),
    (3, 'Caminho da Liberdade', 'inactive', 19.99, 'Uma história de luta pela liberdade.', 'https://m.media-amazon.com/images/I/51MxNoTjn1L._AC_UF1000,1000_QL80_.jpg', 400, 'Espanhol', 'MOBI', 7, '2023', 'Conteúdo inadequado', 'Autor4, Autor5', 30),
    (4, 'Viagem ao Desconhecido', 'rejected', 15.99, 'Uma jornada exploratória cheia de perigos.', 'https://m.media-amazon.com/images/I/41TGPDmXO8L._AC_UF1000,1000_QL80_.jpg', 350, 'Francês', 'PDF', 6, '2020', 'Não atende aos critérios de qualidade', 'Autor2, Autor6', 10),
    (5, 'No Limiar do Abismo', 'active', 14.99, 'Suspense e mistério à beira do abismo.', 'https://m.media-amazon.com/images/I/81i-QxHChzL._AC_UF1000,1000_QL80_.jpg', 280, 'Alemão', 'EPUB', 4, '2024', NULL, 'Autor7, Autor8', 80),
    (6, 'Além das Estrelas', 'active', 17.99, 'Explorando o desconhecido além das estrelas.', 'https://m.media-amazon.com/images/I/51ueI8-gKRL.jpg', 320, 'Italiano', 'PDF', 5, '2022', NULL, 'Autor9, Autor10', 60),
    (7, 'A Última Fronteira', 'active', 21.99, 'Desbravando a última fronteira conhecida.', 'https://m.media-amazon.com/images/I/41E8ACz+0wL.jpg', 400, 'Português', 'MOBI', 8, '2023', NULL, 'Autor11, Autor12', 90),
    (8, 'O Poder do Conhecimento', 'pending', 13.99, 'Em busca do conhecimento perdido.', 'https://m.media-amazon.com/images/I/81J29GDSIXL._AC_UF1000,1000_QL80_.jpg', 300, 'Inglês', 'EPUB', 5, '2021', NULL, 'Autor13, Autor14', 20),
    (9, 'Revolução Digital', 'active', 18.99, 'A transformação da sociedade na era digital.', 'https://m.media-amazon.com/images/I/81U-TO4QrCL._AC_UF1000,1000_QL80_.jpg', 350, 'Espanhol', 'PDF', 7, '2020', NULL, 'Autor15, Autor16', 75),
    (10, 'O Mistério do Passado', 'active', 16.99, 'Desvendando segredos esquecidos no tempo.', 'https://m.media-amazon.com/images/I/71WT8Wio05L._AC_UF1000,1000_QL80_.jpg', 300, 'Francês', 'MOBI', 6, '2024', NULL, 'Autor17, Autor18', 85);
    
INSERT INTO ebook (idAutor, nome, status, preco, sinopse, capa, qtdPaginas, idioma, formato, tamanhoEmMB, anoLancamento, motivoRejeicao, outrosAutores, visto)
VALUES
    (1, 'Caminhos da Natureza', 'active', 14.99, 'Explorando a beleza natural do mundo.', 'https://m.media-amazon.com/images/I/51k3j9XA8tL.jpg', 280, 'Português', 'PDF', 4, '2023', NULL, 'Autor19, Autor20', 60),
    (2, 'O Enigma do Tempo', 'active', 19.99, 'Uma viagem pelo tempo e suas complexidades.', 'https://m.media-amazon.com/images/I/41BK4a2kdNL._AC_UY218_.jpg', 400, 'Inglês', 'EPUB', 7, '2021', NULL, 'Autor21, Autor22', 85),
    (3, 'Vidas Entrelaçadas', 'pending', 12.99, 'Histórias de personagens com destinos entrelaçados.', 'https://m.media-amazon.com/images/I/81EPYK4lD4L._AC_UF1000,1000_QL80_.jpg', 250, 'Espanhol', 'MOBI', 3, '2022', NULL, 'Autor23, Autor24', 30),
    (4, 'Sombras do Passado', 'active', 16.99, 'Segredos sombrios que retornam para assombrar.', 'https://m.media-amazon.com/images/I/41EmQrvRzgL._AC_UF1000,1000_QL80_.jpg', 320, 'Francês', 'PDF', 6, '2020', NULL, 'Autor25, Autor26', 75),
    (5, 'A Fronteira do Conhecimento', 'active', 21.99, 'Explorando os limites do conhecimento humano.', 'https://m.media-amazon.com/images/I/41kcAsPwj3L.jpg', 350, 'Italiano', 'EPUB', 8, '2024', NULL, 'Autor27, Autor28', 90),
    (6, 'O Despertar da Magia', 'active', 18.99, 'Um mundo onde a magia retorna à vida.', 'https://m.media-amazon.com/images/I/81gwzLQ6EbL._AC_UF1000,1000_QL80_.jpg', 300, 'Alemão', 'MOBI', 5, '2021', NULL, 'Autor29, Autor30', 70),
    (7, 'Memórias Esquecidas', 'rejected', 13.99, 'Memórias perdidas e o desafio de recuperá-las.', 'https://m.media-amazon.com/images/I/413DamkR1zL._AC_UF1000,1000_QL80_.jpg', 280, 'Português', 'PDF', 4, '2023', 'Conteúdo inadequado', 'Autor31, Autor32', 15),
    (8, 'Trilhas do Destino', 'active', 15.99, 'Destinos que se entrelaçam em uma trama complexa.', 'https://m.media-amazon.com/images/I/51yMvRzKNRL.jpg', 300, 'Inglês', 'EPUB', 5, '2022', NULL, 'Autor33, Autor34', 50),
    (9, 'Rumo ao Desconhecido', 'active', 20.99, 'Uma expedição rumo ao desconhecido.', 'https://m.media-amazon.com/images/I/41RTZ9XsYnL.jpg', 350, 'Espanhol', 'MOBI', 7, '2020', NULL, 'Autor35, Autor36', 80),
    (10, 'Ecos do Passado', 'active', 17.99, 'Ecos que ressoam através do tempo e do espaço.', 'https://m.media-amazon.com/images/I/61fvqTlI7lL._AC_UF1000,1000_QL80_.jpg', 320, 'Francês', 'PDF', 6, '2024', NULL, 'Autor37, Autor38', 65);

INSERT INTO `livrum`.`GeneroEBook` (`idGenero`, `idEBook`)
VALUES
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 2),
  (5, 3),
  (6, 1),
  (7, 4),
  (8, 4),
  (9, 5),
  (10, 5);
  
select * from ebook;
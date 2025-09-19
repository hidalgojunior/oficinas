-- Inscrições completas: todos os alunos em todas as oficinas conforme dados fornecidos
-- IDs de alunos e oficinas conforme ordem de inserção

-- Exemplo de inserção robusta usando subqueries para garantir integridade dos dados
-- BACKEND: PYTHON (11H - 12H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'BACKEND: PYTHON' AND o.horario = '11H - 12H'
AND a.nome IN ('Amanda Castão Vaz','Amanda Cristina Constantino','Bianca Teixeira Preciso','Felipe Miguel de Oliveira Costa dos Santos','Fernanda Venancio da Silva','Gabriel Carnaval','Jean Luccas','Lara de Souza Pedrasolli','Lívia Luz Lemes','Lorena','Manuela Moraes do Prado','Maria Eduarda de Souza','Maria Laura Candido Novais','Miguel Ramos','Natanael Carvalho da Silva','Raphael De Lima','Raphaella Orasmo Dalla Pria','Rayane Vitória Barberdes de Souza','Vitória Aparecida Adorno da Silva','Vitória de Oliveira Leite');

-- BACKEND: PYTHON (10H - 11H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'BACKEND: PYTHON' AND o.horario = '10H - 11H'
AND a.nome IN ('Ana Clara Freires de Almeida','Isabela Zanini','João de Oliveira Bernardino','Gabriela Abolis Cardoso','Rafaela Botin Gonçalves','Ana Eliza Ribeiro Moura','Miguel Freire do Amaral','Gabriel Bordin Souza','Maria Eduarda Oliveira Lopes','Ana Laura Pereira Candido','Giovanna Tadeu Cintra Candido','Giovanna Pereira de Souza','Ana Flávia','Vitor Hugo Basta Fernandes','João Miguel de Oliveira Santiago','Maria Cláudia');

-- DESIGN DIGITAL (11H - 12H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'DESIGN DIGITAL' AND o.horario = '11H - 12H'
AND a.nome IN ('Ana Clara Freires de Almeida','Isabela Zanini','João de Oliveira Bernardino','Gabriela Abolis Cardoso','Rafaela Botin Gonçalves','Ana Eliza Ribeiro Moura','Miguel Freire do Amaral','Gabriel Bordin Souza','Maria Eduarda Oliveira Lopes','Ana Laura Pereira Candido','Giovanna Tadeu Cintra Candido','Giovanna Pereira de Souza','Ana Flávia','Vitor Hugo Basta Fernandes','João Miguel de Oliveira Santiago','Maria Cláudia');

-- FRONTEND (10H - 12H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'FRONTEND' AND o.horario = '10H - 12H'
AND a.nome IN ('Manuela Morais da Silva','Camilly Cristina Roman da Silva','Ana Beatriz Santos Dutra','Emanuely de Souza Teixeira Barbosa','Priscila Pinto Venceslau','Camila Victória Peres','Lucas Garbelini Piacente','Maria Clara Delafiori Assolini','Beatriz Lima Moreira','Sofia Correia da Silva');

-- INTELIGÊNCIA ARTIFICIAL (10H - 12H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'INTELIGÊNCIA ARTIFICIAL' AND o.horario = '10H - 12H'
AND a.nome IN ('Carolina Gasparini Juliano','Maria Antonia','Livia Galindo','Geovana Martins','Maysa Vitória de Souza Cruz','Laura Vitória Franco Ribeiro','Sarah Cristina Meira','Yudi Hatori Garcia','Rebeca Amábile Gomes Carneiro Cruz','Pedro Henrique Pereira da Silva','Pedro','Stella Maris');

-- DEFESA PESSOAL (10H - 11H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'DEFESA PESSOAL' AND o.horario = '10H - 11H'
AND a.nome IN ('Flávio Tavares de Moraes','Maria Eduarda Durães Cruz Mesquita','Miguel Roeda Silva','Dorival Camara Filho','Murilo Souza Targa','Felipe Gabriel Camargo Ribeiro Martins','David Peres Filho','Gustavo Alcântara Craiba','Davi Teixeira Galdino dos Santos','Beatriz Cristiny Teixeira Pires','Olivia Maria di Froscia Costa','Raquel Lissa Yamauti','Kauã Teixeira de Andrade','Maria Eduarda Rangel de Souza');

-- DEFESA PESSOAL (11H - 12H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'DEFESA PESSOAL' AND o.horario = '11H - 12H'
AND a.nome IN ('Fernanda Alves Diniz','Hugo Nishikito Alexandre Soares','Davi Ferreira Neris','Enzo Bicalho Almeida','Kauã de Lira Guelfi','Miguel Roeda Silva','Heitor Pedroni Cruz','Ryan Augusto Resende de Oliveira','Eduardo da Silva Santos Silvestre de Menezes','André Romualdo da Silva Junior','Rafael Viana Pereira','Miguel Gabriel Luz de Melo','Miguel França','Marcelo Amancio Filho','Ana Clara Magalhães Souza');

-- LOGÍSTICA (10H - 11H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'LOGÍSTICA' AND o.horario = '10H - 11H'
AND a.nome IN ('Eleno Doi Pillon','Eduardo da Silva Santos Silvestre de Menezes','João Felipe Martins Marassi Cruz','Rafaela Bossoni','Beatriz Batista da Silva','Davi Diniz Dalevedo','Eduarda Leal Tavares','Nicolas Gabriel Venâncio dos Santos','Sibylla Daniel da Conceição','André Ricardo da Silva Nunes Gomes','Bruno Marques Pinheiro','Caio Fernando Faria','Guilherme Souza de Abreu','Gustavo Garbelini Piacente');

-- LOGÍSTICA (11H - 12H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'LOGÍSTICA' AND o.horario = '11H - 12H'
AND a.nome IN ('Regina Doi Pillon','Bernardo Gabriel de Souza Gomes','Felipe Gabriel Camargo Ribeiro Martins','Guilherme Antônio da Silva Vitória','Pedro Gabriel Nunes dos Santos','Samantha Maciel de Oliveira','Nathan Gabriel Affonso Cortello','Filipe Campos Bento Silva','Felipe Zorzatto Mazalli','Erick Henrique Piacente','Davi Teixeira Galdino dos Santos','Beatriz Cristiny Teixeira Pires','Yuuki Losnaque Kameda','Antonio David de Souza Neto');

-- RH (10H - 11H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'RH' AND o.horario = '10H - 11H'
AND a.nome IN ('Bernardo Gabriel de Souza Gomes','Guilherme Antônio da Silva Vitória','Felipe dos Santos Leonardo','Daniel Bonfim de Oliveira','Guilherme Felicio Lopes','Henrique Carvalho Martins','Letícia Affonso Pingueiro','Yuuki Losnaque Kameda','Erick Henrique Piacente','Filipe Campos Bento Silva','Rafael de Melo Silva Alves','Nathan Gabriel Affonso Cortello','João Pedro de Souza Valério','Sheyla Martinez Soares');

-- RH (11H - 12H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'RH' AND o.horario = '11H - 12H'
AND a.nome IN ('Felipe Alves Canto','Gabriel Lucas Ferreira dos Santos','Heder de Souza Silva','Heitor Vinicius de Oliveira Bueno','Wesley Antunes Marreli','Bruno Marques Pinheiro','Caio Fernandes Faria','Henrique Carvalho Martins','Raquel Lissa Yamauti','Vinicius Shoiti Ozawa','Guilherme Felicio Lopes','Rafael de Melo Silva Alves','Kauã Teixeira de Andrade','Maria Eduarda Rangel de Souza','João Pedro de Souza Valério');

-- FINANCEIRO (10H - 11H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'FINANCEIRO' AND o.horario = '10H - 11H'
AND a.nome IN ('Fernanda Alves Diniz','Hugo Nishikito Alexandre Soares','Felipe Alves Canto','Gabriel Lucas Ferreira dos Santos','Heitor Vinicius de Oliveira Bueno','Pedro Gabriel Nunes dos Santos','Ana Clara Magalhães Souza','Antonio David de Souza Neto','Filipe Zorzatto Mazalli','Yasmin Barboza Candido','Samantha Maciel de Oliveira','Elves Moreira dos Santos Junior','Vinicius Shoiti Ozawa','Lucas Henrique Rodrigues Caldas');

-- FINANCEIRO (11H - 12H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'FINANCEIRO' AND o.horario = '11H - 12H'
AND a.nome IN ('Luis Otavio Sales Mendes','João Felipe Martins Marassi Cruz','Rafaela Bossoni','Beatriz Batista da Silva','Davi Diniz Dalevedo','Gabriel Fernando de Souza','Eduarda Leal Tavares','Isabella da Silva Ferreira','Nicolas Gabriel Venâncio dos Santos','Sibylla Daniel da Conceição','Gabriel Serra da Silva','André Ricardo da Silva Nunes Gomes','Leonardo Maximus Adão da Silva','Daniel Bonfim de Oliveira');

-- MARKETING (10H - 11H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'MARKETING' AND o.horario = '10H - 11H'
AND a.nome IN ('Regina Doi Pillon','André Romualdo da Silva Junior','Davi Ferreira Neris','Enzo Bicalho Almeida','Gabriel Fernando de Souza','Gabriel Ferreira Ferraz','Gabriel Serra da Silva','Heder de Souza Silva','Heitor Pedroni Cruz','Isabella da Silva Ferreira','Kauã de Lira Guelfi','Leonardo Maximus Adão da Silva','Luis Otavio Sales Mendes','Marcelo Amancio Filho','Miguel França','Miguel Gabriel Luz de Melo','Rafael Viana Pereira','Ryan Augusto Resende de Oliveira','Wesley Antunes Marreli');

-- MARKETING (11H - 12H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'MARKETING' AND o.horario = '11H - 12H'
AND a.nome IN ('Flávio Tavares de Moraes','Maria Eduarda Durães Cruz Mesquita','Eleno Doi Pillon','Alexandre de Souza Lima','Elves Moreira Santos Junior','Leticia Affonso Pingueiro','Sheyla Martins Soares','Guilherme de Souza de Abreu','Dorival Camara Filho','David Peres Filho','Lucas Henrique Rodrigues Caldas','Murilo Souza Targa','Yasmin Barbosa Candido','Olivia Maria Di Froscia Costa','Gustavo Alcantara Craiba');

-- DESIGN DIGITAL (10H - 11H)
INSERT INTO public.inscricoes (aluno_id, oficina_id)
SELECT a.id, o.id FROM public.alunos a, public.oficinas o
WHERE o.nome = 'DESIGN DIGITAL' AND o.horario = '10H - 11H'
AND a.nome IN ('Amanda Castão Vaz','Amanda Cristina Constantino','Bianca Teixeira Preciso','Felipe Miguel de Oliveira Costa dos Santos','Fernanda Venancio da Silva','Gabriel Carnaval','Jean Luccas','Lara de Souza Pedrasolli','Lívia Luz Lemes','Lorena','Manuela Moraes do Prado','Maria Eduarda de Souza','Maria Laura Candido Novais','Miguel Ramos','Natanael Carvalho da Silva','Raphael De Lima','Raphaella Orasmo Dalla Pria','Rayane Vitória Barberdes de Souza','Vitória Aparecida Adorno da Silva','Vitória de Oliveira Leite');

-- Repita para cada oficina, listando os nomes dos alunos de cada uma
-- Exemplo:
-- INSERT INTO public.inscricoes (aluno_id, oficina_id)
-- SELECT a.id, o.id FROM public.alunos a, public.oficinas o
-- WHERE o.nome = 'NOME DA OFICINA' AND o.horario = 'HORÁRIO'
-- AND a.nome IN ('NOME1','NOME2',...);

-- Observação: Os IDs são baseados na ordem de inserção dos alunos e oficinas. Se houver diferença, ajuste conforme necessário.

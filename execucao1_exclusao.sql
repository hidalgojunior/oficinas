-- Exclui todos os dados das tabelas (ordem correta para evitar conflitos de FK)
DELETE FROM public.presencas;
DELETE FROM public.inscricoes;
DELETE FROM public.alunos;
DELETE FROM public.oficinas;

-- Tabelas principais para o sistema de oficinas

-- 1. Tabela de Alunos
CREATE TABLE IF NOT EXISTS public.alunos (
    id serial PRIMARY KEY,
    nome text NOT NULL,
    serie text NOT NULL,
    curso text NOT NULL
);

-- 2. Tabela de Oficinas
CREATE TABLE IF NOT EXISTS public.oficinas (
    id serial PRIMARY KEY,
    nome text NOT NULL,
    horario text NOT NULL
);

-- 3. Tabela de Inscrições
CREATE TABLE IF NOT EXISTS public.inscricoes (
    id serial PRIMARY KEY,
    aluno_id integer REFERENCES public.alunos(id) ON DELETE CASCADE,
    oficina_id integer REFERENCES public.oficinas(id) ON DELETE CASCADE
);

-- 4. Tabela de Presenças
CREATE TABLE IF NOT EXISTS public.presencas (
    id serial PRIMARY KEY,
    inscricao_id integer REFERENCES public.inscricoes(id) ON DELETE CASCADE,
    presente boolean,
    data date
);

-- Permissões básicas para acesso anônimo (ajuste conforme necessário)
-- Permitir SELECT, INSERT, UPDATE para todos
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oficinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presencas ENABLE ROW LEVEL SECURITY;

-- Políticas de exemplo (ajuste conforme sua necessidade de segurança)
CREATE POLICY "Public Select" ON public.alunos FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON public.alunos FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON public.alunos FOR UPDATE USING (true);

CREATE POLICY "Public Select" ON public.oficinas FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON public.oficinas FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON public.oficinas FOR UPDATE USING (true);

CREATE POLICY "Public Select" ON public.inscricoes FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON public.inscricoes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON public.inscricoes FOR UPDATE USING (true);

CREATE POLICY "Public Select" ON public.presencas FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON public.presencas FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON public.presencas FOR UPDATE USING (true);

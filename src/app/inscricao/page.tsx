"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Inscricao() {
  // Função para exportar inscrições em CSV
  const [inscricoes, setInscricoes] = useState<any[]>([]);
  useEffect(() => {
    supabase
      .from("inscricoes")
      .select("id, alunos(nome, serie, curso), oficinas(nome, horario)")
      .order("alunos.nome")
      .then(({ data }) => setInscricoes(data || []));
  }, []);

  function exportCSV() {
    if (!inscricoes.length) return;
    const rows = inscricoes.map((row: any) => ({
      Nome: row.alunos?.nome,
      Série: row.alunos?.serie,
      Curso: row.alunos?.curso,
      Oficina: row.oficinas?.nome,
      Horário: row.oficinas?.horario,
    }));
    import("papaparse").then(Papa => {
      const csv = Papa.unparse(rows);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inscricoes.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  const [nome, setNome] = useState("");
  const [serie, setSerie] = useState("");
  const [curso, setCurso] = useState("");
  const [oficinaId, setOficinaId] = useState("");
  const [oficinas, setOficinas] = useState<any[]>([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("oficinas")
      .select("id, nome, horario")
      .order("nome")
      .then(({ data }) => setOficinas(data || []));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    if (!nome || !serie || !curso || !oficinaId) {
      setMsg("Preencha todos os campos!");
      setLoading(false);
      return;
    }
    // Cria aluno
    const { data: aluno, error: alunoError } = await supabase
      .from("alunos")
      .insert([{ nome, serie, curso }])
      .select()
      .single();
    if (alunoError || !aluno) {
      setMsg("Erro ao cadastrar aluno.");
      setLoading(false);
      return;
    }
    // Cria inscrição
    const { error: inscError } = await supabase
      .from("inscricoes")
      .insert([{ aluno_id: aluno.id, oficina_id: oficinaId }]);
    if (inscError) {
      setMsg("Erro ao cadastrar inscrição.");
      setLoading(false);
      return;
    }
    setMsg("Inscrição realizada com sucesso!");
    setNome("");
    setSerie("");
    setCurso("");
    setOficinaId("");
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-red-500">
      <div className="w-full max-w-3xl mx-auto my-8 p-8 rounded-3xl bg-white bg-opacity-80 shadow-2xl">
        <button
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={exportCSV}
          disabled={!inscricoes.length}
        >
          Exportar Inscrições CSV
        </button>
      </div>
      <div className="w-full max-w-lg mx-auto my-8 p-8 rounded-3xl bg-white bg-opacity-80 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Inscrição nas Oficinas</h1>
        {msg && (
          <div className={`mb-4 p-2 rounded text-center ${msg.includes("sucesso") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{msg}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 bg-blue-50 p-6 rounded-xl shadow">
          <input type="text" name="nome" placeholder="Nome completo" className="w-full p-2 border rounded" value={nome} onChange={e => setNome(e.target.value)} required />
          <select name="serie" className="w-full p-2 border rounded" value={serie} onChange={e => setSerie(e.target.value)} required>
            <option value="">Selecione a série</option>
            <option value="1º">1ª Série</option>
            <option value="2º">2ª Série</option>
          </select>
          <select name="curso" className="w-full p-2 border rounded" value={curso} onChange={e => setCurso(e.target.value)} required>
            <option value="">Selecione o curso</option>
            <option value="ADM">Administração</option>
            <option value="DS">Desenvolvimento de Sistemas</option>
          </select>
          <select name="oficina_id" className="w-full p-2 border rounded" value={oficinaId} onChange={e => setOficinaId(e.target.value)} required>
            <option value="">Selecione a oficina</option>
            {oficinas.map((of: any) => (
              <option key={of.id} value={of.id}>{of.nome} ({of.horario})</option>
            ))}
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded" disabled={loading}>{loading ? "Enviando..." : "Inscrever"}</button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-700 hover:underline">Voltar para o início</a>
        </div>
      </div>
    </main>
  );
}

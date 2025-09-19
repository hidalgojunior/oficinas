"use client";
import Link from 'next/link';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Presenca() {
  // Importação de presenças via CSV
  async function handleImportCSV(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const Papa = (await import("papaparse")).default;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: any) => {
        // Espera colunas: Nome, Série, Curso, Oficina, Presente
        const rows = results.data;
        // Buscar oficinas existentes
        const { data: oficinasDb } = await supabase.from("oficinas").select("id, nome");
        // Buscar alunos existentes
        const { data: alunosDb } = await supabase.from("alunos").select("id, nome, serie, curso");
        // Buscar inscrições existentes
        const { data: inscricoesDb } = await supabase.from("inscricoes").select("id, aluno_id, oficina_id");
        const presencasToInsert = rows.map((row: any) => {
          const oficina = oficinasDb?.find((o: any) => o.nome === row["Oficina"]);
          const aluno = alunosDb?.find((a: any) => a.nome === row["Nome"] && a.serie === row["Série"] && a.curso === row["Curso"]);
          const inscricao = inscricoesDb?.find((i: any) => i.aluno_id === aluno?.id && i.oficina_id === oficina?.id);
          if (!inscricao) return null;
          return {
            inscricao_id: inscricao.id,
            presente: row["Presente"]?.toLowerCase() === "sim" || row["Presente"] === "1" || row["Presente"] === "true",
            data: new Date().toISOString().slice(0, 10),
          };
        }).filter(Boolean);
        if (presencasToInsert.length) {
          const { error } = await supabase.from("presencas").insert(presencasToInsert);
          if (!error) {
            alert("Presenças importadas com sucesso!");
            window.location.reload();
          } else {
            alert("Erro ao importar presenças: " + error.message);
          }
        } else {
          alert("Nenhuma presença válida encontrada no arquivo.");
        }
      },
      error: (err: any) => alert("Erro ao ler CSV: " + err.message),
    });
  }
  // Função para exportar presenças em CSV
  function exportCSV() {
    if (!alunos.length) return;
    const rows = alunos.map((row: any) => ({
      Nome: row.alunos?.nome,
      Série: row.alunos?.serie,
      Curso: row.alunos?.curso,
      Presente: row.presencas?.[0]?.presente === true ? "Sim" : row.presencas?.[0]?.presente === false ? "Não" : "",
      Oficina: row.oficinas?.nome,
      Horário: row.oficinas?.horario,
    }));
    import("papaparse").then(Papa => {
      const csv = Papa.unparse(rows);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "presencas.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  const [oficinaId, setOficinaId] = useState("");
  const [oficinas, setOficinas] = useState<any[]>([]);
  const [alunos, setAlunos] = useState<any[]>([]);
  const [presencas, setPresencas] = useState<{ [key: string]: string }>({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("oficinas")
      .select("id, nome, horario")
      .order("nome")
      .then(({ data }) => setOficinas(data || []));
  }, []);

  useEffect(() => {
    if (!oficinaId) return setAlunos([]);
    supabase
      .from("inscricoes")
      .select("id, aluno_id, alunos(nome, serie, curso), presencas(id, presente)")
      .eq("oficina_id", oficinaId)
      .order("alunos.nome")
      .then(({ data }) => {
        setAlunos(data || []);
        const pres: { [key: string]: string } = {};
        (data || []).forEach((insc: any) => {
          pres[insc.id] = insc.presencas?.[0]?.presente?.toString() || "";
        });
        setPresencas(pres);
      });
  }, [oficinaId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    for (const insc of alunos) {
      const presente = presencas[insc.id];
      if (presente === "") continue;
      // Verifica se já existe presença
      const { data: existing } = await supabase
        .from("presencas")
        .select("id")
        .eq("inscricao_id", insc.id)
        .single();
      if (existing) {
        await supabase
          .from("presencas")
          .update({ presente, data: new Date().toISOString().slice(0, 10) })
          .eq("inscricao_id", insc.id);
      } else {
        await supabase
          .from("presencas")
          .insert({ inscricao_id: insc.id, presente, data: new Date().toISOString().slice(0, 10) });
      }
    }
    setMsg("Presenças salvas com sucesso!");
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-red-500">
      <div className="w-full max-w-3xl mx-auto my-8 p-8 rounded-3xl bg-white bg-opacity-80 shadow-2xl">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={exportCSV}
            disabled={!alunos.length}
          >
            Exportar Presenças CSV
          </button>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Importar CSV</span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleImportCSV}
            />
          </label>
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto my-8 p-8 rounded-3xl bg-white bg-opacity-80 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Controle de Presença</h1>
        {msg && (
          <div className="mb-4 p-2 rounded text-center bg-green-100 text-green-800">{msg}</div>
        )}
        <form className="mb-6 flex gap-2" onSubmit={e => { e.preventDefault(); }}>
          <select name="oficina_id" className="border p-2 rounded" value={oficinaId} onChange={e => setOficinaId(e.target.value)} required>
            <option value="">Selecione a oficina</option>
            {oficinas.map((of: any) => (
              <option key={of.id} value={of.id}>{of.nome} ({of.horario})</option>
            ))}
          </select>
        </form>
        {oficinaId && (
          <form onSubmit={handleSubmit} className="bg-blue-50 p-4 rounded-xl shadow">
            <table className="min-w-full bg-white border border-gray-200 mb-4">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-4 border">Nome</th>
                  <th className="py-2 px-4 border">Série</th>
                  <th className="py-2 px-4 border">Curso</th>
                  <th className="py-2 px-4 border">Presente?</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((insc: any) => (
                  <tr key={insc.id} className="hover:bg-blue-50">
                    <td className="py-2 px-4 border">{insc.alunos.nome}</td>
                    <td className="py-2 px-4 border">{insc.alunos.serie}</td>
                    <td className="py-2 px-4 border">{insc.alunos.curso}</td>
                    <td className="py-2 px-4 border text-center">
                      <select
                        value={presencas[insc.id] || ""}
                        onChange={e => setPresencas(p => ({ ...p, [insc.id]: e.target.value }))}
                        className="border p-1 rounded"
                      >
                        <option value="">-</option>
                        <option value="1">Sim</option>
                        <option value="0">Não</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded" disabled={loading}>{loading ? "Salvando..." : "Salvar Presenças"}</button>
          </form>
        )}
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-700 hover:underline">Voltar para o início</Link>
        </div>
      </div>
    </main>
  );
}

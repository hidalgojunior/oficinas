/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Alunos() {
  // Importação de alunos via CSV
  async function handleImportCSV(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const Papa = (await import("papaparse")).default;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: any) => {
        const alunosToInsert = results.data.map((row: any) => ({
          nome: row["Nome"] || row["nome"],
          serie: row["Série"] || row["serie"] || row["série"],
          curso: row["Curso"] || row["curso"],
        })).filter((a: any) => a.nome && a.serie && a.curso);
        if (alunosToInsert.length) {
          const { error } = await supabase.from("alunos").insert(alunosToInsert);
          if (!error) {
            alert("Alunos importados com sucesso!");
            window.location.reload();
          } else {
            alert("Erro ao importar alunos: " + error.message);
          }
        } else {
          alert("Nenhum aluno válido encontrado no arquivo.");
        }
      },
      error: (err: any) => alert("Erro ao ler CSV: " + err.message),
    });
  }
  const [alunos, setAlunos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlunos() {
      setLoading(true);
      const { data, error } = await supabase
        .from("inscricoes")
        .select("id, alunos(nome, serie, curso), oficinas(nome, horario)")
        .order("alunos.nome");
      setAlunos(data || []);
      setLoading(false);
    }
    fetchAlunos();
  }, []);

  // Função para exportar CSV
  function exportCSV() {
    if (!alunos.length) return;
    const rows = alunos.map((row: any) => ({
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
      link.setAttribute("download", "alunos.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-red-500">
      <div className="w-full max-w-3xl mx-auto my-8 p-8 rounded-3xl bg-white bg-opacity-80 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Alunos Cadastrados</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={exportCSV}
            disabled={loading || !alunos.length}
          >
            Exportar CSV
          </button>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Importar CSV</span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleImportCSV}
              disabled={loading}
            />
          </label>
        </div>
        {loading ? (
          <div className="text-center">Carregando...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-4 border">Nome</th>
                  <th className="py-2 px-4 border">Série</th>
                  <th className="py-2 px-4 border">Curso</th>
                  <th className="py-2 px-4 border">Oficina</th>
                  <th className="py-2 px-4 border">Horário</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((row: any) => (
                  <tr key={row.id} className="hover:bg-blue-50">
                    <td className="py-2 px-4 border">{row.alunos?.nome}</td>
                    <td className="py-2 px-4 border">{row.alunos?.serie}</td>
                    <td className="py-2 px-4 border">{row.alunos?.curso}</td>
                    <td className="py-2 px-4 border">{row.oficinas?.nome}</td>
                    <td className="py-2 px-4 border">{row.oficinas?.horario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-700 hover:underline">Voltar para o início</a>
        </div>
      </div>
    </main>
  );
}

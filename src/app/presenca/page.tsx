"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Presenca() {
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
          <a href="/" className="text-blue-700 hover:underline">Voltar para o início</a>
        </div>
      </div>
    </main>
  );
}

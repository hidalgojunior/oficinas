"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Alunos() {
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-red-500">
      <div className="w-full max-w-3xl mx-auto my-8 p-8 rounded-3xl bg-white bg-opacity-80 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Alunos Cadastrados</h1>
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

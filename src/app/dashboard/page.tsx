"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [oficinas, setOficinas] = useState<any[]>([]);
  const [cursos, setCursos] = useState(["ADM", "DS"]);
  const [series, setSeries] = useState(["1º", "2º"]);
  const [filtro, setFiltro] = useState({ oficina: "", curso: "", serie: "" });
  const [resumo, setResumo] = useState({ inscritos: 0, presentes: 0, ausentes: 0 });
  const [grafOficinas, setGrafOficinas] = useState<any[]>([]);
  const [grafCursos, setGrafCursos] = useState<any[]>([]);
  const [grafSeries, setGrafSeries] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("oficinas")
      .select("id, nome, horario")
      .order("nome")
      .then(({ data }) => setOficinas(data || []));
  }, []);

  useEffect(() => {
    async function fetchResumo() {
      // Resumo geral
      let query = supabase
        .from("inscricoes")
        .select("id, alunos!inner(*), presencas(presente)", { count: "exact" });
      if (filtro.oficina) query = query.eq("oficina_id", filtro.oficina);
      if (filtro.curso) query = query.eq("alunos.curso", filtro.curso);
      if (filtro.serie) query = query.eq("alunos.serie", filtro.serie);
      const { data, count } = await query;
      let presentes = 0, ausentes = 0;
      (data || []).forEach((insc: any) => {
        if (insc.presencas?.[0]?.presente === true || insc.presencas?.[0]?.presente === 1) presentes++;
        else if (insc.presencas?.[0]?.presente === false || insc.presencas?.[0]?.presente === 0) ausentes++;
      });
      setResumo({ inscritos: count || 0, presentes, ausentes });
    }
    fetchResumo();
  }, [filtro]);

  useEffect(() => {
    async function fetchGraficos() {
      // Por oficina
      const { data: oficinasList } = await supabase.from("oficinas").select("id, nome, horario").order("nome");
      const grafOf: any[] = [];
      for (const ofi of oficinasList || []) {
        const { data } = await supabase
          .from("inscricoes")
          .select("id, presencas(presente)")
          .eq("oficina_id", ofi.id);
        let presentes = 0, ausentes = 0;
        (data || []).forEach((insc: any) => {
          if (insc.presencas?.[0]?.presente === true || insc.presencas?.[0]?.presente === 1) presentes++;
          else if (insc.presencas?.[0]?.presente === false || insc.presencas?.[0]?.presente === 0) ausentes++;
        });
        grafOf.push({ nome: `${ofi.nome} (${ofi.horario})`, presentes, ausentes });
      }
      setGrafOficinas(grafOf);
      // Por curso
      const cursosArr = ["ADM", "DS"];
      const grafCur: any[] = [];
      for (const curso of cursosArr) {
        const { data } = await supabase
          .from("inscricoes")
          .select("id, alunos!inner(curso), presencas(presente)")
          .eq("alunos.curso", curso);
        let presentes = 0, ausentes = 0;
        (data || []).forEach((insc: any) => {
          if (insc.presencas?.[0]?.presente === true || insc.presencas?.[0]?.presente === 1) presentes++;
          else if (insc.presencas?.[0]?.presente === false || insc.presencas?.[0]?.presente === 0) ausentes++;
        });
        grafCur.push({ nome: curso === "ADM" ? "Administração" : "Desenvolvimento de Sistemas", presentes, ausentes });
      }
      setGrafCursos(grafCur);
      // Por série
      const seriesArr = ["1º", "2º"];
      const grafSer: any[] = [];
      for (const serie of seriesArr) {
        const { data } = await supabase
          .from("inscricoes")
          .select("id, alunos!inner(serie), presencas(presente)")
          .eq("alunos.serie", serie);
        let presentes = 0, ausentes = 0;
        (data || []).forEach((insc: any) => {
          if (insc.presencas?.[0]?.presente === true || insc.presencas?.[0]?.presente === 1) presentes++;
          else if (insc.presencas?.[0]?.presente === false || insc.presencas?.[0]?.presente === 0) ausentes++;
        });
        grafSer.push({ nome: serie === "1º" ? "1ª Série" : "2ª Série", presentes, ausentes });
      }
      setGrafSeries(grafSer);
    }
    fetchGraficos();
  }, [filtro]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-red-500">
      <div className="w-full max-w-5xl mx-auto my-8 p-8 rounded-3xl bg-white bg-opacity-80 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Dashboard de Presenças</h1>
        <form className="flex flex-wrap gap-4 mb-6">
          <select className="border p-2 rounded" value={filtro.oficina} onChange={e => setFiltro(f => ({ ...f, oficina: e.target.value }))}>
            <option value="">Todas as Oficinas</option>
            {oficinas.map((of: any) => (
              <option key={of.id} value={of.id}>{of.nome} ({of.horario})</option>
            ))}
          </select>
          <select className="border p-2 rounded" value={filtro.curso} onChange={e => setFiltro(f => ({ ...f, curso: e.target.value }))}>
            <option value="">Todos os Cursos</option>
            <option value="ADM">Administração</option>
            <option value="DS">Desenvolvimento de Sistemas</option>
          </select>
          <select className="border p-2 rounded" value={filtro.serie} onChange={e => setFiltro(f => ({ ...f, serie: e.target.value }))}>
            <option value="">Todas as Séries</option>
            <option value="1º">1ª Série</option>
            <option value="2º">2ª Série</option>
          </select>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="font-bold text-lg">Total de Inscritos</h2>
            <p className="text-2xl">{resumo.inscritos}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="font-bold text-lg">Presentes</h2>
            <p className="text-2xl">{resumo.presentes}</p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow">
            <h2 className="font-bold text-lg">Ausentes</h2>
            <p className="text-2xl">{resumo.ausentes}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="font-bold text-lg mb-2">Presenças por Oficina</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-200">
                  <th className="py-1 px-2">Oficina</th>
                  <th className="py-1 px-2">Presentes</th>
                  <th className="py-1 px-2">Ausentes</th>
                </tr>
              </thead>
              <tbody>
                {grafOficinas.map((g: any) => (
                  <tr key={g.nome}>
                    <td className="py-1 px-2">{g.nome}</td>
                    <td className="py-1 px-2 text-green-700 font-bold">{g.presentes}</td>
                    <td className="py-1 px-2 text-red-700 font-bold">{g.ausentes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="font-bold text-lg mb-2">Presenças por Curso</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-200">
                  <th className="py-1 px-2">Curso</th>
                  <th className="py-1 px-2">Presentes</th>
                  <th className="py-1 px-2">Ausentes</th>
                </tr>
              </thead>
              <tbody>
                {grafCursos.map((g: any) => (
                  <tr key={g.nome}>
                    <td className="py-1 px-2">{g.nome}</td>
                    <td className="py-1 px-2 text-green-700 font-bold">{g.presentes}</td>
                    <td className="py-1 px-2 text-red-700 font-bold">{g.ausentes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="font-bold text-lg mb-2">Presenças por Série</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-200">
                  <th className="py-1 px-2">Série</th>
                  <th className="py-1 px-2">Presentes</th>
                  <th className="py-1 px-2">Ausentes</th>
                </tr>
              </thead>
              <tbody>
                {grafSeries.map((g: any) => (
                  <tr key={g.nome}>
                    <td className="py-1 px-2">{g.nome}</td>
                    <td className="py-1 px-2 text-green-700 font-bold">{g.presentes}</td>
                    <td className="py-1 px-2 text-red-700 font-bold">{g.ausentes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-700 hover:underline">Voltar para o início</a>
        </div>
      </div>
    </main>
  );
}

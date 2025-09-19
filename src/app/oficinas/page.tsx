/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { QRCodeSVG } from "qrcode.react";

export default function Oficinas() {
  const [oficinas, setOficinas] = useState<any[]>([]);
  useEffect(() => {
    supabase
      .from("oficinas")
      .select("id, nome, horario")
      .order("nome")
      .then(({ data }) => setOficinas(data || []));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-red-500">
      <div className="w-full max-w-4xl mx-auto my-8 p-8 rounded-3xl bg-white bg-opacity-80 shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">QR Code por Oficina</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {oficinas.map((oficina: any) => (
            <div key={oficina.id} className="flex flex-col items-center bg-blue-50 rounded-xl p-4 shadow">
              <h2 className="font-semibold text-lg mb-2 text-blue-800">{oficina.nome}</h2>
              <p className="mb-2 text-gray-700">Horário: {oficina.horario}</p>
              <QRCodeSVG value={JSON.stringify({ oficinaId: oficina.id, nome: oficina.nome })} width={160} height={160} />
              <p className="mt-2 text-xs text-gray-500">ID: {oficina.id}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="/" className="text-blue-700 hover:underline">Voltar para o início</a>
        </div>
      </div>
    </main>
  );
}

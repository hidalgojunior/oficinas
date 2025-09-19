"use client";
import Link from 'next/link';

export default function AlunosSimples() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Alunos (Teste)</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">Esta é uma versão simplificada da página de alunos.</p>
          <p className="text-gray-600 mb-6">Se você vê esta página, as rotas estão funcionando!</p>
          <div className="space-y-2">
            <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4">
              Voltar para Home
            </Link>
            <Link href="/teste" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Página de Teste
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
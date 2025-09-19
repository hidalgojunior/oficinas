"use client";
import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Página de Teste</h1>
        <p className="text-gray-600 mb-4">Se você vê esta página, o Next.js está funcionando!</p>
        <div className="space-y-2">
          <Link href="/" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">
            Voltar para Home
          </Link>
          <Link href="/alunos" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center">
            Testar /alunos
          </Link>
        </div>
      </div>
    </div>
  );
}
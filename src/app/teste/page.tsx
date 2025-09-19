export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Página de Teste</h1>
        <p className="text-gray-600">Se você vê esta página, o Next.js está funcionando!</p>
        <a href="/" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Voltar para Home
        </a>
      </div>
    </div>
  );
}
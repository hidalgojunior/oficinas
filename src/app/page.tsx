import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-red-500">
      <div className="w-full max-w-2xl mx-auto my-8 p-8 rounded-3xl bg-white bg-opacity-80 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" className="w-16 h-16" />
          <div>
            <h1 className="text-3xl font-extrabold text-blue-700">Oficinas Etec Devisate</h1>
            <p className="text-gray-700">Controle de Presenças e Participação</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link href="/inscricao" className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-center shadow-lg transition">Inscrição de Aluno</Link>
          <Link href="/presenca" className="block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl text-center shadow-lg transition">Controle de Presença</Link>
          <Link href="/dashboard" className="block bg-black hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-xl text-center shadow-lg transition">Dashboard Interativo</Link>
          <Link href="/alunos" className="block bg-white hover:bg-blue-100 text-blue-700 font-bold py-4 px-6 rounded-xl text-center shadow-lg border-2 border-blue-600 transition">Lista de Alunos</Link>
        </div>
        <div className="text-center text-gray-600 mt-4">
          <span className="font-bold">Evento:</span> Oficinas Etec Antonio Devisate - {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>
      <footer className="text-white mt-8 opacity-80">
        &copy; {new Date().getFullYear()} Etec Devisate - Sistema de Oficinas
      </footer>
    </main>
  );
}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

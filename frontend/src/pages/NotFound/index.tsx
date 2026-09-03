import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-xl gap-4 text-center py-50">
        <div className="relative z-10 flex flex-col items-center justify-center text-xl gap-4 text-center">
          <BiError
            className="pointer-events-none absolute -left -top-30 h-32 w-32 text-yellow-400/30"
            aria-hidden="true"
          />
          <h1 className="text-2xl md:text-4xl font-bold text-blue-800 text-center">
            Oops! Página não encontrada. :(
          </h1>
          <p className="text-zinc-700 text-base md:text-lg text-center">
            Parece que não encontramos a página que você procura. Volte para a{" "}
            <Link to="/" className="text-blue-900 hover:underline">
              página inicial
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7FAFC] px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-[#1E3A5F]/10">404</div>
        <h1 className="mt-4 text-3xl font-bold text-[#1E3A5F]">
          Pagina Niet Gevonden
        </h1>
        <p className="mt-4 max-w-md text-gray-600">
          De pagina die u zoekt bestaat niet of is verplaatst. Controleer de URL
          of ga terug naar de homepage.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Naar Homepage
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

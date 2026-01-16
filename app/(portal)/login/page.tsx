"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/logo";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
        },
      });

      if (error) {
        throw error;
      }

      setIsSent(true);
      toast.success("Link verzonden!", {
        description: "Controleer uw inbox voor de login link.",
      });
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Er is iets misgegaan", {
        description: "Probeer het later opnieuw.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm text-gray-600 hover:text-[#1E3A5F]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar website
          </Link>

          <Logo />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h1 className="text-2xl font-bold text-[#1E3A5F]">
              Klantenportaal
            </h1>
            <p className="mt-2 text-gray-600">
              Log in om uw projecten en documenten te bekijken.
            </p>

            {authError && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Er is een fout opgetreden. Probeer opnieuw in te loggen.</span>
                </div>
              </div>
            )}

            {isSent ? (
              <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
                <h2 className="mt-4 font-semibold text-green-800">
                  Link Verzonden!
                </h2>
                <p className="mt-2 text-sm text-green-700">
                  We hebben een login link gestuurd naar{" "}
                  <strong>{email}</strong>. Klik op de link in de email om in te
                  loggen.
                </p>
                <Button
                  onClick={() => {
                    setIsSent(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Andere email gebruiken
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <Label htmlFor="email">Emailadres</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="uw@email.be"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    "Login Link Versturen"
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  U ontvangt een email met een veilige login link. Geen
                  wachtwoord nodig.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden bg-[#1E3A5F] lg:block lg:w-1/2">
        <div className="flex h-full flex-col items-center justify-center p-12">
          <div className="max-w-md text-center text-white">
            <div className="text-6xl font-bold opacity-20">DR</div>
            <h2 className="mt-6 text-2xl font-semibold">
              Welkom bij het Klantenportaal
            </h2>
            <p className="mt-4 text-white/70">
              Volg uw projecten, download documenten en blijf op de hoogte van
              de voortgang.
            </p>
            <div className="mt-8 flex justify-center gap-8 text-white/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm">Toegang</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Real-time</div>
                <div className="text-sm">Updates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Veilig</div>
                <div className="text-sm">Documenten</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginPageSkeleton() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mt-8 space-y-4">
            <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
            <div className="mt-8 h-12 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="hidden bg-[#1E3A5F] lg:block lg:w-1/2" />
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPANY, CONTACT_SUBJECTS } from "@/lib/constants";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      naam: "",
      email: "",
      telefoon: "",
      onderwerp: undefined,
      bericht: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Verzenden mislukt");
      }

      setIsSuccess(true);
      reset();
      toast.success("Bericht verzonden!", {
        description: "Wij nemen zo snel mogelijk contact met u op.",
      });
    } catch {
      toast.error("Er is iets misgegaan", {
        description: "Probeer het later opnieuw of neem telefonisch contact op.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1E3A5F] pb-16 pt-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Neem Contact Op
            </h1>
            <p className="mt-6 text-xl text-white/70">
              Heeft u een vraag of wilt u een vrijblijvende offerte? Wij helpen u
              graag verder.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold text-[#1E3A5F]">
                Contactgegevens
              </h2>
              <p className="mt-4 text-gray-600">
                U kunt ons bereiken via onderstaande gegevens of vul het
                formulier in.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EBF4FF] text-[#1E3A5F]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1E3A5F]">Adres</div>
                    <div className="mt-1 text-gray-600">
                      {COMPANY.address.street}
                      <br />
                      {COMPANY.address.postal} {COMPANY.address.city}
                      <br />
                      {COMPANY.address.country}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EBF4FF] text-[#1E3A5F]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1E3A5F]">Telefoon</div>
                    <a
                      href={`tel:${COMPANY.contact.phone}`}
                      className="mt-1 text-gray-600 hover:text-[#4299E1]"
                    >
                      {COMPANY.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EBF4FF] text-[#1E3A5F]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1E3A5F]">Email</div>
                    <a
                      href={`mailto:${COMPANY.contact.email}`}
                      className="mt-1 text-gray-600 hover:text-[#4299E1]"
                    >
                      {COMPANY.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="mt-8 rounded-xl bg-[#F7FAFC] p-6">
                <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Bedrijfsgegevens
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="text-gray-500">KBO:</span> {COMPANY.kbo}
                  </div>
                  <div>
                    <span className="text-gray-500">BTW:</span> {COMPANY.btw}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {isSuccess ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <h3 className="mt-4 text-xl font-semibold text-green-800">
                    Bericht Verzonden!
                  </h3>
                  <p className="mt-2 text-green-700">
                    Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact
                    met u op.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6"
                    variant="outline"
                  >
                    Nieuw bericht sturen
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-[#1E3A5F]">
                    Stuur ons een bericht
                  </h2>

                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    {...register("honeypot")}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="naam">
                        Naam <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="naam"
                        {...register("naam")}
                        className="mt-2"
                        placeholder="Uw naam"
                      />
                      {errors.naam && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.naam.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-2"
                        placeholder="uw@email.be"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="telefoon">Telefoon</Label>
                      <Input
                        id="telefoon"
                        type="tel"
                        {...register("telefoon")}
                        className="mt-2"
                        placeholder="+32 ..."
                      />
                      {errors.telefoon && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.telefoon.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="onderwerp">
                        Onderwerp <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setValue(
                            "onderwerp",
                            value as ContactFormData["onderwerp"]
                          )
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Selecteer onderwerp" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTACT_SUBJECTS.map((subject) => (
                            <SelectItem
                              key={subject.value}
                              value={subject.value}
                            >
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.onderwerp && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.onderwerp.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="bericht">
                      Bericht <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="bericht"
                      {...register("bericht")}
                      className="mt-2 min-h-[150px]"
                      placeholder="Vertel ons meer over uw project of vraag..."
                    />
                    {errors.bericht && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.bericht.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-8">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verzenden...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Bericht Verzenden
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-gray-200">
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          <MapPin className="mr-2 h-6 w-6" />
          Google Maps integratie (Textielstraat 5, 9240 Zele)
        </div>
      </section>
    </>
  );
}

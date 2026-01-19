import { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Privacybeleid van Bouwwerken De Raedt Ivan NV",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-[#1E3A5F] pb-16 pt-32">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Privacybeleid
          </h1>
          <p className="mt-4 text-white/70">
            Laatst bijgewerkt: januari 2024
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="prose max-w-3xl">
            <h2>1. Verwerkingsverantwoordelijke</h2>
            <p>
              {COMPANY.name}, gevestigd te {COMPANY.address.street},{" "}
              {COMPANY.address.postal} {COMPANY.address.city}, is
              verantwoordelijk voor de verwerking van persoonsgegevens zoals
              weergegeven in deze privacyverklaring.
            </p>
            <p>
              <strong>KBO-nummer:</strong> {COMPANY.kbo}
              <br />
              <strong>Contact:</strong> {COMPANY.contact.email}
            </p>

            <h2>2. Welke gegevens verzamelen wij?</h2>
            <p>Wij verwerken de volgende categorieën persoonsgegevens:</p>
            <ul>
              <li>
                <strong>Contactgegevens:</strong> naam, emailadres,
                telefoonnummer, adres
              </li>
              <li>
                <strong>Communicatiegegevens:</strong> berichten via ons
                contactformulier
              </li>
              <li>
                <strong>Sollicitatiegegevens:</strong> CV, motivatiebrief
              </li>
              <li>
                <strong>Technische gegevens:</strong> IP-adres, browsertype
                (geanonimiseerd)
              </li>
            </ul>

            <h2>3. Verwerkingsdoeleinden</h2>
            <p>Wij verwerken uw persoonsgegevens voor de volgende doeleinden:</p>
            <ul>
              <li>Het beantwoorden van uw vragen en verzoeken</li>
              <li>Het versturen van offertes</li>
              <li>Het verwerken van sollicitaties</li>
              <li>Het verbeteren van onze website (geanonimiseerd)</li>
              <li>Het voldoen aan wettelijke verplichtingen</li>
            </ul>

            <h2>4. Rechtsgrond</h2>
            <p>
              De verwerking van uw persoonsgegevens is gebaseerd op één van de
              volgende rechtsgronden:
            </p>
            <ul>
              <li>Uw toestemming</li>
              <li>De uitvoering van een overeenkomst</li>
              <li>Een wettelijke verplichting</li>
              <li>Ons gerechtvaardigd belang</li>
            </ul>

            <h2>5. Bewaartermijn</h2>
            <p>
              Wij bewaren uw persoonsgegevens niet langer dan strikt noodzakelijk
              is om de doelen te realiseren waarvoor uw gegevens worden
              verzameld. Onze bewaartermijnen zijn:
            </p>
            <ul>
              <li>Contactformulier berichten: 2 jaar</li>
              <li>Sollicitaties: 1 jaar na afronding procedure</li>
              <li>Klantenportaal gegevens: duur van de samenwerking + 7 jaar</li>
            </ul>

            <h2>6. Uw rechten</h2>
            <p>Op grond van de AVG heeft u de volgende rechten:</p>
            <ul>
              <li>
                <strong>Recht op inzage:</strong> U heeft het recht om uw
                persoonsgegevens in te zien.
              </li>
              <li>
                <strong>Recht op rectificatie:</strong> U heeft het recht om
                onjuiste gegevens te laten corrigeren.
              </li>
              <li>
                <strong>Recht op verwijdering:</strong> U heeft het recht om uw
                gegevens te laten verwijderen.
              </li>
              <li>
                <strong>Recht op beperking:</strong> U heeft het recht om de
                verwerking te beperken.
              </li>
              <li>
                <strong>Recht op overdraagbaarheid:</strong> U heeft het recht om
                uw gegevens over te dragen.
              </li>
              <li>
                <strong>Recht van bezwaar:</strong> U heeft het recht om bezwaar
                te maken tegen de verwerking.
              </li>
            </ul>
            <p>
              Om uw rechten uit te oefenen, kunt u contact met ons opnemen via{" "}
              {COMPANY.contact.email}.
            </p>

            <h2>7. Beveiliging</h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om
              uw persoonsgegevens te beschermen tegen verlies, ongeautoriseerde
              toegang, en andere vormen van onrechtmatige verwerking.
            </p>

            <h2>8. Delen met derden</h2>
            <p>
              Wij delen uw persoonsgegevens alleen met derden indien dit nodig
              is voor de uitvoering van onze diensten of om te voldoen aan een
              wettelijke verplichting. Met bedrijven die uw gegevens verwerken
              in onze opdracht, sluiten wij een verwerkersovereenkomst.
            </p>

            <h2>9. Klachten</h2>
            <p>
              Indien u een klacht heeft over de verwerking van uw
              persoonsgegevens, kunt u contact met ons opnemen. U heeft
              daarnaast het recht om een klacht in te dienen bij de Belgische
              Gegevensbeschermingsautoriteit (GBA):
            </p>
            <p>
              Gegevensbeschermingsautoriteit
              <br />
              Drukpersstraat 35, 1000 Brussel
              <br />
              contact@apd-gba.be
              <br />
              www.gegevensbeschermingsautoriteit.be
            </p>

            <h2>10. Wijzigingen</h2>
            <p>
              Wij behouden ons het recht voor om dit privacybeleid te wijzigen.
              Wijzigingen worden op deze pagina gepubliceerd.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

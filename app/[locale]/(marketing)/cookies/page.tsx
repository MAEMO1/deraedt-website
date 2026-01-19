import { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Cookiebeleid van Bouwwerken De Raedt Ivan NV",
};

export default function CookiesPage() {
  return (
    <>
      <section className="bg-[#1E3A5F] pb-16 pt-32">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Cookiebeleid
          </h1>
          <p className="mt-4 text-white/70">
            Laatst bijgewerkt: januari 2024
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="prose max-w-3xl">
            <h2>Wat zijn cookies?</h2>
            <p>
              Cookies zijn kleine tekstbestanden die op uw computer of mobiel
              apparaat worden opgeslagen wanneer u onze website bezoekt. Ze
              helpen ons om de website goed te laten functioneren en om uw
              voorkeuren te onthouden.
            </p>

            <h2>Welke cookies gebruiken wij?</h2>

            <h3>1. Noodzakelijke cookies</h3>
            <p>
              Deze cookies zijn essentieel voor het functioneren van de website.
              Zonder deze cookies kunnen bepaalde onderdelen van de website niet
              werken.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Doel</th>
                  <th>Bewaartermijn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>deraedt-cookie-consent</td>
                  <td>Onthoudt uw cookievoorkeuren</td>
                  <td>1 jaar</td>
                </tr>
                <tr>
                  <td>sb-*-auth-token</td>
                  <td>Authenticatie klantenportaal</td>
                  <td>Sessie</td>
                </tr>
              </tbody>
            </table>

            <h3>2. Analytische cookies</h3>
            <p>
              Deze cookies helpen ons te begrijpen hoe bezoekers de website
              gebruiken. Wij gebruiken Plausible Analytics, een
              privacy-vriendelijk alternatief dat geen persoonlijke gegevens
              verzamelt.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Doel</th>
                  <th>Bewaartermijn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Geen cookies</td>
                  <td>
                    Plausible werkt zonder cookies en respecteert uw privacy
                  </td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>

            <h2>Uw keuzes</h2>
            <p>
              Bij uw eerste bezoek aan onze website kunt u kiezen welke cookies
              u wilt accepteren. U kunt deze keuze op elk moment wijzigen door
              de cookies in uw browser te verwijderen.
            </p>
            <p>
              <strong>Belangrijk:</strong> Conform de Belgische
              Gegevensbeschermingsautoriteit (GBA) bieden wij u een gelijkwaardige
              keuze tussen het accepteren en weigeren van niet-essentiële cookies.
            </p>

            <h2>Cookies beheren in uw browser</h2>
            <p>
              U kunt cookies ook beheren via uw browserinstellingen. Hier vindt u
              instructies voor de meest gebruikte browsers:
            </p>
            <ul>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/nl-be/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h2>Contact</h2>
            <p>
              Heeft u vragen over ons cookiebeleid? Neem dan contact met ons op:
            </p>
            <p>
              {COMPANY.name}
              <br />
              {COMPANY.address.street}
              <br />
              {COMPANY.address.postal} {COMPANY.address.city}
              <br />
              {COMPANY.contact.email}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

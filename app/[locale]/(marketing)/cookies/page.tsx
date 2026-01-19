import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { COMPANY } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookies" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CookiesContent />;
}

function CookiesContent() {
  const t = useTranslations("cookies");

  return (
    <>
      <section className="bg-[#1E3A5F] pb-16 pt-32">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-white/70">{t("lastUpdated")}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="prose max-w-3xl">
            {/* What are cookies */}
            <h2>{t("sections.whatAreCookies.title")}</h2>
            <p>{t("sections.whatAreCookies.content")}</p>

            {/* Which cookies */}
            <h2>{t("sections.whichCookies.title")}</h2>

            {/* Necessary cookies */}
            <h3>{t("sections.whichCookies.necessary.title")}</h3>
            <p>{t("sections.whichCookies.necessary.description")}</p>
            <table>
              <thead>
                <tr>
                  <th>{t("sections.table.cookie")}</th>
                  <th>{t("sections.table.purpose")}</th>
                  <th>{t("sections.table.retention")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t("sections.table.cookies.consent.name")}</td>
                  <td>{t("sections.table.cookies.consent.purpose")}</td>
                  <td>{t("sections.table.oneYear")}</td>
                </tr>
                <tr>
                  <td>{t("sections.table.cookies.auth.name")}</td>
                  <td>{t("sections.table.cookies.auth.purpose")}</td>
                  <td>{t("sections.table.session")}</td>
                </tr>
              </tbody>
            </table>

            {/* Analytical cookies */}
            <h3>{t("sections.whichCookies.analytics.title")}</h3>
            <p>{t("sections.whichCookies.analytics.description")}</p>
            <table>
              <thead>
                <tr>
                  <th>{t("sections.table.cookie")}</th>
                  <th>{t("sections.table.purpose")}</th>
                  <th>{t("sections.table.retention")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t("sections.table.noCookies")}</td>
                  <td>{t("sections.table.cookies.plausible.purpose")}</td>
                  <td>{t("sections.table.none")}</td>
                </tr>
              </tbody>
            </table>

            {/* Your choices */}
            <h2>{t("sections.choices.title")}</h2>
            <p>{t("sections.choices.description")}</p>
            <p>
              <strong>{t("sections.choices.important")}</strong>{" "}
              {t("sections.choices.gbaNote")}
            </p>

            {/* Browser management */}
            <h2>{t("sections.browserManagement.title")}</h2>
            <p>{t("sections.browserManagement.description")}</p>
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

            {/* Contact */}
            <h2>{t("sections.contact.title")}</h2>
            <p>{t("sections.contact.description")}</p>
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

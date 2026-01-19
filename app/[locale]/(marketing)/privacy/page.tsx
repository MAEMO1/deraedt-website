import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { COMPANY } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const DATA_COLLECTION_KEYS = [
  "contact",
  "communication",
  "application",
  "technical",
] as const;

const RIGHTS_KEYS = [
  "access",
  "rectification",
  "erasure",
  "restriction",
  "portability",
  "objection",
] as const;

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("privacy");
  const fullAddress = `${COMPANY.address.street}, ${COMPANY.address.postal} ${COMPANY.address.city}`;

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
            {/* Section 1: Controller */}
            <h2>{t("sections.controller.title")}</h2>
            <p>
              {t("sections.controller.intro", {
                company: COMPANY.name,
                address: fullAddress,
              })}
            </p>
            <p>
              <strong>{t("sections.controller.kbo")}</strong> {COMPANY.kbo}
              <br />
              <strong>{t("sections.controller.contact")}</strong>{" "}
              {COMPANY.contact.email}
            </p>

            {/* Section 2: Data Collection */}
            <h2>{t("sections.dataCollection.title")}</h2>
            <p>{t("sections.dataCollection.intro")}</p>
            <ul>
              {DATA_COLLECTION_KEYS.map((key) => (
                <li key={key}>
                  <strong>
                    {t(`sections.dataCollection.items.${key}.label`)}
                  </strong>{" "}
                  {t(`sections.dataCollection.items.${key}.description`)}
                </li>
              ))}
            </ul>

            {/* Section 3: Purposes */}
            <h2>{t("sections.purposes.title")}</h2>
            <p>{t("sections.purposes.intro")}</p>
            <ul>
              {(t.raw("sections.purposes.items") as string[]).map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>

            {/* Section 4: Legal Basis */}
            <h2>{t("sections.legalBasis.title")}</h2>
            <p>{t("sections.legalBasis.intro")}</p>
            <ul>
              {(t.raw("sections.legalBasis.items") as string[]).map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>

            {/* Section 5: Retention */}
            <h2>{t("sections.retention.title")}</h2>
            <p>{t("sections.retention.intro")}</p>
            <ul>
              {(t.raw("sections.retention.items") as string[]).map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>

            {/* Section 6: Rights */}
            <h2>{t("sections.rights.title")}</h2>
            <p>{t("sections.rights.intro")}</p>
            <ul>
              {RIGHTS_KEYS.map((key) => (
                <li key={key}>
                  <strong>{t(`sections.rights.items.${key}.label`)}</strong>{" "}
                  {t(`sections.rights.items.${key}.description`)}
                </li>
              ))}
            </ul>
            <p>
              {t("sections.rights.contact", { email: COMPANY.contact.email })}
            </p>

            {/* Section 7: Security */}
            <h2>{t("sections.security.title")}</h2>
            <p>{t("sections.security.content")}</p>

            {/* Section 8: Third Parties */}
            <h2>{t("sections.thirdParties.title")}</h2>
            <p>{t("sections.thirdParties.content")}</p>

            {/* Section 9: Complaints */}
            <h2>{t("sections.complaints.title")}</h2>
            <p>{t("sections.complaints.intro")}</p>
            <p>
              {t("sections.complaints.authority.name")}
              <br />
              {t("sections.complaints.authority.address")}
              <br />
              {t("sections.complaints.authority.email")}
              <br />
              {t("sections.complaints.authority.website")}
            </p>

            {/* Section 10: Changes */}
            <h2>{t("sections.changes.title")}</h2>
            <p>{t("sections.changes.content")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

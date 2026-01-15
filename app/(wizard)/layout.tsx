import { CookieBanner } from "@/components/shared";

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CookieBanner />
    </>
  );
}

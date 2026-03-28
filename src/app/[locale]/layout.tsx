import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/cursor-glow";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <CursorGlow />
      <Navigation />
      <main className="min-h-screen pt-[73px]">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}

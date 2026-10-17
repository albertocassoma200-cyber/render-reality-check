import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Music2, Building2, Star, CalendarDays, Share2, Sparkles, MousePointerClick, FileText, ShieldCheck, MessagesSquare, Check, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import { RequestForm } from "@/components/RequestForm";
import { WhatsAppIcon } from "@/components/site";
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_LINK } from "@/lib/request";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Doce Fama — Publicidade e Divulgação | A tua marca merece ser vista" },
      { name: "description", content: "Divulgação musical, publicidade para empresas, artistas e eventos. Solicita a tua divulgação à Doce Fama e envia o pedido pelo WhatsApp." },
      { property: "og:title", content: "Doce Fama — A tua marca merece ser vista!" },
      { property: "og:description", content: "Portal de Notícias, Entretenimento e Publicidade. Pede já a tua divulgação." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CATS = [
  { icon: Music2, title: "Divulgação musical", text: "Músicas, videoclipes e lançamentos.", service: "Divulgação musical" },
  { icon: Building2, title: "Publicidade empresarial", text: "Empresas, lojas, marcas, produtos e serviços.", service: "Publicidade para empresas" },
  { icon: Star, title: "Artistas e talentos", text: "Músicos, DJs, modelos e criadores.", service: "Divulgação de artistas" },
  { icon: CalendarDays, title: "Eventos e espetáculos", text: "Festas, concertos e atividades.", service: "Divulgação de eventos" },
  { icon: Share2, title: "Redes sociais", text: "Promoção de páginas e conteúdos.", service: "Promoção de páginas e redes sociais" },
  { icon: Sparkles, title: "Publicidade personalizada", text: "Campanhas especiais e outros pedidos.", service: "Outro serviço" },
];

const STEPS = [
  { icon: MousePointerClick, text: "Escolhe o serviço de divulgação." },
  { icon: FileText, text: "Preenche o formulário com os dados do teu projeto." },
  { icon: ShieldCheck, text: "Confirma que não és um robô e envia o pedido pelo WhatsApp." },
  { icon: MessagesSquare, text: "Conversa com a equipa da Doce Fama sobre condições, preços e próximos passos." },
];

function Index() {
  const [service, setService] = useState("");
  const choose = (s: string) => {
    setService(s);
    document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Início */}
      <section id="inicio" className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute -right-32 top-10 h-80 w-[40rem] -rotate-12 rounded-full bg-secondary/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-[1.3fr_1fr] md:py-28">
          <div className="animate-rise">
            <p className="mb-4 inline-block rounded-full border border-secondary/40 px-4 py-1 text-xs font-semibold tracking-widest text-secondary">
              NOTÍCIAS · ENTRETENIMENTO · PUBLICIDADE
            </p>
            <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">
              DOCE FAMA — <span className="text-secondary">A TUA MARCA MERECE SER VISTA!</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              Queres divulgar a tua música, promover o teu negócio, anunciar um evento ou dar mais visibilidade à tua marca? A Doce Fama ajuda-te a apresentar o teu projeto ao público através de serviços de publicidade e divulgação.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#pedido" className="rounded-full bg-secondary px-7 py-4 font-bold text-secondary-foreground shadow-glow transition hover:scale-105">Solicitar Divulgação</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-whatsapp px-7 py-4 font-bold text-whatsapp-foreground transition hover:scale-105">
                <WhatsAppIcon /> Falar pelo WhatsApp
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={logo.url} alt="Doce Fama" className="w-64 rounded-full shadow-glow ring-8 ring-secondary/30 md:w-96" />
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20">
        <SectionTitle kicker="SERVIÇOS" title="O que podemos divulgar por ti" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATS.map(({ icon: Icon, title, text, service: s }) => (
            <article key={title} className="group flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-1">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-secondary transition group-hover:bg-secondary group-hover:text-primary">
                <Icon className="size-7" />
              </span>
              <h3 className="mt-5 font-display text-lg">{title}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{text}</p>
              <button onClick={() => choose(s)} className="mt-6 rounded-full border-2 border-primary py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground">
                Escolher este serviço
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="scroll-mt-20 bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle kicker="COMO FUNCIONA" title="Quatro passos simples" light />
          <ol className="grid gap-6 md:grid-cols-4">
            {STEPS.map(({ icon: Icon, text }, i) => (
              <li key={i} className="relative rounded-3xl bg-primary-foreground/5 p-7 ring-1 ring-primary-foreground/10">
                <span className="font-display text-5xl text-secondary/30">0{i + 1}</span>
                <Icon className="mt-3 size-8 text-secondary" />
                <p className="mt-4 text-primary-foreground/85">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Formulário */}
      <section id="pedido" className="scroll-mt-20 bg-muted py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SectionTitle kicker="PEDIDO" title="SOLICITA A TUA DIVULGAÇÃO" sub="Preenche os dados abaixo e envia o teu pedido à equipa da Doce Fama. Vamos analisar a tua solicitação e entrar em contacto contigo." />
          <RequestForm service={service} />
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto grid max-w-7xl scroll-mt-20 items-center gap-12 px-4 py-20 md:grid-cols-2">
        <div>
          <p className="font-display text-sm text-secondary-foreground"><span className="rounded bg-secondary px-2 py-1">PORQUÊ A DOCE FAMA?</span></p>
          <h2 className="mt-5 font-display text-3xl text-primary md:text-4xl">O TEU PROJETO MERECE MAIS DESTAQUE!</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            A Doce Fama procura ajudar marcas, artistas, empresas e criadores a apresentarem os seus projetos ao público através de serviços de divulgação e publicidade. Trabalhamos para oferecer uma experiência profissional, comunicação clara e soluções adequadas a cada pedido.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {["Atendimento direto", "Diferentes categorias de divulgação", "Pedidos personalizados", "Comunicação profissional", "Contacto fácil através do WhatsApp"].map((t) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl bg-card p-5 font-semibold shadow-card">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground"><Check className="size-4" /></span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Contactos */}
      <section id="contactos" className="scroll-mt-20 px-4 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-hero p-10 text-center text-primary-foreground md:p-14">
          <h2 className="font-display text-3xl">CONTACTOS OFICIAIS</h2>
          <p className="mt-3 text-primary-foreground/75">Doce Fama · Portal de Notícias, Entretenimento, Publicidade e Outros.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-bold text-whatsapp-foreground">
              <WhatsAppIcon /> {WHATSAPP_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 font-bold text-secondary-foreground">
              <Mail className="size-5" /> Enviar e-mail
            </a>
          </div>
          <p className="mt-8 text-sm text-primary-foreground/60">Redes sociais oficiais: em breve.</p>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ kicker, title, sub, light }: { kicker: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-xs font-bold tracking-[0.3em] text-secondary">{kicker}</p>
      <h2 className={`mt-3 font-display text-3xl md:text-4xl ${light ? "" : "text-primary"}`}>{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

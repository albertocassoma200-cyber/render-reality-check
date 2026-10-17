import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_LINK } from "@/lib/request";

const NAV = [
  { href: "/#inicio", label: "Início" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#pedido", label: "Solicitar divulgação" },
  { href: "/#sobre", label: "Sobre nós" },
  { href: "/#contactos", label: "Contactos" },
];

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-primary-foreground/10 bg-primary/95 text-primary-foreground backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Doce Fama — início">
          <img src={logo.url} alt="Logótipo Doce Fama" className="size-11 rounded-full" />
          <span className="font-display text-lg tracking-tight">
            DOCE <span className="text-secondary">FAMA</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-primary-foreground/80 transition hover:text-secondary">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/#pedido" className="hidden rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground shadow-glow transition hover:scale-105 sm:inline-block">
            ANUNCIE CONNOSCO
          </a>
          <button className="rounded-md p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-primary-foreground/10 px-4 pb-4 lg:hidden" aria-label="Menu móvel">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 font-medium">
              {n.label}
            </a>
          ))}
          <a href="/#pedido" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-secondary py-3 text-center font-bold text-secondary-foreground">
            ANUNCIE CONNOSCO
          </a>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" className="size-14 rounded-full" />
            <span className="font-display text-xl">DOCE <span className="text-secondary">FAMA</span></span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            Portal de Notícias, Entretenimento, Publicidade e Outros. Ajudamos artistas, marcas e empresas a serem vistos.
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm text-secondary">SERVIÇOS</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {["Divulgação musical", "Publicidade empresarial", "Artistas e talentos", "Eventos e espetáculos", "Redes sociais"].map((s) => (
              <li key={s}><a href="/#servicos" className="hover:text-secondary">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm text-secondary">CONTACTOS</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
            <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary"><Phone className="size-4" />{WHATSAPP_DISPLAY}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-2 break-all hover:text-secondary"><Mail className="size-4 shrink-0" />{EMAIL}</a></li>
            <li><Link to="/privacidade" className="hover:text-secondary">Política de Privacidade</Link></li>
            <li><Link to="/termos" className="hover:text-secondary">Termos e Condições</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © 2026 Doce Fama. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fala connosco pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      <span className="hidden rounded-full bg-card px-4 py-2 text-sm font-semibold text-card-foreground shadow-card transition group-hover:translate-x-0 md:block">
        Precisas de divulgar? Fala connosco!
      </span>
      <span className="flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-card animate-wa-pulse transition group-hover:scale-110">
        <WhatsAppIcon className="size-7" />
      </span>
    </a>
  );
}

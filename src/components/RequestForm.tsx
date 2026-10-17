import { useEffect, useRef, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SERVICES, requestSchema } from "@/lib/request";
import { submitRequest } from "@/lib/request.functions";
import { WhatsAppIcon } from "./site";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

type Fields = Record<string, string>;
const empty: Fields = { nome: "", empresa: "", telefone: "", email: "", servico: "", projeto: "", descricao: "", link: "", data: "", orcamento: "", observacoes: "" };

export function RequestForm({ service }: { service: string }) {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [human, setHuman] = useState(false);
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState("");
  const [honey, setHoney] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string } | null>(null);
  const started = useRef(Date.now());
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>();

  useEffect(() => { if (service) setF((p) => ({ ...p, servico: service })); }, [service]);

  useEffect(() => {
    if (!SITE_KEY || !widget.current) return;
    const render = () => {
      if (window.turnstile && widget.current && !widgetId.current)
        widgetId.current = window.turnstile.render(widget.current, {
          sitekey: SITE_KEY, language: "pt",
          callback: (t: string) => setToken(t), "expired-callback": () => setToken(""),
        });
    };
    if (window.turnstile) return render();
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true; s.onload = render;
    document.head.appendChild(s);
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF({ ...f, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: "" });
  };

  const requiredOk = f.nome && f.telefone && f.servico && f.projeto && f.descricao && human && consent && (!SITE_KEY || token);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const parsed = requestSchema.safeParse(f);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      setMsg({ type: "error", text: "Corrige os campos assinalados." });
      return;
    }
    if (!human || !consent) return setMsg({ type: "error", text: "Confirma a verificação e o consentimento." });
    setLoading(true);
    // Abrir a janela já no clique evita bloqueios de pop-up
    const win = window.open("", "_blank");
    try {
      const res = await submitRequest({ data: { ...parsed.data, token, website: honey, startedAt: started.current } });
      if (!res.ok) {
        win?.close();
        setMsg({ type: "error", text: res.error });
      } else {
        if (win) win.location.href = res.url; else window.location.href = res.url;
        setMsg({ type: "info", text: "O WhatsApp foi aberto com o teu pedido. Confirma e carrega em enviar na conversa para que a Doce Fama o receba." });
      }
    } catch {
      win?.close();
      setMsg({ type: "error", text: "Não foi possível preparar o pedido. Verifica a ligação e tenta novamente." });
    } finally {
      setLoading(false);
      if (SITE_KEY && window.turnstile) { window.turnstile.reset(widgetId.current); setToken(""); }
    }
  }

  const input = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/50";
  const Field = ({ id, label, req, children }: { id: string; label: string; req?: boolean; children: React.ReactNode }) => (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label} {req ? <span className="text-destructive">*</span> : <span className="font-normal text-muted-foreground">(opcional)</span>}
      </label>
      {children}
      {errors[id] && <p className="mt-1 text-xs text-destructive" role="alert">{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8 rounded-3xl bg-card p-6 shadow-card md:p-10">
      <fieldset className="grid gap-5 md:grid-cols-2">
        <legend className="mb-4 font-display text-sm text-primary">A · DADOS DO CLIENTE</legend>
        <Field id="nome" label="Nome completo" req><input id="nome" className={input} value={f.nome} onChange={set("nome")} placeholder="Ex.: João Manuel" autoComplete="name" /></Field>
        <Field id="empresa" label="Empresa, marca ou projeto"><input id="empresa" className={input} value={f.empresa} onChange={set("empresa")} placeholder="Ex.: Kuia Produções" /></Field>
        <Field id="telefone" label="Telefone ou WhatsApp" req><input id="telefone" type="tel" className={input} value={f.telefone} onChange={set("telefone")} placeholder="Ex.: +244 923 000 000" autoComplete="tel" /></Field>
        <Field id="email" label="E-mail"><input id="email" type="email" className={input} value={f.email} onChange={set("email")} placeholder="Ex.: nome@email.com" autoComplete="email" /></Field>
      </fieldset>

      <fieldset className="grid gap-5 md:grid-cols-2">
        <legend className="mb-4 font-display text-sm text-primary">B · SERVIÇO E PEDIDO</legend>
        <Field id="servico" label="Serviço pretendido" req>
          <select id="servico" className={input} value={f.servico} onChange={set("servico")}>
            <option value="">Seleciona um serviço…</option>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field id="projeto" label="Nome do artista, empresa, evento ou produto" req><input id="projeto" className={input} value={f.projeto} onChange={set("projeto")} placeholder="Ex.: Lançamento do single 'Luanda'" /></Field>
        <div className="md:col-span-2">
          <Field id="descricao" label="Descrição do pedido" req><textarea id="descricao" rows={4} className={input} value={f.descricao} onChange={set("descricao")} placeholder="Explica o que pretendes divulgar, para que público e em que formato." /></Field>
        </div>
        <Field id="link" label="Link do conteúdo ou página"><input id="link" type="url" className={input} value={f.link} onChange={set("link")} placeholder="https://…" /></Field>
        <Field id="data" label="Data pretendida"><input id="data" type="date" className={input} value={f.data} onChange={set("data")} /></Field>
        <Field id="orcamento" label="Orçamento disponível"><input id="orcamento" className={input} value={f.orcamento} onChange={set("orcamento")} placeholder="Ex.: 25 000 Kz" /></Field>
        <Field id="observacoes" label="Observações adicionais"><input id="observacoes" className={input} value={f.observacoes} onChange={set("observacoes")} placeholder="Algo mais que devamos saber?" /></Field>
      </fieldset>

      <input type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" aria-hidden="true" name="website" />

      <div className="space-y-4 rounded-2xl bg-muted p-5">
        <p className="flex items-center gap-2 font-display text-sm text-primary"><ShieldCheck className="size-5" /> VERIFICAÇÃO E CONSENTIMENTO</p>
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input type="checkbox" checked={human} onChange={(e) => setHuman(e.target.checked)} className="mt-0.5 size-5 accent-primary" />
          <span>Confirmo que sou uma pessoa e não um robô. <span className="text-destructive">*</span></span>
        </label>
        {SITE_KEY && <div ref={widget} />}
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-5 accent-primary" />
          <span>Autorizo a utilização dos dados fornecidos para responder ao meu pedido de divulgação e aceito a <Link to="/privacidade" className="font-semibold text-primary underline">Política de Privacidade</Link>. <span className="text-destructive">*</span></span>
        </label>
      </div>

      {msg && (
        <p role="status" className={`rounded-xl p-4 text-sm ${msg.type === "error" ? "bg-destructive/10 text-destructive" : "bg-whatsapp/15 text-foreground"}`}>{msg.text}</p>
      )}

      <button
        type="submit"
        disabled={!requiredOk || loading}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-whatsapp py-5 font-display text-base text-whatsapp-foreground shadow-card transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? <Loader2 className="size-6 animate-spin" /> : <WhatsAppIcon className="size-6" />}
        ENVIAR PEDIDO PELO WHATSAPP
      </button>
      <p className="text-center text-xs text-muted-foreground">O WhatsApp abrirá com a mensagem pronta — só precisas de carregar em enviar.</p>
    </form>
  );
}

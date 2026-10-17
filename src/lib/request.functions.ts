import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { buildWhatsAppUrl, requestSchema } from "./request";

const input = requestSchema.extend({
  token: z.string().max(4096).optional().default(""),
  website: z.string().max(200).optional().default(""), // honeypot
  startedAt: z.number(),
});

export const submitRequest = createServerFn({ method: "POST" })
  .inputValidator((d) => input.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: false as const, error: "Pedido bloqueado." };
    if (Date.now() - data.startedAt < 4000)
      return { ok: false as const, error: "Preenchimento demasiado rápido. Revê os dados e tenta novamente." };

    const secret = process.env["TURNSTILE_SECRET_KEY"];
    if (secret) {
      if (!data.token) return { ok: false as const, error: "Conclui a verificação de segurança." };
      const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({ secret, response: data.token }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!json.success)
        return { ok: false as const, error: "A verificação de segurança falhou. Tenta novamente." };
    }
    const { token: _t, website: _w, startedAt: _s, ...rest } = data;
    return { ok: true as const, url: buildWhatsAppUrl(rest) };
  });

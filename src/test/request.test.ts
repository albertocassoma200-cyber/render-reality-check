import { describe, expect, it } from "vitest";
import { buildMessage, buildWhatsAppUrl, requestSchema } from "@/lib/request";

const base = requestSchema.parse({
  nome: "João Silva",
  telefone: "+244 923 000 000",
  servico: "Divulgação musical",
  projeto: "Álbum Kizomba",
  descricao: "Quero divulgar o meu novo lançamento.",
});

describe("pedido WhatsApp", () => {
  it("envia para o número oficial", () => {
    expect(buildWhatsAppUrl(base).startsWith("https://wa.me/244930051440?text=")).toBe(true);
  });
  it("mostra 'Não indicado' em campos opcionais vazios", () => {
    expect(buildMessage(base)).toContain("E-mail: Não indicado");
  });
  it("preserva acentos após codificação", () => {
    const url = buildWhatsAppUrl(base);
    expect(decodeURIComponent(url.split("text=")[1])).toContain("Álbum Kizomba");
  });
  it("exige nome e telefone", () => {
    expect(requestSchema.safeParse({ ...base, nome: "" }).success).toBe(false);
    expect(requestSchema.safeParse({ ...base, telefone: "abc" }).success).toBe(false);
  });
});

import { z } from "zod";

export const WHATSAPP_NUMBER = "244930051440";
export const WHATSAPP_DISPLAY = "+244 930 051 440";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = "albertocassoma200@gmail.com";

export const SERVICES = [
  "Divulgação musical",
  "Publicidade para empresas",
  "Divulgação de artistas",
  "Divulgação de eventos",
  "Promoção de páginas e redes sociais",
  "Divulgação de produtos ou serviços",
  "Outro serviço",
] as const;

const opt = z.string().trim().max(500).optional().default("");

export const requestSchema = z.object({
  nome: z.string().trim().min(3, "Indica o teu nome completo.").max(100),
  empresa: opt,
  telefone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{9,20}$/, "Indica um número de telefone válido."),
  email: z.union([z.literal(""), z.string().trim().email("Indica um e-mail válido.").max(255)]).default(""),
  servico: z.enum(SERVICES, { errorMap: () => ({ message: "Escolhe o serviço pretendido." }) }),
  projeto: z.string().trim().min(2, "Indica o nome do artista, empresa, evento ou projeto.").max(150),
  descricao: z.string().trim().min(15, "Descreve o pedido com pelo menos 15 caracteres.").max(2000),
  link: z.union([z.literal(""), z.string().trim().url("Indica um link válido (começa por https://).").max(500)]).default(""),
  data: opt,
  orcamento: opt,
  observacoes: z.string().trim().max(1000).optional().default(""),
});

export type RequestData = z.infer<typeof requestSchema>;

const v = (s: string) => (s && s.trim() ? s.trim() : "Não indicado");

export function buildMessage(d: RequestData): string {
  return [
    "*NOVO PEDIDO DE DIVULGAÇÃO — DOCE FAMA*",
    "",
    `Nome do cliente: ${d.nome}`,
    `Empresa ou projeto: ${v(d.empresa)}`,
    `Contacto do cliente: ${d.telefone}`,
    `E-mail: ${v(d.email)}`,
    `Serviço pretendido: ${d.servico}`,
    `Nome do conteúdo ou projeto: ${d.projeto}`,
    `Descrição do pedido: ${d.descricao}`,
    `Link do conteúdo: ${v(d.link)}`,
    `Data pretendida: ${v(d.data)}`,
    `Orçamento disponível: ${v(d.orcamento)}`,
    `Observações: ${v(d.observacoes)}`,
    "",
    "Olá, equipa da Doce Fama! Gostaria de solicitar informações e contratar este serviço de divulgação. Aguardo o vosso contacto.",
  ].join("\n");
}

export function buildWhatsAppUrl(d: RequestData): string {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(buildMessage(d))}`;
}

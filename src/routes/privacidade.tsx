import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { EMAIL } from "@/lib/request";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Doce Fama" },
      { name: "description", content: "Como a Doce Fama trata os dados enviados nos pedidos de divulgação." },
      { property: "og:title", content: "Política de Privacidade — Doce Fama" },
      { property: "og:description", content: "Como tratamos os teus dados pessoais." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Política de Privacidade">
      <p>A Doce Fama respeita a tua privacidade. Esta política explica como são usados os dados que forneces no formulário de pedido de divulgação.</p>
      <h2>Dados recolhidos</h2>
      <p>Nome, contacto telefónico, e-mail (opcional), empresa ou projeto e os detalhes do pedido que decides partilhar.</p>
      <h2>Finalidade</h2>
      <p>Os dados servem exclusivamente para responder ao teu pedido de divulgação e combinar as condições do serviço.</p>
      <h2>Armazenamento</h2>
      <p>O site não guarda os dados do formulário. A mensagem é preparada e enviada por ti através do WhatsApp, ficando sujeita também às políticas do WhatsApp.</p>
      <h2>Os teus direitos</h2>
      <p>Podes pedir a consulta, correção ou eliminação dos teus dados a qualquer momento através de {EMAIL}.</p>
    </LegalPage>
  ),
});

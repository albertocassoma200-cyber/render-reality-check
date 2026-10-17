import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos e Condições — Doce Fama" },
      { name: "description", content: "Termos e condições dos serviços de divulgação e publicidade da Doce Fama." },
      { property: "og:title", content: "Termos e Condições — Doce Fama" },
      { property: "og:description", content: "Condições de utilização do site e dos serviços." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Termos e Condições">
      <p>Ao utilizar este site e solicitar serviços à Doce Fama, aceitas os termos abaixo.</p>
      <h2>Pedidos</h2>
      <p>O envio de um pedido não constitui contratação. As condições, preços e prazos são acordados diretamente com a equipa da Doce Fama.</p>
      <h2>Conteúdos</h2>
      <p>O cliente é responsável pelos conteúdos que pede para divulgar e garante ter os direitos necessários. A Doce Fama pode recusar conteúdos ilegais, ofensivos ou enganosos.</p>
      <h2>Resultados</h2>
      <p>A Doce Fama compromete-se a prestar um serviço profissional, mas não garante números de visualizações, seguidores ou vendas.</p>
    </LegalPage>
  ),
});

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- WhatsApp request message is built in src/lib/request.ts and validated again in a server function (request.functions.ts) so anti-spam checks (honeypot, timing, optional Cloudflare Turnstile via TURNSTILE_SECRET_KEY/VITE_TURNSTILE_SITE_KEY) run server-side.

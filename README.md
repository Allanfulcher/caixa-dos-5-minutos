# Caixa dos 5 Minutos — página de vendas local

Projeto estático e independente. Não depende de framework, construtor de sites ou serviço de hospedagem.

## Abrir localmente

Na pasta do projeto:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Depois abra `http://127.0.0.1:4173`.

## Configurar antes de vender

Edite o objeto `CONFIG` no início de `script.js`:

- `checkoutUrl`: link real do checkout;
- `metaPixelId`: ID numérico do Pixel da Meta;
- `supportPhone`: telefone de suporte;
- `sellerName`: nome ou razão social do vendedor.

Todos os cinco CTAs usam o mesmo checkout e preservam os parâmetros `utm_*`. O Pixel dispara `PageView`, `ViewContent` e `InitiateCheckout`. O evento `Purchase` deve ser configurado e testado na página de confirmação do checkout.

## Estrutura

- `index.html`: página e copy completa;
- `styles.css`: visual mobile-first;
- `script.js`: checkout, UTMs, Pixel e CTA móvel;
- `assets/images`: imagens usadas na página;
- `assets/criativos`: os 6 criativos quadrados de 1080 × 1080 px.

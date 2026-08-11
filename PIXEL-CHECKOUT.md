# Evento de compra no checkout

O Pixel `905104172223662` está instalado na página de vendas com os eventos:

- `PageView` no carregamento;
- `ViewContent` quando a oferta entra na área visível;
- `InitiateCheckout` em cada um dos cinco CTAs, com identificação da seção;
- UTMs e `fbclid` preservados no link do checkout.

O evento `Purchase` não deve disparar na página de vendas nem no início do checkout. Ele deve disparar somente na página de confirmação, depois de o pagamento ser confirmado.

Se a página de confirmação já carrega o mesmo Pixel, use:

```html
<script>
  fbq('track', 'Purchase', {
    content_name: 'Caixa dos 5 Minutos',
    content_ids: ['caixa-5-minutos'],
    content_type: 'product',
    num_items: 1,
    value: 27.00,
    currency: 'BRL'
  });
</script>
```

O disparo deve acontecer uma única vez por pedido confirmado. Teste uma compra completa no Gerenciador de Eventos da Meta antes de iniciar os anúncios.

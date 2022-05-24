# POC (Prova de conceito) de comunicação front para front

Site b Sellersface se comunica com o Site A Metalives, que está dentro de um iframe no site da Sellersface.

Ao clicar em algum botão de compra no Site A Metalives o evento é passado para o Site B Sellersface, sendo que o Site A Metalives está dentro de um iframe no site B.
Segue o exemplo:

## Site A Metalives Para

```js
window.top?.postMessage({ type: "ON_CLICK_PRODUCT", sku }, "*");
```

## Site B Sellersface

```js
window.addEventListener("message", (ev) => {
    if (ev.data.type === "ON_CLICK_PRODUCT") {
        if (refModalCheckout.current) {
            refModalCheckout.current.open(ev.data.sku);
        }
    }
});
```

Pode também ter uma comunicação do Site B Sellersface para o Site A Metalives, basta seguir o exemplo:

## Site B Sellersface Para

```js
refIframe.current.contentWindow.postMessage({ type: "HELLO", message: "Hello World!" }, "*");
```

## Site A Metalives

```js
window.addEventListener("message", (ev) => {
    if (ev.data.type === "HELLO") {
        console.log(ev.data.message);
    }
});
```

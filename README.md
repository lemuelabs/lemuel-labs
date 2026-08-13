# Lemuel Labs

Sitio de presentación de **Lemuel Labs**, un estudio de desarrollo web dedicado a construir sitios a medida para pequeños y medianos negocios. El sitio funciona a la vez como la carta de presentación del estudio y como demostración en vivo de su propio trabajo: todo lo que se ofrece a los clientes está funcionando en esta misma web.

## Estructura del proyecto

```
├── index.html          Inicio
├── planes.html          Planes y precios
├── servicios.html        Detalle de funciones incluidas
├── proyecto.html         Caso de portfolio
├── contacto.html         Contacto
├── css/
│   └── styles.css        Estilos del sitio completo
├── js/
│   ├── main.js           Lógica compartida entre páginas
│   └── proyecto.js        Lógica específica de proyecto.html
├── img/                 Imágenes, ícono de marca y assets sociales
├── data/                Configuración liviana en formato JSON
├── robots.txt
└── sitemap.xml
```

## Qué incluye el sitio

- **Identidad visual propia**, con sistema de diseño editorial (tipografía, composición y detalles construidos a medida, no una plantilla genérica).
- **Modo claro y oscuro**, con la preferencia del usuario recordada entre visitas.
- **Sitio multilenguaje** — español, inglés y portugués — con selector accesible desde cualquier página.
- **Transiciones animadas** entre páginas, cambios de tema e idioma, con una firma visual coherente en todo el sitio.
- **Formulario de contacto** con validación en tiempo real y protección contra spam.
- **Analítica de visitas** integrada.
- **SEO cuidado**: metadatos completos para redes sociales, datos estructurados para buscadores, sitemap y robots.txt.
- **Accesibilidad real**: navegación completa por teclado, compatibilidad con lectores de pantalla, contraste de color verificado y respeto por las preferencias de movimiento reducido del sistema operativo.
- **Diseño responsive**, pensado mobile-first.
- Una página de portfolio (**Café Moretti**) que muestra el nivel de detalle del plan Premium aplicado a un caso real de uso.

## Stack tecnológico

- HTML, CSS y JavaScript vanilla — sin frameworks ni paso de build.
- Tipografías Barlow Condensed e Inter (Google Fonts).
- Sin dependencias de terceros para funcionar: el sitio es un conjunto de archivos estáticos.

## Previsualizar el proyecto localmente

El sitio es 100% estático, así que alcanza con servirlo desde cualquier servidor local simple. Por ejemplo, parado en la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

y abrir `http://localhost:8000` en el navegador. (Abrir los archivos `.html` directamente con doble clic también funciona para navegar el sitio, aunque algunas funciones dependen de servirlo por HTTP.)

## Licencia

© Lemuel Labs. Todos los derechos reservados.

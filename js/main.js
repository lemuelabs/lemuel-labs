/* =========================================================
   LEMUEL LABS — LÓGICA COMPARTIDA (todas las páginas)
   Índice:
     1. Configuración editable a mano (cupos del mes)
     2. Diccionario de traducciones (ES/EN/PT)
     3. Transición "iris" — mecanismo central reutilizado por
        tema, idioma y navegación entre páginas
     4. Tema claro/oscuro
     5. Selector de idioma (dropdown accesible)
     6. Nav móvil + interceptor de navegación (iris)
     7. Estado activo del nav (URL actual + anclas si las hay)
     8. Gradiente mouse-reactive (firma visual)
     9. Scroll reveal
     10. Badge "cupos disponibles"
     11. Formulario de contacto: honeypot + validación en vivo
     12. Init
   ========================================================= */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------
     1. CONFIGURACIÓN EDITABLE (cupos del mes)
     El valor real vive en /data/config.json — así se puede
     editar sin tocar JS. Mientras carga (o si falla el fetch,
     por ejemplo al abrir el sitio con file:// sin servidor),
     queda este valor de reserva.
     ------------------------------------------------------- */
  let cuposDisponibles = true;

  async function loadConfig() {
    try {
      const res = await fetch('data/config.json', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (typeof data.cuposDisponibles === 'boolean') cuposDisponibles = data.cuposDisponibles;
    } catch (e) {
      // Sin servidor local (file://) el fetch puede fallar por CORS: se
      // conserva el valor de reserva. En un hosting real esto no pasa.
    }
  }

  /* -------------------------------------------------------
     2. TRADUCCIONES
     ------------------------------------------------------- */
  const dict = {
    nav_inicio:    { es: 'Inicio',   en: 'Home',       pt: 'Início' },
    nav_planes:    { es: 'Planes',   en: 'Plans',      pt: 'Planos' },
    nav_servicios: { es: 'Tu sitio', en: 'Your site',  pt: 'Seu site' },
    nav_proyecto:  { es: 'Proyecto', en: 'Project',    pt: 'Projeto' },
    nav_contacto:  { es: 'Contacto', en: 'Contact',    pt: 'Contato' },
    nav_cta:       { es: 'Hablemos', en: "Let's talk", pt: 'Vamos falar' },

    hero_index_eyebrow: { es: 'Lemuel Labs — Estudio de desarrollo web', en: 'Lemuel Labs — Web development studio', pt: 'Lemuel Labs — Estúdio de desenvolvimento web' },
    hero_index_h1:      { es: 'Webs que <em>convierten</em>,<br>no que decoran.', en: 'Websites that <em>convert</em>,<br>not just decorate.', pt: 'Sites que <em>convertem</em>,<br>não só decoram.' },
    hero_index_sub:     { es: 'Tres niveles de sitio a medida, según lo que tu negocio necesita hoy. Sin plantillas recicladas.', en: 'Three levels of custom websites, matched to what your business needs today. No recycled templates.', pt: 'Três níveis de site sob medida, de acordo com o que seu negócio precisa hoje. Sem templates reciclados.' },
    hero_index_cta1:    { es: 'Ver planes y precios', en: 'See plans & pricing', pt: 'Ver planos e preços' },
    hero_index_cta2:    { es: 'Ver proyecto de ejemplo', en: 'See the demo project', pt: 'Ver projeto de exemplo' },

    hero_planes_eyebrow: { es: 'Planes', en: 'Plans', pt: 'Planos' },
    hero_planes_h1:      { es: 'Elegí el <em>nivel</em> que necesita tu negocio.', en: 'Choose the <em>level</em> your business needs.', pt: 'Escolha o <em>nível</em> que seu negócio precisa.' },
    hero_planes_sub:     { es: 'Esencial, Profesional o Premium. Cada uno resuelve una etapa distinta del mismo problema: que tu negocio se vea tan bien online como en persona.', en: 'Essential, Professional or Premium. Each one solves a different stage of the same problem: making your business look online as good as it does in person.', pt: 'Essencial, Profissional ou Premium. Cada um resolve uma etapa diferente do mesmo problema: fazer seu negócio parecer tão bom online quanto pessoalmente.' },

    hero_servicios_eyebrow: { es: 'Lo que tiene tu sitio', en: "What's in your site", pt: 'O que tem o seu site' },
    hero_servicios_h1:      { es: 'El detalle que se nota <em>sin decirlo</em>.', en: 'The detail that shows <em>without saying it</em>.', pt: 'O detalhe que se percebe <em>sem precisar dizer</em>.' },
    hero_servicios_sub:     { es: 'Esto es exactamente lo que incluye el plan Premium — y este mismo sitio lo está usando ahora mismo.', en: 'This is exactly what the Premium plan includes — and this very site is using it right now.', pt: 'Isto é exatamente o que o plano Premium inclui — e este mesmo site está usando isso agora.' },

    hero_proyecto_eyebrow: { es: 'Proyecto de demostración', en: 'Demo project', pt: 'Projeto de demonstração' },
    hero_proyecto_h1:      { es: 'Café Moretti, <em>en detalle</em>.', en: 'Café Moretti, <em>in detail</em>.', pt: 'Café Moretti, <em>em detalhes</em>.' },
    hero_proyecto_sub:     { es: 'Un ejercicio propio, construido con el plan Premium para mostrarlo en un caso de uso real.', en: 'An in-house exercise, built with the Premium plan to show it in a real-world use case.', pt: 'Um exercício próprio, construído com o plano Premium para mostrá-lo em um caso de uso real.' },

    hero_contacto_eyebrow: { es: 'Contacto', en: 'Contact', pt: 'Contato' },
    hero_contacto_h1:      { es: 'Cuéntanos sobre <em>tu proyecto</em>.', en: 'Tell us about <em>your project</em>.', pt: 'Conte sobre <em>seu projeto</em>.' },
    hero_contacto_sub:     { es: 'Respondemos por WhatsApp, email o el formulario de acá abajo — lo que te resulte más cómodo.', en: 'We reply over WhatsApp, email, or the form below — whatever works best for you.', pt: 'Respondemos por WhatsApp, e-mail ou o formulário abaixo — o que for mais fácil para você.' },

    cupos_open:   { es: 'Cupos disponibles en', en: 'Slots open in', pt: 'Vagas abertas em' },
    cupos_closed: { es: 'Sin cupos disponibles por ahora', en: 'No slots available right now', pt: 'Sem vagas disponíveis no momento' },

    lang_name_es: { es: 'Español', en: 'Spanish', pt: 'Espanhol' },
    lang_name_en: { es: 'Inglés', en: 'English', pt: 'Inglês' },
    lang_name_pt: { es: 'Portugués', en: 'Portuguese', pt: 'Português' },

    /* --- Formulario de contacto --- */
    form_label_name: { es: 'Nombre', en: 'Name', pt: 'Nome' },
    form_placeholder_name: { es: 'Tu nombre', en: 'Your name', pt: 'Seu nome' },
    form_label_email: { es: 'Email', en: 'Email', pt: 'E-mail' },
    form_label_message: { es: 'Mensaje', en: 'Message', pt: 'Mensagem' },
    form_placeholder_message: { es: 'Cuéntanos qué necesitas para tu negocio', en: 'Tell us what your business needs', pt: 'Conte o que seu negócio precisa' },
    form_submit: { es: 'Enviar mensaje', en: 'Send message', pt: 'Enviar mensagem' },
    form_fallback_text: { es: '¿No se envió? Escríbenos directo por', en: "Didn't go through? Message us directly on", pt: 'Não enviou? Fale com a gente direto pelo' },

    /* --- Index: resumen de servicios --- */
    services_eyebrow: { es: 'Qué hacemos', en: 'What we do', pt: 'O que fazemos' },
    services_h2: { es: 'Un plan para cada etapa de tu negocio', en: 'A plan for every stage of your business', pt: 'Um plano para cada etapa do seu negócio' },
    services_p: { es: 'No vendemos "diseño web" genérico. Vendemos tres niveles claros, cada uno pensado para un momento distinto.', en: 'We don\'t sell generic "web design". We sell three clear levels, each built for a different moment.', pt: 'Não vendemos "design web" genérico. Vendemos três níveis claros, cada um pensado para um momento diferente.' },
    service1_h3: { es: 'Tu carta de presentación', en: 'Your introduction card', pt: 'Seu cartão de apresentação' },
    service1_p: { es: 'Una página 100% a medida, responsive y con WhatsApp directo. Lista en días, sin vueltas.', en: 'A 100% custom, responsive page with direct WhatsApp. Ready in days, no fuss.', pt: 'Uma página 100% sob medida, responsiva e com WhatsApp direto. Pronta em dias, sem complicação.' },
    service2_h3: { es: 'Cuando una página ya no alcanza', en: 'When one page is no longer enough', pt: 'Quando uma página já não é suficiente' },
    service2_p: { es: 'Dos páginas, formulario validado, analítica y animaciones al hacer scroll.', en: 'Two pages, validated form, analytics, and scroll animations.', pt: 'Duas páginas, formulário validado, analytics e animações ao rolar a página.' },
    service3_h3: { es: 'La referencia de tu rubro', en: 'The reference in your industry', pt: 'A referência do seu setor' },
    service3_p: { es: 'Sistema de diseño editorial, multilenguaje, modo claro/oscuro y SEO avanzado — como este mismo sitio.', en: 'Editorial design system, multilingual, light/dark mode, and advanced SEO — like this very site.', pt: 'Sistema de design editorial, multilíngue, modo claro/escuro e SEO avançado — como este mesmo site.' },
    services_cta: { es: 'Ver el detalle de cada plan →', en: 'See the details of each plan →', pt: 'Ver os detalhes de cada plano →' },

    /* --- Index: por qué elegirnos --- */
    why_eyebrow: { es: 'Por qué elegirnos', en: 'Why choose us', pt: 'Por que nos escolher' },
    why_h2: { es: 'Lo que nos diferencia de una agencia grande', en: 'What sets us apart from a big agency', pt: 'O que nos diferencia de uma agência grande' },
    why1_h3: { es: 'Diseño 100% a medida', en: '100% custom design', pt: 'Design 100% sob medida' },
    why1_p: { es: 'Sin plantillas, sin atajos. Cada decisión responde a tu negocio, no a un template genérico.', en: 'No templates, no shortcuts. Every decision serves your business, not a generic template.', pt: 'Sem templates, sem atalhos. Cada decisão responde ao seu negócio, não a um template genérico.' },
    why2_h3: { es: 'Comunicación directa', en: 'Direct communication', pt: 'Comunicação direta' },
    why2_p: { es: 'Hablas directamente con la persona que programa tu sitio, no con un vendedor ni un intermediario.', en: 'You talk directly with the person who builds your site, not with a salesperson or a middleman.', pt: 'Você fala diretamente com quem programa o seu site, não com um vendedor ou intermediário.' },
    why3_h3: { es: 'Atención personalizada', en: 'Personalized attention', pt: 'Atendimento personalizado' },
    why3_p: { es: 'Tomamos pocos proyectos a la vez para poder dedicarles el tiempo que merecen.', en: 'We take on few projects at a time so we can give each one the time it deserves.', pt: 'Assumimos poucos projetos por vez para dedicar a cada um o tempo que merece.' },
    why4_h3: { es: 'Entrega ágil', en: 'Fast delivery', pt: 'Entrega ágil' },
    why4_p: { es: 'De la idea al sitio en vivo, sin vueltas ni demoras injustificadas.', en: 'From idea to live site, with no unnecessary detours or delays.', pt: 'Da ideia ao site no ar, sem rodeios nem atrasos injustificados.' },
    why_cta: { es: '¿Quieres ver el detalle técnico completo? Conoce todo lo que tiene tu sitio →', en: 'Want to see the full technical detail? See everything your site gets →', pt: 'Quer ver todo o detalhe técnico? Conheça tudo o que seu site tem →' },

    /* --- Planes: nombres, hooks, features y CTA --- */
    plan1_name: { es: 'Plan Esencial', en: 'Essential Plan', pt: 'Plano Essencial' },
    plan1_hook: { es: '"Tu carta de presentación digital, lista en días."', en: '"Your digital introduction card, ready in days."', pt: '"Seu cartão de apresentação digital, pronto em dias."' },
    plan1_f1: { es: '<strong>Una página</strong>, 100% a medida para tu marca — nada de plantillas', en: '<strong>One page</strong>, 100% custom for your brand — no templates', pt: '<strong>Uma página</strong>, 100% sob medida para sua marca — nada de templates' },
    plan1_f2: { es: 'Totalmente <strong>responsive</strong>: se ve perfecta en el celular, donde te encuentra el 80% de tus clientes', en: 'Fully <strong>responsive</strong>: looks perfect on mobile, where 80% of your customers find you', pt: 'Totalmente <strong>responsivo</strong>: fica perfeito no celular, onde 80% dos seus clientes te encontram' },
    plan1_f3: { es: '<strong>WhatsApp directo</strong> — tu cliente te escribe con un toque, sin formularios eternos', en: '<strong>Direct WhatsApp</strong> — your customer messages you in one tap, no endless forms', pt: '<strong>WhatsApp direto</strong> — seu cliente escreve com um toque, sem formulários intermináveis' },
    plan1_f4: { es: '<strong>SEO base</strong>: título, descripción y estructura para que Google te entienda', en: '<strong>Basic SEO</strong>: title, description and structure so Google understands your business', pt: '<strong>SEO básico</strong>: título, descrição e estrutura para o Google entender seu negócio' },
    plan1_f5: { es: 'Favicon e identidad visual coherente en la pestaña del navegador', en: 'Favicon and consistent visual identity in the browser tab', pt: 'Favicon e identidade visual coerente na aba do navegador' },
    plan1_f6: { es: 'Tuyo desde el día uno, sin mensualidades', en: 'Yours from day one, no monthly fees', pt: 'Seu desde o primeiro dia, sem mensalidades' },
    plan1_for: { es: 'Para quién es: negocios que necesitan tener presencia online ya, con una imagen que no dé vergüenza mostrar.', en: 'Who it\'s for: businesses that need an online presence now, with an image they\'re not embarrassed to show.', pt: 'Para quem é: negócios que precisam de presença online agora, com uma imagem da qual não tenham vergonha.' },
    plan1_cta: { es: 'Elegir Esencial', en: 'Choose Essential', pt: 'Escolher Essencial' },

    plan2_name: { es: 'Plan Profesional', en: 'Professional Plan', pt: 'Plano Profissional' },
    plan2_hook: { es: '"Cuando una página ya no alcanza."', en: '"When one page is no longer enough."', pt: '"Quando uma página já não é suficiente."' },
    plan2_f1: { es: 'Todo lo del <strong>Esencial</strong>, más:', en: 'Everything in <strong>Essential</strong>, plus:', pt: 'Tudo do <strong>Essencial</strong>, mais:' },
    plan2_f2: { es: 'Sitio de <strong>2 páginas</strong>: presentación + catálogo, servicios o carta', en: '<strong>2-page</strong> site: introduction + catalog, services or menu', pt: 'Site de <strong>2 páginas</strong>: apresentação + catálogo, serviços ou cardápio' },
    plan2_f3: { es: '<strong>WhatsApp contextual</strong>: cada sección arma su propio mensaje pre-cargado', en: '<strong>Contextual WhatsApp</strong>: each section builds its own pre-filled message', pt: '<strong>WhatsApp contextual</strong>: cada seção gera sua própria mensagem pré-preenchida' },
    plan2_f4: { es: '<strong>Formulario con validación real</strong> y confirmación de envío', en: '<strong>Form with real validation</strong> and submission confirmation', pt: '<strong>Formulário com validação real</strong> e confirmação de envio' },
    plan2_f5: { es: 'Animaciones sutiles al hacer scroll — se siente vivo, no una foto estática', en: 'Subtle scroll animations — it feels alive, not a static photo', pt: 'Animações sutis ao rolar a página — parece vivo, não uma foto estática' },
    plan2_f6: { es: '<strong>Analítica integrada</strong> desde el día uno', en: '<strong>Built-in analytics</strong> from day one', pt: '<strong>Analytics integrado</strong> desde o primeiro dia' },
    plan2_f7: { es: 'Meta tags completos: se ve como tarjeta profesional al compartir en redes', en: 'Full meta tags: looks like a professional card when shared on social media', pt: 'Meta tags completas: aparece como um cartão profissional ao compartilhar nas redes' },
    plan2_for: { es: 'Para quién es: negocios con trayectoria que necesitan una web tan seria como el negocio en persona.', en: 'Who it\'s for: established businesses that need a website as serious as the business itself.', pt: 'Para quem é: negócios com trajetória que precisam de um site tão sério quanto o negócio em pessoa.' },
    plan2_cta: { es: 'Elegir Profesional', en: 'Choose Professional', pt: 'Escolher Profissional' },

    plan3_name: { es: 'Plan Premium', en: 'Premium Plan', pt: 'Plano Premium' },
    plan3_hook: { es: '"El nivel que separa tu negocio de la competencia — literalmente." Con este plan construimos Café Moretti, nuestro proyecto de demostración, para mostrarlo en un escenario real de uso.', en: '"The level that sets your business apart from the competition — literally." We built Café Moretti, our demo project, with this plan to show it in a real-world scenario.', pt: '"O nível que separa o seu negócio da concorrência — literalmente." Foi com este plano que construímos o Café Moretti, nosso projeto de demonstração, para mostrá-lo em um cenário real.' },
    plan3_f1: { es: 'Todo lo del <strong>Profesional</strong>, más:', en: 'Everything in <strong>Professional</strong>, plus:', pt: 'Tudo do <strong>Profissional</strong>, mais:' },
    plan3_f2: { es: '🎨 Sistema de diseño editorial 100% exclusivo', en: '🎨 100% exclusive editorial design system', pt: '🎨 Sistema de design editorial 100% exclusivo' },
    plan3_f3: { es: '✨ Efectos de scroll y transiciones de nivel superior', en: '✨ Top-tier scroll effects and transitions', pt: '✨ Efeitos de scroll e transições de nível superior' },
    plan3_f4: { es: '🌗 Modo claro y oscuro, sin parpadeos', en: '🌗 Light and dark mode, no flicker', pt: '🌗 Modo claro e escuro, sem piscadas' },
    plan3_f5: { es: '🌎 Sitio multilenguaje (español, inglés y portugués)', en: '🌎 Multilingual site (Spanish, English and Portuguese)', pt: '🌎 Site multilíngue (espanhol, inglês e português)' },
    plan3_f6: { es: '📩 WhatsApp inteligente en cada punto de contacto', en: '📩 Smart WhatsApp at every touchpoint', pt: '📩 WhatsApp inteligente em cada ponto de contato' },
    plan3_f7: { es: '🛡️ Formulario blindado antispam + validación en tiempo real', en: '🛡️ Spam-proof form + real-time validation', pt: '🛡️ Formulário blindado antispam + validação em tempo real' },
    plan3_f8: { es: '🔍 Datos estructurados para Google', en: '🔍 Structured data for Google', pt: '🔍 Dados estruturados para o Google' },
    plan3_f9: { es: '♿ Accesibilidad real', en: '♿ Real accessibility', pt: '♿ Acessibilidade real' },
    plan3_f10: { es: 'Ver el detalle completo →', en: 'See the full detail →', pt: 'Ver o detalhe completo →' },
    plan3_for: { es: 'Para quién es: el negocio que quiere ser la referencia de su rubro — el que la gente recomienda.', en: 'Who it\'s for: the business that wants to be the reference in its industry — the one people recommend.', pt: 'Para quem é: o negócio que quer ser a referência do seu setor — aquele que as pessoas recomendam.' },
    plan3_cta: { es: 'Elegir Premium', en: 'Choose Premium', pt: 'Escolher Premium' },

    plans_note_h3: { es: '¿Cuál elegir?', en: 'Which one to choose?', pt: 'Qual escolher?' },
    plans_note_p1: { es: 'Si lo que buscas es tener presencia online, <strong>Esencial</strong> te resuelve. Si tu negocio ya tiene trayectoria y necesita más presencia, <strong>Profesional</strong> es el punto justo.', en: 'If you just need an online presence, <strong>Essential</strong> covers it. If your business is established and needs more presence, <strong>Professional</strong> is the sweet spot.', pt: 'Se o que você busca é ter presença online, o <strong>Essencial</strong> resolve. Se seu negócio já tem trajetória e precisa de mais presença, o <strong>Profissional</strong> é o ponto certo.' },
    plans_note_p2: { es: 'Pero si comparas la diferencia entre lo que pagas y lo que obtienes con <strong>Premium</strong>, la cuenta se hace sola: por menos de $60.000 más que el Profesional, obtienes un sitio multilenguaje, con modo oscuro, efectos editoriales y SEO avanzado — el mismo nivel que tiene Café Moretti, nuestro proyecto de demostración. No es que el Premium sea "el caro". Es que los otros dos son el punto de partida.', en: 'But compare what you pay to what you get with <strong>Premium</strong>, and the math does itself: for less than $60,000 more than Professional, you get a multilingual site, dark mode, editorial effects and advanced SEO — the same level as Café Moretti, our demo project. Premium isn\'t "the expensive one". The other two are the starting point.', pt: 'Mas se você comparar a diferença entre o que paga e o que recebe com o <strong>Premium</strong>, a conta fecha sozinha: por menos de $60.000 a mais que o Profissional, você leva um site multilíngue, com modo escuro, efeitos editoriais e SEO avançado — o mesmo nível do Café Moretti, nosso projeto de demonstração. Não é que o Premium seja "o caro". É que os outros dois são o ponto de partida.' },

    /* --- Planes: tabla comparativa (D2) --- */
    compare_eyebrow: { es: 'Comparación rápida', en: 'Quick comparison', pt: 'Comparação rápida' },
    compare_h2: { es: 'Qué incluye cada nivel', en: 'What each level includes', pt: 'O que cada nível inclui' },
    compare_caption: { es: 'Comparación de funciones entre los planes Esencial, Profesional y Premium', en: 'Feature comparison between the Essential, Professional and Premium plans', pt: 'Comparação de funções entre os planos Essencial, Profissional e Premium' },
    compare_row_feature: { es: 'Función', en: 'Feature', pt: 'Função' },
    compare_row_pages: { es: 'Páginas', en: 'Pages', pt: 'Páginas' },
    compare_wa_1: { es: 'Directo', en: 'Direct', pt: 'Direto' },
    compare_wa_2: { es: 'Contextual', en: 'Contextual', pt: 'Contextual' },
    compare_wa_3: { es: 'Inteligente', en: 'Smart', pt: 'Inteligente' },
    compare_row_form: { es: 'Formulario', en: 'Form', pt: 'Formulário' },
    compare_form_2: { es: 'Validado', en: 'Validated', pt: 'Validado' },
    compare_form_3: { es: 'Blindado', en: 'Spam-proof', pt: 'Blindado' },
    compare_row_anim: { es: 'Animaciones', en: 'Animations', pt: 'Animações' },
    compare_anim_2: { es: 'Sutiles al scroll', en: 'Subtle on scroll', pt: 'Sutis ao rolar' },
    compare_anim_3: { es: 'Editoriales + parallax', en: 'Editorial + parallax', pt: 'Editoriais + parallax' },
    compare_row_analytics: { es: 'Analítica', en: 'Analytics', pt: 'Analytics' },
    compare_row_theme: { es: 'Modo claro/oscuro', en: 'Light/dark mode', pt: 'Modo claro/escuro' },
    compare_row_lang: { es: 'Multilenguaje', en: 'Multilingual', pt: 'Multilíngue' },
    compare_row_seo: { es: 'SEO', en: 'SEO', pt: 'SEO' },
    compare_seo_1: { es: 'Base', en: 'Basic', pt: 'Básico' },
    compare_seo_2: { es: 'Base + meta tags', en: 'Basic + meta tags', pt: 'Básico + meta tags' },
    compare_seo_3: { es: 'Avanzado + datos estructurados', en: 'Advanced + structured data', pt: 'Avançado + dados estruturados' },
    compare_row_a11y: { es: 'Accesibilidad', en: 'Accessibility', pt: 'Acessibilidade' },

    /* --- Servicios: "Lo que tiene tu sitio" --- */
    premium_note_p: { es: 'Estas diez funciones vienen incluidas en el <a href="planes.html#premium">plan Premium ($350.000)</a>. No son promesas de folleto: cada una está funcionando ahora mismo en esta página. Prueba el interruptor de modo claro/oscuro o el selector de idioma de arriba.', en: 'These ten features are included in the <a href="planes.html#premium">Premium plan ($350,000)</a>. They\'re not brochure promises: every one is running right now on this page. Try the light/dark toggle or the language selector above.', pt: 'Estas dez funções vêm incluídas no <a href="planes.html#premium">plano Premium ($350.000)</a>. Não são promessas de folheto: cada uma está funcionando agora mesmo nesta página. Experimente o interruptor de modo claro/escuro ou o seletor de idioma acima.' },
    lead_p: { es: 'Diseñar bonito es fácil de simular. Lo que realmente separa un sitio de estudio de una plantilla con el logo pegado encima es todo lo que pasa por debajo: cómo lee el teclado, cómo carga en un celular con mala señal, cómo se ve cuando alguien lo comparte en WhatsApp. Estas son las diez cosas que hacemos distinto.', en: 'A pretty design is easy to fake. What really sets a studio site apart from a template with a logo slapped on top is everything happening underneath: how it reads on a keyboard, how it loads on a phone with a weak signal, how it looks when someone shares it on WhatsApp. Here are the ten things we do differently.', pt: 'Um design bonito é fácil de simular. O que realmente separa um site de estúdio de um template com a logo colada em cima é tudo o que acontece por baixo: como ele lê pelo teclado, como carrega num celular com sinal fraco, como fica quando alguém compartilha no WhatsApp. Estas são as dez coisas que fazemos diferente.' },

    feat1_h3: { es: 'Sistema de diseño editorial 100% exclusivo', en: '100% exclusive editorial design system', pt: 'Sistema de design editorial 100% exclusivo' },
    feat1_p: { es: 'Tipografía, composición y detalles — letras capitulares, numeración de sección, citas destacadas — construidos desde cero para la marca. Nada de plantilla con el logo pegado encima.', en: 'Typography, composition and details — drop caps, section numbering, pull quotes — built from scratch for the brand. No template with a logo slapped on top.', pt: 'Tipografia, composição e detalhes — letras capitulares, numeração de seção, citações destacadas — construídos do zero para a marca. Nada de template com a logo colada em cima.' },
    feat2_h3: { es: 'Efectos de scroll de nivel superior', en: 'Top-tier scroll effects', pt: 'Efeitos de scroll de nível superior' },
    feat2_p: { es: 'Parallax en las fotos y transición entre páginas: navegar el sitio se siente como hojear una revista, no como cargar una web más.', en: 'Parallax on photos and page transitions: browsing the site feels like flipping through a magazine, not loading just another website.', pt: 'Parallax nas fotos e transição entre páginas: navegar pelo site parece folhear uma revista, não carregar mais um site qualquer.' },
    feat3_h3: { es: 'Modo claro y oscuro', en: 'Light and dark mode', pt: 'Modo claro e escuro' },
    feat3_p: { es: 'El sitio se adapta al gusto de quien lo visita, sin parpadeos ni demoras al cargar — algo que ni las grandes cadenas tienen resuelto.', en: 'The site adapts to each visitor\'s taste, with no flicker or load delay — something even big chains haven\'t figured out.', pt: 'O site se adapta ao gosto de quem visita, sem piscadas nem demora ao carregar — algo que nem as grandes redes resolveram.' },
    feat4_h3: { es: 'Sitio multilenguaje (español, inglés y portugués)', en: 'Multilingual site (Spanish, English and Portuguese)', pt: 'Site multilíngue (espanhol, inglês e português)' },
    feat4_p: { es: 'Abre el negocio a turistas y clientes internacionales sin que nadie tenga que escribir una palabra extra. El contenido en español es el que indexa Google; inglés y portugués mejoran la experiencia de quien ya está en el sitio.', en: 'Opens the business up to tourists and international customers without anyone writing an extra word. The Spanish content is what Google indexes; English and Portuguese improve the experience for visitors already on the site.', pt: 'Abre o negócio para turistas e clientes internacionais sem que ninguém precise escrever uma palavra extra. O conteúdo em espanhol é o que o Google indexa; inglês e português melhoram a experiência de quem já está no site.' },
    feat5_h3: { es: 'WhatsApp inteligente en cada punto de contacto', en: 'Smart WhatsApp at every touchpoint', pt: 'WhatsApp inteligente em cada ponto de contato' },
    feat5_p: { es: 'No un botón genérico repetido: cada CTA del sitio arma su propio mensaje pre-cargado, específico de dónde se tocó. (Pruébalo en los botones de la página de planes.)', en: 'Not a repeated generic button: every CTA on the site builds its own pre-filled message, specific to where it was clicked. (Try it on the buttons on the plans page.)', pt: 'Não é um botão genérico repetido: cada CTA do site gera sua própria mensagem pré-preenchida, específica de onde foi clicado. (Experimente nos botões da página de planos.)' },
    feat6_h3: { es: 'Formulario blindado', en: 'Spam-proof form', pt: 'Formulário blindado' },
    feat6_p: { es: 'Protección antispam invisible — el bot cae solo, sin que nadie tenga que hacer nada — más validación en tiempo real y confirmación de envío, en vez del cartelito feo del navegador.', en: 'Invisible anti-spam protection — the bot trips itself up, no one has to do anything — plus real-time validation and a send confirmation, instead of the browser\'s ugly little popup.', pt: 'Proteção antispam invisível — o bot cai sozinho, sem que ninguém precise fazer nada — além de validação em tempo real e confirmação de envio, em vez do aviso feio do navegador.' },
    feat7_h3: { es: 'Estado en vivo', en: 'Live status', pt: 'Status em tempo real' },
    feat7_p: { es: 'El sitio muestra automáticamente si hay cupos disponibles este mes — sin que nadie tenga que tocar nada. En un local físico, esto se traduce en horario de apertura en tiempo real: si un horario cambia en la tabla, todo se recalcula solo.', en: 'The site automatically shows whether there are open slots this month — without anyone touching anything. For a physical location, this becomes real-time opening hours: change a time in the table and everything recalculates itself.', pt: 'O site mostra automaticamente se há vagas disponíveis neste mês — sem que ninguém precise mexer em nada. Em um local físico, isso vira horário de funcionamento em tempo real: se um horário muda na tabela, tudo se recalcula sozinho.' },
    feat8_h3: { es: 'Datos estructurados para Google', en: 'Structured data for Google', pt: 'Dados estruturados para o Google' },
    feat8_p: { es: 'Tu negocio aparece en buscadores con dirección, horario y teléfono directamente en el resultado, no solo un link. Incluye mapa del sitio y las etiquetas que hacen que, al compartir el link en WhatsApp o redes, se vea como una tarjeta profesional con imagen — no un link pelado.', en: 'Your business shows up in search results with address, hours and phone number right in the result, not just a link. Includes a sitemap and the tags that make the link look like a professional card with an image when shared on WhatsApp or social media — not a bare link.', pt: 'Seu negócio aparece nos buscadores com endereço, horário e telefone diretamente no resultado, não só um link. Inclui mapa do site e as tags que fazem o link parecer um cartão profissional com imagem ao compartilhar no WhatsApp ou redes sociais — não um link seco.' },
    feat9_h3: { es: 'Accesibilidad real', en: 'Real accessibility', pt: 'Acessibilidade real' },
    feat9_p: { es: 'El sitio respeta cuando alguien tiene las animaciones reducidas activadas en su celular, funciona con teclado y lectores de pantalla, y cuida el contraste de lectura — un detalle que casi nadie en el mercado se toma en serio.', en: 'The site respects reduced-motion settings on someone\'s phone, works with keyboard and screen readers, and takes care of reading contrast — a detail almost no one in the market takes seriously.', pt: 'O site respeita quando alguém tem as animações reduzidas ativadas no celular, funciona com teclado e leitores de tela, e cuida do contraste de leitura — um detalhe que quase ninguém no mercado leva a sério.' },
    feat10_h3: { es: 'Documentación técnica completa', en: 'Complete technical documentation', pt: 'Documentação técnica completa' },
    feat10_p: { es: 'Todo el sitio está prolijamente documentado por dentro, como corresponde a un producto serio — para que cualquier ajuste futuro, lo haga quien lo haga, sea simple.', en: 'The whole site is neatly documented on the inside, as befits a serious product — so any future adjustment, whoever makes it, is simple.', pt: 'Todo o site está cuidadosamente documentado por dentro, como convém a um produto sério — para que qualquer ajuste futuro, seja quem for que o faça, seja simples.' },

    pull_quote: { es: 'No es que el Premium tenga "más cosas". Es una categoría distinta de sitio web.', en: 'It\'s not that Premium has "more stuff". It\'s a different category of website.', pt: 'Não é que o Premium tenha "mais coisas". É uma categoria diferente de site.' },
    see_premium_plan: { es: 'Ver plan Premium', en: 'See Premium plan', pt: 'Ver plano Premium' },
    see_in_action: { es: 'Verlo en acción en Café Moretti →', en: 'See it in action on Café Moretti →', pt: 'Ver em ação no Café Moretti →' },

    /* --- Contacto --- */
    contact_direct_label: { es: 'O escríbenos directo', en: 'Or message us directly', pt: 'Ou fale com a gente direto' },
    contact_urgency: { es: '<strong>Cupos limitados por mes.</strong> Tomamos pocos proyectos a la vez para dar atención personalizada a cada uno — si estás pensando en tu web, mejor escríbenos pronto.', en: '<strong>Limited slots each month.</strong> We take on few projects at a time to give each one personal attention — if you\'re thinking about your website, better to reach out soon.', pt: '<strong>Vagas limitadas por mês.</strong> Assumimos poucos projetos por vez para dar atenção personalizada a cada um — se você está pensando no seu site, é melhor falar com a gente logo.' }
  };

  const localeMap = { es: 'es-419', en: 'en-US', pt: 'pt-BR' };

  function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

  /* -------------------------------------------------------
     3. TRANSICIÓN "IRIS"
     Un agujero circular (máscara SVG) se cierra hasta tapar toda
     la pantalla, muestra el logo, aplica el cambio real por debajo,
     y se vuelve a abrir. Mismo mecanismo para tema, idioma y
     navegación entre páginas.
     ------------------------------------------------------- */
  const IRIS_R_MAX = 0.78; // fracción del bounding box; cubre hasta las esquinas
  const CLOSE_MS = 650;
  const OPEN_MS = 650;
  const HOLD_MS = 260;
  const LOGO_MS = 320;   // duración de la transición CSS del logo (opacity + transform)
  const OVERLAP_MS = 170; // el logo empieza a aparecer/desaparecer un poco antes de que el círculo termine, para que se sienta un solo movimiento

  function ensureIrisDom() {
    if (document.getElementById('irisOverlay')) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.innerHTML =
      '<defs><mask id="irisMask" maskContentUnits="objectBoundingBox">' +
      '<rect x="0" y="0" width="1" height="1" fill="white"></rect>' +
      '<circle id="irisHole" cx="0.5" cy="0.5" r="0" fill="black"></circle>' +
      '</mask></defs>';
    document.body.appendChild(svg);

    const overlay = document.createElement('div');
    overlay.id = 'irisOverlay';
    overlay.className = 'iris-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.mask = 'url(#irisMask)';
    overlay.style.webkitMask = 'url(#irisMask)';
    overlay.innerHTML = '<span class="iris-logo">Lemuel<span>Labs</span></span>';
    document.body.appendChild(overlay);
  }

  function paintOverlayForTheme(overlay) {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    overlay.style.background = isLight ? '#FFFFFF' : '#000000';
    const logo = overlay.querySelector('.iris-logo');
    logo.style.color = isLight ? '#18121F' : '#F5F5F0';
    const accentSpan = logo.querySelector('span');
    if (accentSpan) accentSpan.style.color = isLight ? '#6D28D9' : '#A78BFA';
  }

  // El foco de teclado no debe poder "entrar" al contenido tapado por el
  // overlay mientras la transición corre. `inert` lo saca por completo
  // de la navegación por teclado (y de lectores de pantalla) hasta que
  // se libera de nuevo.
  let irisSavedFocusEl = null;
  function lockContentForTransition() {
    irisSavedFocusEl = (document.activeElement && document.activeElement !== document.body)
      ? document.activeElement
      : null;
    document.querySelectorAll('body > *').forEach((el) => {
      if (el.id === 'irisOverlay' || el.tagName === 'SVG') return;
      el.setAttribute('inert', '');
    });
  }
  function unlockContentAfterTransition() {
    document.querySelectorAll('body > [inert]').forEach((el) => el.removeAttribute('inert'));
    if (irisSavedFocusEl && document.contains(irisSavedFocusEl)) irisSavedFocusEl.focus();
    irisSavedFocusEl = null;
  }

  function animateHole(fromR, toR, duration) {
    if (reducedMotion) {
      document.getElementById('irisHole').setAttribute('r', String(toR));
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const holeCircle = document.getElementById('irisHole');
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        // easeInOutQuint: curva continua de punta a punta, sin quiebre
        // de velocidad perceptible a mitad de camino (a diferencia de
        // la cúbica anterior).
        const eased = t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
        holeCircle.setAttribute('r', (fromR + (toR - fromR) * eased).toFixed(4));
        if (t < 1) requestAnimationFrame(tick);
        else resolve();
      }
      requestAnimationFrame(tick);
    });
  }

  /**
   * Corre la secuencia completa (cerrar → logo → cambiar → abrir)
   * para un cambio que ocurre en la misma página (tema o idioma).
   */
  async function runIrisChange(changeFn) {
    if (reducedMotion) {
      if (changeFn) changeFn();
      return;
    }
    ensureIrisDom();
    const overlay = document.getElementById('irisOverlay');
    paintOverlayForTheme(overlay);
    overlay.classList.add('is-active');
    lockContentForTransition();

    // El logo empieza a aparecer un poco antes de que el círculo termine
    // de cerrarse del todo: se solapan para sentirse como un solo gesto.
    const closing = animateHole(IRIS_R_MAX, 0, CLOSE_MS);
    setTimeout(() => overlay.classList.add('is-logo-visible'), Math.max(CLOSE_MS - OVERLAP_MS, 0));
    await closing;
    await wait(HOLD_MS);

    if (changeFn) changeFn();
    paintOverlayForTheme(overlay); // por si el cambio fue de tema
    await wait(40);

    overlay.classList.remove('is-logo-visible');
    await wait(Math.max(LOGO_MS - OVERLAP_MS, 0));
    await animateHole(0, IRIS_R_MAX, OPEN_MS);
    overlay.classList.remove('is-active');
    unlockContentAfterTransition();
  }

  /**
   * Corre solo la fase de cierre y navega a otra página. La fase
   * de apertura la corre la página destino al cargar (ver initIrisOnLoad).
   */
  async function runIrisNavigate(url) {
    if (reducedMotion) {
      window.location.href = url;
      return;
    }
    ensureIrisDom();
    const overlay = document.getElementById('irisOverlay');
    paintOverlayForTheme(overlay);
    overlay.classList.add('is-active');
    lockContentForTransition(); // se queda bloqueado: la página va a descargarse

    const closing = animateHole(IRIS_R_MAX, 0, CLOSE_MS);
    setTimeout(() => overlay.classList.add('is-logo-visible'), Math.max(CLOSE_MS - OVERLAP_MS, 0));
    await closing;
    try { sessionStorage.setItem('lemuel-iris-open', '1'); } catch (e) { /* noop */ }
    await wait(140);
    window.location.href = url;
  }

  /**
   * Al cargar una página después de una navegación con iris: arranca
   * ya "cerrada" (agujero en 0, logo visible, tapando el flash de
   * contenido) y corre solo la fase de apertura.
   */
  function initIrisOnLoad() {
    let pending = false;
    try { pending = sessionStorage.getItem('lemuel-iris-open') === '1'; } catch (e) { /* noop */ }

    if (!pending) return;
    try { sessionStorage.removeItem('lemuel-iris-open'); } catch (e) { /* noop */ }

    document.documentElement.classList.remove('iris-pending');

    if (reducedMotion) return;

    ensureIrisDom();
    const overlay = document.getElementById('irisOverlay');
    paintOverlayForTheme(overlay);
    document.getElementById('irisHole').setAttribute('r', '0');
    overlay.classList.add('is-active', 'is-logo-visible');
    lockContentForTransition();

    (async () => {
      await wait(HOLD_MS);
      overlay.classList.remove('is-logo-visible');
      await wait(Math.max(LOGO_MS - OVERLAP_MS, 0));
      await animateHole(0, IRIS_R_MAX, OPEN_MS);
      overlay.classList.remove('is-active');
      unlockContentAfterTransition();
    })();
  }

  /* -------------------------------------------------------
     4. TEMA CLARO/OSCURO
     ------------------------------------------------------- */
  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    toggle.setAttribute('aria-pressed', current === 'light' ? 'true' : 'false');

    toggle.addEventListener('click', () => {
      runIrisChange(() => {
        const now = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', now);
        try { localStorage.setItem('lemuel-theme', now); } catch (e) { /* noop */ }
        toggle.setAttribute('aria-pressed', now === 'light' ? 'true' : 'false');
      });
    });
  }

  /* -------------------------------------------------------
     5. SELECTOR DE IDIOMA (dropdown accesible)
     ------------------------------------------------------- */
  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] && dict[key][lang]) el.textContent = dict[key][lang];
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] && dict[key][lang]) el.innerHTML = dict[key][lang];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] && dict[key][lang]) el.setAttribute('placeholder', dict[key][lang]);
    });

    const currentLabel = document.getElementById('langCurrentLabel');
    if (currentLabel) currentLabel.textContent = lang.toUpperCase();

    document.querySelectorAll('#langMenu [role="option"]').forEach((opt) => {
      opt.setAttribute('aria-selected', opt.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    updateCuposBadge(lang);
    try { localStorage.setItem('lemuel-lang', lang); } catch (e) { /* noop */ }
  }

  function initLanguageDropdown() {
    const wrap = document.getElementById('langSwitch');
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    if (!wrap || !btn || !menu) return;

    const options = Array.from(menu.querySelectorAll('[role="option"]'));
    let focusedIndex = -1;

    function openMenu() {
      wrap.setAttribute('data-open', 'true');
      btn.setAttribute('aria-expanded', 'true');
      const current = options.findIndex((o) => o.getAttribute('aria-selected') === 'true');
      focusedIndex = current >= 0 ? current : 0;
      focusOption(focusedIndex);
      menu.focus(); // el listbox recibe el foco real; las opciones se marcan por aria-activedescendant
      document.addEventListener('click', onOutsideClick);
    }
    function closeMenu(returnFocus) {
      wrap.setAttribute('data-open', 'false');
      btn.setAttribute('aria-expanded', 'false');
      options.forEach((o) => o.classList.remove('is-focused'));
      document.removeEventListener('click', onOutsideClick);
      if (returnFocus) btn.focus();
    }
    function focusOption(index) {
      options.forEach((o) => o.classList.remove('is-focused'));
      focusedIndex = (index + options.length) % options.length;
      options[focusedIndex].classList.add('is-focused');
      menu.setAttribute('aria-activedescendant', options[focusedIndex].id);
    }
    function onOutsideClick(e) {
      if (!wrap.contains(e.target)) closeMenu(false);
    }
    function selectOption(option) {
      const lang = option.getAttribute('data-lang');
      closeMenu(true);
      if (document.documentElement.lang !== lang) {
        runIrisChange(() => applyLanguage(lang));
      }
    }

    btn.addEventListener('click', () => {
      wrap.getAttribute('data-open') === 'true' ? closeMenu(true) : openMenu();
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu();
      }
    });

    menu.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); focusOption(focusedIndex + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); focusOption(focusedIndex - 1); }
      else if (e.key === 'Home') { e.preventDefault(); focusOption(0); }
      else if (e.key === 'End') { e.preventDefault(); focusOption(options.length - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOption(options[focusedIndex]); }
      else if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); }
      else if (e.key === 'Tab') { closeMenu(false); }
    });

    options.forEach((opt) => {
      opt.addEventListener('click', () => selectOption(opt));
      opt.addEventListener('mouseenter', () => focusOption(options.indexOf(opt)));
    });
  }

  function initLanguage() {
    let saved = 'es';
    try { saved = localStorage.getItem('lemuel-lang') || 'es'; } catch (e) { /* noop */ }
    applyLanguage(saved);
    initLanguageDropdown();
  }

  /* -------------------------------------------------------
     6. NAV MÓVIL + INTERCEPTOR DE NAVEGACIÓN (iris)
     ------------------------------------------------------- */
  function initNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
      });
    }

    if (!navLinks) return;
    navLinks.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', (e) => {
        navLinks.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');

        // Solo interceptamos navegación interna real (mismas páginas del sitio)
        const url = new URL(link.href, window.location.href);
        const isInternal = url.origin === window.location.origin && /\.html?$/.test(url.pathname);
        const isSamePage = url.pathname === window.location.pathname;
        if (!isInternal || link.target === '_blank') return;

        e.preventDefault();
        if (isSamePage) return; // ya estamos ahí, no repetir la transición
        runIrisNavigate(link.href);
      });
    });
  }

  /* -------------------------------------------------------
     7. ESTADO ACTIVO DEL NAV
     ------------------------------------------------------- */
  function initActiveNav() {
    const navLinks = document.querySelectorAll('#navLinks a[href]');
    if (!navLinks.length) return;

    const currentFile = (window.location.pathname.split('/').pop() || 'index.html') || 'index.html';

    navLinks.forEach((link) => {
      const url = new URL(link.href, window.location.href);
      const linkFile = url.pathname.split('/').pop() || 'index.html';
      const isCurrent = linkFile === currentFile && !url.hash;
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    // Soporte adicional para navegación por anclas dentro de una misma
    // página (si en el futuro el nav apunta a #secciones): resalta el
    // link de la sección visible con IntersectionObserver.
    const hashLinks = Array.from(navLinks).filter((link) => new URL(link.href, window.location.href).hash);
    if (!hashLinks.length || !('IntersectionObserver' in window)) return;

    const sectionMap = new Map();
    hashLinks.forEach((link) => {
      const id = new URL(link.href, window.location.href).hash.slice(1);
      const section = document.getElementById(id);
      if (section) sectionMap.set(section, link);
    });
    if (!sectionMap.size) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        hashLinks.forEach((l) => l.removeAttribute('aria-current'));
        sectionMap.get(entry.target).setAttribute('aria-current', 'page');
      });
    }, { threshold: 0.5 });
    sectionMap.forEach((_, section) => io.observe(section));
  }

  /* -------------------------------------------------------
     8. GRADIENTE MOUSE-REACTIVE
     ------------------------------------------------------- */
  function initMouseGradient() {
    if (reducedMotion) return;

    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
        hero.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
      });
    }

    const contact = document.getElementById('contacto');
    if (contact) {
      contact.addEventListener('mousemove', (e) => {
        const rect = contact.getBoundingClientRect();
        contact.style.setProperty('--cx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
        contact.style.setProperty('--cy', ((e.clientY - rect.top) / rect.height) * 100 + '%');
      });
    }
  }

  /* -------------------------------------------------------
     9. SCROLL REVEAL
     ------------------------------------------------------- */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reducedMotion) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('in-view'));
    }
  }

  /* -------------------------------------------------------
     10. BADGE "CUPOS DISPONIBLES"
     ------------------------------------------------------- */
  function updateCuposBadge(lang) {
    const badges = document.querySelectorAll('[data-cupos-badge]');
    if (!badges.length) return;
    const locale = localeMap[lang] || 'es-AR';
    const month = new Date().toLocaleString(locale, { month: 'long' });
    const monthCap = month.charAt(0).toUpperCase() + month.slice(1);

    badges.forEach((badge) => {
      let dot = badge.querySelector('.badge-dot');
      if (!dot) { dot = document.createElement('span'); dot.className = 'badge-dot'; badge.prepend(dot); }
      let textEl = badge.querySelector('.badge-text');
      if (!textEl) { textEl = document.createElement('span'); textEl.className = 'badge-text'; badge.appendChild(textEl); }

      if (cuposDisponibles) {
        badge.setAttribute('data-status', 'open');
        textEl.textContent = `${dict.cupos_open[lang] || dict.cupos_open.es} ${monthCap}`;
      } else {
        badge.setAttribute('data-status', 'closed');
        textEl.textContent = dict.cupos_closed[lang] || dict.cupos_closed.es;
      }
    });
  }

  /* -------------------------------------------------------
     11. FORMULARIO DE CONTACTO — honeypot + validación real-time
     ------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
      name: form.querySelector('#name'),
      email: form.querySelector('#email'),
      message: form.querySelector('#message')
    };
    const honeypot = form.querySelector('#website');
    const status = form.querySelector('.form-status');
    const fallback = document.getElementById('formFallback');

    const validators = {
      name: (v) => v.trim().length >= 2,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: (v) => v.trim().length >= 10
    };
    const messages = {
      name: 'Cuéntanos cómo te llamas (al menos 2 caracteres).',
      email: 'Necesitamos un email válido para responderte.',
      message: 'Cuéntanos un poco más — al menos 10 caracteres.'
    };

    function validateField(key) {
      const el = fields[key];
      if (!el) return true;
      const errorEl = document.getElementById(key + 'Error');
      const valid = validators[key](el.value);
      el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (errorEl) errorEl.textContent = valid ? '' : messages[key];
      return valid;
    }

    Object.keys(fields).forEach((key) => {
      const el = fields[key];
      if (!el) return;
      el.addEventListener('blur', () => validateField(key));
      el.addEventListener('input', () => {
        if (el.getAttribute('aria-invalid') === 'true') validateField(key);
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot: si un bot completó este campo invisible, fingimos
      // éxito y no mandamos nada.
      if (honeypot && honeypot.value.trim() !== '') {
        form.reset();
        if (status) { status.textContent = '¡Gracias! Te vamos a responder a la brevedad.'; status.classList.remove('is-error'); }
        if (fallback) fallback.hidden = true;
        return;
      }

      const allValid = Object.keys(validators).map(validateField).every(Boolean);
      if (!allValid) {
        if (status) { status.textContent = ''; status.classList.remove('is-error'); }
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Enviando…';
      btn.disabled = true;
      if (status) { status.textContent = ''; status.classList.remove('is-error'); }
      if (fallback) fallback.hidden = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) throw new Error('Respuesta no exitosa: ' + response.status);

        btn.textContent = '¡Mensaje enviado!';
        if (status) { status.textContent = 'Gracias — te respondemos por email o WhatsApp a la brevedad.'; status.classList.remove('is-error'); }
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 3000);
      } catch (err) {
        btn.textContent = original;
        btn.disabled = false;
        if (status) { status.textContent = 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.'; status.classList.add('is-error'); }
        if (fallback) fallback.hidden = false;
      }
    });
  }

  /* -------------------------------------------------------
     12. INIT
     ------------------------------------------------------- */
  initIrisOnLoad();

  document.addEventListener('DOMContentLoaded', async () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    await loadConfig();

    initNav();
    initActiveNav();
    initTheme();
    initLanguage();
    initMouseGradient();
    initReveal();
    initContactForm();
  });
})();

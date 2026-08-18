/* =========================================================
   LEMUEL LABS — LÓGICA COMPARTIDA (todas las páginas)
   Índice:
     1. Diccionario de traducciones (ES/EN/PT)
     2. Transición "iris" — mecanismo central reutilizado por
        tema, idioma y navegación entre páginas
     3. Tema claro/oscuro
     4. Selector de idioma (dropdown accesible)
     5. Nav móvil + interceptor de navegación (iris)
     6. Estado activo del nav (URL actual + anclas si las hay)
     7. Gradiente mouse-reactive (firma visual)
     8. Scroll reveal
     9. Tabla comparativa: indicador de scroll horizontal
     10. Formulario de contacto: honeypot + validación en vivo
     11. Init
   ========================================================= */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------
     1. TRADUCCIONES
     ------------------------------------------------------- */
  const dict = {
    nav_inicio: { en: 'Home',       pt: 'Início' },
    nav_planes: { en: 'Plans',      pt: 'Planos' },
    nav_servicios: { en: 'Your site',  pt: 'Seu site' },
    nav_proyecto: { en: 'Project',    pt: 'Projeto' },
    nav_contacto: { en: 'Contact',    pt: 'Contato' },
    nav_cta: { en: "Let's talk", pt: 'Vamos falar' },

    hero_index_eyebrow: { en: 'Lemuel Labs — Web development studio', pt: 'Lemuel Labs — Estúdio de desenvolvimento web' },
    hero_index_h1: { en: 'Websites that <em>convert</em>,<br>not just decorate.', pt: 'Sites que <em>convertem</em>,<br>não só decoram.' },
    hero_index_sub: { en: 'Three levels of custom websites, matched to what your business needs today. No recycled templates.', pt: 'Três níveis de site sob medida, de acordo com o que seu negócio precisa hoje. Sem templates reciclados.' },
    hero_index_cta1: { en: 'See plans & pricing', pt: 'Ver planos e preços' },
    hero_index_cta2: { en: 'See the demo project', pt: 'Ver projeto de exemplo' },

    hero_planes_eyebrow: { en: 'Plans', pt: 'Planos' },
    hero_planes_h1: { en: 'Choose the <em>level</em> your business needs.', pt: 'Escolha o <em>nível</em> que seu negócio precisa.' },
    hero_planes_sub: { en: 'Essential, Professional or Premium. Each one solves a different stage of the same problem: making your business look online as good as it does in person.', pt: 'Essencial, Profissional ou Premium. Cada um resolve uma etapa diferente do mesmo problema: fazer seu negócio parecer tão bom online quanto pessoalmente.' },

    hero_servicios_eyebrow: { en: "What's in your site", pt: 'O que tem o seu site' },
    hero_servicios_h1: { en: 'The detail that shows <em>without saying it</em>.', pt: 'O detalhe que se percebe <em>sem precisar dizer</em>.' },
    hero_servicios_sub: { en: 'This is exactly what the Premium plan includes — and this very site is using it right now.', pt: 'Isto é exatamente o que o plano Premium inclui — e este mesmo site está usando isso agora.' },

    hero_proyecto_eyebrow: { en: 'Demo project', pt: 'Projeto de demonstração' },
    hero_proyecto_h1: { en: 'Café Moretti, <em>in detail</em>.', pt: 'Café Moretti, <em>em detalhes</em>.' },
    hero_proyecto_sub: { en: 'An in-house exercise, built with the Premium plan to show it in a real-world use case.', pt: 'Um exercício próprio, construído com o plano Premium para mostrá-lo em um caso de uso real.' },

    hero_contacto_eyebrow: { en: 'Contact', pt: 'Contato' },
    hero_contacto_h1: { en: 'Tell us about <em>your project</em>.', pt: 'Conte sobre <em>seu projeto</em>.' },
    hero_contacto_sub: { en: 'We reply over WhatsApp, email, or the form below — whatever works best for you.', pt: 'Respondemos por WhatsApp, e-mail ou o formulário abaixo — o que for mais fácil para você.' },

    lang_name_es: { en: 'Spanish', pt: 'Espanhol' },
    lang_name_en: { en: 'English', pt: 'Inglês' },
    lang_name_pt: { en: 'Portuguese', pt: 'Português' },

    /* --- Formulario de contacto --- */
    form_label_name: { en: 'Name', pt: 'Nome' },
    form_placeholder_name: { en: 'Your name', pt: 'Seu nome' },
    form_label_email: { en: 'Email', pt: 'E-mail' },
    form_label_message: { en: 'Message', pt: 'Mensagem' },
    form_placeholder_message: { en: 'Tell us what your business needs', pt: 'Conte o que seu negócio precisa' },
    form_submit: { en: 'Send message', pt: 'Enviar mensagem' },
    form_submit_whatsapp: { es: 'Abrir WhatsApp', en: 'Open WhatsApp', pt: 'Abrir WhatsApp' },
    form_fallback_text: { en: "Didn't go through? Message us directly on", pt: 'Não enviou? Fale com a gente direto pelo' },
    form_method_label: { en: 'How would you like us to contact you?', pt: 'Como você prefere que a gente entre em contato?' },
    form_method_email: { en: 'Email', pt: 'E-mail' },
    form_method_whatsapp: { en: 'WhatsApp', pt: 'WhatsApp' },
    form_status_email_success: { es: 'Gracias — te respondemos por email a la brevedad.', en: 'Thanks — we\'ll reply by email shortly.', pt: 'Obrigado — respondemos por e-mail em breve.' },
    form_status_whatsapp_success: { es: 'Te abrimos WhatsApp con tu mensaje ya armado — solo falta que lo envíes.', en: 'We opened WhatsApp with your message ready to go — just send it.', pt: 'Abrimos o WhatsApp com sua mensagem pronta — falta só enviar.' },

    /* --- Index: resumen de servicios --- */
    services_eyebrow: { en: 'What we do', pt: 'O que fazemos' },
    services_h2: { en: 'A plan for every stage of your business', pt: 'Um plano para cada etapa do seu negócio' },
    services_p: { en: 'We don\'t sell generic "web design". We sell three clear levels, each built for a different moment.', pt: 'Não vendemos "design web" genérico. Vendemos três níveis claros, cada um pensado para um momento diferente.' },
    service1_h3: { en: 'Your digital introduction card, ready in under 24 hours', pt: 'Seu cartão de apresentação digital, pronto em menos de 24 horas' },
    service1_p: { en: 'A 100% custom, responsive page with direct WhatsApp. Ready in under 24 hours, no fuss.', pt: 'Uma página 100% sob medida, responsiva e com WhatsApp direto. Pronta em menos de 24 horas, sem complicação.' },
    service2_h3: { en: 'Your business in motion — more professional, more trustworthy', pt: 'Seu negócio em movimento — mais profissional, mais confiável' },
    service2_p: { en: 'Two pages, validated form, analytics, and scroll animations.', pt: 'Duas páginas, formulário validado, analytics e animações ao rolar a página.' },
    service3_h3: { en: 'The level that sets your business apart from the competition — literally', pt: 'O nível que separa o seu negócio da concorrência — literalmente' },
    service3_p: { en: 'Editorial design system, multilingual, light/dark mode, and advanced SEO — like this very site.', pt: 'Sistema de design editorial, multilíngue, modo claro/escuro e SEO avançado — como este mesmo site.' },
    services_cta: { en: 'See the details of each plan →', pt: 'Ver os detalhes de cada plano →' },

    /* --- Index: por qué elegirnos --- */
    why_eyebrow: { en: 'Why choose us', pt: 'Por que nos escolher' },
    why_h2: { en: 'What sets us apart from a big agency', pt: 'O que nos diferencia de uma agência grande' },
    why1_h3: { en: '100% custom design', pt: 'Design 100% sob medida' },
    why1_p: { en: 'No templates, no shortcuts. Every decision serves your business, not a generic template.', pt: 'Sem templates, sem atalhos. Cada decisão responde ao seu negócio, não a um template genérico.' },
    why2_h3: { en: 'Direct communication', pt: 'Comunicação direta' },
    why2_p: { en: 'You talk directly with the person who builds your site, not with a salesperson or a middleman.', pt: 'Você fala diretamente com quem programa o seu site, não com um vendedor ou intermediário.' },
    why3_h3: { en: 'Personalized attention', pt: 'Atendimento personalizado' },
    why3_p: { en: 'We take on few projects at a time so we can give each one the time it deserves.', pt: 'Assumimos poucos projetos por vez para dedicar a cada um o tempo que merece.' },
    why4_h3: { en: 'Fast delivery', pt: 'Entrega ágil' },
    why4_p: { en: 'From idea to live site, with no unnecessary detours or delays.', pt: 'Da ideia ao site no ar, sem rodeios nem atrasos injustificados.' },
    why_cta: { en: 'Want to see the full technical detail? See everything your site gets →', pt: 'Quer ver todo o detalhe técnico? Conheça tudo o que seu site tem →' },

    /* --- Index: prueba viva --- */
    proof_tag1: { en: 'Premium Plan', pt: 'Plano Premium' },
    proof_tag3: { en: 'Demo project', pt: 'Projeto de demonstração' },
    proof_h2: { en: 'The proof is on this very site', pt: 'A prova está neste mesmo site' },
    proof_p: { en: 'Lemuel Labs is built with the same level of detail we sell in the Premium plan — light/dark mode, multilingual, its own editorial system. Café Moretti, our demo project, was built with that same plan to show it in a real-world use case.', pt: 'A Lemuel Labs é construída com o mesmo nível de detalhe que vendemos no plano Premium — modo claro/escuro, multilíngue, sistema editorial próprio. O Café Moretti, nosso projeto de demonstração, foi construído com esse mesmo plano para mostrá-lo em um caso de uso real.' },
    proof_cta1: { en: 'See the Café Moretti project →', pt: 'Ver o projeto Café Moretti →' },
    proof_cta2: { en: 'See Premium plan', pt: 'Ver plano Premium' },

    /* --- Servicios: heading oculto --- */
    servicios_hidden_h2: { en: 'The ten features of the Premium plan', pt: 'As dez funções do plano Premium' },

    /* --- Proyecto: cobertura completa --- */
    proyecto_cafeteria_tag: { en: 'Coffee shop', pt: 'Cafeteria' },
    proyecto_intro_p: { en: 'Café Moretti is a fictional business: we created it ourselves to show everything the Premium plan includes in a real-world use case. The site is functional and published — not a mockup — but there\'s no real client behind it. It\'s designed as an introduction site for a coffee shop, with menu, location and contact at a glance.', pt: 'O Café Moretti é um negócio fictício: nós mesmos o criamos para mostrar, em um caso de uso real, tudo o que o plano Premium inclui. O site é funcional e está publicado — não é uma maquete —, mas não há um cliente real por trás. Foi pensado como site de apresentação para uma cafeteria, com cardápio, localização e contato em uma visão geral.' },
    proyecto_live_cta: { en: 'See the live project →', pt: 'Ver projeto ao vivo →' },
    proyecto_why_eyebrow: { en: 'Why Premium', pt: 'Por que Premium' },
    proyecto_why_h2: { en: 'What this level adds to the project', pt: 'O que este nível agrega ao projeto' },
    proyecto_why_p: { en: 'We designed Café Moretti as a neighborhood coffee shop that doesn\'t need a product catalog, but rather needs to convey warmth from the first second — the ideal scenario to show what the Premium plan adds. <a href="servicios.html" style="color:var(--accent-text); text-decoration:underline;">See all Premium plan features →</a>', pt: 'Projetamos o Café Moretti como uma cafeteria de bairro que não precisa de um catálogo de produtos, mas sim transmitir aconchego desde o primeiro segundo — o cenário ideal para mostrar o que o plano Premium agrega. <a href="servicios.html" style="color:var(--accent-text); text-decoration:underline;">Ver todas as funções do plano Premium →</a>' },
    detail1_h3: { en: 'Custom editorial design', pt: 'Design editorial próprio' },
    detail1_p: { en: 'Typography and composition designed for the identity of a neighborhood coffee shop, not a generic "food & beverage" template.', pt: 'Tipografia e composição pensadas para a identidade de uma cafeteria de bairro, não para um template genérico de "food & beverage".' },
    detail2_h3: { en: 'WhatsApp per section', pt: 'WhatsApp por seção' },
    detail2_p: { en: 'The contact button builds a different message depending on whether the visitor comes from the menu, the location, or the reservation.', pt: 'O botão de contato monta uma mensagem diferente dependendo se o visitante vem do cardápio, da localização ou da reserva.' },
    detail3_h3: { en: 'Local SEO', pt: 'SEO local' },
    detail3_p: { en: 'Structured data so the business shows up on Google with address and hours, not just a link.', pt: 'Dados estruturados para o negócio aparecer no Google com endereço e horário, não só um link.' },
    proyecto_note_p: { en: 'Café Moretti is a demo project: we built it ourselves, with no real client behind it, to show the level of detail in the Premium plan in a real-world scenario. We don\'t invent a portfolio of clients that don\'t exist — when we add real clients, this section will grow with real cases.', pt: 'O Café Moretti é um projeto de demonstração: nós mesmos o construímos, sem cliente real por trás, para mostrar o nível de detalhe do plano Premium em um cenário de uso real. Não inventamos um portfólio de clientes que não existem — quando somarmos clientes reais, esta seção vai crescer com casos de verdade.' },
    proyecto_cta_final: { en: 'I want a site like this →', pt: 'Quero um site assim →' },
    reviews_eyebrow: { en: 'Reviews', pt: 'Avaliações' },
    reviews_h2: { en: 'Reviews coming soon', pt: 'Avaliações em breve' },
    reviews_p: { en: 'We don\'t have real clients to quote here yet. When we do, their reviews will appear in this space — with names and everything, nothing made up.', pt: 'Ainda não temos clientes reais para citar aqui. Quando tivermos, as avaliações deles vão aparecer neste espaço — com nome e tudo, nada inventado.' },

    /* --- Planes: nombres, hooks, features y CTA --- */
    plan1_name: { en: 'Essential Plan', pt: 'Plano Essencial' },
    plan1_hook: { en: '"Your digital introduction card, ready in under 24 hours." Ideal if you need a professional presence now — no detours, no filler, straight to the point.', pt: '"Seu cartão de apresentação digital, pronto em menos de 24 horas." Ideal se você precisa de uma presença profissional já — sem rodeios, sem enchimento, direto ao ponto.' },
    plan1_f1: { en: 'Design of <strong>one page</strong>, 100% custom for your brand (no generic templates)', pt: 'Design de <strong>uma página</strong>, 100% sob medida para sua marca (nada de templates genéricos)' },
    plan1_f2: { en: 'Fully <strong>responsive</strong>: it looks perfect on mobile, which is where 80% of your customers are going to find you', pt: 'Totalmente <strong>responsivo</strong>: fica perfeito no celular, que é onde 80% dos seus clientes vão te encontrar' },
    plan1_f3: { en: '<strong>Direct WhatsApp button</strong> — your customer messages you in one tap, no endless forms', pt: '<strong>Botão de WhatsApp direto</strong> — seu cliente escreve com um toque, sem formulários intermináveis' },
    plan1_f4: { en: '<strong>Basic SEO</strong>: title, description and structure designed so Google understands your business', pt: '<strong>SEO básico</strong>: título, descrição e estrutura pensada para o Google entender seu negócio' },
    plan1_f5: { en: 'Favicon and consistent visual identity in the browser tab', pt: 'Favicon e identidade visual coerente na aba do navegador' },
    plan1_f6: { en: 'Yours from day one: no monthly fees and no dependence on third-party platforms', pt: 'Seu desde o primeiro dia: sem mensalidades nem dependência de plataformas de terceiros' },
    plan1_for: { en: 'Who it\'s for: businesses that need an online presence now, with an image they\'re not embarrassed to show.', pt: 'Para quem é: negócios que precisam de presença online agora, com uma imagem da qual não tenham vergonha.' },
    plan1_cta: { en: 'Choose Essential', pt: 'Escolher Essencial' },

    plan2_name: { en: 'Professional Plan', pt: 'Plano Profissional' },
    plan2_hook: { en: '"Your business in motion — more professional, more trustworthy." Everything in the Essential plan, taken a step further — because your business has more to tell.', pt: '"Seu negócio em movimento — mais profissional, mais confiável." Tudo do plano Essencial, levado um passo além — porque seu negócio tem mais para contar.' },
    plan2_f1: { en: 'Everything in <strong>Essential</strong>, plus:', pt: 'Tudo do <strong>Essencial</strong>, mais:' },
    plan2_f2: { en: '<strong>2-page</strong> site: your introduction + a dedicated section for catalog, services or menu', pt: 'Site de <strong>2 páginas</strong>: sua apresentação + uma seção própria para catálogo, serviços ou cardápio' },
    plan2_f3: { en: '<strong>Contextual WhatsApp</strong>: each product or section builds its own pre-filled message, not a repeated generic button', pt: '<strong>WhatsApp contextual</strong>: cada produto ou seção gera sua própria mensagem pré-preenchida, não um botão genérico repetido' },
    plan2_f4: { en: '<strong>Contact form</strong> with real validation (not the browser\'s ugly little popup) and submission confirmation', pt: '<strong>Formulário de contato</strong> com validação real (não o aviso feio do navegador) e confirmação de envio' },
    plan2_f5: { en: 'Subtle scroll animations — the site feels alive, not a static photo', pt: 'Animações sutis ao rolar a página — o site parece vivo, não uma foto estática' },
    plan2_f6: { en: '<strong>Built-in analytics</strong> — you know how many people visit and what they look at, from day one', pt: '<strong>Analytics integrado</strong> — você sabe quantas pessoas entram e o que veem, desde o primeiro dia' },
    plan2_f7: { en: 'Full meta tags (Open Graph/Twitter) — when you share your site on social media, it looks like a professional card, not a bare link', pt: 'Meta tags completas (Open Graph/Twitter) — quando você compartilha seu site nas redes, ele aparece como um cartão profissional, não um link seco' },
    plan2_for: { en: 'Who it\'s for: businesses that already have some track record and need their website to speak with the same seriousness as the business in person.', pt: 'Para quem é: negócios que já têm alguma trajetória e precisam que o site fale com a mesma seriedade que o negócio em pessoa.' },
    plan2_cta: { en: 'Choose Professional', pt: 'Escolher Profissional' },

    plan3_name: { en: 'Premium Plan', pt: 'Plano Premium' },
    plan3_hook: { es: '"El nivel que separa tu negocio de la competencia — literalmente." No es una versión "con más cosas" — es una categoría completamente distinta de sitio web, la misma que usamos para construir Café Moretti, nuestro proyecto de demostración, pensado para mostrar ese nivel en un escenario real de uso.', en: '"The level that sets your business apart from the competition — literally." It\'s not a version "with more stuff" — it\'s a completely different category of website, the same one we used to build Café Moretti, our demo project, designed to show that level in a real-world scenario.', pt: '"O nível que separa o seu negócio da concorrência — literalmente." Não é uma versão "com mais coisas" — é uma categoria completamente diferente de site, a mesma que usamos para construir o Café Moretti, nosso projeto de demonstração, pensado para mostrar esse nível em um cenário real de uso.' },
    plan3_f1: { en: 'Everything in <strong>Professional</strong>, plus:', pt: 'Tudo do <strong>Profissional</strong>, mais:' },
    plan3_f2: { en: '🎨 100% exclusive editorial design system — typography, composition and details (drop caps, section numbering, pull quotes) built from scratch for your brand, not a template with your logo slapped on', pt: '🎨 Sistema de design editorial 100% exclusivo — tipografia, composição e detalhes (letras capitulares, numeração de seção, citações destacadas) construídos do zero para sua marca, não um template com sua logo colada' },
    plan3_f3: { en: '✨ Top-tier scroll effects — parallax on images and page transitions that make browsing your site feel like a continuous single-take shot, not just another website', pt: '✨ Efeitos de scroll de nível superior — parallax nas imagens e transições entre páginas que fazem navegar pelo seu site parecer um plano-sequência contínuo, não mais um site qualquer' },
    plan3_f4: { en: '🌗 Light and dark mode — your site adapts to the user\'s taste, with no flicker on load, something even big chains haven\'t figured out', pt: '🌗 Modo claro e escuro — seu site se adapta ao gosto do usuário, sem piscadas ao carregar, algo que nem as grandes redes resolveram' },
    plan3_f5: { en: '🌎 Multilingual site (Spanish, English and Portuguese) — opens your business up to tourists and international customers without writing an extra word', pt: '🌎 Site multilíngue (espanhol, inglês e português) — abre seu negócio para turistas e clientes internacionais sem escrever uma palavra extra' },
    plan3_f6: { en: '📩 Smart WhatsApp at every touchpoint — not just per product: every button on the site knows exactly which message to build', pt: '📩 WhatsApp inteligente em cada ponto de contato — não só por produto: cada botão do site sabe exatamente qual mensagem montar' },
    plan3_f7: { en: '🛡️ Spam-proof form: invisible anti-spam protection (the bot trips itself up, you don\'t have to do anything) + real-time validation', pt: '🛡️ Formulário blindado: proteção antispam invisível (o bot cai sozinho, sem que você precise fazer nada) + validação em tempo real' },
    plan3_f8: { en: '🔍 Structured data for Google: your business shows up in search results with address, hours and phone number right in the result, not just a link', pt: '🔍 Dados estruturados para o Google: seu negócio aparece nos buscadores com endereço, horário e telefone diretamente no resultado, não só um link' },
    plan3_f9: { en: '♿ Real accessibility: the site respects reduced-motion settings on someone\'s phone — a detail almost no one in the market takes seriously', pt: '♿ Acessibilidade real: o site respeita quando alguém tem as animações reduzidas ativadas no celular — um detalhe que quase ninguém no mercado leva a sério' },
    plan3_f10: { en: 'See the full detail →', pt: 'Ver o detalhe completo →' },
    plan3_for: { en: 'Who it\'s for: the business that wants to be the local reference in its industry — the one people recommend, not just the one people find.', pt: 'Para quem é: o negócio que quer ser a referência do seu setor na sua região — aquele que as pessoas recomendam, não só o que as pessoas encontram.' },
    plan3_cta: { en: 'Choose Premium', pt: 'Escolher Premium' },

    plans_note_h3: { en: 'Which one to choose?', pt: 'Qual escolher?' },
    plans_note_p1: { en: 'If what you\'re looking for is to be online, <strong>Essential</strong> covers it. If your business already has weight and needs more presence, <strong>Professional</strong> is the sweet spot.', pt: 'Se o que você busca é estar online, o <strong>Essencial</strong> resolve. Se seu negócio já tem peso e precisa de mais presença, o <strong>Profissional</strong> é o ponto certo.' },
    plans_note_p2: { es: 'Pero si miras la diferencia entre lo que pagas y lo que te llevas con <strong>Premium</strong>, la cuenta se hace sola: por menos de $50.000 más que el Profesional, te llevas un sitio multilenguaje, con modo oscuro, efectos editoriales, SEO avanzado con datos estructurados y protección antispam real — el mismo nivel que tiene Café Moretti, nuestro proyecto de demostración. No es que el Premium sea "el caro". Es que los otros dos son el punto de partida.', en: 'But if you look at the difference between what you pay and what you get with <strong>Premium</strong>, the math does itself: for less than $50,000 more than Professional, you get a multilingual site, dark mode, editorial effects, advanced SEO with structured data and real anti-spam protection — the same level as Café Moretti, our demo project. Premium isn\'t "the expensive one". The other two are the starting point.', pt: 'Mas se você olhar a diferença entre o que paga e o que leva com o <strong>Premium</strong>, a conta fecha sozinha: por menos de $50.000 a mais que o Profissional, você leva um site multilíngue, com modo escuro, efeitos editoriais, SEO avançado com dados estruturados e proteção antispam real — o mesmo nível do Café Moretti, nosso projeto de demonstração. Não é que o Premium seja "o caro". É que os outros dois são o ponto de partida.' },

    /* --- Planes: tabla comparativa --- */
    compare_eyebrow: { en: 'Quick comparison', pt: 'Comparação rápida' },
    compare_h2: { en: 'What each level includes', pt: 'O que cada nível inclui' },
    compare_caption: { en: 'Feature comparison between the Essential, Professional and Premium plans', pt: 'Comparação de funções entre os planos Essencial, Profissional e Premium' },
    compare_row_feature: { en: 'Feature', pt: 'Função' },
    compare_row_pages: { en: 'Pages', pt: 'Páginas' },
    compare_wa_1: { en: 'Direct', pt: 'Direto' },
    compare_wa_2: { en: 'Contextual', pt: 'Contextual' },
    compare_wa_3: { en: 'Smart', pt: 'Inteligente' },
    compare_row_form: { en: 'Form', pt: 'Formulário' },
    compare_form_2: { en: 'Validated', pt: 'Validado' },
    compare_form_3: { en: 'Spam-proof', pt: 'Blindado' },
    compare_row_anim: { en: 'Animations', pt: 'Animações' },
    compare_anim_2: { en: 'Subtle on scroll', pt: 'Sutis ao rolar' },
    compare_anim_3: { en: 'Editorial + parallax', pt: 'Editoriais + parallax' },
    compare_row_analytics: { en: 'Analytics', pt: 'Analytics' },
    compare_row_theme: { en: 'Light/dark mode', pt: 'Modo claro/escuro' },
    compare_row_lang: { en: 'Multilingual', pt: 'Multilíngue' },
    compare_row_seo: { en: 'SEO', pt: 'SEO' },
    compare_seo_1: { en: 'Basic', pt: 'Básico' },
    compare_seo_2: { en: 'Basic + meta tags', pt: 'Básico + meta tags' },
    compare_seo_3: { en: 'Advanced + structured data', pt: 'Avançado + dados estruturados' },
    compare_row_a11y: { en: 'Accessibility', pt: 'Acessibilidade' },

    /* --- Servicios: "Lo que tiene tu sitio" --- */
    premium_note_p: { en: 'These ten features are included in the <a href="planes.html#premium">Premium plan ($250,000)</a>. They\'re not brochure promises: every one is running right now on this page. Try the light/dark toggle or the language selector above.', pt: 'Estas dez funções vêm incluídas no <a href="planes.html#premium">plano Premium ($250.000)</a>. Não são promessas de folheto: cada uma está funcionando agora mesmo nesta página. Experimente o interruptor de modo claro/escuro ou o seletor de idioma acima.' },
    lead_p: { en: 'A pretty design is easy to fake. What really sets a studio site apart from a template with a logo slapped on top is everything happening underneath: how it reads on a keyboard, how it loads on a phone with a weak signal, how it looks when someone shares it on WhatsApp. Here are the ten things we do differently.', pt: 'Um design bonito é fácil de simular. O que realmente separa um site de estúdio de um template com a logo colada em cima é tudo o que acontece por baixo: como ele lê pelo teclado, como carrega num celular com sinal fraco, como fica quando alguém compartilha no WhatsApp. Estas são as dez coisas que fazemos diferente.' },

    feat1_h3: { en: '100% exclusive editorial design system', pt: 'Sistema de design editorial 100% exclusivo' },
    feat1_p: { en: 'Typography, composition and details — drop caps, section numbering, pull quotes — built from scratch for the brand. No template with a logo slapped on top.', pt: 'Tipografia, composição e detalhes — letras capitulares, numeração de seção, citações destacadas — construídos do zero para a marca. Nada de template com a logo colada em cima.' },
    feat2_h3: { en: 'Top-tier scroll effects', pt: 'Efeitos de scroll de nível superior' },
    feat2_p: { en: 'Parallax on photos and page transitions: browsing the site feels like flipping through a magazine, not loading just another website.', pt: 'Parallax nas fotos e transição entre páginas: navegar pelo site parece folhear uma revista, não carregar mais um site qualquer.' },
    feat3_h3: { en: 'Light and dark mode', pt: 'Modo claro e escuro' },
    feat3_p: { en: 'The site adapts to each visitor\'s taste, with no flicker or load delay — something even big chains haven\'t figured out.', pt: 'O site se adapta ao gosto de quem visita, sem piscadas nem demora ao carregar — algo que nem as grandes redes resolveram.' },
    feat4_h3: { en: 'Multilingual site (Spanish, English and Portuguese)', pt: 'Site multilíngue (espanhol, inglês e português)' },
    feat4_p: { en: 'Opens the business up to tourists and international customers without anyone writing an extra word. The Spanish content is what Google indexes; English and Portuguese improve the experience for visitors already on the site.', pt: 'Abre o negócio para turistas e clientes internacionais sem que ninguém precise escrever uma palavra extra. O conteúdo em espanhol é o que o Google indexa; inglês e português melhoram a experiência de quem já está no site.' },
    feat5_h3: { en: 'Smart WhatsApp at every touchpoint', pt: 'WhatsApp inteligente em cada ponto de contato' },
    feat5_p: { en: 'Not a repeated generic button: every CTA on the site builds its own pre-filled message, specific to where it was clicked. (Try it on the buttons on the plans page.)', pt: 'Não é um botão genérico repetido: cada CTA do site gera sua própria mensagem pré-preenchida, específica de onde foi clicado. (Experimente nos botões da página de planos.)' },
    feat6_h3: { en: 'Spam-proof form', pt: 'Formulário blindado' },
    feat6_p: { en: 'Invisible anti-spam protection — the bot trips itself up, no one has to do anything — plus real-time validation and a send confirmation, instead of the browser\'s ugly little popup.', pt: 'Proteção antispam invisível — o bot cai sozinho, sem que ninguém precise fazer nada — além de validação em tempo real e confirmação de envio, em vez do aviso feio do navegador.' },
    feat7_h3: { en: 'Live hours', pt: 'Horário em tempo real' },
    feat7_p: { en: 'Your site automatically shows whether you\'re open or closed right now, and until what time — without you ever having to touch anything. If a schedule changes in the table, everything recalculates itself.', pt: 'Seu site mostra automaticamente se você está aberto ou fechado agora, e até que horas — sem que você precise mexer em nada. Se um horário muda na tabela, tudo se recalcula sozinho.' },
    feat8_h3: { en: 'Structured data for Google', pt: 'Dados estruturados para o Google' },
    feat8_p: { en: 'Your business shows up in search results with address, hours and phone number right in the result, not just a link. Includes a sitemap and the tags that make the link look like a professional card with an image when shared on WhatsApp or social media — not a bare link.', pt: 'Seu negócio aparece nos buscadores com endereço, horário e telefone diretamente no resultado, não só um link. Inclui mapa do site e as tags que fazem o link parecer um cartão profissional com imagem ao compartilhar no WhatsApp ou redes sociais — não um link seco.' },
    feat9_h3: { en: 'Real accessibility', pt: 'Acessibilidade real' },
    feat9_p: { en: 'The site respects reduced-motion settings on someone\'s phone, works with keyboard and screen readers, and takes care of reading contrast — a detail almost no one in the market takes seriously.', pt: 'O site respeita quando alguém tem as animações reduzidas ativadas no celular, funciona com teclado e leitores de tela, e cuida do contraste de leitura — um detalhe que quase ninguém no mercado leva a sério.' },
    feat10_h3: { en: 'Complete technical documentation', pt: 'Documentação técnica completa' },
    feat10_p: { en: 'The whole site is neatly documented on the inside, as befits a serious product — so any future adjustment, whoever makes it, is simple.', pt: 'Todo o site está cuidadosamente documentado por dentro, como convém a um produto sério — para que qualquer ajuste futuro, seja quem for que o faça, seja simples.' },

    pull_quote: { en: 'It\'s not that Premium has "more stuff". It\'s a different category of website.', pt: 'Não é que o Premium tenha "mais coisas". É uma categoria diferente de site.' },
    see_premium_plan: { en: 'See Premium plan', pt: 'Ver plano Premium' },
    see_in_action: { en: 'See it in action on Café Moretti →', pt: 'Ver em ação no Café Moretti →' },

    /* --- Contacto --- */
    contact_direct_label: { en: 'Or message us directly', pt: 'Ou fale com a gente direto' },
    contact_urgency: { en: '<strong>Limited slots each month.</strong> We take on few projects at a time to give each one personal attention — if you\'re thinking about your website, better to reach out soon.', pt: '<strong>Vagas limitadas por mês.</strong> Assumimos poucos projetos por vez para dar atenção personalizada a cada um — se você está pensando no seu site, é melhor falar com a gente logo.' }
  };

  const localeMap = { es: 'es-419', en: 'en-US', pt: 'pt-BR' };

  function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

  /* -------------------------------------------------------
     2. TRANSICIÓN "IRIS"
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
    overlay.innerHTML = '<span class="iris-logo">Lemuel <img src="img/logo.webp" alt="" class="logo-mark"> <span>Labs</span></span>';
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
     3. TEMA CLARO/OSCURO
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
     4. SELECTOR DE IDIOMA (dropdown accesible)
     ------------------------------------------------------- */
  // El español se toma directo del HTML de cada página; el diccionario de
  // abajo solo necesita las versiones en inglés y portugués. Para editar
  // un texto en español, editar el HTML directamente — no este archivo.
  // (captureSpanishOriginals() guarda ese texto original una sola vez,
  // antes de que se aplique ningún idioma, para poder volver a él.)
  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (lang === 'es') {
        if (key === el.dataset.i18nOriginalKey) el.textContent = el.dataset.i18nOriginal;
        else if (dict[key] && dict[key].es) el.textContent = dict[key].es;
      } else if (dict[key] && dict[key][lang]) {
        el.textContent = dict[key][lang];
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (lang === 'es') {
        if (key === el.dataset.i18nOriginalKey) el.innerHTML = el.dataset.i18nOriginal;
        else if (dict[key] && dict[key].es) el.innerHTML = dict[key].es;
      } else if (dict[key] && dict[key][lang]) {
        el.innerHTML = dict[key][lang];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (lang === 'es') {
        if (key === el.dataset.i18nOriginalKey) el.setAttribute('placeholder', el.dataset.i18nOriginal);
        else if (dict[key] && dict[key].es) el.setAttribute('placeholder', dict[key].es);
      } else if (dict[key] && dict[key][lang]) {
        el.setAttribute('placeholder', dict[key][lang]);
      }
    });

    const currentLabel = document.getElementById('langCurrentLabel');
    if (currentLabel) currentLabel.textContent = lang.toUpperCase();

    document.querySelectorAll('#langMenu [role="option"]').forEach((opt) => {
      opt.setAttribute('aria-selected', opt.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    try { localStorage.setItem('lemuel-lang', lang); } catch (e) { /* noop */ }
  }

  /**
   * Guarda, una sola vez y antes de aplicar ningún idioma, el texto en
   * español que ya está escrito en el HTML de cada elemento traducible
   * — junto con la key bajo la que se capturó. Esto es lo que permite
   * volver al español original sin depender del diccionario. La key se
   * guarda aparte porque algún elemento puede cambiar su propio
   * data-i18n en tiempo de ejecución (ver el botón de envío del
   * formulario de contacto); si la key actual ya no coincide con la que
   * se capturó, applyLanguage() usa el diccionario en vez del original.
   */
  function captureSpanishOriginals() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.dataset.i18nOriginal = el.textContent;
      el.dataset.i18nOriginalKey = el.getAttribute('data-i18n');
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.dataset.i18nOriginal = el.innerHTML;
      el.dataset.i18nOriginalKey = el.getAttribute('data-i18n-html');
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.dataset.i18nOriginal = el.getAttribute('placeholder') || '';
      el.dataset.i18nOriginalKey = el.getAttribute('data-i18n-placeholder');
    });
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
    captureSpanishOriginals();
    applyLanguage(saved);
    initLanguageDropdown();
  }

  /* -------------------------------------------------------
     5. NAV MÓVIL + INTERCEPTOR DE NAVEGACIÓN (iris)
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

    // Interceptamos TODOS los links internos del documento — no solo los
    // del nav — para que cualquier <a href="*.html"> del sitio (botones
    // del hero, CTAs dentro de una sección, "ver detalle →", etc.)
    // dispare la misma transición "iris" que la navegación del menú.
    // Los links externos (target="_blank", como WhatsApp o el proyecto
    // en vivo de Café Moretti) quedan afuera por no ser del mismo origin.
    document.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', (e) => {
        if (navLinks && navLinks.contains(link)) {
          navLinks.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }

        // Solo interceptamos navegación interna real (mismas páginas del sitio)
        const url = new URL(link.href, window.location.href);
        const isInternal = url.origin === window.location.origin && /\.html?$/.test(url.pathname);
        if (!isInternal || link.target === '_blank') return;

        // Ancla a la misma página (o la misma página sin ancla): scroll
        // normal, sin repetir la transición.
        const isSamePage = url.pathname === window.location.pathname;
        if (isSamePage) return;

        e.preventDefault();
        runIrisNavigate(link.href);
      });
    });
  }

  /* -------------------------------------------------------
     6. ESTADO ACTIVO DEL NAV
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
     7. GRADIENTE MOUSE-REACTIVE
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
     8. SCROLL REVEAL
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
     9. TABLA COMPARATIVA — indicador de scroll horizontal
     ------------------------------------------------------- */
  function initCompareScrollHint() {
    const wrap = document.querySelector('.compare-table-wrap');
    if (!wrap) return;
    let scheduled = false;

    function measure() {
      scheduled = false;
      // Margen de tolerancia generoso: con la tabla en su ancho natural,
      // el overflow real cuando hace falta scroll es de decenas o
      // cientos de píxeles, así que no hace falta un margen ajustado.
      const hasMore = wrap.scrollLeft + wrap.clientWidth < wrap.scrollWidth - 4;
      wrap.classList.toggle('has-more-right', hasMore);
    }

    function update() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(measure);
    }

    update();
    wrap.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // Los webfonts pueden cambiar el ancho real del texto después del
    // primer render; una segunda pasada evita un cálculo desactualizado.
    window.setTimeout(update, 300);
  }

  /* -------------------------------------------------------
     10. FORMULARIO DE CONTACTO — honeypot + validación real-time
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
    const methodRadios = Array.from(form.querySelectorAll('input[name="contactMethod"]'));
    const submitBtn = form.querySelector('button[type="submit"]');

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

    function currentMethod() {
      const checked = methodRadios.find((r) => r.checked);
      return checked ? checked.value : 'email';
    }

    // El texto del botón depende del método elegido, así que actualizamos
    // también su data-i18n para que un cambio de idioma posterior siga
    // mostrando el texto correcto (ver applyLanguage()).
    function updateSubmitLabel() {
      if (!submitBtn) return;
      const lang = document.documentElement.lang || 'es';
      const key = currentMethod() === 'whatsapp' ? 'form_submit_whatsapp' : 'form_submit';
      submitBtn.setAttribute('data-i18n', key);
      if (lang === 'es') {
        submitBtn.textContent = key === submitBtn.dataset.i18nOriginalKey
          ? submitBtn.dataset.i18nOriginal
          : dict[key].es;
      } else {
        submitBtn.textContent = (dict[key] && dict[key][lang]) || submitBtn.textContent;
      }
    }
    methodRadios.forEach((r) => r.addEventListener('change', updateSubmitLabel));
    updateSubmitLabel();

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

    // Éxito y error usan distinto nivel de urgencia para lectores de
    // pantalla: "polite" espera una pausa natural, "assertive" interrumpe
    // de inmediato — apropiado para un error de envío.
    function setFormStatus(text, isError) {
      if (!status) return;
      status.textContent = text;
      status.classList.toggle('is-error', !!isError);
      status.setAttribute('aria-live', isError ? 'assertive' : 'polite');
      status.setAttribute('role', isError ? 'alert' : 'status');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot: si un bot completó este campo invisible, fingimos
      // éxito y no mandamos nada (ni por email ni por WhatsApp).
      if (honeypot && honeypot.value.trim() !== '') {
        form.reset();
        setFormStatus('¡Gracias! Te vamos a responder a la brevedad.', false);
        if (fallback) fallback.hidden = true;
        return;
      }

      const allValid = Object.keys(validators).map(validateField).every(Boolean);
      if (!allValid) {
        setFormStatus('', false);
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const lang = document.documentElement.lang || 'es';

      // Método WhatsApp: no hay backend que "envíe" nada — armamos el
      // link con el mensaje pre-cargado y lo abrimos en una pestaña
      // nueva, sin tocar el servicio de formularios estático.
      if (currentMethod() === 'whatsapp') {
        const name = fields.name.value.trim();
        const message = fields.message.value.trim();
        const text = 'Hola Lemuel Labs 👋 Soy ' + name + '. ' + message + '\nPrefiero que me contacten por WhatsApp.';
        const url = 'https://wa.me/5355530224?text=' + encodeURIComponent(text);
        window.open(url, '_blank', 'noopener');

        setFormStatus(dict.form_status_whatsapp_success[lang] || dict.form_status_whatsapp_success.es, false);
        if (fallback) fallback.hidden = true;
        form.reset();
        updateSubmitLabel();
        return;
      }

      const original = submitBtn.textContent;
      submitBtn.textContent = 'Enviando…';
      submitBtn.disabled = true;
      setFormStatus('', false);
      if (fallback) fallback.hidden = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) throw new Error('Respuesta no exitosa: ' + response.status);

        submitBtn.textContent = '¡Mensaje enviado!';
        setFormStatus(dict.form_status_email_success[lang] || dict.form_status_email_success.es, false);
        form.reset();
        setTimeout(() => {
          updateSubmitLabel();
          submitBtn.disabled = false;
        }, 3000);
      } catch (err) {
        submitBtn.textContent = original;
        submitBtn.disabled = false;
        setFormStatus('No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.', true);
        if (fallback) fallback.hidden = false;
      }
    });
  }

  /* -------------------------------------------------------
     11. INIT
     ------------------------------------------------------- */
  initIrisOnLoad();

  // Cuando el navegador restaura esta página desde la bfcache
  // (back/forward cache) en vez de recargarla, NO se dispara
  // DOMContentLoaded de nuevo — el DOM vuelve exactamente en el estado en
  // que quedó al navegar (con `inert` puesto en todo por
  // lockContentForTransition() y el overlay del iris tapando la pantalla).
  // `pageshow` con `event.persisted === true` es la única señal fiable de
  // que pasó esto, así que ahí reseteamos todo a su estado normal.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    unlockContentAfterTransition();
    const overlay = document.getElementById('irisOverlay');
    if (overlay) overlay.classList.remove('is-active', 'is-logo-visible');
    try { sessionStorage.removeItem('lemuel-iris-open'); } catch (e) { /* noop */ }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initNav();
    initActiveNav();
    initTheme();
    initLanguage();
    initMouseGradient();
    initReveal();
    initCompareScrollHint();
    initContactForm();
  });
})();

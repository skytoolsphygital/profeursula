# Profesora Úrsula | Derecho Expandido

Aula digital interactiva. Primer piloto: **Fundamentos de Derecho Internacional — Eje 2, Sesión 4 (80 minutos)**.

## Contenido implementado

- 28 pantallas agrupadas en cuatro módulos y ajustadas a 80 minutos.
- Presentación responsive para computador y móvil, con navegación lateral y navegación con teclas izquierda/derecha.
- Actividades autocorregibles y preguntas de reflexión.
- Bibliografía y recursos audiovisuales enlazados a fuentes externas.
- Modo proyección (botón «Proyectar»).
- Progreso local en el navegador, sin cuentas, ni almacenamiento remoto, ni calificaciones institucionales.
- HTML, CSS y JavaScript estáticos sin dependencias ni compilación.

## Archivos

- `index.html`: aplicación y estructura accesible.
- `styles.css`: identidad visual y diseño adaptable.
- `content.js`: textos de las 28 pantallas, fuentes oficiales y preguntas.
- `app.js`: renderizado, navegación, pruebas, avance local y proyección.
- `CNAME`: dominio previsto para el despliegue.
- `favicon.svg`: identidad visual.

## Prueba local

Clonar el repositorio y abrir `index.html` en un navegador. Alternativamente, servir con `python3 -m http.server 8080` y abrir `http://localhost:8080`. No requiere servidor backend.

## Publicación del subdominio

Dominio previsto: **laprofeursula-sesiones.skytools.org**.

1. Revisar elegibilidad de GitHub Pages para un **repositorio privado** según el plan de GitHub. Si el plan no permite Pages en privados, utilizar un repositorio público exclusivo para los archivos estáticos o desplegar en otro alojamiento estático (p. ej., Cloudflare Pages) manteniendo el código fuente privado cuando el proveedor lo admita.
2. En el repositorio: **Settings → Pages** → seleccionar `Deploy from a branch`, rama `main`, carpeta `/ (root)` (si la opción está disponible).
3. En el proveedor DNS del dominio `skytools.org`, crear un **CNAME** con host `laprofeursula-sesiones`, destino `skytoolsphygital.github.io` **solo si se usa GitHub Pages**.
4. Configurar dominio personalizado en Pages; confirmar verificación del dominio, HTTPS y resolución DNS. No activar contenido sensible: el material es educativo público.
5. Agregar enlace de acceso desde el portal VR existente, sin modificar este último por ahora.

> Tener un archivo CNAME en el repositorio **no configura el DNS** ni habilita automáticamente GitHub Pages.

## Consideraciones jurídicas y pedagógicas

Los contenidos se basan en el guion docente de sesión 4 y la presentación de 28 diapositivas. La jurisprudencia y fuentes externas se mantienen como enlaces hacia sus sitios originales. El caso Petro Urrego se presenta desde una perspectiva académica y neutral.

Las pruebas son formativas y se corrigen en el dispositivo del visitante. No se recaban nombres, correos, identificaciones ni respuestas del estudiante. El modo Proyectar es una pantalla ampliada **local**, no una sincronización remota simultánea.

## Siguiente iteración

Probar con estudiantes, validar legibilidad y recorrido, integrar nuevos ejes de contenidos y solo después evaluar funciones sincrónicas y cuentas institucionales.

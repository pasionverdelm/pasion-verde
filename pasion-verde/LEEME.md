# Pasión Verde — sitio y panel editorial

## Estado de esta entrega
Sitio preparado para Netlify con panel Decap CMS y autenticación mediante GitHub. No se ha conectado a tus cuentas ni publicado. Incluye una nota de bienvenida de muestra identificada en su texto. Incluye el logo original y la fotografía del Chevron Park proporcionados por el propietario. Resultados, roster y movimientos consultan datos de la LMP mediante funciones de Netlify. AdSense NO está activado.

## 1. Guardar en GitHub
Crea un repositorio llamado `pasion-verde` desde https://github.com/new, con rama principal `main`. Descomprime este ZIP y sube el CONTENIDO de la carpeta pasion-verde usando Add file > Upload files. package.json y netlify.toml deben quedar en la raíz del repositorio. El archivo .gitignore es opcional para esta subida. No subas contraseñas ni secretos.

## 2. Conectar Netlify
Desde Netlify elige agregar/importar un proyecto existente, selecciona GitHub, autoriza el repositorio y elige pasion-verde. Comando de compilación: `npm run build`. Directorio de publicación: `dist`. Rama: `main`. Netlify detecta netlify.toml. La variable REPOSITORY_URL configura automáticamente el panel. Si no estuviera disponible, agrega CMS_REPO con el valor `TU_USUARIO/pasion-verde` y vuelve a desplegar.

No basta con arrastrar dist a Netlify: el panel necesita la conexión con GitHub para que cada nota guardada dispare una nueva compilación.

## 3. Activar el acceso editorial (una sola vez)
Consulta https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/
En https://github.com/settings/developers crea una OAuth App:
- Application name: Pasión Verde CMS.
- Homepage URL: la URL real que Netlify asignó al proyecto.
- Authorization callback URL: https://api.netlify.com/auth/done
Copia el Client ID y genera el Client Secret. En Netlify abre la configuración del proyecto > Access & security > OAuth > Authentication providers e instala GitHub usando esos valores. El secreto solo se pega en Netlify: nunca en el repositorio ni en el chat. No necesitas habilitar Identity ni Git Gateway.

## 4. Publicar
Entra a `https://TU-SITIO.netlify.app/admin/`, inicia sesión con GitHub y autoriza el acceso. Solo las cuentas con permiso de escritura en el repositorio pueden guardar cambios. Abre Noticias > Nueva noticia. Agrega título, fecha, categoría, resumen, foto, descripción de foto, autor y texto. Deja Visible en la web desactivado para borrador. Actívalo y guarda/publica para mostrarla. El guardado genera un commit en GitHub y Netlify vuelve a compilar. Espera a que el deploy termine antes de compartir el enlace.

Para editar o retirar una nota usa el mismo panel. Las imágenes se guardan en el repositorio; utiliza JPEG/WebP optimizados, idealmente menos de 1 MB, para que el repositorio no crezca demasiado. No pegues HTML: el texto se muestra como párrafos seguros.

## 5. Identidad y patrocinadores
En Configuración y patrocinadores puedes subir tu logo exacto, agregar tu enlace real de Facebook, correo de contacto y un banner con su enlace https. El banner aparece en los espacios publicitarios existentes. Usa material propio o autorizado.

## 6. AdSense, por separado
No hay scripts publicitarios ni identificadores ficticios. Necesitas tu cuenta de AdSense, aprobación del sitio y datos de editor/unidades para integrarlo. Antes de activarlo hay que actualizar privacidad, añadir ads.txt con los datos que indique Google y configurar el consentimiento aplicable. No se garantiza aprobación ni ingresos. Google Ads es para comprar publicidad; AdSense es para monetizar el sitio.

## Verificación
Ejecuta `npm run build` con Node 22 o superior. El generador no usa dependencias npm. Se comprobó generación de rutas, exclusión de borradores y escape de HTML. La autenticación, la subida desde el panel y el despliegue automático deben verificarse tras conectar las cuentas. La apariencia no ha sido verificada en navegador en esta entrega.

## Desarrollo local
`npm run build`, luego `python3 -m http.server 8080 --directory dist` y abre http://localhost:8080. Este servidor solo sirve para ver el sitio; el CMS utiliza tu repositorio remoto cuando está conectado.

## Versión final del diseño
Menú: Inicio, Noticias, Resultados, Roster y Movimientos. Encabezado compacto con logo original. Inicio muestra las últimas tres noticias públicas. Resultados y movimientos consultan la fuente cada 60 segundos mientras su sección permanece abierta. Roster utiliza una caché de una hora. Las funciones consumen recursos de Netlify; no hay tareas programadas. El acceso editorial requiere configurar OAuth. No se ha verificado todavía la autenticación ni la publicación real en Netlify.

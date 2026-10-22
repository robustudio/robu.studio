// One-off helper that wrote copy.json (kept so the structure of the copy deck is easy to see).
// Day to day, edit copy.json directly.
import fs from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const t = (en, es, tr) => ({ en, es, tr });
const D = {
  "meta.desc": t("TV-List: track every show and film you watch, tick episodes, discover what's next, watch trailers and share with friends. Coming soon to Android and iOS.", "TV-List: sigue cada serie y pel&iacute;cula que ves, marca episodios, descubre qu&eacute; ver despu&eacute;s, mira tr&aacute;ilers y comparte con amigos. Pr&oacute;ximamente en Android e iOS.", "TV-List: izlediğin her dizi ve filmi takip et, bölümleri işaretle, sırada ne olduğunu keşfet, fragman izle, arkadaşlarınla paylaş. Yakında Android ve iOS'ta."),
  "nav.studio": t("STUDIO", "ESTUDIO", "STÜDYO"),
  "nav.back": t("&larr; All apps", "&larr; Todas las apps", "&larr; Tüm uygulamalar"),
  "hero.eyebrow": t("Coming soon &middot; Android &amp; iOS", "Pr&oacute;ximamente &middot; Android e iOS", "Yakında · Android ve iOS"),
  "hero.h1": t("Never lose<br>your <em>place.</em>", "No pierdas<br>tu <em>lugar.</em>", "Kaldığın<br>yeri <em>kaybetme.</em>"),
  "hero.lead": t("Every show and film you watch, in one list. Tick each episode, see what's up next, and find what to watch after.", "Cada serie y pel&iacute;cula que ves, en una sola lista. Marca cada episodio, mira cu&aacute;l sigue y descubre qu&eacute; ver despu&eacute;s.", "İzlediğin her dizi ve film tek listede. Her bölümü işaretle, sıradakini gör, sonra ne izleyeceğini bul."),
  "cta.follow": t("Follow @tvlist.robu", "Sigue a @tvlist.robu", "@tvlist.robu'yu takip et"),
  "cta.how": t("See how it works &darr;", "As&iacute; funciona &darr;", "Nasıl çalışır &darr;"),
  "legend.w": t("watched", "visto", "izlendi"),
  "legend.n": t("up next", "siguiente", "sıradaki"),
  "legend.t": t("to go", "pendiente", "kalan"),
  "up.l": t("UP NEXT", "SIGUIENTE", "SIRADAKİ"),

  "k1.kick": t("01 &middot; Track", "01 &middot; Seguimiento", "01 · Takip"),
  "k1.h2": t("One tap.<br><em>Every episode.</em>", "Un toque.<br><em>Cada episodio.</em>", "Tek dokunuş.<br><em>Her bölüm.</em>"),
  "k1.sub": t("Tick an episode when you finish it. &ldquo;Up next&rdquo; always knows where you stopped. Pause or drop a series without losing it, and count your rewatches.", "Marca un episodio al terminarlo. &laquo;Siguiente&raquo; siempre sabe d&oacute;nde te quedaste. Pausa o abandona una serie sin perderla y cuenta tus rewatches.", "Bitirdiğin bölümü işaretle. “Sıradaki” nerede kaldığını her zaman bilir. Bir diziyi kaybetmeden duraklat ya da bırak, yeniden izlediklerini say."),
  "k1.card1": t("Your shows", "Tus series", "Dizilerin"),
  "k1.card2": t("Right now", "Ahora mismo", "Şu an"),
  "k1.b1": t("paused / dropped", "en pausa / abandonada", "ara verildi / bırakıldı"),
  "k1.b2": t("rewatch 2x", "rewatch 2x", "yeniden izle 2x"),
  "k1.b3": t("half-star ratings", "valoraci&oacute;n con medias estrellas", "yarım yıldız puan"),

  "k2.kick": t("02 &middot; Discover", "02 &middot; Descubre", "02 · Keşfet"),
  "k2.h2": t("Find what to<br><em>watch next.</em>", "Encuentra qu&eacute;<br><em>ver despu&eacute;s.</em>", "Sırada ne<br><em>izleyeceğini bul.</em>"),
  "k2.sub": t("Trending and top-rated titles, filters for platform, country and genre, and a clear answer to &ldquo;where can I watch this?&rdquo;.", "T&iacute;tulos populares y mejor valorados, filtros por plataforma, pa&iacute;s y g&eacute;nero, y una respuesta clara a &laquo;&iquest;d&oacute;nde puedo verlo?&raquo;.", "Trend ve en yüksek puanlı yapımlar; platform, ülke ve tür filtreleri; ve “bunu nereden izlerim?” sorusuna net bir cevap."),
  "k2.c1": t("Platform", "Plataforma", "Platform"),
  "k2.c2": t("Country", "Pa&iacute;s", "Ülke"),
  "k2.c3": t("Genre", "G&eacute;nero", "Tür"),
  "k2.c4": t("Where to watch", "D&oacute;nde verlo", "Nereden izlenir"),

  "k3.kick": t("03 &middot; Trailers", "03 &middot; Tr&aacute;ilers", "03 · Fragmanlar"),
  "k3.h2": t("Trailers,<br><em>one per swipe.</em>", "Tr&aacute;ilers,<br><em>uno por deslizamiento.</em>", "Fragmanlar,<br><em>her kaydırmada bir tane.</em>"),
  "k3.sub": t("Flip through trailers like flipping channels, add what you like to your list, then dig into any cast and crew page. Even find the book a title was adapted from.", "Pasa tr&aacute;ilers como quien cambia de canal, a&ntilde;ade lo que te guste a tu lista y explora cualquier p&aacute;gina de reparto y equipo. Incluso encuentra el libro en que se basa un t&iacute;tulo.", "Fragmanları kanal çevirir gibi geç, beğendiğini listene ekle, sonra herhangi bir oyuncu ve ekip sayfasına dal. Bir yapımın uyarlandığı kitabı bile bul."),
  "k3.note": t("3 &middot; 2 &middot; 1 &mdash; next trailer", "3 &middot; 2 &middot; 1 &mdash; siguiente tr&aacute;iler", "3 · 2 · 1 — sıradaki fragman"),

  "k4.kick": t("04 &middot; Stats &amp; goals", "04 &middot; Estad&iacute;sticas y metas", "04 · İstatistik ve hedefler"),
  "k4.h2": t("Watch your<br><em>year add up.</em>", "Mira c&oacute;mo<br><em>se suma tu a&ntilde;o.</em>", "Yılının nasıl<br><em>toplandığını izle.</em>"),
  "k4.sub": t("Total watch time, favourite genres, finished versus in progress. Set a goal for the year and collect stamps as you go.", "Tiempo total visto, g&eacute;neros favoritos, terminadas frente a en progreso. Fija una meta para el a&ntilde;o y colecciona sellos.", "Toplam izleme süresi, en çok izlenen türler, biten ve devam eden yapımlar. Yıl için bir hedef koy, ilerledikçe pul topla."),
  "k4.s1": t("watch time", "tiempo visto", "izleme süresi"),
  "k4.s2": t("episodes", "episodios", "bölüm"),
  "k4.s3": t("films", "pel&iacute;culas", "film"),
  "k4.goal": t("Your goal for the year", "Tu meta del a&ntilde;o", "Yıllık hedefin"),
  "g.drama": t("Drama", "Drama", "Dram"),
  "g.comedy": t("Comedy", "Comedia", "Komedi"),
  "g.crime": t("Crime", "Crimen", "Suç"),

  "k5.kick": t("05 &middot; Friends", "05 &middot; Amigos", "05 · Arkadaşlar"),
  "k5.h2": t("Watch with<br><em>your people.</em>", "M&iacute;ralo con<br><em>los tuyos.</em>", "İzle,<br><em>sevdiklerinle.</em>"),
  "k5.sub": t("Follow friends, see what they're watching, comment, like and message. Keep your account private and approve your own followers.", "Sigue a tus amigos, mira qu&eacute; est&aacute;n viendo, comenta, da me gusta y escribe mensajes. Mant&eacute;n tu cuenta privada y aprueba a tus seguidores.", "Arkadaşlarını takip et, ne izlediklerini gör, yorum yap, beğen, mesajlaş. Hesabını gizli tut, takipçilerini kendin onayla."),
  "k5.b1": t("Finally someone who watches Silo too &#128588;", "Por fin alguien que tambi&eacute;n ve Silo &#128588;", "Sonunda Silo izleyen biri daha &#128588;"),
  "k5.b2": t("Episode 9 is next for me!", "&iexcl;El episodio 9 es el siguiente!", "Sırada 9. bölüm var!"),
  "k5.b3": t("No spoilers &#129296;", "Sin spoilers &#129296;", "Spoiler yok &#129296;"),

  "g.kick": t("Screens", "Pantallas", "Ekranlar"),
  "g.h2": t("A look inside.", "Un vistazo por dentro.", "İçeriye bir bakış."),
  "shot.1": t("01 &middot; Tracking", "01 &middot; Seguimiento", "01 · Takip"),
  "shot.2": t("02 &middot; Discover", "02 &middot; Descubre", "02 · Keşfet"),
  "shot.3": t("03 &middot; Trailers", "03 &middot; Tr&aacute;ilers", "03 · Fragmanlar"),
  "shot.4": t("04 &middot; Cast &amp; crew", "04 &middot; Reparto y equipo", "04 · Oyuncu ve ekip"),
  "shot.5": t("05 &middot; Statistics", "05 &middot; Estad&iacute;sticas", "05 · İstatistikler"),

  "o.cd": t("Next episode starts soon", "El siguiente episodio empieza pronto", "Sıradaki bölüm yakında başlıyor"),
  "o.h2": t("Up next:<br><em>your list.</em>", "A continuaci&oacute;n:<br><em>tu lista.</em>", "Sırada:<br><em>senin listen.</em>"),
  "o.sub": t("TV-List is coming soon to Android and iOS. Follow @tvlist.robu to know the day it lands.", "TV-List llega pronto a Android e iOS. Sigue a @tvlist.robu para saber el d&iacute;a que sale.", "TV-List yakında Android ve iOS'ta. Çıktığı günü öğrenmek için @tvlist.robu'yu takip et."),

  "footer.copyright": t("&copy; Robu Studio &mdash; an independent app studio.", "&copy; Robu Studio &mdash; un estudio de apps independiente.", "&copy; Robu Studio &mdash; bağımsız bir uygulama stüdyosu."),
  "footer.privacy": t("Privacy policy", "Pol&iacute;tica de privacidad", "Gizlilik politikası"),
  "footer.terms": t("Terms of use", "T&eacute;rminos de uso", "Kullanım koşulları"),
  "footer.tmdb": t("Show and film data provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.", "Datos de series y pel&iacute;culas proporcionados por TMDB. Este producto usa la API de TMDB pero no est&aacute; respaldado ni certificado por TMDB.", "Dizi ve film verileri TMDB tarafından sağlanır. Bu ürün TMDB API'sini kullanır ancak TMDB tarafından onaylanmış veya sertifikalandırılmış değildir."),
};
fs.writeFileSync(path.join(HERE, "copy.json"), JSON.stringify(D, null, 2) + "\n");
console.log("copy.json keys:", Object.keys(D).length);

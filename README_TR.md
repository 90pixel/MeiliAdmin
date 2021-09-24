<h1 align="center">
MeiliSearch
</h1> 

<p align="center">
  <img width="200" height="200" src="https://raw.githubusercontent.com/meilisearch/MeiliSearch/main/assets/logo.svg">
</p>

[Türkçe](./README_TR.md)


[English](./README.md)

MeiliSearch güçlü, hızlı, açık kaynak ve kullanımı kolay bir arama motorudur. İndexleme ve arama olarak büyük oranda özelleştirilebilir. Yazım hatası töleransı, filtreleme ve eş anlamlı kelimeler özellikleri out-of-the-box (ayarlama gerektirmeden) olarak çalışır. Daha fazla bilgi için lütfen [MeiliSearch dökümanını inceleyiniz](https://docs.meilisearch.com/ "MeiliSearch dökümanını inceleyiniz")


### MeiliAdmin

MeiliAdmin, MeiliSearch sunucularınızı yönetebilmeniz için oluşturulmuş bir kullanıcı arabirimidir. MeiliAdmin yetkilendirme hizmeti barındırmaz. Güvenliğinizi özel internet ağınızda (VPN gibi) kendiniz yapılandırmalısınız. MeiliAdmin 90Pixel tarafından ❤️ ile geliştirildi.

### Özellikler

- Dil Desteği
- MeiliSearch sunucularınızın tamamını listeleyin ve yönetin.
- Sunucularınızla ilgili istatistiklere erişin.
- İndex/Dizin oluşturma
- İndex/Dizin ayarlarını düzenleme
- Daha fazlası gelecek zamanda eklenecek.

# Kurulum

## Docker
```
git clone https://github.com/90pixel/MeiliAdmin
docker-compose up -d
```

## Docker olmadan;
```
 git clone https://github.com/90pixel/MeiliAdmin
 
 //PM2 ile otomatik olarak çalıştırma (vue-cli serve metodunu kullanır)
 cd ./MeiliAdmin && pm2 start meiliadmin-pm2.json
  
 //Without PM2
 
 cd ./MeiliAdmin
 cd ./meilipanel
 npm run build
 // dist klasöründe bulunan dosyaları web sunucunuza yükleyiniz. (Nginx, Apache vb.)
 
 cd ../meilisocket
 npm run start
```

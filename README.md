### MeiliAdmin

MeiliAdmin is a UI interface for managing your MeiliSearch servers easily. MeiliAdmin doesn't have any auth service. You have to manage it in your private network (such as VPN). MeiliAdmin crafted by 90Pixel with ❤️.

<h2 align="center">
What is MeiliSearch?
</h2> 


<p align="center">


  <img width="200" height="200" src="https://raw.githubusercontent.com/meilisearch/MeiliSearch/main/assets/logo.svg">
</p>

[Türkçe](./README_TR.md)


[English](./README.md)

MeiliSearch is a powerful, fast, open-source, easy to use and deploy search engine. Both searching and indexing are highly customizable. Features such as typo-tolerance, filters, and synonyms are provided out-of-the-box. For more information about features go to [MeiliSearch documentation](https://docs.meilisearch.com/ "MeiliSearch documentation")



### Features

- Language Support (Currently Turkish and English. If you want to add your language please contribute our open source project.)
- Manage your all MeiliSearch servers.
- Monitoring
- Create Index
- Update Index Settings
- Will be added more in the future.

# Installation

## Docker

```bash
git clone https://github.com/90pixel/MeiliAdmin
cd MeiliAdmin
docker-compose up -d
```

Then visit this addres with your browser

```http://localhost```

## Without Docker

```
 git clone https://github.com/90pixel/MeiliAdmin
 
 //Auto Deploy with PM2 (Uses vue-cli serve method)
 cd ./MeiliAdmin && pm2 start meiliadmin-pm2.json
  
 //Without PM2
 
 cd ./MeiliAdmin
 cd ./meilipanel
 npm run build
 // Copy dist files into your http server. (Nginx, Apache etc.)
 
 cd ../meilisocket
 npm run start
 
```



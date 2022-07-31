# react-nextjs-demo

Basic Next.js Porject that shows main features such as:

- Routing on Pages folder
- SSR
- SSG
- Head Component (metadata)
- API routes

![image](https://user-images.githubusercontent.com/17517057/182044934-a125c335-ffb5-434d-8ef9-90cd6ac53329.png)

To run, you will need a file locally called .env.local with the following environment variables:

- MONGO_URL

your collection on mongodb should call meetups and have the following properties:

- title
- image (that is a url)
- address
- decription

If you want your images to be loaded properly with the next/Image component, also add their domain on next.config.js list:
  domains: ['i.natgeofe.com', 'acaradorio.com' ....],

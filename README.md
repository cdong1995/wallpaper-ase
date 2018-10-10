set up steps:
1. install node.js, npm
2. git clone
3. cd ./wallpaper-ase
4. npm start (Or electron main.js)


I also implement a basic crawler to crawl the unsplash.com with given keywords. Only get the html, use DOM to parse the html, and get the wallpaper url. Maybe later we can do some advanced crawl.

Also, in the project now, we just use the "API": attach the keywords to the url and get the random wallpaper url

Cloudinary later may transfer to S3.

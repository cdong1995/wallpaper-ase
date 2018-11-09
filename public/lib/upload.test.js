const upload = require("./upload")
const Wallpaper = require('../../models/wallpaper');
describe("uploading", () => {

    test('upload the example image', () => {
        Wallpaper.find({}, function(err, allWallpapers) {
            let len = allWallpapers.length;
            document.getElementById('test1').innerHTML = len;
            let path  = 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=71d59cd22de21da8d2939bc203617983&auto=format&fit=crop&w=1320&q=80';
            upload(path);  
            Wallpaper.find({}, function(err, allWallpapers){
                if(err) {
                    console.log(err);
                } else {
                    let len = allWallpapers.length;
                    console.log(len);
                    document.getElementById('test2').innerHTML = len;
                    expect(document.getElementById('test1').textContent)
                    .toBe(document.getElementById('test2').textContent - 1);
                }
            });
        })

    });
})


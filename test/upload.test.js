const Operations = require('../upload');
// const Database = require('../models/wallpaper')

describe('Upload', () => {
    let path = '/home/can/Downloads/1538960246844_wild-about-wild-game.jpg'
    var wallpaper_url
    // Operations.upload(path, (callback_wallpaper) =>{
    //    wallpaper_url = callback_wallpaper.url
    //    console.log(wallpaper_url)
    // })
    // console.log(wallpaper_url)
    test('upload the example image', () => {
        Operations.upload(path, (callback_wallpaper) => {
            expect((typeof callback_wallpaper.url).toBe('string'))
        })
        // expect((typeof wallpaper_url).toBe('string'))
    })
    // let uploadRes = Operations.upload(path, (callback_wallpaper) => {

    // })
    // test('upload the example image', () => {
    //     expect((typeof uploadRes.url).toBe('string'))
    // })
})



// describe('Upload', () => {
//     let path = '/home/can/Downloads/1538960246844_wild-about-wild-game.jpg'
//     test('upload the example image and test the size in db', () => {
//         Database.wallpaper.find({}, function(err, allWallpapers) {
//             if(err) console.log(err)
//             else {
//                 let prevLen = allWallpapers.length
//                 Operations.upload(path)
//                 Database.wallpaper.find({}, function(err, allWallpapers){
//                     if(err) console.log(err)
//                     else {
//                         expect(allWallpapers.length.toBe(prevLen + 1))
//                         console.log(prevLen)
//                     }
//                 })
//             }
//         })
//     })

    // describe('Upload', () => {
    //     let path = '/home/can/Downloads/1538960246844_wild-about-wild-game.jpg'
    //     var prevLen
    //     Database.wallpaper.find({}, function(err, allWallpapers) {
    //         if(err) console.log(err)
    //         else {
    //             prevLen = allWallpapers.length
    //         }
    //     })
    //     console.log(prevLen)
    //     test('upload the example image', () => {
    //         expect((typeof prevLen).toBe('number'))
    //     })        
    // })

    // let uploadRes = Operations.upload(path)
    
    // test('upload the example image', () => {
    //     expect((typeof uploadRes.url).toBe('string'))
    // })
    
// })
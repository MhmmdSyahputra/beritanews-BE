const express = require("express");
const router = express();
const Category = require('../models/category')

//CREATE
router.post("/", async (req, res) => {
    const newNewsPost = new Category({
        nameKategory: req.body.nameKategory,
        gambarKategory: req.body.gambarKategory,
        keteranganKategory: req.body.keteranganKategory,
    })

    try {
        const cate = await newNewsPost.save()
        res.json(cate)
    } catch (error) {
        res.json({message: error})
    }
});

//READ
router.get("/", async (req,res)=>{
    try {
        const cate = await Category.find()
        res.json(cate)
    } catch (error) {
        res.json({message:error})
    }
})

// //READDETAIL
// router.get("/:newsId", async (req,res)=>{
//     try {
//         const news = await News.find({_id:req.params.newsId})
//         res.json(news)
//     } catch (error) {
//         res.json({message:error})
//     }
// })

// //UPDATE
// router.put("/:newsId", async (req,res)=>{
//     try {
//         const newsupdate = await News.updateOne({_id:req.params.newsId},{
//             judul: req.body.judul,
//             kategori: req.body.kategori,
//             isiBerita: req.body.isiBerita,
//             tag: req.body.tag,
//         })
//         res.json(newsupdate)
//     } catch (error) {
//         res.json({message:error})
//     }
// })

// //DELETE
// router.delete("/:newsId", async (req,res)=>{
//     try {
//         const newsDelete = await News.deleteOne({_id:req.params.newsId})
//         res.json(newsDelete)
//     } catch (error) {
//         res.json({message:error})
//     }
// })

module.exports = router;

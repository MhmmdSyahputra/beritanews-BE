const express = require("express");
const router = express();
const News = require('../models/news')
const middlewareValidation = require('./middleware')

//CREATE
router.post("/", middlewareValidation, async (req, res) => {
    const newNewsPost = new News({
        judul: req.body.judul,
        kategori: req.body.kategori,
        gambarberita: req.body.gambarberita,
        isiBerita: req.body.isiBerita,
        tag: req.body.tag,
        tayang: 0,
    })

    try {
        const news = await newNewsPost.save()
        res.json(news)
    } catch (error) {
        res.json({message: error})
    }
});

//READ
router.get("/", async (req,res)=>{
    try {
        const news = await News.find()
        res.json(news)
    } catch (error) {
        res.json({message:error})
    }
})

//READDETAIL
router.get("/:newsId", async (req,res)=>{
    try {
        const news = await News.find({_id:req.params.newsId})
        res.json(news)
    } catch (error) {
        res.json({message:error})
    }
})

//SORT CATEGORY
router.get("/cate/:newsId", async (req,res)=>{
    try {
        const news = await News.find({kategori:req.params.newsId})
        res.json(news)
    } catch (error) {
        res.json({message:error})
    }
})

//UPDATE
router.put("/:newsId",middlewareValidation, async (req,res)=>{
    try {
        const newsupdate = await News.updateOne({_id:req.params.newsId},{
            judul: req.body.judul,
            kategori: req.body.kategori,
            isiBerita: req.body.isiBerita,
            tag: req.body.tag,
        })
        res.json(newsupdate)
    } catch (error) {
        res.json({message:error})
    }
})

//UPDATE TAYANG
router.put("/tayang/:newsId", async (req,res)=>{
    try {
        const newsupdate = await News.updateOne({_id:req.params.newsId},{
            $inc: { tayang: 1 } 
        })
        res.json(newsupdate)
    } catch (error) {
        res.json({message:error})
    }
})

//DELETE
router.delete("/:newsId",middlewareValidation, async (req,res)=>{
    try {
        const newsDelete = await News.deleteOne({_id:req.params.newsId})
        res.json(newsDelete)
    } catch (error) {
        res.json({message:error})
    }
})

module.exports = router;

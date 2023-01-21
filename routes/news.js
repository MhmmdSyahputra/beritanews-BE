const express = require("express");
const router = express();
const News = require('../models/news')
const middlewareValidation = require('./middleware')

const date = new Date();
const options = {timeZone: 'Asia/Jakarta', hour12: false};
const time = date.toLocaleString("id-ID", options);

//CREATE
router.post("/", middlewareValidation, async (req, res) => {
    const newNewsPost = new News({
        judul: req.body.judul,
        kategori: req.body.kategori,
        gambarberita: req.body.gambarberita,
        isiBerita: req.body.isiBerita,
        tag: req.body.tag,
        tayang: 0,
        komentar: []
    })

    try {
        const news = await newNewsPost.save()
        res.json({status:'ok', message: 'Data Berhasil Disimpan'})
    } catch (error) {
        res.json({message: error})
    }
});

// POST KOMENTAR
router.post("/:id/komentar", async (req, res) => {
    try {
        // Find the news by its ID
        const news = await News.findById(req.params.id);
        // Check if the news exists
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        // Add the new comment to the news's comments array
        news.komentar.push({
            nama: req.body.nama,
            isiKomentar: req.body.isiKomentar,
            tglKomentar: time
        });
        // Save the news to the database
        await news.save();
        // Send a success response
        res.json({ message: "Comment added successfully" });
    } catch (error) {
        // Send an error response
        res.status(500).json({ message: error.message });
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
        res.json({status:'ok', message: 'Data Berhasil Di Update'})
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
        res.json({status:'ok', message: 'Data Berhasil Di Hapus'})
    } catch (error) {
        res.json({message:error})
    }
})

module.exports = router;

const cl = console.log;

const PORT = 3000;
let blogs = [
    {
        content: "JavaScript is a programming language.",
        title: "Introduction to JavaScript",
        id: Date.now().toString(),
        createAt: Date.now().toString(),
        updateAt: null,
        author: "Tech Blog"
    },
    {
        content: "Node.js runs JavaScript outside the browser.",
        title: "Introduction to Node.js",
        id: Date.now().toString(),
        createAt: Date.now().toString(),
        updateAt: null,
        author: "Code World"
    }
];

const express = require('express');
// cl(express);
const app = express();
// cl(app);
app.use(express.json());
//======================== Fetch Blogs ===========================================
app.get('/api/blogs', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Fetch the blogs successfully!!!',
            data: blogs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while fetchng blogs',
            error: error.message
        })
    }
})
app.listen(PORT, () => {
    cl(`server is runing in port ${PORT}`)
})

//========================= Single Blogs GET =================================
app.get('/api/blogs/:id', (req, res) => {
    try {
        cl(req);
        let blogId = req.params.id;
        cl(blogId);
        let blog = blogs.find(b => b.id === blogId)
        cl(blog);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `Blog with id ${blogId} not found`
            })
        }
        res.status(200).json({
            success: true,
            message: `Blog with id ${blogId} found successfully !!`,
            data: blog
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while fetched blog',
            error: error.message
        })
    }
})
//=========================== Create Blog==============================================
app.post('/api/blogs', (req, res) => {
    try {
        let { content, title, author } = req.body;
        //if no values for title and content
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: `Title and content are required fields!!`
            })
        }
        //save in DB
        let newBlog = {
            title: title,
            content: content,
            author: author || "Anonymous",
            id: Date.now().toString(),
            createAt: Date.now().toString(),
            updateAt: null
        }
        blogs.unshift(newBlog);
        res.status(200).json({
            success: true,
            message: `The new Blog with id ${newBlog.id} Created Successfully!!`,
            data: newBlog
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while creating blogs',
            error: error.message
        })
    }
})

//================================= Delete Blog ===============================================
app.delete('/api/blogs/:id', (req, res) => {
    try {
        let deleteId = req.params.id;
        let blogIndex = blogs.findIndex(b => b.id === deleteId);

        if (blogIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The Blog with id ${deleteId} is not found`,
            })
        }
        let deleteBlog = blogs.splice(blogIndex, 1);
        res.status(200).json({
            success: true,
            message: `The blog with id ${deleteId} is removed successfully!!`,
            data: deleteBlog[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while deleting blog',
            error: error.message
        })
    }
})

//================================ Update Blog ================================================
app.patch('/api/blogs/:id', (req, res) => {
    try {
        let updateId = req.params.id;
        let { title, content } = req.body;
        let blogIndex = blogs.findIndex(b => b.id === updateId)
        if (blogIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The blogs with id ${updateId} is not found`
            })
        }
        if (!title || !content) {
            res.status(400).json({
                success: false,
                message: `Titlt and Content are required fields.`
            })
        }
        let updateObj = {
            ...blogs[blogIndex],
            ...req.body,
            updateAt: Date.now().toString(),
        }
        res.status(200).json({
            success: true,
            message: `The blog with id ${updateId} is updated successfully!!`,
            data: updateObj
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: 'Error while deleting blog',
            error: error.message
        })
    }
})
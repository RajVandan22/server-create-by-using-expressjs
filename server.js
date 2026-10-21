const cl = console.log;
const blogController = require('./controllers/blogController');
const PORT = 3000;

const express = require('express');
// cl(express);
const app = express();
// cl(app);
app.use(express.json());

app.get('/api/blogs', blogController.fetchBlog);
app.get('/api/blogs/:id', blogController.SingleGetBlog);
app.post('/api/blogs', blogController.createBlog);
app.patch('/api/blogs/:id', blogController.updateBlog);
app.delete('/api/blogs/:id', blogController.deleteBlog);
app.listen(PORT, () => {
    cl(`server is runing in port ${PORT}`)
})


  
  
       
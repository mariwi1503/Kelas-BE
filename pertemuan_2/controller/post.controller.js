const posts = [
  {
    id: 1,
    title: "Lorem ipsum",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

const postController = {
  getAll: (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        data: posts,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
  create: (req, res) => {
    try {
      const { id, title, content } = req.body;

      // cek data di body
      if (!id || !title || !content) throw new Error("Lengkapi form request");

      // cek dulu id apakah sudah atau ngak
      const post_exist = posts.find((x) => x.id === id);
      if (post_exist) throw new Error("ID sudah terdaftar");

      posts.push({
        id,
        title,
        content,
      });

      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },

  // find getOne
  getOne: (req, res) => {
    try {
      const id = req.params.id;
      const post = posts.find((x) => x.id == id);
      if (!post) throw new Error("id tidak ditemukan");
      res.json({
        status: "success",
        data: post,
      });
    } catch (error) {
      res.json({
        status: "failed",
        message: error.message,
      });
    }
  },

  //delete
  delete: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const index = posts.findIndex(post => post.id === id);
      if (index === -1) throw new Error("id tidak ditemukan");
      posts.splice(index, 1);
  
      res.json({
        status: "success",
        message: `Post dengan id ${id} telah dihapus`,
        data: posts,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
  

  //update
  update: (req, res) => {
    try {
      console.log(req.params.id);
      const { id, title, content } = req.body;
      // data id tidak boleh berubah
      if (id != req.params.id || !id)
        throw new Error("id tidak boleh berubah atau kosong");
      posts.push({
        id,
        title,
        content,
      });
      res.json({
        status: "success",
        data: posts,
      });
    } catch (error) {
      res.json({
        status: "failed",
        message: error.message,
      });
    }
  },
};

module.exports = postController;

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
      const { title, content } = req.body;

      // Generate a random ID
      const id = Math.floor(Math.random() * 1000) + 1;

      // Check data in the request body
      if (!title || !content) throw new Error("Lengkapi form request");

      // Check if the ID already exists
      const postExist = posts.find((x) => x.id === id);
      if (postExist) throw new Error("ID sudah terdaftar");

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
  getOne: (req, res) => {
    try {
      const { id } = req.params;
      const post = posts.find((x) => x.id == id);
      res.status(200).json({
        status: "success",
        data: post,
      });
    } catch (error) {
  update: (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const post = posts.find((x) => x.id == id);
      if (!post) throw new Error("ID tidak ditemukan");
      post.title = title;
      post.content = content;
      res.status(200).json({
        status: "success",
        data: post,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
  delete: (req, res) => {
    try {
      const { id } = req.params;
      const post = posts.find((x) => x.id == id);
      if (!post) throw new Error("ID tidak ditemukan");
      posts = posts.filter((x) => x.id != id);
      res.status(200).json({
        status: "success",
        data: post,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};
module.exports = postController;

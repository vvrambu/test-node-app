import { Request, Response } from 'express';
import Post from '../models/Post';

function isError(err: unknown): err is Error {
  return err instanceof Error;
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    if (isError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error' });
    }
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    if (isError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error' });
    }
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    if (isError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error' });
    }
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const [updated] = await Post.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPost = await Post.findByPk(req.params.id);
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    if (isError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error' });
    }
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const deleted = await Post.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    if (isError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unexpected error' });
    }
  }
};

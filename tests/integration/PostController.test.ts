import request from 'supertest';
import app from '../../src/index';

const testPost = {
  title: 'Test Post',
  content: 'This is a test post.',
};

const updatedPost = {
  title: 'Updated Test Post',
  content: 'This is an updated test post.',
};

let postId: string;

describe('POST PostController Integration Tests', () => {
  it('should create a new post', async () => {
    const response = await request(app)
        .post('/api/posts')
        .send(testPost)
        .expect('Content-Type', /json/)
        .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(testPost.title);
    expect(response.body.content).toBe(testPost.content);

    postId = response.body.id;
  });
});

describe('GET PostController Integration Tests', () => {
  it('should get all posts', async () => {
    const response = await request(app)
        .get('/api/posts')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a post by ID', async () => {
    const response = await request(app)
        .get(`/api/posts/${postId}`)
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body).toHaveProperty('id', postId);
    expect(response.body.title).toBe(testPost.title);
    expect(response.body.content).toBe(testPost.content);
  });

  it('should return 404 on wrong id', async () => {
    const response = await request(app)
        .get(`/api/posts/${99999999}`)
        .expect('Content-Type', /json/)
        .expect(404);

    expect(response.body).toEqual({ error: 'Post not found' });
  });
});

describe('PUT PostController Integration Tests', () => {
  it('should update a post by ID', async () => {
    const response = await request(app)
        .put(`/api/posts/${postId}`)
        .send(updatedPost)
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body).toHaveProperty('id', postId);
    expect(response.body.title).toBe(updatedPost.title);
    expect(response.body.content).toBe(updatedPost.content);
  });

  it('should return 404 with wrong id', async () => {
    const response = await request(app)
        .put(`/api/posts/${999999999}`)
        .send(updatedPost)
        .expect('Content-Type', /json/)
        .expect(404);

    expect(response.body).toEqual({ error: 'Post not found' });
  });
});

describe('DELETE PostController Integration Tests', () => {
  it('should delete a post by ID', async () => {
    await request(app)
        .delete(`/api/posts/${postId}`)
        .expect(204);

    // check if it was removed
    await request(app)
        .get(`/api/posts/${postId}`)
        .expect(404);
  });

  it('should return 404 with wrong id', async () => {
    const response = await request(app)
        .delete(`/api/posts/${9999}`)
        .expect(404);

    expect(response.body).toEqual({ error: 'Post not found' });
  });
});
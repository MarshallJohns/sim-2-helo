SELECT p.title, u.username, u.profile_pic, p.author_id
FROM posts p 
JOIN users u ON u.id = p.author_id;


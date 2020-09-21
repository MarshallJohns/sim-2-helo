SELECT p.title, p.img, p.content, u.username, u.profile_pic
FROM posts p
    JOIN users u ON u.id = p.author_id
WHERE p.id = $1;
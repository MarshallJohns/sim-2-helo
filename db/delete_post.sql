DELETE FROM posts 
WHERE id = $1
RETURNING *;





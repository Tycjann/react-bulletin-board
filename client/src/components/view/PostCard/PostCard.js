import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import authorName from '../../../utils/authorName.js';

const PostCard = ({ id, title, author, price, content, publishedDate }) => {

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mt-2">
          Author: <span className="fw-normal">{authorName(author)}</span>
        </Card.Subtitle>
        <Card.Subtitle className="mt-1 mb-2">
          Published: <span className="fw-normal">{publishedDate}</span>
        </Card.Subtitle>
        <Card.Subtitle className="mt-1 mb-2">
          Price: <span className="fw-normal">${price}</span>
        </Card.Subtitle>
        <Card.Text dangerouslySetInnerHTML={{ __html: content }}></Card.Text>
        <Button as={NavLink} to={'/view/' + id} variant="primary">
          Read more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PostCard;

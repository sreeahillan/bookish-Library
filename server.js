import express from 'express';
import pg from 'pg';
import axios from 'axios';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
const port = 3000;
const host = '0.0.0.0';

//middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

//DB SELECT QUERY
async function dataOfbookTable() {
  const response = await db.query('SELECT * FROM book ORDER BY book_name ASC');
  return response.rows;
}

async function dataOfPersonalTable() {
  const response = await db.query('SELECT * FROM personal ORDER BY book_id ASC');
  return response.rows;
}

//variables
const URL = 'https://www.googleapis.com/books/v1/volumes';
const APIKEY = process.env.APIKEY;

//post requests
app.post('/add', async (req, res) => {
  try {
    const userBookReq = req.body.bookName;
    if (userBookReq === '') {
      const listOfBooks = await dataOfbookTable();
      const personalDetails = await dataOfPersonalTable();
      return res.render('library.ejs', {
        data: listOfBooks,
        personalData: personalDetails,
        error: 'this field should not be empty',
      });
    }

    const response = await axios.get(`${URL}`, {
      params: {
        q: userBookReq,
        key: APIKEY,
      },
    });

    const data = response.data.items;

    const correctBook = data.find(
      (obj) => obj.volumeInfo.title.toLowerCase() === userBookReq.trim().toLowerCase()
    );

    if (correctBook === undefined) {
      const response1 = await dataOfbookTable();
      const response2 = await dataOfPersonalTable();
      return res.render('library.ejs', {
        data: response1,
        personalData: response2,
        error: 'Book not found !',
      });
    }
    const bookName = correctBook.volumeInfo?.title || 'Missing Data';
    const bookAuthor = correctBook.volumeInfo.authors?.[0] || 'Missing Data';
    const bookPublishedYear = correctBook.volumeInfo?.publishedDate || 'Missing Data';
    const thumbnail = correctBook.volumeInfo.imageLinks?.thumbnail || 'Missing Data';
    const bookCategory = correctBook.volumeInfo.categories?.[0] || 'Missing Data';
    const bookAccessInfo = correctBook.accessInfo?.webReaderLink? correctBook.accessInfo.webReaderLink : "Missing data";
    const snippet = correctBook.searchInfo?.textSnippet ?  correctBook.searchInfo.textSnippet : "No description"
    try {
      const insert = await db.query(
        'INSERT INTO book (book_name , author , published_date , olid , category , accessinfo , snippet) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7)  RETURNING *',
        [bookName, bookAuthor, bookPublishedYear, thumbnail, bookCategory, bookAccessInfo , snippet]
      );
    } catch (error) {
      const listOfBooks = await dataOfbookTable();
      const personalDetails = await dataOfPersonalTable();
      return res.render('library.ejs', {
        data: listOfBooks,
        personalData: personalDetails,
        error: 'Book already exists',
      });
    }
    res.redirect('/library');
  } catch (error) {
    const listOfBooks = await dataOfbookTable();
    const personalDetails = await dataOfPersonalTable();
    return res.render('library.ejs', {
      data: listOfBooks,
      personalData: personalDetails,
      error: 'Something wrong , try again',
    });
  }
});

app.post('/book', async (req, res) => {
  const selectedBookId = req.body.selectedBook;
  const selectedBook = await (
    await db.query('SELECT * FROM book WHERE id = $1', [selectedBookId])
  ).rows;
  const personalDetails = await (
    await db.query('SELECT * FROM personal WHERE book_id = $1', [selectedBookId])
  ).rows;

  res.render('book.ejs', {
    data: selectedBook,
    personalData: personalDetails,
  });
});

app.post('/personal', async (req, res) => {
  const bookRating = req.body.Rating;
  const book_id = req.body.book_id;
  const bookProgress = req.body.progress;
  const listOfBooks = await dataOfPersonalTable();
  const personalBook = listOfBooks.find((obj) => obj.book_id == book_id);
  if (personalBook === undefined) {
    const insert = await db.query(
      'INSERT INTO personal (book_id , progress , rating) VALUES ($1 , $2 , $3) RETURNING *',
      [book_id, bookProgress, bookRating]
    );
    res.redirect('/library');
  } else {
    const update = await db.query(
      'UPDATE personal SET rating = $1 , progress = $2  WHERE book_id = $3',
      [bookRating, bookProgress, book_id]
    );
    res.redirect('/library');
  }
});

app.post('/delete', async (req, res) => {
  const personalId = req.body.personalId;
  const deleteId = req.body.DeleteId;
  if (personalId) {
    await db.query('DELETE FROM personal WHERE book_id = $1', [personalId]);
    await db.query('DELETE FROM book WHERE id = $1', [deleteId]);
  } else {
    await db.query('DELETE FROM book WHERE id = $1', [deleteId]);
  }

  res.redirect('/library');
});

app.post('/sorting', async (req, res) => {
  const filter = req.body.filter;
  if (filter === 'Title: A ➔ Z') {
    res.redirect('/library');
  } else if (filter === 'Rating: Highest ➔ Lowest') {
    const response1 = await db.query(
      'SELECT book.id,book.book_name,book.author,book.olid,book.published_date FROM book JOIN personal ON personal.book_id = book.id ORDER BY personal.rating DESC'
    );
    const response2 = await db.query(
      'SELECT personal.book_id,progress,rating FROM book JOIN personal ON personal.book_id = book.id ORDER BY personal.rating DESC'
    );
    const sort1 = response1.rows;
    const sort2 = response2.rows;
    res.render('library.ejs', {
      personalData: sort2,
      data: sort1,
      selecteditem: req.body.filter,
    });
  } else if (filter === 'Released: New ➔ Old') {
    const response1 = await db.query('SELECT * FROM book ORDER BY published_date DESC');
    const response2 = await dataOfPersonalTable();
    const data = response1.rows;
    res.render('library.ejs', {
      data: data,
      personalData: response2,
      selecteditem: req.body.filter,
    });
  }
});

//get requests
app.get('/', (req, res) => {
  res.render('home.ejs', {
    currentPage: 'home',
  });
});

app.get('/library', async (req, res) => {
  const listOfBooks = await dataOfbookTable();
  const personalDetails = await dataOfPersonalTable();
  res.render('library.ejs', {
    data: listOfBooks,
    personalData: personalDetails,
    currentPage: 'library',
  });
});

//Listen requests
app.listen(port, host, () => {
  console.log('server running on port 3000');
});

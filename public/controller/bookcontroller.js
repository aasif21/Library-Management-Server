const Book = require('../model/book');
const mongoose = require('mongoose');
const { param } = require('../routes/bookroutes');
const axios = require('axios');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');


async function signInWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyCHFYIN0lG_C3-CsuC0wOTZHcymMLEyKmA'; 
    const signInEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    try {
        const response = await axios.post(signInEndpoint, {
            email,
            password,
            returnSecureToken: true
        });

        return response.data;
    } catch (error) {
        throw new Error('Invalid email or password');
    }
}
//add a new book
exports.createBook = async (req, res) => {
    let book = req.body;
    book.imagePath = await this.getImageUrl(book.title);
    console.log(book.imagePath);
    const new_book = new Book(book);
    await new_book.save();
    try {
        res.status(200).json({ message: "Book created successfully" });
    } catch (error) {
        res.status(500).json({ message: `There error is ${error}` });
    }
}

//get all books
exports.getallbooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: `There error is ${error}` });

    }
}

exports.deletebookbyid = async (req, res) => {
    const { id } = req.params
    try {
        //check id book is present or not

        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            // Check if the result is null, meaning the book was not found
            return res.status(200).json({ message: 'Book not found, deletion unsuccessful' });
        }
        return res.status(200).json({ message: 'Book deleted usuccessful' });

    }
    catch (error) {
        res.status(500).send(`There error is ${error}`);
    }
}
exports.getbookbyid = async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id)

        if (!book) {
            return res.send("The book is not present")
        }
        res.send(book);

    } catch (error) {
        res.status(500).json({ message: `There error is ${error}` });
    }
}

exports.updatebookbyid = async (req, res) => {
    const { id } = req.params
    const { title, description, Author } = req.body;
    const updateData = {
        title,
        description,
        Author
    };

    try {
        const book = await Book.findByIdAndUpdate(id, updateData)
        book.save()
        if (!book) {
            return res.status(200).json({ message: "Updation is unsuccessfull" })
        }

        return res.status(200).json({ message: "Updation is successfull" })

    } catch (error) {
        res.status(500).json({ message: `There error is ${error}` });

    }

}

exports.getImageUrl = async (name) => {
    const apiKey = 'AIzaSyB4eKayPlLAEoYiZTB-4CokxjPa4Fbpl2E'; // Replace with your API key

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
            params: {
                q: name,
                maxResults: 1,
                key: apiKey
            }
        });

        if (response.data.totalItems > 0 && response.data.items) {
            const book = response.data.items[0];
            let smallThumbnail = book.volumeInfo.imageLinks?.smallThumbnail;

            if (smallThumbnail) {
                smallThumbnail = smallThumbnail.replace(/^http:\/\//i, 'https://');
                return smallThumbnail;
            } else {
                console.log("Thumbnail is not found");
                return "";
            }
        } else {
            return "";
        }
    } catch (error) {
        console.error(error);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const response = await signInWithEmailAndPassword(email, password);

        res.status(200).json({
            message: 'Login successful',
            uid: response.localId,
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(401).json({ error: 'Invalid email or password' });
    }
}

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const userRecord = await getAuth().createUser({
            email: email,
            password: password
        });

        res.status(200).json({
            message: 'User created successfully',
            uid: userRecord.uid
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message });
    }
}
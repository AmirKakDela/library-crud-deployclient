import React, {useCallback, useEffect, useState} from 'react';
import './books.scss'
import {useDispatch, useSelector} from "react-redux";
import {deleteBook, getBooks} from "../../redux/thunkBookAction";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import BookForm from "./BookForm";


const Books = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.books)
    const error = useSelector(state => state.error.error)
    const [lookForm, setLookForm] = useState(false);
    const [editBook, setEditBook] = useState(null)

    const handleEditBook = (id) => {
        setLookForm(true)
        const book = books.find(book => book._id === id)
        setEditBook(book)
    }

    const handleOpenForm = () => {
        setLookForm(prev => !prev)
        setEditBook(null)
    }

    const handleDeleteBook = useCallback((id) => {
        dispatch(deleteBook(id))
    }, [])

    useEffect(() => {
        dispatch(getBooks())
    }, [])


    return (
        <div>
            {error ? <div className="main__error main__error_active">{error}</div> : null}
            <button className="button"
                    onClick={handleOpenForm}
            >{lookForm ? 'Отменить' : 'Добавить книгу'}</button>
            {lookForm ?
                <BookForm handleOpenForm={handleOpenForm}
                          editBook={editBook}
                />
                : null}

            <table className="table">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Автор</th>
                    <th>Год выпуск</th>
                    <th>Количество</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => {
                    return <tr key={book._id}>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.year}</td>
                        <td>{book.count}</td>
                        <td>
                            <DeleteOutlined onClick={() => handleDeleteBook(book._id)}/>
                            <EditOutlined onClick={() => handleEditBook(book._id)}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Books;



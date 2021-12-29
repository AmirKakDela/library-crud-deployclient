import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {Formik} from "formik";
import {getBooks} from "../../redux/thunkBookAction";
import {getReaders} from "../../redux/thunkReaderAction";
import {cleanErrorAction, setErrorAction} from "../../redux/reducers/errorReducer";
import {createGive} from "../../redux/thunkGiveAction";

const GiveForm = (props) => {
    const dispatch = useDispatch();
    const readers = useSelector(state => state.readers.readers)
    const books = useSelector(state => state.books.books)

    const onSubmit = (e, values) => {
        e.preventDefault()
        const dateGive = formatDate(values.dateGive)
        const dateReturn = formatDate(values.dateReturn)

        if (dateGive > dateReturn) {
            dispatch(setErrorAction('Дата выдачи не может быть позже, чем дата возрата книги'))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 3000)
        } else {
            dispatch(createGive(values))
            props.handleOpenForm()
        }
        console.log(values)
    }

    useEffect(() => {
        dispatch(getBooks())
        dispatch(getReaders())
    }, [])

    return (
        <Formik
            initialValues={props.editReader ? props.editReader : initialValues}
            validationSchema={validationSchema}
            validateOnBlur
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <form className="form" onSubmit={e => onSubmit(e, formik.values)}>
                        <label>Кому выдать книгу:
                            <select name="reader"
                                    className="form__input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.reader}
                            >
                                <option value="" disabled>Выберите читателя</option>
                                {readers && readers.map(reader => {
                                    return (
                                        <option key={reader._id}
                                                value={reader._id}
                                                onChange={formik.handleChange}>{reader.firstName} {reader.lastName}</option>
                                    )
                                })}
                            </select>
                        </label>
                        {formik.errors.reader && formik.touched.reader &&
                            <p className="form__error-text">{formik.errors.reader}</p>}

                        <label>Какую книгу выбрал читатель:
                            <select name="book"
                                    className="form__input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.book}
                            >
                                <option value="" disabled>Выберите книгу</option>
                                {books && books.map(book => {
                                    return (
                                        <option key={book._id}
                                                value={book._id}>{book.name}, ({book.author})</option>
                                    )
                                })}
                            </select>
                        </label>

                        {formik.errors.book && formik.touched.book &&
                            <p className="form__error-text">{formik.errors.book}</p>}

                        <label>Дата выдачи
                            <input type="date"
                                   className="form__input"
                                   name="dateGive"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.dateGive}/>
                        </label>

                        {formik.errors.dateGive && formik.touched.dateGive &&
                            <p className="form__error-text">{formik.errors.dateGive}</p>}

                        <label>Дата сдачи
                            <input type="date"
                                   className="form__input"
                                   name="dateReturn"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.dateReturn}/>
                        </label>

                        {formik.errors.dateReturn && formik.touched.dateReturn &&
                            <p className="form__error-text">{formik.errors.dateReturn}</p>}

                        <button className="button"
                                type="submit"
                                disabled={!formik.isValid}
                        >Сохранить
                        </button>
                    </form>
                )
            }}
        </Formik>
    )
}

export default GiveForm;


const validationSchema = yup.object().shape({
    book: yup.string().required('Это обязательное поле'),
    reader: yup.string().required('Это обязательное поле'),
    dateGive: yup.date().required('Это обязательное поле'),
    dateReturn: yup.date().required('Это обязательное поле')
})

const initialValues = {
    book: '',
    reader: '',
    dateGive: '',
    dateReturn: '',
}


export function formatDate(date) {
    return new Date(date).toLocaleDateString()
}
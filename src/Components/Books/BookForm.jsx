import React from 'react';
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {createBook, updateBook} from "../../redux/thunkBookAction";
import {Formik} from "formik";

const BookForm = (props) => {
    const dispatch = useDispatch();

    const onSubmit = (e, values) => {
        e.preventDefault()
        if (values.name && values.author && values.year) {
            if (props.editBook) {
                dispatch(updateBook(props.editBook._id, values))
            } else {
                dispatch(createBook(values))
            }
            props.handleOpenForm();
        }
    }

    return (
        <Formik
            initialValues={props.editBook ? props.editBook : initialValues}
            validationSchema={validationSchema}
            validateOnBlur
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <form className="form" onSubmit={e => onSubmit(e, formik.values)}>
                        <label>Название книги
                            <input type="text"
                                   placeholder="Введите название книги..."
                                   className="form__input"
                                   name="name"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.name}
                            />
                        </label>
                        {formik.errors.name && formik.touched.name &&
                            <p className="form__error-text">{formik.errors.name}</p>}

                        <label> Автор
                            <input type="text"
                                   placeholder="Введите автора..."
                                   className="form__input"
                                   name="author"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.author}/>
                        </label>
                        {formik.errors.author && formik.touched.author &&
                            <p className="form__error-text">{formik.errors.author}</p>}

                        <label>Год выпуска
                            <input type="number"
                                   placeholder="Введите год выпуска..."
                                   className="form__input"
                                   name="year"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.year}/>
                        </label>
                        {formik.errors.year && formik.touched.year &&
                            <p className="form__error-text">{formik.errors.year}</p>}

                        <label> Количество книг
                            <input type="number"
                                   placeholder="Введите количество книг..."
                                   className="form__input"
                                   name="count"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.count}/>
                        </label>
                        {formik.errors.count && formik.touched.count &&
                            <p className="form__error-text">{formik.errors.count}</p>}

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

export default BookForm;


const validationSchema = yup.object().shape({
    name: yup.string().required('Это обязательное поле'),
    author: yup.string().required('Это обязательное поле'),
    year: yup.number().required('Это обязательное поле')
        .positive('Год выпуска не может быть отрицательным')
        .integer().max(2021, 'Год выпуска не может быть больше, чем нынешний год'),
    count: yup.number().required('Это обязательное поле').positive('Количество не может быть отрицательным').integer()
})

const initialValues = {
    name: '',
    author: '',
    year: '',
    count: '',
}
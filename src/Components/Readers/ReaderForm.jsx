import React from 'react';
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {Formik} from "formik";
import MaskedInput from 'react-text-mask'
import {createReader, updateReader} from "../../redux/thunkReaderAction";

const ReaderForm = (props) => {
    const dispatch = useDispatch();

    const onSubmit = (e, values) => {
        e.preventDefault()
        console.log(values)
        if (props.editReader) {
            dispatch(updateReader(props.editReader._id, values))
        } else {
            dispatch(createReader(values))
        }
        props.handleOpenForm()
    }

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
                        <label>Имя читателя
                            <input type="text"
                                   placeholder="Введите имя..."
                                   className="form__input"
                                   name="firstName"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.firstName}
                            />
                        </label>
                        {formik.errors.firstName && formik.touched.firstName &&
                            <p className="form__error-text">{formik.errors.firstName}</p>}

                        <label>Фамилия читателя
                            <input type="text"
                                   placeholder="Введите фамилию..."
                                   className="form__input"
                                   name="lastName"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.lastName}/>
                        </label>
                        {formik.errors.lastName && formik.touched.lastName &&
                            <p className="form__error-text">{formik.errors.lastName}</p>}

                        <label>Телефон
                            <MaskedInput
                                mask={['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                className="form__input"
                                placeholder="Введите номер телефона..."
                                guide={true}
                                name="tel"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.tel}/>
                        </label>
                        {formik.errors.tel && formik.touched.tel &&
                            <p className="form__error-text">{formik.errors.tel}</p>}

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

export default ReaderForm;


const validationSchema = yup.object().shape({
    firstName: yup.string().required('Это обязательное поле'),
    lastName: yup.string().required('Это обязательное поле'),
    tel: yup.string().required('Это обязательное поле')
})

const initialValues = {
    firstName: '',
    lastName: '',
    tel: '',
}
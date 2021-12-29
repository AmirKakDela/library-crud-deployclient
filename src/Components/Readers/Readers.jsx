import React, {useEffect, useState} from 'react';
import ReaderForm from "../Readers/ReaderForm";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {deleteReader, getReaders} from "../../redux/thunkReaderAction";

const Readers = () => {
    const readers = useSelector(state => state.readers.readers)
    const error = useSelector(state => state.error.error)
    const dispatch = useDispatch()
    const [lookForm, setLookForm] = useState(false);
    const [editReader, setEditReader] = useState(null)

    const handleOpenForm = () => {
        setLookForm(prev => !prev)
        setEditReader(null)
    }

    const handleDeleteReader = (id) => {
        console.log(id)
        dispatch(deleteReader(id))
    }

    const handleEditReader = (id) => {
        setLookForm(true)
        const reader = readers.find(reader => reader._id === id)
        setEditReader(reader)
    }


    useEffect(() => {
        dispatch(getReaders())
    }, [])


    return (
        <div>

            {error ? <div className="main__error main__error_active">{error}</div> : null}
            <button className="button"
                    onClick={handleOpenForm}
            >{lookForm ? 'Отменить' : 'Добавить читателя'}</button>
            {lookForm ?
                <ReaderForm
                    editReader={editReader}
                    handleOpenForm={handleOpenForm}
                />
                : null}

            <table className="table">
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Телефон</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {readers.map(reader => {
                    return <tr key={reader._id}>
                        <td>{reader.firstName}</td>
                        <td>{reader.lastName}</td>
                        <td>{reader.tel}</td>
                        <td>
                            <DeleteOutlined onClick={() => handleDeleteReader(reader._id)}/>
                            <EditOutlined onClick={() => handleEditReader(reader._id)}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Readers;
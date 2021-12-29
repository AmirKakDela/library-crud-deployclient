import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteGive, getGives} from "../../redux/thunkGiveAction";
import GiveForm, {formatDate} from "./GiveForm";

const Gives = () => {
    const dispatch = useDispatch();
    const [lookForm, setLookForm] = useState(false);
    const gives = useSelector(state => state.gives.gives)
    const error = useSelector(state => state.error.error);

    const handleOpenForm = () => {
        setLookForm(prev => !prev)
    }

    const handleDeleteGive = (id) => {
        dispatch(deleteGive(id))
    }

    useEffect(() => {
        dispatch(getGives())
    }, [])

    return (
        <div>
            {error ? <div className="main__error main__error_active">{error}</div> : null}
            <button className="button"
                    onClick={handleOpenForm}
            >{lookForm ? 'Отменить' : 'Создать выдачу'}</button>
            {lookForm ?
                <GiveForm handleOpenForm={handleOpenForm}/>
                : null}

            <table className="table">
                <thead>
                <tr>
                    <th>Название книги</th>
                    <th>Имя читателя</th>
                    <th>Дата выдачи</th>
                    <th>Необходимо вернуть</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {gives.map(give => {
                    return <tr key={give._id}>
                        <td>{give.book.name}</td>
                        <td>{give.reader.firstName} {give.reader.lastName}</td>
                        <td>{formatDate(give.dateGive)}</td>
                        <td>{formatDate(give.dateReturn)}</td>
                        <td>
                            <DeleteOutlined onClick={() => handleDeleteGive(give._id)}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};


export default Gives;
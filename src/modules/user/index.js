import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    insert,
    remove,
    edit,
    SelectUser,
} from './store';

import {
    Container,
    Grid
} from 'react-bootstrap'

export default function UserModule() {
    const userState = useSelector(SelectUser);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        Id: void(0),
        NickName: void(0),
        Status: void(0)
    });

    console.log(userState)
    const Save = (values) => {
        
    }

    return (
        <div className="container">
            <div className="row">
                <input type="text" value={user.NickName} onChange={(value) => {setUser({NickNname: value})}}/>
            </div>
            <div className="row">
                <checkbox type="checkbox" value={user.Status} onCLick={() => {setUser({Status: !user.Status})}} />
            </div>
            <div className="row">
                <button className="button" onClick={Save(user)}>Salvar</button>
            </div>
        </div>
    );
}

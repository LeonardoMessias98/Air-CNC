import React, {useState, useMemo} from 'react';
import api from '../../services/api';
import './style.css';

import camera from '../../assets/camera.svg';

export default function New({history}){
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail): null;
    },[thumbnail])

    async function handleSubmit(event){
        event.preventDefault();
        
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('company',company);
        data.append('price',price);
        data.append('techs',techs);
        data.append('thumbnail',thumbnail);

        await api.post('/spot', data, {
            headers: {user_id}
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
            id='thumbnail' 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
            > 
                <input type='file' onChange={event => setThumbnail(event.target.files[0]) }/>
                <img src={camera} alt='select img' />
            </label>

            <label htmlFor='company'>EMPRESA *</label>
            <input 
                id='company'
                placeholder='Sua empresa incrivel'
                value={company}
                onChange = {event => setCompany(event.target.value)}
            />
        
            <label htmlFor='techs'>TECNOLOGIAS *<span>(separadas por virgulas)</span></label>
            <input 
                id='techs'
                placeholder='Quais tecnologias usam ?'
                value={techs}
                onChange = {event => setTechs(event.target.value)}
            />
        
            <label htmlFor='price'>VALOR DA DIÁRIA *<span>(em branco para GRATUITO)</span></label>
            <input 
                id='price'
                placeholder='Valor da diaria'
                value={price}
                onChange = {event => setPrice(event.target.value)}
            />
            <button type='submit' className='btn'>Cadastrar</button>
        </form>
    )    
}
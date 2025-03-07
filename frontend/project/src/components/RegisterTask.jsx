import React, { useContext, useState } from 'react';

import axios from 'axios';
import moment from 'moment';

import { TaskContext } from '../context/Tasks';
import { RegiterStyle } from './styles';

function RegisterTask() {
  const { tasks } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState();
  const [timeDuration, setTimeDuration] = useState();
  const [message, setMessage] = useState('');


  const onChangeTitle = ({ target }) => {
    const { value } = target;

    setTitle(value);
  }

  const onChangeDescription = ({ target }) => {
    const { value } = target;

    setDescription(value);
  }

  const onChangeDate = ({ target }) => {
    const { value } = target;

    setDate(value);
  }

  const onChangeTimeDuration = ({ target }) => {
    const { value } = target;

    setTimeDuration(value);
  }

  const addTask = (event) => {
    event.preventDefault();
    
    const result = moment(date, 'DD/MM/YY',true).isValid();
    const arrCheck = [title, description, timeDuration, date];

    if (!result) {
      return alert('O campo data precisa esta neste formato DD/MM/YY');
    }

    for (let i in arrCheck) {
      const checkStr = arrCheck[i] === '' || arrCheck[i] === ' ';
      const checkBool = Boolean(arrCheck[i]) === false;

      if (checkStr || checkBool) {
       return setMessage('Preencha todos os campos.');
      }
    }

    const bodyReq = {
      title: title,
      description: description,
      date: date,
      timeDuration: timeDuration
    };

    if (!message) {
      axios.post(`http://localhost:3000/task/new-task`, bodyReq)
      .then(() => {
        setTitle('');
        setDescription('');
        setDate('');
        setTimeDuration('');
      })
      .catch(() => console.log(tasks));
    }

  }

  return (
    <RegiterStyle>
      <div>
        <h1>Crie uma nova tarefa</h1>
        <form style={{display: 'flex'}}>
          <div>
            <label>
              <span>Titulo</span><br />
              <input value={title} onChange={onChangeTitle} type="text" />
            </label>
            <label>
              <span>Descrição</span><br />
              <textarea
                value={description}
                onChange={onChangeDescription}
                cols="30"
                rows="10"
              />
            </label>
            <label>
              <span>Data</span><br />
              <input value={date} onChange={onChangeDate} type="text" placeholder="Exemplo: 01/08/2000" />
            </label>
            <label>
              <span>Tempo de duração</span><br />
              <input
                value={timeDuration}
                onChange={onChangeTimeDuration}
                type="text"
                placeholder="Exemplo: 2 horas e 20 minutos"
              />
            </label>
          </div>
          <button onClick={addTask}>Salvar</button>
        </form>
        <h1>{ message }</h1>
      </div>
    </RegiterStyle>  
  );
}

export default RegisterTask;
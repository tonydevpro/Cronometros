import './App.css';
import {useEffect, useState} from 'react';



function App() {
  const [horas, setHoras]=useState(0);
  const [minutos, setMinutos]=useState(59);
  const [segundos, setSegundos]=useState(58);
  const [rodando, setRodando] = useState(false);
  const [rodandoDecremento, setRodandoDecremento] = useState(false);

 

  useEffect(() => {
    if (!rodando) return;

    const intervalo = setInterval(() => {
      setSegundos((s) => {
        if (s < 59) return s + 1; // Incrementa segundos
        setSegundos(0); // Reinicia segundos

        setMinutos((m) => {
          if (m < 59) return m + 1; // Incrementa minutos
          setMinutos(0); // Reinicia minutos

          setHoras((h) => (h < 23 ? h + 1 : 0)); // Incrementa ou reinicia horas
          return 0;
        });
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [rodando]);

  useEffect(()=>{
    if (!rodandoDecremento) return;

    const intervalo = setInterval(() => {
      setSegundos((prevSegundos) => {
        if (prevSegundos > 0) {
          return prevSegundos - 1;
        } else {
          return 59;
        }
      });

      setMinutos((prevMinutos) => {
        if (segundos === 0) {
          if (prevMinutos > 0) {
            return prevMinutos - 1;
          } else {
            return 59;
          }
        }
        return prevMinutos;
      });

      setHoras((prevHoras) => {
        if (segundos === 0 && minutos === 0) {
          if (prevHoras > 0) {
            return prevHoras - 1;
          } else {
            setRodandoDecremento(false);
            return 0;
          }
        }
        return prevHoras;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [rodandoDecremento, segundos, minutos]);

  function menuTimer(){
    document.querySelector('.menuTimer').style.display = 'block';
    
  }
  function timer(){
    const h = parseInt(document.querySelector('.horas').value) || 0;
    const m = parseInt(document.querySelector('.minutos').value) || 0;
    const s = parseInt(document.querySelector('.segundos').value) || 0;
    
    document.querySelector('.menuTimer').style.display = 'none';
    setHoras(h)
    setMinutos(m)
    setSegundos(s)
    setRodandoDecremento(true);
  }

  return (
    <div className="geral">
      <div className='menuTimer'>
        <input className='horas' placeholder='Horas'></input>
        <input className='minutos' placeholder='Minutos'></input>
        <input className='segundos' placeholder='segundos'></input>
        <button onClick={timer} className='btMenu'>Iniciar</button>
      </div>
      <div className='display'>
          <h1>
            {String(horas).padStart(2, '0')}:
            {String(minutos).padStart(2, '0')}:
            {String(segundos).padStart(2, '0')}
          </h1>
      </div>
      <div className='bt'>
        <button onClick={()=>setRodando(true)}>play</button>
        <button onClick={()=>{setRodando(false); setRodandoDecremento(false)}}>pause</button>
        <button onClick={()=>{setRodando(false); setSegundos(0); setMinutos(0); setHoras(0); setRodandoDecremento(false)}}>Limpar</button>
        <button onClick={menuTimer}>Timer</button>
      </div>
    </div>
  );
}

export default App;

import './App.css';

const App = () => {
  const getHashNow = () => {
    const time = Date(Date.now())

    setTimeout(getHashNow, 5000)
    
    console.log(time)
    return time
  }
  
  return (
    <div className="App">
      {getHashNow()}
      {setTimeout(()=>{ window.location="index"; },5000)}
    </div>
  );
}

export default App;

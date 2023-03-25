import React from 'react';

interface apiRoot {
  message: string;
}

function App() {
  const [message, setMessage] = React.useState<string>('');
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}`)
      .then((res) => res.json())
      .then((data: apiRoot) => {
        setMessage(data.message);
        console.log(data);
      });
  }, []);


  return (
    <div className="App">
      <h1>React App</h1>
      <p>API URL: {process.env.REACT_APP_API_URL}</p>
      <p>API Message:</p>
      <p>{message}</p>

    </div>
  );
}

export default App;

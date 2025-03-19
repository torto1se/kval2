function Error({message}) {
  if(!message){
    return null
  }
  return ( 
    <div style={{
      zIndex: 1000,
      backgroundColor: 'red',
      color: 'white',
      padding: '10px',
      borderRadius: '10px',
      position: 'fixed',
      top: '10px',
      right: '20px'
    }}>
      {message}
    </div>
  );
}

export default Error;
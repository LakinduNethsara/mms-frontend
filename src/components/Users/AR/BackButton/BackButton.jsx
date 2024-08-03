import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack(); // This function takes you back to the previous location in history
  };

  return (
    <div style={{display:"inline"}}>
      {/* Your component content here */}
      <button className="btn btn-outline-danger btn-sm" onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default BackButton;
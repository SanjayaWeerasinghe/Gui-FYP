import React, { useState } from 'react';
import './slider.css';
import goodClientImage from './blue.png';
import maliciousClientImage from './red.png';

// Checkbox component
const CheckBoxes = ({ selectedOption, handleOptionChange }) => (
  <div className="checkbox-container">
    <label>
      <input
        type="checkbox"
        value="Conv."
        checked={selectedOption === 'Conv.'}
        onChange={handleOptionChange}
      />
      Conv.
    </label>
    <label>
      <input
        type="checkbox"
        value="Semi-BCaFL"
        checked={selectedOption === 'Semi-BCaFL'}
        onChange={handleOptionChange}
      />
      Semi-BCaFL
    </label>
    <label>
      <input
        type="checkbox"
        value="Fully BCaFL"
        checked={selectedOption === 'Fully BCaFL'}
        onChange={handleOptionChange}
      />
      Fully BCaFL
    </label>
  </div>
);

function Slider() {
  const [value, setValue] = useState(0);
  const [selectedOption, setSelectedOption] = useState('Conv.'); // Default selection
  const [image1,setImage1] = useState();
  const [image2,setImage2] = useState();

  const [arr,setArr] = useState()

  const handleSliderChange = (event) => {
    const newValue = Math.round(parseFloat(event.target.value));
    setValue(newValue);
  };

  const handleTransactionStart = () => {
    console.log(value)
    // Add your code to start the transaction here
    // You can perform any actions or logic you need
    // For example, you can send a request to the server or update the UI.
    alert('Transaction started!');
  };

  const setimage =(ur) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setImageSrc(dataURL);
    };
    reader.readAsDataURL(blobData);
  }

  const hanHTTP =async () => {
    console.log(selectedOption)
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({number:value+0,text:selectedOption})
    };
    try {
      
        const fetchResponse = await fetch(`http://localhost:8000/check`, settings);
        const data = await fetchResponse.json();


    //     const reader = new FileReader();
    //     reader.onload = () => {
    //     const dataURL = reader.result;
    //     setImage1(dataURL);
    //     };
    // reader.readAsDataURL(data.image1);

        setImage1(data.image1)
        setImage2(data.image2)

        console.log(data)
    } catch (e) {
        return e;
    }    


  }
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderIndicators = () => {
    const indicators = [];
    let totalPercentage = 0;

    for (let i = 1; i <= 10; i++) {
      const isActive = i <= value;
      const iconImage = isActive ? maliciousClientImage : goodClientImage;
      const percentageIncrease = isActive ? 10 : 0;
      totalPercentage += percentageIncrease;

      indicators.push(
        <div key={i} className={`indicator ${isActive ? 'active' : ''}`}>
          <img
            src={iconImage}
            alt={isActive ? 'Malicious' : 'Good'}
            className="icon"
          />
        </div>
      );
    }
    return { indicators, totalPercentage };
  };

  const { indicators, totalPercentage } = renderIndicators();

  return (
    <>
    <div className="text-box">
          <label htmlFor="slider">Blockchain for Poisoning Attacks in Hierarchical Federated Learning Systems</label>
    </div>
    <div className="slider-container">
      <div className="indicators">{indicators}</div>
      <div className="total-percentage">
        Malicious Percentage: {totalPercentage}%
      </div>
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={value}
        onChange={handleSliderChange}
      />
      <CheckBoxes selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
      <button className="transaction-button" onClick={()=>hanHTTP()}>
        Start Transaction
      </button>
    </div>
    <div className='imgcontainer'>
    {image1 && <img className='graph' src={`data:image/jpeg;base64,${image1}`}
      /> }
    {image2 && <img className='graph' src={`data:image/jpeg;base64,${image2}`}
      /> }
      
      
    </div>
    </>
  );
}

export default Slider;

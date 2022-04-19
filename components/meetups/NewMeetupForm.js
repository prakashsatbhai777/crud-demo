import { useRef } from 'react';
import { useState } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  const [titleError, setTitleError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [formValid, setFormValid] = useState(false);

  const [buttonText, setButtonText] = useState('Add');

  function submitHandler(event) {
    event.preventDefault();
    setFormValid(true);
    setTitleError(null);
    setImageError(null);
    setAddressError(null);
    setDescriptionError(null);

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if(enteredTitle.trim() === ''){
      setFormValid(false);
      setTitleError('This field is required');
    }
    if(enteredImage.trim() === ''){
      setFormValid(false);
      setImageError('This field is required');
    }
    if(enteredAddress.trim() === ''){
      setFormValid(false);
      setAddressError('This field is required');
    }
    if(enteredDescription.trim() === ''){
      setFormValid(false);
      setDescriptionError('This field is required');
    }

    if(formValid){
      console.log('in if');
      setButtonText('Adding...');
      const meetupData = {
        title: enteredTitle,
        image: enteredImage,
        address: enteredAddress,
        description: enteredDescription,
      };
      props.onAddMeetup(meetupData);
    }else{
      console.log('in else');
      return;
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref={titleInputRef} />
          {titleError && <p style={{color: 'red', marginTop: '0%', marginBottom: '0%' }}>{titleError}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Image</label>
          <input type='url' id='image' ref={imageInputRef} />
          {imageError && <p style={{color: 'red', marginTop: '0%', marginBottom: '0%' }}>{imageError}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' id='address' ref={addressInputRef} />
          {addressError && <p style={{color: 'red', marginTop: '0%', marginBottom: '0%' }}>{addressError}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            rows='3'
            ref={descriptionInputRef}
          ></textarea>
          {descriptionError && <p style={{color: 'red', marginTop: '0%', marginBottom: '0%' }}>{descriptionError}</p>}
        </div>
        <div className={classes.actions}>
          <button>{buttonText}</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;

import { useRef } from 'react';
import { useState } from 'react';
import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function EditMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const [buttonText, setButtonText] = useState('Update');

  function submitHandler(event) {
    event.preventDefault();
    setButtonText('Updating...');
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
        id: props.id,
        title: enteredTitle,
        image: enteredImage,
        address: enteredAddress,
        description: enteredDescription,
    };

    props.onUpdate(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} defaultValue={props.title} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input type='url' required id='image' ref={imageInputRef} defaultValue={props.image} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} defaultValue={props.address} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
            defaultValue={props.description}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>{buttonText}</button>
        </div>
      </form>
    </Card>
  );
}

export default EditMeetupForm;

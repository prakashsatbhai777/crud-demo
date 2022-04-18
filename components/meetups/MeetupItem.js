import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";

function MeetupItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  function deleteButtonClickHandler() {
    const isDelete = confirm("Are you sure! You want to delete Meetup?");
    if(isDelete){
       props.onDeleteMeetup(props.id);
    }
  }

  function editButtonClickHandler() {
    router.push("/edit-meetup/" + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
          &nbsp;&nbsp;<button onClick={editButtonClickHandler}>Edit</button>
          &nbsp;&nbsp;<button onClick={deleteButtonClickHandler}>Delete</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;

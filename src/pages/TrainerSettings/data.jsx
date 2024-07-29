
import TrainerSettings from "./TrainerSettings";

const ParentComponent = () => {
  const user = {
    uid: "8vYgnqL5o7sElCv6Hguf", // Replace with the actual UID of the logged-in user
    displayName: "John Doe",
    photoURL: "/person1.jpg",
    email: "john.doe@example.com",
  };

  return <TrainerSettings user={user} />;
};

export default ParentComponent;

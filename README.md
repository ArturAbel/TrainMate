
# trainMate

[Features](#features) | [Technologies](#technologies) | [Project Structure](#project-structure) | [Images](#images) | [Installation](#installation) | [Roadmap](#roadmap) | [License](#license)

trainMate is a web application designed to connect users with sports trainers in their area. The platform offers a comprehensive set of features, including trainer search, booking system, messaging, and admin approval, ensuring a seamless experience for both trainers and trainees.

<a name="features"></a>
## Features

- **Trainer Search:** Users can search for trainers based on location, expertise, and availability.
- **Reviews:** Trainees can leave reviews for trainers, helping others make informed decisions.
- **Booking System:** Users can book training sessions directly through the app.
- **Admin Approval:** Admins have the ability to approve or reject trainers who register on the platform.
- **Messaging System:** Facilitates communication between trainers and trainees for scheduling and coordination.

<a name="technologies"></a>
## Technologies Used

- **Frontend:** React
- **State Management:** Redux
- **Animations:** GSAP
- **Calendar Integration:** React Calendar
- **Authentication & Storage:** Firebase API
- **Map Integration:** Google API

<a name="project-structure"></a>
## Project Structure

- **SearchPage:** Allows users to search for trainers using various filters.
- **BookingPage:** Interface for booking training sessions.
- **AdminPage:** Admin dashboard for managing trainers and approving registrations.
- **MessagingPage:** Chat interface for communication between trainers and trainees.

<a name="images"></a>
## Images

![trainee System](https://github.com/ArturAbel/TrainMate/blob/main/public/assets/readme/1.jpg)
![Trainer Search](https://github.com/ArturAbel/TrainMate/blob/main/public/assets/readme/2.jpg)
![Phone](https://github.com/ArturAbel/TrainMate/blob/main/public/assets/readme/3.png)

<a name="installation"></a>
## Installation

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/your-username/train-mate.git
   \`\`\`

2. Install the dependencies:

   \`\`\`bash
   cd train-mate
   npm install
   \`\`\`

3. Set up Firebase configuration in the `.env` file with your Firebase API keys.

4. Run the development server:

   \`\`\`bash
   npm start
   \`\`\`

5. Open your browser and go to `http://localhost:3000` to access trainMate.

<a name="roadmap"></a>
## Roadmap

- [x] Implement trainer reviews and ratings.
- [x] Add messaging system for trainer-trainee communication.
- [x] Enhance search filters with advanced options.
- [ ] Integrate payment gateway for session bookings.

<a name="license"></a>
## License

This project is licensed under the MIT License.

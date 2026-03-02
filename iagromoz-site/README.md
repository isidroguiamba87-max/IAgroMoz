# iagromoz-site

## Project Overview
The iagromoz-site is a web application designed to collect email addresses from users through a footer form on the main page. The collected emails are then displayed on a separate page.

## File Structure
```
iagromoz-site
├── src
│   ├── index.html          # Main HTML page of the site
│   ├── footer.html         # Footer section containing the email form
│   ├── email-receiver.html # Page to display submitted email addresses
│   ├── css
│   │   └── styles.css      # Styles for the website
│   ├── js
│   │   └── main.js         # JavaScript for handling email submissions
├── package.json            # npm configuration file
├── README.md               # Project documentation
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Open `src/index.html` in your web browser to view the application.

## Usage Guidelines
- Users can enter their email addresses in the footer of the main page.
- Upon submission, the email addresses will be processed and displayed on the `email-receiver.html` page.
- Ensure that the email format is valid before submission to avoid errors.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.
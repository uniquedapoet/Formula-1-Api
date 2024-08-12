# Formula-1-Api

This project provides a RESTful API for accessing Formula 1 data, including information about drivers, circuits, races, and more. Additionally, it includes a frontend website to interact with the API.

## Table of Contents

- [Installation](#installation)
- [Backend](#backend)
- [Frontend](#frontend)
- [Backend](#backend)
- [Endpoints](#endpoints)
- [Frontend](#frontend)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Create a virtual environment:
    ```sh
    python3 -m venv venv
    ```

3. Activate the virtual environment:
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
    - On Windows:
        ```sh
        .\venv\Scripts\activate
        ```

4. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```

5. Run the backend server:
    ```sh
    uvicorn app.main:app --reload
    ```

### Frontend

1. Navigate to the [`frontend`] directory:
    ```sh
    cd frontend
    ```

2. Install the required dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm start
    ```

## Backend

The backend is built using FastAPI and provides various endpoints to access Formula 1 data.

### Endpoints

- **GET /drivers**: Retrieve a list of drivers.
- **GET /circuits**: Retrieve a list of circuits.
- **GET /races**: Retrieve a list of races.
- **GET /constructors**: Retrieve a list of constructors.

For detailed API documentation, visit the automatically generated docs at [`http://localhost:8000/docs`]when the backend server is running.

## Frontend

The frontend is built using React and provides a user-friendly interface to interact with the Formula 1 API. Users can search for drivers, circuits, and other data.

## Usage

1. Start both the backend and frontend servers as described in the Installation section.
2. Open your browser and navigate to [`http://localhost:3000`] to access the frontend website.
3. Use the frontend interface to interact with the Formula 1 data.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
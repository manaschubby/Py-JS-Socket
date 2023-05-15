# Py-JS-Socket
This is a simple demo of a socket connection established between a JS server, Python client and a JS client that sends dummy data over the socket connection

The Python client receives data and prints it out to console.
The Python program also sends data to the server but there is no program yet to handle that data.

## Usage

- Run the following commands in different terminals

    - Python Client
```bash
    cd Py-client
    pip3 install -r requirements.txt
    python3 py-socket-ci.py
```

- - JS Client

```bash
    cd client
    npm i --force
    npm run start
```
- - Socket Server
```bash
    npm i 
    npm run start
```

- You will find the dummy telemetry printed out in the python console


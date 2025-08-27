#!/bin/bash

# Navigate to UnoReact and start frontend
cd UnoReact || exit
npm run dev &
FRONTEND_PID=$!

# Navigate back and start backend
cd ../UnoServer || exit
npm start &
BACKEND_PID=$!

# Wait for both processes to finish
wait $FRONTEND_PID $BACKEND_PID

# Hotel Room Reservation System

## Live Demo
https://hotel-room-reservation.vercel.app

## Problem Statement
Design a hotel room reservation system that optimally assigns rooms based on:
- Same-floor priority
- Minimum travel time between rooms
- Lift/stair proximity
- Maximum 5 rooms per booking

## Hotel Structure
- Floors 1–9: 10 rooms per floor (101–110, 201–210, ...)
- Floor 10: 7 rooms (1001–1007)
- Lift/Stairs on the left side

## Travel Time Rules
- Horizontal movement: 1 minute per room
- Vertical movement: 2 minutes per floor

## Features
- Book 1 to 5 rooms
- Same-floor priority booking
- Cross-floor optimized booking
- Random room occupancy generator
- Reset entire booking
- Visual room layout

## Tech Stack
- React (Hooks)
- Bootstrap 5
- JavaScript

## How to Run Locally
```bash
npm install
npm start

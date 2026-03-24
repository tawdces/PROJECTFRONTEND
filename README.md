# Campground Explorer

A modern web application for discovering and booking campgrounds. Built with Next.js, TypeScript, Material-UI, Tailwind CSS, and NextAuth for authentication. Users can browse campgrounds, make bookings, manage their reservations, and admins can view all bookings.

## Features

- 🔐 **Authentication** – Sign up, sign in, and protected routes using NextAuth (Credentials provider)
- 🏕️ **Campground Listings** – Browse campgrounds with images, addresses, and contact info
- 📅 **Booking System** – Reserve a campground by selecting a date
- 👤 **User Profile** – View user details and personal bookings
- ✏️ **Booking Management** – Edit or cancel existing bookings (users can manage their own; admins can manage all)
- 🛡️ **Role-Based Access** – Admin role sees all bookings and can edit/delete any
- 🎨 **Responsive UI** – Built with Material-UI and Tailwind CSS for a polished, responsive design

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Material-UI (MUI), Tailwind CSS
- **Authentication:** NextAuth.js (Credentials provider)
- **State Management:** Redux Toolkit (configured but not heavily used in current implementation)
- **Date Handling:** dayjs, MUI X Date Pickers
- **Testing:** Jest, React Testing Library
- **Package Manager:** npm / yarn
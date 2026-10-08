# Research-Deliverable

# Overview

This repository contains my individual Research Milestone project for CSCE 490.

The purpose of this milestone is to research the technologies our team may use for our semester project and have experience with them before beginning development as a team.

Our team is developing a credit card rewards optimization application. For this milestone, I built a smaller prototype of that application using Next.js, React, TypeScript, and Tailwind CSS.

The prototype allows a user to enter a purchase amount and spending category. The application then compares several credit cards, calculates the rewards earned from each card, and recommends the card with the highest estimated reward value.

# Technologies Researched 
Next.js - is the primary framework used for the application.

I researched Next.js to understand:

- Creating a Next.js project
- The App Router
- Page structure
- Client components
- Running a development server
- Building a production application

Our team plans to use Next.js for the final project because it provides a structured framework for building a React application while also supporting server-side functionality. It also integrates well with services such as Vercel and can support the backend functionality our application will eventually need.

React - is used to create the interactive user interface.

I researched:
- Components
- State
- Event handlers
- Forms
- Conditional rendering
- User input

The rewards calculator uses React state to keep track of:
- Purchase amount
- Purchase category
- Calculation results

When the user clicks Compare Cards, React updates the page with the calculated results without requiring a page reload.

TypeScript

I researched:
- Type annotations
- Interfaces/types
- Type-safe objects
- Type checking

For example, each credit card follows a defined structure containing its name, issuer, and reward multipliers. Using TypeScript helps prevent errors caused by incorrectly structured data and makes the code easier to understand as the project grows.

Tailwind CSS

I researched:
- Utility classes
- Responsive design
- Spacing
- Typography
- Colors
- Layout
- Responsive components

Tailwind allowed me to build the interface without creating a large custom CSS file.

Supabase - is used to store and retrieve the credit card data used by the application.

I researched:

- Creating a Supabase project
- Creating database tables
- Storing application data
- Retrieving data from Supabase
- Row Level Security and database permissions

The prototype uses a Supabase table to store the credit card names, issuers, and reward multipliers. The application retrieves this data from Supabase instead of storing the credit card information directly in the application code.

Vercel - is used to deploy the Next.js application.

I researched how Vercel can be used to deploy a Next.js application and connect the deployed application to external services such as Supabase.

npm- package manager used by this project

I researched how npm manages dependencies and project scripts.

How to Run

Clone the repository and navigate to the project folder.

git clone https://github.com/lilydeller/Research-Deliverable.git
cd Research-Deliverable/credit-card-rewards

Install the project's dependencies.

npm install

Start the development server.

npm run dev

The application can then be opened at http://localhost:3000.

The project also uses:

package.json to define dependencies and scripts

package-lock.json to record the installed dependency versions


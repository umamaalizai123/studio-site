# Aafiyat Pilates

A responsive single-page website for a women's pilates studio. It shows a class schedule, studio photos, instructor cards and membership tiers.

This project has two versions:

- **Assignment 1:** plain HTML5 and CSS3, using Flexbox and Grid. It is saved under the Git tag `assignment-1`.
- **Assignment 2 (current):** rebuilt with React, Vite and Tailwind CSS.

## How to run it

1. Install Node.js (version 20.19 or newer).
2. In the project folder, run:
npm install
npm run dev

3. Open the link it prints, usually `http://localhost:5173`.

## What I built

- **Class filter:** buttons filter the schedule by class type (All, Reformer, Mat, Stretch, Barre, Prenatal), using `useState`.
- **Spots stepper:** a small controlled component on every class card. The parent component owns the numbers, so the total reserved spots updates and reservations survive when the filter changes.
- **Components:** Header, Hero, ClassesSection, Gallery, TrainersSection, MembershipSection and Footer, each in its own file.
- **Data files:** classes, trainers and memberships are arrays of objects, rendered with `.map()`.
- **Tailwind CSS:** styled mobile-first, with unprefixed classes for phones and `sm:`, `md:` and `lg:` for larger screens. No horizontal scroll at any size.

## Folder structure
public/images/ photos and banner image
src/components/ React components
src/data/ data files (classes, trainers, memberships)
src/App.jsx page layout
src/index.css Tailwind import and colour theme

## Notes

- Photos are stock images from free sources, and the instructor names and bios are placeholders. They are not real people.
- This is a front-end project. The data is hardcoded, and the reserve buttons do not save bookings.

## Built by

Ummama Alizai, as part of an individual project.
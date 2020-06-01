# PixTile

## A textile drawing app for pixel art

Hosted at: https://www.pix-tile.com/

This website is built with Javascript, React, and Redux. The backend is built with Rails, postgresql, and complete with JWT Auth and B-Crypt password protection.

Link to the backend repo [here](https://github.com/Tororoi/pixel-pattern-maker-backend).


PixTile is a drawing tool designed to make it easy to create repeating patterns. It's targeted towards textile designers and pixel artists who need to create repeating textures for games. It's also useful for breaking Artist's block, due to how fast you can fill up the visual canvas.

## Features:
1. Start drawing right away whether you're logged in or not. You can export your creation to a new tab and download your image from there.
2. If you're logged in, you can save your drawing to the database, making it public for anyone to view.
3. Favorite drawings that you like to find them more easily later.
4. Start a new drawing based on someone else's drawing, building on what they've already done, or start on a clean canvas using their color palette as your starting point.
5. Freely change the colors in your image at any point by changing the colors in your color palette. You can add colors but not remove colors. Duplicate colors will be merged in the database.
6. By default, the draw tool will be selected. You can also select an eraser tool or a drag tool, which can be used to reposition your pattern to line up the edges exactly how you want.
7. Change the color of the background to more easily see the colors you're working with. Currently available options include white, black, gray, and transparent. Exported images will not include the background color and empty pixels will be left transparent.
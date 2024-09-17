# Cube3D

This was project made at 42 school with a teammate.
It essentially is a tech demo to showcase and learn simple rendering in the style of Wolftenstein 3D and being able to move around a map.
This was done using a simple library called MLX42 to put images on the screen.
 
 <img src="/cube3d.gif">

## Commentary

Even though all of the rendering math are done on the CPU, it is still very fast since they are 2d calculations that uses the distance of ray to determinate the height of wall at that pixel column.
At first I thought that the bottleneck would come from these calculations, but it actually came from editing the memory of the image data that would be put on the screen. Since optimizing it wasn't in the requirement of the project we didn't explore how we could achieve this.
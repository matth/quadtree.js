# A Javascript Quad Tree

## Interesting files

* ./lib/QuadTree.js
* ./spec/javasscripts/QuadTreeSpec.js
* example.html

## Usage

    world.ontick(function() {

      // The tree expects the origin to be in the top left
      var tree = new QuadTree(0, 0, world.x, world.y, 0, 4)

      // Add you sprites
      sprites.forEach(function(sprite) {
        // The tree expects a sprite to have x, y coords in top left
        // and look like { x : num, y : num, width : num, height : num }
        tree.insert(sprite)
      })

      // Check quads with possible collisions in detail
      tree.possibles().forEach(function(quad) {
        quad.sprites // an array of sprites in this quad
      })

    })

## Running specs

    gem install jasmine
    rake jasmine
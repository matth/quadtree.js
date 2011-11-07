function QuadTree(x, y, width, height, depth, maxDepth) {

  this.x        = x
  this.y        = y
  this.width    = width
  this.height   = height
  this.depth    = depth
  this.maxDepth = maxDepth
  this.sprites  = []

  if (depth < maxDepth) {
    this.children = [

      // Top left
      new QuadTree(x, y, width / 2, height / 2, depth + 1, maxDepth),

      // Top right
      new QuadTree(x + width / 2, y, width / 2, height / 2, depth + 1, maxDepth),

      // Bottom left
      new QuadTree(x, y + height / 2, width / 2, height / 2, depth + 1, maxDepth),

      // Bottom right
      new QuadTree(x + width / 2, y + height / 2, width / 2, height / 2, depth + 1, maxDepth)

    ]
  } else {
    this.children = []
  }

}

// Return this and all children (recursively) in flat array
QuadTree.prototype.flatten = function() {
  return this.children.reduce(function(a, b) {
    return a.concat(b.flatten())
  }, [this])
}

// Return this and all children (recursively) in flat array where sprites.length > 1
QuadTree.prototype.possibles = function() {
  return this.flatten().filter(function(quad) { return quad.sprites.length > 1 })
}

// Separating Axis Theorem (rectangluar sprites only, sprite's origin is top left)
// http://en.wikipedia.org/wiki/Separating_axis_theorem
QuadTree.prototype.intersects = function(sprite) {

  var sx = sprite.x + sprite.width  / 2,
      sy = sprite.y + sprite.height / 2,
      tx = this.x   + this.width    / 2,
      ty = this.y   + this.height   / 2

  return Math.abs(tx - sx) < (this.width  + sprite.width)  / 2
      && Math.abs(ty - sy) < (this.height + sprite.height) / 2
}

// Add sprite to quad if intersects
QuadTree.prototype.insert = function(sprite) {
  if (this.depth < this.maxDepth) {
    this.children.forEach(function(quad) {
      if (quad.intersects(sprite)) {
        quad.insert(sprite)
      }
    })
  } else {
    this.sprites.push(sprite)
  }
}


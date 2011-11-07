describe("QuadTree", function() {
  var tree;

  beforeEach(function() {
    tree = new QuadTree(0, 0, 100, 100, 0, 1)
  });

  it("should be create child quads if we are not at max depth", function() {

    expect(tree.children.length).toEqual(4)

    // Top left position ok
    expect(tree.children[0].x).toEqual(0)
    expect(tree.children[0].y).toEqual(0)

    // Top right position ok
    expect(tree.children[1].x).toEqual(50)
    expect(tree.children[1].y).toEqual(0)

    // Bottom left position ok
    expect(tree.children[2].x).toEqual(0)
    expect(tree.children[2].y).toEqual(50)

    // Bottom right position ok
    expect(tree.children[3].x).toEqual(50)
    expect(tree.children[3].y).toEqual(50)

    // Correct width and heights applied
    tree.children.forEach(function(child) {
      expect(child.width).toEqual(50)
      expect(child.height).toEqual(50)
    })

    // No grand children as maxDepth will have been met
    tree.children.forEach(function(child) {
      expect(child.children.length).toEqual(0)
    })

  });

  describe(".flatten", function() {
    it("should return all children (recursively) into a flat array", function() {
      var tree = new QuadTree(0, 0, 100, 100, 0, 2)
      expect(tree.flatten().length).toEqual(21)
    });
  });

  describe(".possibles", function() {
    it("should return all children (recursively) with more than one sprite", function() {
      tree.insert({x: 10, y:10, width: 10, height: 10})
      tree.insert({x: 20, y:20, width: 10, height: 10})
      expect(tree.possibles().length).toEqual(1)
    });
  });

  describe(".insert", function() {
    it("should return push a sprite down into the deepest quad possible", function() {
      tree.insert({x: 10, y:10, width: 10, height: 10})
      expect(tree.sprites.length).toEqual(0)
      expect(tree.children[0].sprites.length).toEqual(1)
    })
  })

  describe(".intersects", function() {
    it("should return true if a sprite intersects the tree", function() {
      expect(tree.intersects({x: 10, y:10, width: 10, height: 10})).toEqual(true)
      expect(tree.intersects({x: -5, y:-5, width: 10, height: 10})).toEqual(true)
      expect(tree.intersects({x: 100, y:-11, width: 10, height: 10})).toEqual(false)
    })
  })

});

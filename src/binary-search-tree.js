const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
      return;
    }

    let currentNode = this._root;
    while (currentNode) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      } else {
        return;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let currentNode = this._root;

    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data === node.data) {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      const minRightNode = this.findMinNode(node.right);
      node.data = minRightNode.data;
      node.right = this.removeNode(node.right, minRightNode.data);
      return node;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else {
      node.right = this.removeNode(node.right, data);
      return node;
    }
  }

  findMinNode(node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }

  min() {
    const minNode = this.findMinNode(this._root);
    return minNode ? minNode.data : null;
  }

  findMaxNode(node) {
    while (node && node.right) {
      node = node.right;
    }
    return node;
  }

  max() {
    const maxNode = this.findMaxNode(this._root);
    return maxNode ? maxNode.data : null;
  }
}

module.exports = {
  BinarySearchTree
};
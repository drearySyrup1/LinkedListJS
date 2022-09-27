class LinkedList {
  constructor(value = null) {
    this.size = 0;
    if (value === null) {
      this.head = null;
    } else {
      this.head = new Node(value);
      this.size++;
    }
    this.tail = this.head;
  }

  append(value) {
    if (this.size === 0) {
      this.prepend(value);
      return;
    }
    this.tail.next = new Node(value);
    this.tail = this.tail.next;
    this.size++;
  }

  prepend(value) {
    const temp = this.head;
    this.head = new Node(value);
    this.head.next = temp;
    this.size++;
    if (this.size === 1) {
      this.tail = this.head;
    }
  }

  at(index) {
    return (function traverse(h, index) {
      if (h === null) return undefined;
      if (index === 0) return h;

      return traverse(h.next, index - 1);
    })(this.head, index);
  }

  pop() {
    if (this.size === 0) return;
    if (this.size === 1) {
      const temp = this.head;
      this.tail = null;
      this.head = null;
      this.size--;
      return temp;
    }
    return function traverse(h) {
      if (h.next.next === null) {
        const temp = h.next;
        this.tail = h;
        this.tail.next = null;
        this.size--;
        return temp;
      }
      return traverse.call(this, h.next);
    }.call(this, this.head);
  }

  contains(value) {
    if (this.size === 0) return;
    return function traverse(h) {
      if (h.value === value) return true;
      if (h.next === null) return false;
      return traverse.call(this, h.next);
    }.call(this, this.head);
  }

  find(value) {
    if (this.size === 0) return;
    return function traverse(h, index) {
      if (h.value === value) return index;
      if (h.next === null) return null;
      return traverse.call(this, h.next, index + 1);
    }.call(this, this.head, 0);
  }

  toString() {
    return function traverse(h, string) {
      if (h === null) {
        string += 'null';
        return string;
      }

      string += `( ${h.value} ) -> `;
      return traverse.call(this, h.next, string);
    }.call(this, this.head, '');
  }

  //Extra Credit
  insertAt(value, index) {
    if (index > this.size) throw new Error('Index too high');
    if (index === 0) {
      this.prepend(value);
      return;
    }
    return function traverse(head, prev, i) {
      if (index === i) {
        const newNode = new Node(value);
        prev.next = newNode;
        newNode.next = head;
        this.size++;
        return;
      }

      return traverse.call(this, head.next, head, i + 1);
    }.call(this, this.head, null, 0);
  }

  removeAt(index) {
    if (index > this.size - 1) throw new Error('Index too high');
    if (index === 0) {
      const temp = this.head;
      this.head = this.head.next;
      this.size--;
      return temp;
    }
    return function traverse(head, prev, i) {
      if (index === i) {
        prev.next = head.next;
        this.size--;
        return head;
      }

      return traverse.call(this, head.next, head, i + 1);
    }.call(this, this.head, null, 0);
  }
}

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

module.exports = LinkedList;

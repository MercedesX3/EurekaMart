//Linked List class

public class IDedLinkedList<AnyType extends IDedObject> {
    private class Node {
        AnyType data;
        Node next;

        Node(AnyType d) {
            data = d;
            next = null;
        }

    }

    // variables
    public Node head;

    // constructor
    public IDedLinkedList() {
        head = null;
    }

    // functions
    // empties the linked list
    public void makeEmpty() {
        head = null;
    }

    // Get the generic type to get the particular id and returns AnyType.
    // Don’t remove the object from the list. returns null if the list is empty or
    // ID not found.
    public AnyType findID(int ID) {
        Node curr = head;

        // iterate until the end or until ID is found
        while (curr != null) {
            if (curr.data.getID() == ID) {
                return curr.data;
            }
            curr = curr.next;
        }
        return null;
    }

    // insert at front of list or return false if that ID already exists
    public boolean insertAtFront(AnyType addition) {
        // if ID already exists
        if (findID(addition.getID()) != null) {
            return false;
        }

        // node placeholder
        Node add = new Node(addition);
        add.next = head;
        head = add;
        return true;
    }

    // delete and return the record at the front of the list or return null if the
    // list is empty
    public AnyType deleteFromFront() {
        // checks if nodes exist in list
        if (head == null) {
            return null;
        }

        // node placeholders
        Node removedNode = head;
        head = head.next;

        return removedNode.data;
    }

    // find and delete the record with the given ID or returns null if it isn’t
    // found
    public AnyType delete(int ID) {
        // checks if ID exists: if not there is no need to check list
        if (findID(ID) == null) {
            return null;
        }

        // node placeholders
        Node removedNode = head;
        Node prevNode = head;

        // iterates until node with same id is found
        while (removedNode.data.getID() != ID) {
            prevNode = removedNode;
            removedNode = removedNode.next;
        }

        // if the removed node is head, you can just use deletefromfront function
        if (removedNode == head) {
            return deleteFromFront();
        }

        prevNode.next = removedNode.next;
        return removedNode.data;

    }

    // return the sum of ids of all elements currently in the list. if list is empty
    // return -1.
    public int printTotal() {
        // list does not contain anything
        if (head == null) {
            return -1;
        }

        // list contains nodes
        Node curr = head;
        int total = 0;

        // iterates until end of linked list
        while (curr != null) {
            total += curr.data.getID();
            curr = curr.next;
        }
        return total;

    }
}

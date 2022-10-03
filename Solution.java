
import java.util.ArrayDeque;
import java.util.Deque;

/*
At any time before and after each method call:
(frontDeque.size() == backDeque.size()) || (frontDeque.size() - 1 == backDeque.size())
 */
public class FrontMiddleBackQueue {

    private static final int NO_ELEMENTS_IN_QUEUE = -1;
    private final Deque<Integer> frontDeque;
    private final Deque<Integer> backDeque;

    public FrontMiddleBackQueue() {
        frontDeque = new ArrayDeque<>();
        backDeque = new ArrayDeque<>();
    }

    public void pushFront(int value) {
        if (frontDeque.size() > backDeque.size()) {
            backDeque.addFirst(frontDeque.removeLast());
        }
        frontDeque.addFirst(value);
    }

    public void pushMiddle(int value) {
        if (frontDeque.size() > backDeque.size()) {
            backDeque.addFirst(frontDeque.removeLast());
        }
        frontDeque.addLast(value);
    }

    public void pushBack(int value) {
        backDeque.addLast(value);
        if (frontDeque.size() < backDeque.size()) {
            frontDeque.addLast(backDeque.removeFirst());
        }
    }

    public int popFront() {
        if (frontDeque.isEmpty() && backDeque.isEmpty()) {
            return NO_ELEMENTS_IN_QUEUE;
        }
        if (frontDeque.size() == backDeque.size()) {
            frontDeque.addLast(backDeque.removeFirst());
        }
        return frontDeque.removeFirst();
    }

    public int popMiddle() {
        if (frontDeque.isEmpty() && backDeque.isEmpty()) {
            return NO_ELEMENTS_IN_QUEUE;
        }
        int elementToPop = frontDeque.removeLast();
        if (frontDeque.size() < backDeque.size()) {
            frontDeque.addLast(backDeque.removeFirst());
        }
        return elementToPop;
    }

    public int popBack() {
        if (frontDeque.isEmpty() && backDeque.isEmpty()) {
            return NO_ELEMENTS_IN_QUEUE;
        }
        if (frontDeque.size() > backDeque.size()) {
            backDeque.addFirst(frontDeque.removeLast());
        }
        return backDeque.removeLast();
    }
}

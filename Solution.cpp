
#include <queue>
using namespace std;

template <typename T> class CustomizedDeque : public deque<T> {
    
public:
    T removeFirst() {
        T elementToRemove = deque<T>::front();
        deque<T>::pop_front();
        return elementToRemove;
    }

    T removeLast() {
        T elementToRemove = deque<T>::back();
        deque<T>::pop_back();
        return elementToRemove;
    }

    void addFirst(T value) {
        deque<T>::push_front(value);
    }

    void addLast(T value) {
        deque<T>::push_back(value);
    }

    bool isEmpty() {
        return deque<T>::empty();
    }
};

/*
At any time before and after each method call:
(frontDeque.size() == backDeque.size()) || (frontDeque.size() - 1 == backDeque.size())
 */
class FrontMiddleBackQueue {
    
    inline static const int NO_ELEMENTS_IN_QUEUE = -1;
    CustomizedDeque<int> frontDeque;
    CustomizedDeque<int> backDeque;

public:
    FrontMiddleBackQueue() = default;

    void pushFront(int value) {
        if (frontDeque.size() > backDeque.size()) {
            backDeque.addFirst(frontDeque.removeLast());
        }
        frontDeque.addFirst(value);
    }

    void pushMiddle(int value) {
        if (frontDeque.size() > backDeque.size()) {
            backDeque.addFirst(frontDeque.removeLast());
        }
        frontDeque.addLast(value);
    }

    void pushBack(int value) {
        backDeque.addLast(value);
        if (frontDeque.size() < backDeque.size()) {
            frontDeque.addLast(backDeque.removeFirst());
        }
    }

    int popFront() {
        if (frontDeque.isEmpty() && backDeque.isEmpty()) {
            return NO_ELEMENTS_IN_QUEUE;
        }
        if (frontDeque.size() == backDeque.size()) {
            frontDeque.addLast(backDeque.removeFirst());
        }
        return frontDeque.removeFirst();
    }

    int popMiddle() {
        if (frontDeque.isEmpty() && backDeque.isEmpty()) {
            return NO_ELEMENTS_IN_QUEUE;
        }
        int elementToPop = frontDeque.removeLast();
        if (frontDeque.size() < backDeque.size()) {
            frontDeque.addLast(backDeque.removeFirst());
        }
        return elementToPop;
    }

    int popBack() {
        if (frontDeque.isEmpty() && backDeque.isEmpty()) {
            return NO_ELEMENTS_IN_QUEUE;
        }
        if (frontDeque.size() > backDeque.size()) {
            backDeque.addFirst(frontDeque.removeLast());
        }
        return backDeque.removeLast();
    }
};

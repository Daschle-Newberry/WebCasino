export class linkedListNode<T>{
    public value: T;
    public next: linkedListNode<T> | null;
    public prev: linkedListNode<T> | null;

    constructor(value: T){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class linkedList<T>{
    private head: linkedListNode<T> | null;
    private tail: linkedListNode<T> | null;
    private size: number;

    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public length(): number{
        return this.size;
    }

    public isEmpty(): boolean{
        return this.size <= 0;
    }

    public contains(value: T): boolean{
        let hold = this.head;
        while (hold != null){
            if(hold.value === value){
                return true;
            }
            hold = hold.next;
        }
        return false;
    }

    /*  
        Adding to beggining of linked list expecting best case removal
        ie a player clicks '7' and immediately deselectes '7'
        either due to an initial misclick or second guessing a bet 
    */
    public add(value: T): void{
        let newNode = new linkedListNode(value);

        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            let hold = this.head;
            newNode.next = hold;
            hold.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    public remove(value: T): boolean{
        let cursor = this.head;
        
        if(!cursor){
            return false;
        }

        if(cursor.value === value){
            this.head = cursor.next;
            if(this.head){
                this.head.prev = null;
            }
            else{
                this.tail = null;
            }
            this.size--;
            return true;
        }

        while(cursor.next){
            if(cursor.next.value === value){
                let nodeToRemove = cursor.next;
                cursor.next = nodeToRemove.next;
                if(cursor.next){
                    cursor.next.prev = cursor;
                }
                else{
                    this.tail = cursor;
                }
                nodeToRemove.next = null;
                nodeToRemove.prev = null;
                this.size--;
                return true
            }
            cursor = cursor.next;
        }
        
        return false;
    }

    // TESTING

    public print(){
        let cursor = this.head;

        while(cursor){
            console.log(cursor.value);
        }
    }

    public printOne(){
        let cursor = this.head;
        console.log(this.head?.value)
    }
}
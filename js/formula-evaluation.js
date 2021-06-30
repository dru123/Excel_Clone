class Stack{
    constructor(){
        this.arr=[];//created an aarray
    }
    push(val){//push val
 this.arr.push(val);
    }
    pop(){
        if (this.arr.length==0)
        return  "UNDERFLOW";
        return this.arr.pop();//pop the value;
    }
    peek(){
        if(this.arr.length==0)
      return "UNDERFLOW";
      return this.arr[this.arr.length-1];//return top value
    }
    isEmpty(){//return true if stack is empty
        return this.arr.length==0;
    }
}
function evaluate(exp){
    var operator=new Stack();
    var operand=new Stack();
    let arr=exp.split(" ");
    for(let i=0;i<arr.length;i++){
        let o=arr[i];
         if(o=='('){
             operator.push(o);
         }else if(o==')'){
             while(operator.peek()!='('){
              let op=operator.pop();
              let val2=operand.pop();
              let val1=operand.pop();
              let res=solve(val1,val2,op);
              operand.push(res);
         }
         operator.pop();
        }
        else if(o=='+'||o=='*'||o=='-'||o=='/'){
            while(operator.isEmpty()!=true>0&&operator.peek()!='('&&priority(operator.peek()>=priority(o))){
                let op=operator.pop();
                let val2=operand.pop();
                let val1=operand.pop();
                let res=solve(val1,val2,op);
                operand.push(res);
            }
            operator.push(o);
        }

        
        else{
            operand.push(Number(o));
        }
    }
        while(operator.isEmpty()!=true){
            let op=operator.pop();
            let val2=operand.pop();
            let val1=operand.pop();
            let res=solve(val1,val2,op);
            operand.push(res);

        }
        return operand.pop();
    }

    function solve(val1,val2,op){
        if(op=='+'){
            return val1+val2;

        }else if(op=='-'){
            return val1-val2;
        }else if(op=='*'){
            return val1*val2;
        }
        else if(op=='/'){
            return val1/val2;

        }
        else{
            return 0;
        }
    } 

    function priority(op) {
        if(op == '*' || op == '/') {
            return 2;
        } else if(op == '+' || op == '-') {
            return 1;
        } else {
            return 0;
        }
    }



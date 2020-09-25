# TS学习之旅

## 函数返回类型
function getTotal(one : number, two : number) : number {

}
### 无返回
function sayHello() :void{
  console.log("hello world")
}
### 永远执行不完
function errorFunction() : never {
  throw new Error()
  console.log("hello world")
}
### 函数参数是对象，设置对象属性的类型
function add({one, two} : {one : number, two ： number}) {
  return one + two
}

## 数组类型注解
const numberArr : number[] = [1, 2, 3]
const stringArr : string[] = ['a', 'b', 'c']
const undefinedArr : undefined[] = [undefined]
const arr : (number | string)[] = [1, 'string', 2]
const objectArr : Lady[] = [
  {name： '刘英', age: 18}, {name: '李智恩', age: 24}
]

### 类型别名type alias
type Lady = {name: string,age: number}
class Madam {
  name: string,
  age: age
}
const objectArr : Madam[] = [
  {name： '刘英', age: 18}, {name: '李智恩', age: 24}
]

## 元组(数组的加强版)（用的少）
const IU : [string, string, number][] = [
  ['IU', 'singer', 28],
  ['IU', 'singer', 28],
  ['IU', 'singer', 28]
]

## 接口interface
interface Girl {
  name: string;
  age: number;
  bust: number;
  waistline ?: number;     //可选值
  [prorname:string] : any; //随便写
  say(): string           //返回字符串
}

interface Singer extends Girl{
  sing(): string
}
### 类必须符合Girl
class Singers implements Girl{
  name = '刘英',
  age = 18,
  bust = 90,
  say(){
    return "hello world"
  }
}
const girl = {
  name: 'IU',
  age: 24,
  bust: 94,
  say(){
    return "hello world"
  },
  sing(){
    return "lalalala~~~"
  }
}

const screenResume = (girl: Girl) => {
  girl.age < 25 && girl.bust > 90 && console.log(girl.name)
  girl.waistline && console.log(girl.name + '腰围是' + girl.waistline)
}
screenResume(girl)

## 类
class Lady{
  content = 'Hello, world'
  sayHello() {
    return this.content
  }
}

class IU extends Lasy {
  sayHello() {
    return super.sayHello() + 'Hi, honey'
  }
  sayLove() {
    return "I LOVE U"
  }
}

const goddess = new IU()
console.log(goddess.sayHello)
console.log(goddess.sayLove)

### public / private / protected
// 类的内部和类的外部
class Person {
  public name: string;
  private age: number;    // 唯一只能类的内部
  protected bund: number; // 只能类的内部和继承
  public sayHello() {
    console.log(this.name + 'say hello')
  }
}
const person = new Person()
person.name = 'hangshao'

class Teacher extends Person {
  public sayBye() {
    this.bund
  }
}

### 构造函数
class Person {
  constructor(public name:string) {}
}
const person = new Person('iu')
console.log(person.name)

class Teacher extends Person{
  constructor(public age:number){
    super('hang')
  }
}
const teacher = new Teacher(18)
console.log(teacher.name)
console.log(teacher.age)

### getter / setter / static
class Lady {
  constructor(private _age:number) {}
  get age() {
    return this._age
  }
  set age(age : number) {
    this._age = age
  }
}

const IU = new Lady(28)
IU.age = 25
console.log(IU.age)

// static
class Girl {
  static sayLove() {
    return 'I Love U'
  }
}
console.log(Girl.sayLove)

### 只读属性和抽象类
class Person {
  public readonly _name:string
  constructor(name: string){
    this._name = name
  }
} 
const person = new Person('hang')
person._name = 'fjh' // 这不被允许

abstract class Girl{
  abstract skill()
}

class Waiter extends Girl{
  skill() {
    console.log('fire!')
  }
}

## tsconfig.json
{
  "include": ["demo.ts"],
  "exclude": ["demo2.ts"],
  "compilerOptions": {
    // 一般部署时开启,连接ts和js的映射
    "sourceMap": true,
    "outDir": "./build",
    "rootDir":  "./src",
    // ts严格
    "strict": true,
    // 允许你的注解类型any不用特意表明,一般还是需要注解
    "noImplicitAny": false,
    // 未使用的变量
    "noUnusedLocals": true,
  }
}

## 联合类型和类型保护


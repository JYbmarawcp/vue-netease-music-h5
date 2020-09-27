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
  age: number
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
interface Waiter{
  anjiao: boolean;
  say: ()=>{};
}
interface Teacher{
  anjiao: boolean;
  skill: ()=>{};
}

//                   联合类型👇
function judgewho(animal: Waiter | Teacher) {
  if(animal.anjiao) {
    (animal as Teacher).skill()
  } else {
    (animal as Waiter).say()
  }
}
Ⅱ
function judgewhos(animal : Waiter | Teacher){
  if('skill' in animal){
    animal.skill()
  } else {
    animal.say()
  }
}
Ⅲ typeof
Ⅳ instanceof
class NumberObj{
  count: Number;
}
function addObj(first :object | NumberObj, second : object | NumberObj) {
  if(first instanceof NUmberObj) {
    return
  }
  return 
}


## enum枚举类型
究极程序员必会
enum Status {
  MESSAGE,
  SPA,
  DABAOJIAN,
}
function getServe(status : any) {
  if (status === Status.MESSAGE) {
    return "message"
  } else if (status === Status.SPA) {
    return "spa"
  }
}
enum Status {
  MESSAGE = 1,
  SPA,
  DABAOJIAN,
}
Status[1]

## 泛型

### 函数中的泛型
<名字随便起一般用T>

function join<T, P>(first: T, second: P) {
  return `${first}${second}`
}
// 第一个参数传什么类型第二个参数必须一致
join<number, string>(1, "23")

#### 泛型中数组的使用 (params: Array<ANY>)
function myFun<T>(params: T[]){
  return params
}
myFun<string>(["132"])

### 类中的泛型
class SelectGirl{
  constructor(private girls: string[] | number[]) {}
  getGirl(index: number):string | number{
    return this.girls[index]
  }
}
const selectGirl = new SelectGirl(["IU", "刘永", "小红"])
// 泛型重构
class SelectGirl<T> {
  constructor(private girls: T[]) {}
  getGirl(index :number) : T {
    return this.girls[index]
  }
}
const selectGirl = new SelectGirl<number>([1,2,3])
// 继续磨练
interface Girl{
  name: string;
}
class SelectGirl<T extends Girl> {
  constructor(private girls: T[]) {}
  getGirl(index :number) : string {
    return this.girls[index].name;
  }
}
const selectGirl = new SelectGirl([
  {name: "IU"},
  {name: "IU"},
  {name: "IU"},
])

## tsc -init 生成tsconfig.json

## 命名空间(namespace)模块化减少全局污染
namespace Home {
  class Header{
    constructor() {
      const elem = document.createElement("div")
      elem.innerText = "IU"
      doucument.body.appendChild(elem)
    }
  }

  class Page{
    constructor() {
      new Header()
    }
  }
}

### components.ts
namespace Components{
  export class Header {
    constructor() {
      const elem = document.createElement("div")
      elem.innerText = "IU"
      document.body.appendChild(elem)
    }
  }
}

### page.ts
namespace Home{
  export class Page{
    constructor() {
      new Components.Header()
    }
  }
}

### 上面两个文件打包编译成一个文件：
"module": "amd"
"outFile": "./build/page.js"

### 子命名空间
namespace Components {
  export namespace SubComponents{
    export class Test{}
  }
}

## import语法
import { Header, Content, Footer } from "./components"

export default class Page{
  constructor() {
    new Header()
  }
}

require(["page"], function(page){
  new page.default();
})

## Parcel打包ts代码
yarn add --dev parcel@next

-----------重构axios--------------------------
## 数组
let x : [string, number]
// 越界元素啥都报错
x[4] = 4


## Null和Undefined
默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
注意：我们鼓励尽可能地使用--strictNullChecks

## 类型断言
### 类型断言有两种形式。 其一是“尖括号”语法：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
### 另一个为as语法：
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

## 对象展开
对象展开还有其它一些意想不到的限制。 首先，它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法：
```
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```

## 接口

### 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}
TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。
最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。、

### 额外的属性检查
还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，所以编译器不会报错。

## 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}

## 类类型
接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    let list: string[] = ['1', '2', '3'];
    // console.log(list);

    let x: [string, number];
    x = ['hello', 98];
    // console.log(x);
    // console.log(x[0].substring(1));

    enum Color {
      red, green = 3, blue
    }
    let r: Color = Color.red;
    let g: Color = Color.green;
    let b: Color = Color.blue;
    // console.log(r); //0
    // console.log(g); //3
    // console.log(b); //4
    // let colorName: string = Color[0]; //red
    // let colorName: string = Color[4]; //blue
    // console.log(colorName);

    let notSure: unknown = 4;
    notSure = true;
    // console.log(notSure);

    let someValue: unknown = "vinhnk";
    // let strLength: number = (<string>someValue).length;
    let strLength: number = (someValue as string).length;
    // console.log(strLength);

    let a: number[] = [1, 2, 3, 4];
    let readonly: ReadonlyArray<number> = a;
    // console.log(readonly);
    // console.log(readonly.length);

    let fullName: string = `Khac Vinh`;
    let age: number = 22;
    let sentence: string = `Hi, my name is ${fullName}.
    I'll be ${age + 1} years old next month.`;
    return sentence;
  }
}


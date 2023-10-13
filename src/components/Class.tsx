import React, { PureComponent } from "react";

//装饰器
function addAge(Target: Function) {
    Target.prototype.age = 14
}

@addAge
class Class extends PureComponent {
    age?: Number
    render() {
        return (
            <h2>我是类组件----{this.age}</h2>
        )
    }
}

export default Class
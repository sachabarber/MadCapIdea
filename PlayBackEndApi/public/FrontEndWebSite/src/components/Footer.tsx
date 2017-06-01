import * as React from "react";
import * as ReactDOM from "react-dom";


export interface FooterProps {
    text: string;
}


export class Footer extends React.Component<FooterProps, undefined> {

    constructor(props) {
        super(props);
        console.log(this.props); // prints out whatever is inside props
    }

    render() {

        return <div>
                <h1>I come through a factory and this is my text: {this.props.text}</h1>
               </div>;
    }
}
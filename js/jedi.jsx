import React from 'react';
import ReactDOM from 'react-dom';

const jedi_list = [
    {
        name: "Palpatine",
        sithName: "Lord Sidius"
    },
    {
        name: "Cout Dooku",
        sithName: "Lord Tiranus"
    },
    {
        name: "Anakin Skywalker",
        sithName: "Lord Vader"
    },
    {
        name: "Padme Amidala",
        sithName: "Wooden Amidala"
    }
];

class Jedi extends React.Component {
    onClick = (event) => {
        this.props.move(this.props.index);
    };

    render() {
        return <li onClick={this.onClick}><h1>{this.props.name}</h1></li>;
    }
}

class Galaxy extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            lightSide: jedi_list.slice(),
            darkSide: []
        }
    }

    moveToDark = (index) => {
        const jedi = this.state.lightSide.splice(index, 1)[0];
        this.state.darkSide.push(jedi);
        this.setState({
            lightSide: this.state.lightSide,
            darkSide: this.state.darkSide
        });
    };

    moveToLight = (index) => {
        const jedi = this.state.darkSide.splice(index, 1)[0];
        this.state.lightSide.push(jedi);
        this.setState({
            lightSide: this.state.lightSide,
            darkSide: this.state.darkSide
        });
    };


    render() {

        const lightSideHtml = this.state.lightSide.map((element, i)=><Jedi name={element.name} index={i} key={element.name} move={this.moveToDark} />);

        const darkSideHtml = this.state.darkSide.map((element, i)=><Jedi name={element.sithName} index={i} key={element.name} move={this.moveToLight} />);

        return <div>
            <table>
                <thead>
                <tr>
                    <th>Light Side</th>
                    <th>Dark Side</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <ul>
                            {lightSideHtml}
                        </ul>
                    </td>
                    <td>
                        <ul>
                            {darkSideHtml}
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>;
    }
}


class App extends React.Component {
    render() {
        return <Galaxy/>;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
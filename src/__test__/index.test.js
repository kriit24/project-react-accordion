// test/script.js
import React from 'react';
import {View, Text} from 'react-native';
import renderer from 'react-test-renderer';
import expect from "expect";
import Accordion from "../index";

let style = {
    accordion: {
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ced4da',
        color: 'grey',
        direction: 'ltr',
        padding: 0,
        marginBottom: 10
    },
    heading: {},
    list: {},
};

export default class MainApp extends React.Component {

    render() {

        let title = <Text>TITLE</Text>;

        return (
            <Accordion title={title} key={Math.random()} style={style} open="one" duration="150" visible={false}>
                <View style={{padding: 5}}>
                    <Text>CONTENT</Text>
                </View>
            </Accordion>
        );
    }
}

test('renders correctly', () => {
    //let tree = Test('see');
    //console.log(tree);
    const tree = renderer.create(<MainApp />).toJSON();
    expect(tree).toMatchSnapshot();
});

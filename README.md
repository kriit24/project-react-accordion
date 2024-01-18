# PROJECT REACT ACCORDION 

## Installation

npm i project-react-accordion

## Usage

Using npm:
```
import Accordion from 'project-react-accordion';
```


```
let style = {
    accordion: {},//style accordion view
    heading: {},//style accordion title parent view
    list: {},//style accordion content parent view
};
let title = <>
    <View style={{paddingBottom: 5}}>
        <Text>TITLE</Text>
    </View>
</>;
<Accordion title={title} key={Math.random()} style={style} open="one/all" duration="150" visible={true/false} arrow={true/false} onPress={callback}>
    <Text>CONTENT</Text>
</Accordion>
```

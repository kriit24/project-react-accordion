import React, {useState, useRef} from 'react';
import {Animated, LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager, View, Text, ActivityIndicator} from 'react-native';
import {Entypo} from '@expo/vector-icons';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


const styles = StyleSheet.create({
    content: {
        padding: 5,
        alignItems: "stretch",
        width: "100%",
        backgroundColor: '#FFFFFF',
    },
    list_hidden: {
        height: 0,
        padding: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
    },
    list_visible: {},
    accordion: {},
    heading: {},
    list: {},
    loader_container: {
        flex: 1,
        justifyContent: 'center',
    },
    loader_horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    arrow: {
        paddingTop: 17
    }
});
const toggleAnimation = duration => {
    return {
        duration: duration,
        update: {
            property: LayoutAnimation.Properties.scaleXY,
            type: LayoutAnimation.Types.easeInEaseOut,
        },
        delete: {
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut,
        },
    };
};

function Loader(props) {
    return (
        <View
            style={[
                styles.loader_container,
                styles.loader_horizontal,
                {
                    backgroundColor:
                        props !== undefined && props.backgroundColor !== undefined
                            ? props.backgroundColor
                            : '#FFFFFF',
                },
            ]}
        >
            <ActivityIndicator size="large" color="#1976d2" />
        </View>
    );
}

/*
let style = {
    accordion: {},
    heading: {},
    list: {},
};
let title = <>
    <View style={{paddingBottom: 5}}>
        <Text style={style.heading}>
            <Text>pealkiri</Text>
        </Text>
    </View>
</>;
<Accordion title={title} key={Math.random()} style={style} open="one/all" duration="150" visible={true/false}>
    <Text>sisu</Text>
</Accordion>
 */

let previousIsOpen = null;

function Accordion({title, style, children, open, arrow, duration, visible, display, onPress, onOpened}){

    if( display !== undefined && !display)
        return null;

    const [inlineStyle, setInlineStyle] = useState(Object.assign({}, style));
    const [isOpen, setIsOpen] = useState(visible !== undefined ? visible : false);
    const [isVisible, setIsVisible] = useState(visible !== undefined ? visible : false);
    const animationController = useRef(new Animated.Value(0)).current;

    if (visible !== undefined && visible && isOpen) {

        previousIsOpen = setIsOpen;
    }

    //when u toggle between multiple accordions
    if (!isOpen) {

        if (isVisible) {

            setIsVisible(false);
        }
    }

    if(isOpen && isVisible && onOpened !== undefined){

        onOpened();
    }

    const onToggle = () => {

        const config = {
            duration: parseInt(duration !== undefined ? duration : 150),
            toValue: isOpen ? 0 : 1,
            useNativeDriver: true,
        };
        Animated.timing(animationController, config).start(({finished}) => {

            if (finished) {

                //next state is open
                if (!isOpen) {

                    if (!isVisible) {

                        setIsVisible(true);
                    }
                    //next state is close
                } else {

                    if (isVisible) {

                        setIsVisible(false);
                    }
                }
            }
        });
        LayoutAnimation.configureNext(toggleAnimation(parseInt(duration !== undefined ? duration : 150)));

        //toggle open
        setIsOpen(prevState => !prevState);
        if (open === 'one') {

            if (previousIsOpen)
                previousIsOpen(false);

            if (previousIsOpen !== setIsOpen)
                previousIsOpen = setIsOpen;
            else
                previousIsOpen = null;
        }

        if (onPress !== undefined) onPress(isOpen ? 0 : 1);
    };

    style = {...styles, ...inlineStyle};
    //let inlineStyle = Object.assign({}, styles, style);

    let ArrowBtn = () => {

        if (arrow !== undefined && arrow) {

            if (isOpen) {

                return <Entypo name="arrow-with-circle-down" size={26} color="black" style={style.arrow}/>;
            }

            return <Entypo name="arrow-with-circle-right" size={26} color="black" style={style.arrow}/>;
        }
        return null;
    };

    return (
        <View style={[styles.content, style.accordion]}>
            <TouchableOpacity onPress={onToggle} style={[{overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-between'}, style.heading]}>
                {typeof title === 'string' ? <Text>{title}</Text> : title}
                <ArrowBtn/>
            </TouchableOpacity>
            <View style={[style.list, !isOpen ? style.list_hidden : style.list_visible, {overflow: 'hidden'}]}>
                {isOpen ? (isVisible ? children : <Loader/>) : null}
            </View>
        </View>
    );
}

export default Accordion;

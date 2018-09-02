import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Card } from './common';
import { Fonts, Colors } from '../global'
import * as Animatable from 'react-native-animatable';

var { height, width } = Dimensions.get('window');

//functional component
class PetListItem extends React.PureComponent {
    handleViewRef = ref => this.view = ref;

    //Zooms item out on click
    zoomOut = () => this.view.zoomOut(75)

    //Zooms item in on clickRelease
    zoomIn = () => this.view.zoomIn(75);//this.view.zoomIn(75)

    render() {
        return (
            <TouchableWithoutFeedback
                onPressIn={this.zoomOut}
                onPressOut={this.zoomIn}
                onPress={this.props.onPress}
            >
                <Animatable.View ref={this.handleViewRef}>
                    <Card>
                        <View style={styles.cardContainer}>
                            <Image
                                style={styles.petImage}
                                source={this.props.pet.media.photos ? { uri: this.props.pet.media.photos.photo[2].$t } : require('../../assets/icons/no-photo.png')}
                            />
                            {/* <FullWidthImage
                                ratio={3/4}
                                source={this.props.pet.media.photos ? { uri: this.props.pet.media.photos.photo[2].$t } : require('../../assets/icons/no-photo.png')}
                            /> */}
                            <View style={styles.petInfo}>
                                <Text style={styles.headerText}>{this.props.pet.name.$t}</Text>
                                <Text style={styles.subHeaderText}>{this.props.pet.breeds.breed.$t || this.props.pet.animal.$t}</Text>
                            </View>
                        </View>
                    </Card>
                </Animatable.View>
            </TouchableWithoutFeedback>
        );
    }
};

const styles = StyleSheet.create({
    headerTextContent: {
        justifyContent: 'space-around',
    },
    headerText: {
        fontSize: 30,
        fontFamily: Fonts.primary
    },
    subHeaderText: {
        color: Colors.flat.concrete,
        fontSize: 20,
        fontFamily: Fonts.primary
    },
    thumbnail: {
        height: 50,
        width: 50,
    },
    thumbnailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 10,
    },
    petImage: {
        height: height * .412,
        //allows image to fit the width of screen
        flex: 1,
        width: null,
    },
    petInfo: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15
    },
    cardContainer: {
        borderRadius: 20,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
    },
});

export default PetListItem;